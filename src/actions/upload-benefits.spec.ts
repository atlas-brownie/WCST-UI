import 'jest';

import * as constants from '../types/constants';
// import * as validators from '../utils/validators';
import * as actions from './upload-benefits';

afterEach(() => {
  fetchMock.resetMocks();
});

describe('upload-status actions', () => {
  it('returns "actions"', () => {
    expect(actions);
  });
});

// const appState = {
//   uploadBenefits: {
//     inputs: {
//       fileNumber: '321-22-3432',
//       veteranFirstName: 'TestFirstName',
//       veteranLastName: 'TestLastName',
//       zipCode: '22003',
//     },
//   },
// };

describe('updateBenefitsFileNumber', () => {
  it('should return the input value if the value is not dirty', () => {
    const newValue = {
      dirty: false,
      value: '321-22-3432',
    };
    expect(actions.updateBenefitsFileNumber(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_BENEFITS_FILE_NUMBER,
    });
  });
});
