import 'jest';
import * as React from 'react';

import { shallow } from 'enzyme';
import UploadBenefitsFormSuccess, {
  IUploadBenefitsFormSuccessProps,
} from './UploadBenefitsFormSuccess';

const c: IUploadBenefitsFormSuccessProps = {
  claimStatus: 'received',
  firstName: 'ddd',
  isRedirectUploadBenefitsForm: false,
  journal: [],
  lastName: 'dkksdj',
  submissionData: '',
  trackingCode: '',
  vaTrackingCode: '',
};

describe('applyHeader2', () => {
  it('returns "applyHeader2"', () => {
    expect(UploadBenefitsFormSuccess);
  });

  it('should render the apply header 2', () => {
    expect(shallow(<UploadBenefitsFormSuccess {...c} />).find('.vads-l-row').length).toBe(1);
  });
});
