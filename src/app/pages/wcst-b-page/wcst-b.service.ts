import { createSlice } from '@reduxjs/toolkit';
import { WcstB } from 'app/models';
import { AppHttpService, store } from 'app/shared';
import { ServiceOptions } from 'app/shared';
import { ServiceState } from 'app/models';

// Please open config.json and config-local.json and apply/paste the local mock data below to the services hash
// to setup intial api to work with mock data.
// "getWcstB$": { "localMockData": true }

export const getWcstB$ = () => {
    const serviceOptions: ServiceOptions = {
        serviceKey: 'getWcstB$',
        localDataPath: '/wcst-b.json',
        servicePath: '/wcst-b',
        params: {}
    };

    const httpSubject = AppHttpService.get$<WcstB>(WcstB, serviceOptions);
    httpSubject.subscribe(({ payload }: any) => {
        store.dispatch(wcstBSlice.actions.loadWcstB(payload));
    });
    return httpSubject;
};

export const postWcstB$ = (files: any[]) => {
    const locationUrl = ServiceState.documentUploadLocation.data.attributes.location;

    // const locationUrl =
    //     'https://sandbox-api.va.gov/services_user_content/vba_documents/3c3fae7a-9e4d-4f66-afa9-04ee91bb2827?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQD72FDTFWPUWR5OZ%2F20200703%2Fus-gov-west-1%2Fs3%2Faws4_request&X-Amz-Date=20200703T170237Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=71f668f08dd4d89074a0f1323e769f6bdbe5983f7231c5f4390a8c6ff7ccac24';
    const formData = new FormData();
    formData.append('content', files[0]);
    formData.append('metadata', files[1]);

    const oReq = new XMLHttpRequest();
    oReq.open('PUT', locationUrl, true);
    oReq.setRequestHeader('Content-Type', 'multipart/form-data');
    oReq.onload = function (oEvent) {
        if (oReq.status === 200) {
            console.log('success return from POST Files');
        } else {
            console.log('failed return from POST Files');
        }
    };

    oReq.send(formData);
};

export const getMetadata = () => {
    const metadata = {
        veteranFirstName: 'Jarvis',
        veteranLastName: 'Stark',
        fileNumber: '012345678',
        zipCode: '97202',
        source: 'MBL-WCST',
        docType: '21-22'
    };

    const file = new File([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' });
    console.log('getMetadata file=', file);
    return file;
};

export const putWcstB$ = (id: string, data: WcstB) => {
    const httpSubject = AppHttpService.put$<WcstB>(WcstB, { servicePath: '/wcstB/{id}', params: { id } }, data);
    return httpSubject;
};

export const deleteWcstB$ = (id: string) => {
    const httpSubject = AppHttpService.delete$<WcstB>(WcstB, { servicePath: '/wcstB/{id}', params: { id } });
    return httpSubject;
};

const initialGridState: Array<object> = [];
export const wcstBSlice = createSlice({
    name: 'wcst-b',
    initialState: initialGridState,
    reducers: {
        loadWcstB: (state, action) => {
            return action.payload;
        }
    }
});

export const selectWcstB = (state: any): Array<object> => state.wcstB.map((o: any) => ({ ...o }));
