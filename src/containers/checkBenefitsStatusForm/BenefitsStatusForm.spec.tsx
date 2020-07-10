import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import BenefitsStatusForm from './BenefitsStatusForm';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';

export const AppProviders: React.FunctionComponent = ({ children }): React.ReactElement => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

const componentTree = mount(
  <AppProviders>
    <BenefitsStatusForm />
  </AppProviders>,
);

describe('BenefitsStatusForm', () => {
  it('returns "BenefitsStatusForm"', () => {
    expect(BenefitsStatusForm);
  });

  it('returns "componentTree"', () => {
    expect(componentTree).toBeTruthy();
  });
});
