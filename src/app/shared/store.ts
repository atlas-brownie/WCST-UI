import { configureStore } from '@reduxjs/toolkit';
import { userSlice, healthCheckSuccessSlice } from 'app/app.service';
/* PLOP_INJECT_STORE_PATH */
import { wcstBSlice } from 'app/pages/wcst-b-page/wcst-b.service';
import { wcstCSlice } from 'app/pages/wcst-c-page/wcst-c.service';
import { wcstASlice } from 'app/pages/wcst-a-page/wcst-a.service';
import { applicantSlice } from 'app/pages/applicant-page/applicant.service';
import { credentialsSlice } from 'app/pages/signin-signup/signin-signup.service';
import { batchDispatchMiddleware } from 'redux-batched-actions';

export const store = configureStore({
    reducer: {
        /* PLOP_INJECT_STORE_REDUCER */
		wcstB: wcstBSlice.reducer,
		wcstC: wcstCSlice.reducer,
		wcstA: wcstASlice.reducer,
        applicant: applicantSlice.reducer,
        user: userSlice.reducer,
        credentials: credentialsSlice.reducer,
        health: healthCheckSuccessSlice.reducer
    },
    middleware: [batchDispatchMiddleware]
});
