import { createSlice } from '@reduxjs/toolkit';
import { SupervisorReview } from 'app/models';
import { AppHttpService, store } from 'app/shared';
import { ServiceOptions } from 'app/shared';

export const getSupervisorReview$ = () => {
    const serviceOptions: ServiceOptions = {
        serviceKey: 'getSupervisorReview$',
        localDataPath: '/supervisor-review.json',
        servicePath: '/allapplications'
    };
    const httpSubject = AppHttpService.get$<SupervisorReview>(SupervisorReview, serviceOptions);
    httpSubject.subscribe(({ payload }: any) => {
        store.dispatch(supervisorReviewSlice.actions.loadSupervisorReview(payload));
    });
    return httpSubject;
};

// Intended Use Example: 
// const data = new SupervisorReview();
// data.applicantFirstname = 'me';
// putSupervisorReview$(id, data);
export const putSupervisorReview$ = (id: string, data: SupervisorReview) => {
    data.removeUndefinded();
    const httpSubject = AppHttpService.put$<SupervisorReview>(SupervisorReview, { servicePath: '/application/{id}', params: { id } }, data);
    httpSubject.subscribe(({ payload }: any) => {
        console.log('UPDATE');
        getSupervisorReview$();
    });
    return httpSubject;
};

export const deleteSupervisorReview$ = (id: string) => {
    const httpSubject = AppHttpService.delete$<SupervisorReview>(SupervisorReview, { servicePath: '/application/{id}', params: { id } });
    httpSubject.subscribe(({ payload }: any) => {
        console.log('DELETE');
        getSupervisorReview$();
    });
    return httpSubject;
};

const initialGridState: Array<object> = [];
export const supervisorReviewSlice = createSlice({
    name: 'supervisor-review',
    initialState: initialGridState,
    reducers: {
        loadSupervisorReview: (state, action) => {
            return action.payload;
        }
    }
});

export const selectSupervisorReview = (state: any): Array<object> => state.supervisorReview.map((o: any) => ({ ...o }));
