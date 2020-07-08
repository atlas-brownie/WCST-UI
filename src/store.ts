import { routerMiddleware, routerReducer as routing } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { IRootState } from './types';

import { createBrowserHistory } from 'history';

import {
  benefitsStatus,
  environment,
  initialBenefitsStatusState,
  initialEnvironment,
  initialUploadBenefitsState,
  uploadBenefits,
} from './reducers';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL || '/',
});
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers<IRootState>({
    benefitsStatus,
    environment,
    routing,
    uploadBenefits,
  }),
  {
    benefitsStatus: initialBenefitsStatusState,
    environment: initialEnvironment,
    routing: undefined,
    uploadBenefits: initialUploadBenefitsState,
  },
  compose(applyMiddleware(middleware), applyMiddleware(thunk as ThunkMiddleware<IRootState>)),
);

console.log('store=', store.getState());

// store.subscribe(debounce(() => {}));

export default store;
