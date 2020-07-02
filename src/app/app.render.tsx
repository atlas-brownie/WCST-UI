import React, { StrictMode, FunctionComponent, ReactElement } from 'react';
import { Provider } from 'react-redux';
import NoSsr from '@material-ui/core/NoSsr';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PageLayout } from 'app/elementals';
import {
    /* PLOP_INJECT_IMPORTED_ROUTE */
    ServerProfilePage,
    ProfilePage,
    HomePage,
    ApplicantPage,
    SupervisorReviewPage,
    ComponentsPage,
    SigninPage,
    SignupPage,
    ForgotPasswordPage,
    SignupVerification,
    ResetPassword,
    ResendConfirmation
} from 'app/pages';
//DO NO REMOVE => THIS IS FOR PLOP TEMPLATING
// PLEASE MAKE SURE THE PLOP IMPORTED ROUTE COMMENT IS INSIDE OF THE IMPORT BRACKETS WHEN SAVING
import './app.render.scss';
import { EnhancedStore } from '@reduxjs/toolkit';

export interface AppRenderProps {
    store: EnhancedStore<any>;
}

export const AppRender: FunctionComponent<AppRenderProps> = ({ store }): ReactElement => {
    return (
        <StrictMode>
            <NoSsr>
                <Provider store={store}>
                    <BrowserRouter>
                        <PageLayout>
                            <Switch>
                                <Route path="/signin" component={SigninPage} />
                                <Route path="/signup" component={SignupPage} />
                                <Route path="/forgot-password" component={ForgotPasswordPage} />
                                <Route path="/signup-verification" component={SignupVerification} />
                                <Route path="/reset-password" component={ResetPassword} />
                                <Route path="/resend-confirmation" component={ResendConfirmation} />
                                /* PLOP_INJECT_ROUTE */
                                <Route path="/server-profile-page" component={ServerProfilePage} />
                                <Route path="/profile-page" component={ProfilePage} />
                                <Route path="/home-page" component={HomePage} />
                                <Route path="/applicant-page" component={ApplicantPage} />
                                <Route path="/supervisor-review-page" component={SupervisorReviewPage} />
                                <Route path="/components-page" component={ComponentsPage} />
                                <Route path="/" component={HomePage} />
                            </Switch>
                        </PageLayout>
                    </BrowserRouter>
                </Provider>
            </NoSsr>
        </StrictMode>
    );
};
