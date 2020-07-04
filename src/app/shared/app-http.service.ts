import { Observable, Subject, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';
import { ModelBase } from '.';
import { Constructable, FuncAny } from '.';
import { ajaxDelete, ajaxGet, ajaxPost, ajaxPut } from 'rxjs/internal/observable/dom/AjaxObservable';
import { ServiceOptions, ServiceLocator } from './service-locator';
import { UserDefault } from 'app/shared';
import { VAHttpResponseHandler } from './va-http-response-handler';
import { IHashString } from './model-base';

export interface IResponse<T> {
    dateTime: string;
    hasError: boolean;
    length: number;
    message: string;
    payload: Array<T>;
    payloadType?: string;
    metadata?: any;
    error: string;
    errorMap: any;
    nextPageUrl?: string;
}

//TODO: see what rxjs error response returns
export interface HttpErrorResponse {
    message: string;
    error: string;
    status: number;
    statusText: string;
}

export interface IResult<T> {
    error: any;
    payload: Array<T>;
    metadata?: any;
    nextPageUrl?: string;
    message?: string;
}

export interface ISingleResult<T> {
    error: any;
    payload: T;
    metadata?: any;
    nextPageUrl?: string;
    message?: string;
}

export interface HttpResponseHandler {
    getSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>>;
    postSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>>;
    putSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>>;
    postImageSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>>;
    deleteSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>>;
    error<T extends ModelBase>(errorResponse: Readonly<HttpErrorResponse>): Observable<IResult<T>>;
    getHeaders(): IHashString | undefined;
}

class AppHttpServiceClass {
    responseHandler = VAHttpResponseHandler;

    mapToModel<T extends ModelBase>(type: Constructable<T>, payload: Array<any>, func?: FuncAny): Array<T> {
        const list = payload.map<T>((item) => {
            const data = func ? func(item) : item;
            return new type(data);
        });
        return list;
    }

    // mapErrorResponse prevents consumers of http services from directly handling HttpErrorResponses
    mapErrorResponse<T>(error: HttpErrorResponse): Readonly<IResponse<T>> {
        const formattedError: Readonly<IResponse<T>> = {
            dateTime: '',
            hasError: true,
            length: 0,
            payload: [],
            message: error.message,
            error: error.error,
            errorMap: { 'httpResponseStatus:': `${error.status} ${error.statusText}` }
        };
        return formattedError;
    }

    public post$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, data: T, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);
        ajaxPost(url, JSON.stringify(data), this.responseHandler.getHeaders())
            .pipe(
                switchMap((ajaxResponse: AjaxResponse) => {
                    return this.responseHandler.postSuccess(type, ajaxResponse, func);
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return this.responseHandler.error<T>(errorResponse);
                })
            )
            .subscribe(subject);

        return subject;
    }

    public put$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, data: T, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);
        ajaxPut(url, JSON.stringify(data), ServiceLocator.getHeaders(UserDefault))
            .pipe(
                switchMap((ajaxResponse: AjaxResponse) => {
                    return this.responseHandler.putSuccess(type, ajaxResponse, func);
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return this.responseHandler.error<T>(errorResponse);
                })
            )
            .subscribe(subject);

        return subject;
    }

    public getJwt(): any {
        const now = new Date();
        const url = `${ServiceLocator.getBaseURL()}/cmsat/api/projects?_dc=${now.getTime()}`;

        const defaultHeaders = {
            Authorization: `Bearer ${UserDefault.keycloak.token}`
        };
        return ajaxGet(url, defaultHeaders).pipe(
            switchMap((ajaxRes: AjaxResponse) => {
                console.log('ajaxRes=', ajaxRes);
                return of(ajaxRes);
            }),
            catchError((error) => {
                console.log('catchError=', error);
                // if HttpErrorResponse.status is 0, then display error.message.
                // if HttpErrorResponse.status is > 0, then display error.error.
                // const errorDisplay = error.status ? error.error : error.message;
                // Toast.error(errorDisplay, url);
                return of({ error: this.mapErrorResponse(error), payload: [] });
            })
        );
    }

    public get$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);

        ajaxGet(url, this.responseHandler.getHeaders())
            .pipe(
                switchMap((ajaxResponse: AjaxResponse) => {
                    return this.responseHandler.getSuccess(type, ajaxResponse, func);
                }),
                catchError((errorResponse) => {
                    return this.responseHandler.error<T>(errorResponse);
                })
            )
            .subscribe(subject);

        return subject;
    }

    public getUnencoded$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, func?: FuncAny): Subject<ISingleResult<T>> {
        const subject = new Subject<ISingleResult<T>>();
        const url = ServiceLocator.getUnencodedUrl(serviceOptions);

        console.log('get$ url', url);

        ajaxGet(url, ServiceLocator.getHeaders(UserDefault))
            .pipe(
                switchMap((ajaxRes: AjaxResponse) => {
                    return this.responseHandler.getSingleSuccess(type, ajaxRes, func);
                }),
                catchError((error) => {
                    return of<ISingleResult<T>>({ error: this.mapErrorResponse(error), payload: new type() });
                })
            )
            .subscribe(subject);

        return subject;
    }

    public delete$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);
        ajaxDelete(url, ServiceLocator.getHeaders(UserDefault))
            .pipe(
                switchMap((ajaxResponse: AjaxResponse) => {
                    return this.responseHandler.deleteSuccess(type, ajaxResponse, func);
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return this.responseHandler.error<T>(errorResponse);
                })
            )
            .subscribe(subject);
        return subject;
    }

    public postImage$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, data: T, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);
        ajaxPost(url, data, { 'Content-Type': 'application/json' })
            .pipe(
                switchMap((ajaxResponse: AjaxResponse) => {
                    return this.responseHandler.putSuccess(type, ajaxResponse, func);
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return this.responseHandler.error<T>(errorResponse);
                })
            )
            .subscribe(subject);

        return subject;
    }
}

export const AppHttpService = new AppHttpServiceClass();
