import { debounce, isEqual } from 'lodash';
import { routerMiddleware, routerReducer as routing } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { IApplication, IBenefits, IRootState } from './types';

import { createBrowserHistory } from 'history';

import { apiVersioning } from './reducers/api-versioning';

import {
  application,
  initialApplicationState,
  initialUploadBenefitsState,
  uploadBenefits,
} from './reducers';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL || '/',
});
const middleware = routerMiddleware(history);

function loadApplicationState(): { application: IApplication } {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState == null) {
      return { application: initialApplicationState };
    } else {
      const state = JSON.parse(serializedState);
      if (
        isEqual(Object.keys(state.application.inputs), Object.keys(initialApplicationState.inputs))
      ) {
        return { application: state.application };
      } else {
        return { application: initialApplicationState };
      }
    }
  } catch (err) {
    return { application: initialApplicationState };
  }
}

function saveApplicationState(state: IRootState) {
  try {
    const stateToSerialize = {
      application: {
        inputs: state.application.inputs,
      },
    };
    const serializedState = JSON.stringify(stateToSerialize);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    // swallow the error.
  }
}

function loadUploadBenefitsState(): { uploadBenefits: IBenefits } {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState == null) {
      return { uploadBenefits: initialUploadBenefitsState };
    } else {
      const state = JSON.parse(serializedState);
      if (
        isEqual(
          Object.keys(state.uploadBenefits.inputs),
          Object.keys(initialUploadBenefitsState.inputs),
        )
      ) {
        return { uploadBenefits: state.uploadBenefits };
      } else {
        return { uploadBenefits: initialUploadBenefitsState };
      }
    }
  } catch (err) {
    return { uploadBenefits: initialUploadBenefitsState };
  }
}

function saveUploadBenefitsState(state: IRootState) {
  try {
    const stateToSerialize = {
      uploadBenefits: {
        inputs: state.uploadBenefits.inputs,
      },
    };
    const serializedState = JSON.stringify(stateToSerialize);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    // swallow the error.
  }
}

const store = createStore(
  combineReducers<IRootState>({
    apiVersioning,
    application,
    routing,
    uploadBenefits,
  }),
  {
    application: loadApplicationState().application,
    routing: undefined,
    uploadBenefits: loadUploadBenefitsState().uploadBenefits,
  },
  compose(applyMiddleware(middleware), applyMiddleware(thunk as ThunkMiddleware<IRootState>)),
);

store.subscribe(
  debounce(() => {
    saveApplicationState(store.getState());
    saveUploadBenefitsState(store.getState());
  }),
);

export default store;
