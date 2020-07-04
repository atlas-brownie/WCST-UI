import React, { FunctionComponent, ReactElement } from 'react';
import { store } from 'app/shared';
import { AppRender } from './app.render';

export const App: FunctionComponent<{}> = (): ReactElement => {
    return <AppRender store={store} />;
};
