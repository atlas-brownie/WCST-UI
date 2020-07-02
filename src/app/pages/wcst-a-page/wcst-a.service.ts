import { createSlice } from '@reduxjs/toolkit';
import { WcstA } from 'app/models';
import { AppHttpService, store } from 'app/shared';
import { ServiceOptions } from 'app/shared';

// Please open config.json and config-local.json and apply/paste the local mock data below to the services hash
// to setup intial api to work with mock data.
// "getWcstA$": { "localMockData": true }

export const getWcstA$ = () => {
    const serviceOptions: ServiceOptions = {
        serviceKey: 'getWcstA$',
        localDataPath: '/wcst-a.json',
        servicePath: '/wcst-a',
        params: {}
    };

    const httpSubject = AppHttpService.get$<WcstA>(WcstA, serviceOptions);
    httpSubject.subscribe(({ payload }: any) => {
        store.dispatch(wcstASlice.actions.loadWcstA(payload));
    });
    return httpSubject;
};

export const postWcstA$ = (data: WcstA) => {
    const serviceOptions: ServiceOptions = {
        servicePath: '/wcst-a'
    };
    const httpSubject = AppHttpService.post$<WcstA>(WcstA, serviceOptions, data);
    return httpSubject;
};

export const putWcstA$ = (id: string, data: WcstA) => {
    const httpSubject = AppHttpService.put$<WcstA>(WcstA, { servicePath: '/wcstA/{id}', params: { id } }, data);
    return httpSubject;
};

export const deleteWcstA$ = (id: string) => {
    const httpSubject = AppHttpService.delete$<WcstA>(WcstA, { servicePath: '/wcstA/{id}', params: { id } });
    return httpSubject;
};

const initialGridState: Array<object> = [];
export const wcstASlice = createSlice({
    name: 'wcst-a',
    initialState: initialGridState,
    reducers: {
        loadWcstA: (state, action) => {
            return action.payload;
        }
    }
});

export const selectWcstA = (state: any): Array<object> => state.wcstA.map((o: any) => ({ ...o }));
