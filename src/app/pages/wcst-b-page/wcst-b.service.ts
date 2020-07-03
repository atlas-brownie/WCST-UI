import { createSlice } from '@reduxjs/toolkit';
import { WcstB } from 'app/models';
import { AppHttpService, store } from 'app/shared';
import { ServiceOptions } from 'app/shared';

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

export const postWcstB$ = (data: WcstB) => {
    const serviceOptions: ServiceOptions = {
        servicePath: '/wcst-b'
    };
    const httpSubject = AppHttpService.post$<WcstB>(WcstB, serviceOptions, data);
    return httpSubject;
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
