import * as React from 'react';
import 'jest';

import { shallow } from 'enzyme';
// import ApplyHeader2 from './ApplyHeader2';
// import UploadBenefitsForm from './UploadBenefitsForm';
import UploadBenefitsFormSuccess, {
  IUploadBenefitsFormSuccessProps,
} from './UploadBenefitsFormSuccess';

const c: IUploadBenefitsFormSuccessProps = {
  claimStatus: 'received',
  isRedirectUploadBenefitsForm: false,
  firstName: 'ddd',
  lastName: 'dkksdj',
  journal: [],
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
    // expect(
    //   shallow(<UploadBenefitsForm updateDescription={() => {}} />).find('#apply-header').length,
    // ).toBe(1);
    // const accordionWrapper = shallow(<ApplyHeader2 />).find('#apply-header').length;
    // expect(accordionWrapper.prop('aria-hidden')).toBe('false');

    // expect(shallow(<ApplyHeader2 />)).
  });
});
