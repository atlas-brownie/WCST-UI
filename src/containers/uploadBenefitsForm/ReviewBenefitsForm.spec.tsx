import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import ReviewBenefitsForm from './ReviewBenefitsForm';

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
    <ReviewBenefitsForm />
  </AppProviders>,
);

describe('PageContent', () => {
  it('returns "PageContent"', () => {
    expect(ReviewBenefitsForm);
  });

  it('returns "PageContent"', () => {
    expect(componentTree).toBeTruthy();
  });
});
