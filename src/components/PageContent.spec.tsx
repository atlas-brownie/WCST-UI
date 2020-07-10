import 'jest';
import * as React from 'react';

import PageContent from './PageContent';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';

export const AppProviders: React.FunctionComponent = ({ children }): React.ReactElement => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

describe('PageContent', () => {
  it('returns "PageContent"', () => {
    expect(PageContent);
  });

  it('returns "PageContent"', () => {
    expect(AppProviders).toBeTruthy();
  });
});
