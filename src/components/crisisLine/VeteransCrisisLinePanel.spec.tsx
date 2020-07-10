import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import VeteransCrisisLinePanel from './VeteransCrisisLinePanel';

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
    <VeteransCrisisLinePanel />
  </AppProviders>,
);

describe('VeteransCrisisLinePanel', () => {
  it('returns "VeteransCrisisLinePanel"', () => {
    expect(VeteransCrisisLinePanel);
  });

  it('returns "componentTree"', () => {
    expect(componentTree).toBeTruthy();
  });
});
