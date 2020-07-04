import { createSlice } from '@reduxjs/toolkit';
import { SupervisorReview, Applicant } from 'app/models';
import { AppHttpService, store, User } from 'app/shared';
import { DATA } from 'assets/data/sample_post';
import { ServiceOptions } from 'app/shared';

export const getApplicant$ = (applicantEmail: string = '') => {
    const serviceOptions: ServiceOptions = {
        serviceKey: 'getApplicant$',
        localDataPath: '/supervisor-review.json',
        servicePath: '/application/search?applicantEmail={applicantEmail}',
        params: { applicantEmail }
    };
    const httpSubject = AppHttpService.get$<SupervisorReview>(SupervisorReview, serviceOptions);
    httpSubject.subscribe(({ payload }: any) => {
        console.log('payload', payload);
        store.dispatch(applicantSlice.actions.loadApplicant(payload));
    });
    return httpSubject;
};

// ideally we would send all the data to this function, but since we are mocking a lot of it im only sending email and app type
export const postApplication$ = (email: any, type: string) => {
    const serviceOptions: ServiceOptions = {
        servicePath: '/application'
    };

    let data = new SupervisorReview(DATA);
    data.applicantEmail = email;
    data.applicationType = type;
    const httpSubject = AppHttpService.post$<SupervisorReview>(SupervisorReview, serviceOptions, data);
    httpSubject.subscribe(({ payload }: any) => {
        getApplicant$(email);
    });
    return httpSubject;
};

const mapUserToProfileDueToMockDataInconsistencies = (user: User, applicant: Applicant): Applicant => {
    const newApplicant = new Applicant({ ...applicant });
    newApplicant.email = user.email || applicant.email;
    newApplicant.firstName = user.firstName || applicant.firstName;
    newApplicant.lastName = user.lastName || applicant.lastName;
    return newApplicant;
};

export const getApplicantProfile$ = (user: User) => {
    const serviceOptions: ServiceOptions = {
        serviceKey: 'getApplicantProfile$',
        localDataPath: '/applicant.json',
        servicePath: '/profileById?id={id}',
        params: { id: user.id || '' }
    };
    return AppHttpService.get$<Applicant>(Applicant, serviceOptions, mapUserToProfileDueToMockDataInconsistencies.bind(null, user));
};

const initialGridState: Array<object> = [];
export const applicantSlice = createSlice({
    name: 'applicant',
    initialState: initialGridState,
    reducers: {
        loadApplicant: (state, action) => {
            return action.payload;
        }
    }
});

export const selectApplicant = (state: any): Array<object> => state.applicant.map((o: any) => ({ ...o }));
