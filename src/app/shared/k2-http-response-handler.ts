import { Observable, of } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

import { ModelBase } from '.';
import { Constructable, FuncAny } from '.';
import { AppHttpService, IResponse, IResult, HttpResponseHandler, HttpErrorResponse } from 'app/shared';

export class HttpResponseHandlerClass implements HttpResponseHandler {
    private success<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        const res: Readonly<IResponse<T>> = successResponse.response;
        const payload = AppHttpService.mapToModel(type, res.payload, mapFunc);
        if (res.hasError) {
            return of<IResult<T>>({ error: res, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl, message: res.message });
        }
        return of<IResult<T>>({ error: null, payload, metadata: res.metadata, nextPageUrl: res.nextPageUrl, message: res.message });
    }

    getSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        return this.success(type, successResponse, mapFunc);
    }

    postSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        return this.success(type, successResponse, mapFunc);
    }

    putSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        return this.success(type, successResponse, mapFunc);
    }

    postImageSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        return this.success(type, successResponse, mapFunc);
    }

    deleteSuccess<T extends ModelBase>(type: Constructable<T>, successResponse: AjaxResponse, mapFunc?: FuncAny): Observable<IResult<T>> {
        return this.success(type, successResponse, mapFunc);
    }

    error<T>(errorResponse: Readonly<HttpErrorResponse>): Observable<IResult<T>> {
        return of<IResult<T>>({ error: AppHttpService.mapErrorResponse(errorResponse), payload: [] });
    }

    getHeaders() {
        return undefined;
    }
}

export const K2HttpResponseHandler = new HttpResponseHandlerClass();
