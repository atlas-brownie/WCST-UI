// import { Toast } from './emitter.service';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Subject, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';

import { ModelBase } from '.';
// import { environment } from 'environments/environment';
import { Constructable, FuncAny } from '.';
import { ajaxDelete, ajaxGet, ajaxPost, ajaxPut } from 'rxjs/internal/observable/dom/AjaxObservable';
import { ServiceOptions, ServiceLocator } from './service-locator';

export interface IResponse<T> {
    readonly dateTime: string;
    readonly hasError: boolean;
    readonly length: number;
    readonly message: string;
    readonly payload: Array<T>;
    readonly payloadType?: string;
    readonly metadata?: any;
    readonly error: string;
    readonly errorMap: any;
    readonly nextPageUrl?: string;
}

//TODO: see what rxjs error response returns
interface HttpErrorResponse {
    readonly message: string;
    readonly error: string;
    readonly status: number;
    readonly statusText: string;
}

export interface IResult<T> {
    readonly error: any;
    readonly payload: Array<T>;
    readonly metadata?: any;
    readonly nextPageUrl?: string;
    readonly message?: string;
}

class AppHttpServiceClass {
    mapToModel<T extends ModelBase>(type: Constructable<T>, payload: Array<any>, func?: FuncAny): Array<T> {
        const list = payload.map<T>((item) => {
            const data = func ? func(item) : item;
            return new type(data);
        });
        return list;
    }

    // mapErrorResponse prevents consumers of http services from directly handling HttpErrorResponses
    mapErrorResponse<T>(error: HttpErrorResponse): IResponse<T> {
        const formattedError: IResponse<T> = {
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
        console.log('post$ url=', url);
        ajaxPost(url, JSON.stringify(data))
            .pipe(
                switchMap((ajaxRes: AjaxResponse) => {
                    const res: IResponse<T> = ajaxRes.response;
                    const payload = this.mapToModel<T>(type, res.payload, func);
                    if (res.hasError) {
                        // Toast.warning(res.message, url);
                        return of<IResult<T>>({ error: res, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl });
                    }
                    // Toast.success(`${payload.length} item impacted`, url);
                    return of<IResult<T>>({ error: null, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl });
                }),
                catchError((error: HttpErrorResponse) => {
                    // if HttpErrorResponse.status is 0, then display error.message.
                    // if HttpErrorResponse.status is > 0, then display error.error.
                    // const errorDisplay = error.status ? error.error : error.message;
                    // Toast.error(errorDisplay, url);
                    return of<IResult<T>>({ error: this.mapErrorResponse(error), payload: [] });
                })
            )
            .subscribe(subject);

        return subject;
    }

    public put$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, data: T, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);
        console.log('put$ url=', url);

        ajaxPut(url, JSON.stringify(data))
            .pipe(
                switchMap((ajaxRes: AjaxResponse) => {
                    const res: IResponse<T> = ajaxRes.response;
                    const payload = this.mapToModel<T>(type, res.payload, func);
                    if (res.hasError) {
                        // Toast.warning(res.message, url);
                        return of<IResult<T>>({ error: res, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl });
                    }
                    // Toast.success(`${payload.length} item impacted`, url);
                    return of<IResult<T>>({ error: null, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl });
                }),
                catchError((error: HttpErrorResponse) => {
                    // if HttpErrorResponse.status is 0, then display error.message.
                    // if HttpErrorResponse.status is > 0, then display error.error.
                    // const errorDisplay = error.status ? error.error : error.message;
                    // Toast.error(errorDisplay, url);
                    return of<IResult<T>>({ error: this.mapErrorResponse(error), payload: [] });
                })
            )
            .subscribe(subject);

        return subject;
    }

    public postImage$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, data: T, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);
        console.log('postImage$ url=', url);

        ajaxPost(url, data, { 'Content-Type': 'application/json' })
            .pipe(
                switchMap((ajaxRes: AjaxResponse) => {
                    const res: IResponse<T> = ajaxRes.response;
                    const payload = this.mapToModel(type, res.payload, func);
                    if (res.hasError) {
                        // Toast.warning(res.message, url);
                        return of<IResult<T>>({ error: res, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl });
                    }
                    // Toast.success(`${payload.length} item impacted`, url);
                    return of<IResult<T>>({ error: null, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl });
                }),
                catchError((error: HttpErrorResponse) => {
                    // if HttpErrorResponse.status is 0, then display error.message.
                    // if HttpErrorResponse.status is > 0, then display error.error.
                    // const errorDisplay = error.status ? error.error : error.message;
                    // Toast.error(errorDisplay, url);
                    return of<IResult<T>>({ error: this.mapErrorResponse(error), payload: [] });
                })
            )
            .subscribe(subject);

        return subject;
    }

    public get$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);

        console.log('get$ url', url);

        ajaxGet(url)
            .pipe(
                switchMap((ajaxRes: AjaxResponse) => {
                    const res: IResponse<T> = ajaxRes.response;
                    const payload = this.mapToModel(type, res.payload, func);
                    if (res.hasError) {
                        // Toast.warning(res.message, url);
                        return of<IResult<T>>({ error: res, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl, message: res.message });
                    }
                    // Toast.success(`${payload.length} items returned`, url);
                    return of<IResult<T>>({ error: null, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl, message: res.message });
                }),
                catchError((error) => {
                    // if HttpErrorResponse.status is 0, then display error.message.
                    // if HttpErrorResponse.status is > 0, then display error.error.
                    // const errorDisplay = error.status ? error.error : error.message;
                    // Toast.error(errorDisplay, url);
                    return of<IResult<T>>({ error: this.mapErrorResponse(error), payload: [] });
                })
            )
            .subscribe(subject);

        return subject;
    }

    public delete$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, func?: FuncAny): Subject<IResult<T>> {
        const subject = new Subject<IResult<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);

        ajaxDelete(url)
            .pipe(
                switchMap((ajaxRes: AjaxResponse) => {
                    const res: IResponse<T> = ajaxRes.response;
                    const payload = this.mapToModel(type, res.payload, func);
                    if (res.hasError) {
                        // Toast.warning(res.message, url);
                        return of<IResult<T>>({ error: res, payload, metadata: res.metadata });
                    } else {
                        // Toast.success(`${res.message}`, url);
                    }
                    return of<IResult<T>>({ error: null, payload, metadata: res.metadata });
                }),
                catchError((error: HttpErrorResponse) => {
                    // Toast.error(error.message, url);
                    return of<IResult<T>>({ error: this.mapErrorResponse(error), payload: [] });
                })
            )
            .subscribe(subject);
        return subject;
    }
}

export const AppHttpService = new AppHttpServiceClass();
