import React from 'react';
//import { HomePage } from '../pages/home-page/home-page.container';
import { initializeStorybook } from './storybook.service';
import { store } from 'app/shared/store';
import { Provider } from 'react-redux';

initializeStorybook();

export default {
    title: 'Patricia'
};

export const PatriciaStartPage = () => (
    <Provider store={store}>
        {/* <HomePage label="Home Page Start" /> */}
        <div>Patricia</div>
    </Provider>
);
