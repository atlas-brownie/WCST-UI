import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import DisabledApplyForm from './DisabledApplyForm';

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
    <DisabledApplyForm />
  </AppProviders>,
);

describe('DisabledApplyForm', () => {
  it('returns "DisabledApplyForm"', () => {
    expect(DisabledApplyForm);
  });

  it('returns "componentTree"', () => {
    expect(componentTree).toBeTruthy();
  });
});
