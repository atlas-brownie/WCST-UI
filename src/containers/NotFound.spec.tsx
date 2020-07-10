import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import NotFound from './NotFound';

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

const componentTree = mount(
  <AppProviders>
    <NotFound />
  </AppProviders>,
);

describe('NotFound', () => {
  it('returns "NotFound"', () => {
    expect(NotFound);
  });

  it('returns "componentTree"', () => {
    expect(componentTree).toBeTruthy();
  });
});
