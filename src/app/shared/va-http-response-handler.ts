import { Observable, of } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { ModelBase } from '.';
import { Constructable, FuncAny } from '.';
import { AppHttpService, IResult, ISingleResult, HttpResponseHandler } from 'app/shared';
import { HttpErrorResponse } from './app-http.service';
import { IHashString } from './model-base';
import { environment } from 'environments/environment';

export interface VAResponse<T> {
    originalEvent: any;
    request: any;
    response: Array<T>;
    responseType: string;
    status: number;
    xhr: any;
}

export interface VASingleResponse<T> {
    originalEvent: any;
    request: any;
    response: T;
    responseType: string;
    status: number;
    xhr: any;
}

export class VAHttpResponseHandlerClass implements HttpResponseHandler {
    private success<T extends ModelBase>(type: Constructable<T>, ajaxRes: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        const res: Readonly<VAResponse<T>> = ajaxRes;
        const payload = AppHttpService.mapToModel(type, [res.response], mapFunc);
        // if (res.status !== 200) {
        //     return of<IResult<T>>({ error: res, payload });
        // }
        return of<IResult<T>>({ error: null, payload });
    }

    // this function is here because mapToModel only takes arrays, but some api calls only return a single object
    private singleSuccess<T extends ModelBase>(type: Constructable<T>, ajaxRes: AjaxResponse, mapFunc?: FuncAny): Observable<ISingleResult<T>> {
        const res: Readonly<VASingleResponse<T>> = ajaxRes;
        const payload = new type(res.response);
        if (res.status !== 200) {
            return of<ISingleResult<T>>({ error: res, payload });
        }
        return of<ISingleResult<T>>({ error: null, payload });
    }

    getSingleSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<ISingleResult<T>> {
        return this.singleSuccess(type, successResponse, mapFunc);
    }

    getSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        console.log('getSuccess res=', successResponse);
        return this.success(type, successResponse, mapFunc);
    }

    postSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        console.log('postSuccess res=', successResponse);
        return this.success(type, successResponse, mapFunc);
    }

    putSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        console.log('putSuccess res=', successResponse);
        return this.success(type, successResponse, mapFunc);
    }

    postImageSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        return this.success(type, successResponse, mapFunc);
    }

    deleteSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        return this.success(type, successResponse, mapFunc);
    }

    error<T>(errorResponse: Readonly<HttpErrorResponse>): Observable<IResult<T>> {
        console.log('error res=', errorResponse);
        return of<IResult<T>>({ error: AppHttpService.mapErrorResponse(errorResponse), payload: [] });
    }

    getAPIKey() {
        return environment.mockAPIKey;
    }

    getHeaders(): IHashString {
        return {
            apikey: this.getAPIKey()
        };
    }
}

export const VAHttpResponseHandler = new VAHttpResponseHandlerClass();
