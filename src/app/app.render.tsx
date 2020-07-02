import React, { StrictMode, FunctionComponent, ReactElement } from 'react';
import { Provider } from 'react-redux';
import NoSsr from '@material-ui/core/NoSsr';
import { PageLayout } from 'app/elementals';
import { BrowserRouter as Router } from 'react-router-dom';

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
                    <Router>
                        {/* Routes are defined and managed in app-route.ts model (Singleton AppRoute) */}
                        <PageLayout />
                    </Router>
                </Provider>
            </NoSsr>
        </StrictMode>
    );
};
