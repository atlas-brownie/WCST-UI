import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import BenefitsStatusFormFields from './BenefitsStatusFormFields';

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
    <BenefitsStatusFormFields />
  </AppProviders>,
);

describe('BenefitsStatusFormFields', () => {
  it('returns "BenefitsStatusFormFields"', () => {
    expect(BenefitsStatusFormFields);
  });

  it('returns "componentTree"', () => {
    expect(componentTree).toBeTruthy();
  });
});
