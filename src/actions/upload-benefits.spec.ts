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

describe('updateBenefitsVeteranFirstName', () => {
  it('should return the input value if the value is not dirty', () => {
    const newValue = {
      dirty: false,
      value: 'TestFirstName',
    };
    expect(actions.updateBenefitsVeteranFirstName(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_BENEFITS_VETERAN_FIRST_NAME,
    });
  });
});

describe('updateBenefitsVeteranLastName', () => {
  it('should return the input value if the value is not dirty', () => {
    const newValue = {
      dirty: false,
      value: 'TestLastName',
    };
    expect(actions.updateBenefitsVeteranLastName(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_BENEFITS_VETERAN_LAST_NAME,
    });
  });
});

describe('updateBenefitsZipCode', () => {
  it('should return the input value if the value is not dirty', () => {
    const newValue = {
      dirty: false,
      value: '35399',
    };
    expect(actions.updateBenefitsZipCode(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_BENEFITS_ZIP_CODE,
    });
  });
});
