import { createSlice } from '@reduxjs/toolkit';
import { WcstC } from 'app/models';
import { AppHttpService } from 'app/shared';
import { ServiceOptions } from 'app/shared';
import { ServiceState } from 'app/models';

export const getDocumentStatus$ = (guidDEPRECATED: string) => {
    const guid = ServiceState.documentUploadLocation.data.attributes.guid;

    const serviceOptions: ServiceOptions = {
        serviceKey: 'getDocumentStatus$',
        localDataPath: '/wcst-c.json',
        servicePath: `/uploads/${guid}`,
        params: {}
    };

    return AppHttpService.get$<WcstC>(WcstC, serviceOptions);
    // httpSubject.subscribe(({ payload }: any) => {
    //     store.dispatch(wcstCSlice.actions.loadWcstC(payload));
    // });
    // return httpSubject;
};

export const postWcstC$ = (data: WcstC) => {
    const serviceOptions: ServiceOptions = {
        servicePath: '/wcst-c'
    };
    const httpSubject = AppHttpService.post$<WcstC>(WcstC, serviceOptions, data);
    return httpSubject;
};

export const putWcstC$ = (id: string, data: WcstC) => {
    const httpSubject = AppHttpService.put$<WcstC>(WcstC, { servicePath: '/wcstC/{id}', params: { id } }, data);
    return httpSubject;
};

export const deleteWcstC$ = (id: string) => {
    const httpSubject = AppHttpService.delete$<WcstC>(WcstC, { servicePath: '/wcstC/{id}', params: { id } });
    return httpSubject;
};

const initialGridState: Array<object> = [];
export const wcstCSlice = createSlice({
    name: 'wcst-c',
    initialState: initialGridState,
    reducers: {
        loadWcstC: (state, action) => {
            return action.payload;
        }
    }
});

export const selectWcstC = (state: any): Array<object> => state.wcstC.map((o: any) => ({ ...o }));
