import 'jest';

import * as constants from '../types/constants';
// import * as validators from '../utils/validators';
import * as actions from './benefits-status';

// const appState = {
//   benefitsStatus: {
//     inputs: {
//       confirmationCode: {
//         dirty: true,
//         value: 'BB2222-FB1B2D',
//       },
//     },
//     sending: true,
//   },
//   environment: {
//     version: '1.0.3',
//   },
//   routing: {
//     location: {
//       hash: '',
//       pathname: '/check-benefits-status',
//       search: '',
//     },
//   },
//   uploadBenefits: {
//     inputs: {
//       contentFile: {},
//       docType: '29-4364',
//       fileNumber: {
//         dirty: false,
//         value: '',
//       },
//       source: 'MBL-WCST',
//       veteranFirstName: {
//         dirty: false,
//         value: '',
//       },
//       veteranLastName: {
//         dirty: false,
//         value: '',
//       },
//       zipCode: {
//         dirty: false,
//         value: '',
//       },
//     },
//     sending: false,
//   },
// };

afterEach(() => {
  fetchMock.resetMocks();
});

describe('benefits-status actions', () => {
  it('returns "actions"', () => {
    expect(actions);
  });
});

// describe('submitBenefitsStatusForm', () => {
//   it('dispatches correct events when fetch has a 200 response', async () => {
//     fetchMock.mockResponse(JSON.stringify({ claimStatus: '1111', journal: [] }));
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     getState.mockReturnValueOnce(appState);
//     await actions.submitBenefitsStatusForm()(dispatch, getState, undefined);
//     expect(dispatch).toBeCalledWith({
//       type: constants.SUBMIT_BENEFITS_STATUS_BEGIN,
//     });
//     expect(dispatch).toBeCalledWith({
//       claimStatus: 'received',
//       journal: [],
//       type: constants.SUBMIT_BENEFITS_STATUS_SUCCESS,
//     });
//   });
// });

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
