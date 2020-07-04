import React from 'react';
// import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// import { store } from './app/shared';
// import { Provider } from 'react-redux';
import './app/index.scss';
import { App } from './app/app.container';
import * as serviceWorker from './app/serviceWorker';
import { loadConfiguration, pingServer$ } from './app/app.service';
// import NoSsr from '@material-ui/core/NoSsr';

loadConfiguration(() => {
    pingServer$();
    ReactDOM.render(<App />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
