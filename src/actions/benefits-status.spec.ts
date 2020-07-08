import 'jest';

import * as constants from '../types/constants';
// import * as validators from '../utils/validators';
import * as actions from './benefits-status';

afterEach(() => {
  fetchMock.resetMocks();
});

describe('updateBenefitsStatusConfirmationCode', () => {
  it('should return the input value if the value is not dirty', () => {
    const newValue = {
      dirty: false,
      value: 'ABCDEFG-HIJKLMNOP-QRSTUV',
    };
    expect(actions.updateBenefitsStatusConfirmationCode(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_BENEFITS_STATUS_CONFIRMATION_CODE,
    });
  });
});
