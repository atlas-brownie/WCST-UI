import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import UploadBenefitsFormSuccess, {
  IUploadBenefitsFormSuccessProps,
} from './UploadBenefitsFormSuccess';

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

const testProps: IUploadBenefitsFormSuccessProps = {
  claimStatus: 'received',
  firstName: 'firstName',
  isRedirectUploadBenefitsForm: false,
  journal: [],
  lastName: 'lastName',
  submissionData: '',
  trackingCode: '',
  vaTrackingCode: '',
};

const componentTree = mount(
  <AppProviders>
    <UploadBenefitsFormSuccess {...testProps} />
  </AppProviders>,
);

describe('applyHeader2', () => {
  it('returns "applyHeader2"', () => {
    expect(UploadBenefitsFormSuccess);
  });

  it('should render the apply header 2', () => {
    expect(componentTree).toBeTruthy();
  });
});
