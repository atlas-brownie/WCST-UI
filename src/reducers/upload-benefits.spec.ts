import 'jest';

// import { IToggleSelectedApi } from '../actions';
import { IBenefits } from '../types';
import * as constants from '../types/constants';
import { uploadBenefits } from './upload-benefits';

const getMetadataFile = (metadata: any) => {
  const file = new File([metadata], 'test.json', { type: 'application/json' });
  return file;
};

const app: IBenefits = {
  inputs: {
    contentFile: getMetadataFile({ veteranFirstName: 'Tony' }),
    docType: '',
    fileNumber: {
      dirty: false,
      value: '',
    },
    source: '',
    veteranFirstName: {
      dirty: false,
      value: '',
    },
    veteranLastName: {
      dirty: false,
      value: '',
    },
    zipCode: {
      dirty: false,
      value: '',
    },
  },
  sending: false,
};

describe('upload benefits', () => {
  it('should update uploadBenefits state when inputs are changed', () => {
    const inputToActionMap: any[] = [
      ['fileNumber', constants.UPDATE_BENEFITS_FILE_NUMBER],
      ['veteranFirstName', constants.UPDATE_BENEFITS_VETERAN_FIRST_NAME],
      ['veteranLastName', constants.UPDATE_BENEFITS_VETERAN_LAST_NAME],
      ['zipCode', constants.UPDATE_BENEFITS_ZIP_CODE],
    ];

    inputToActionMap.forEach(([fieldName, actionName]) => {
      const newValue = {
        dirty: true,
        value: 'test',
      };

      const inputs = uploadBenefits(app, { newValue, type: actionName }).inputs;

      const expectedSubObject = { [fieldName]: newValue };

      expect(inputs).toEqual(expect.objectContaining(expectedSubObject));
    });
  });

  // it('should toggle selected APIs', () => {
  //   const applyApis: string[] = Object.keys(constants.APPLY_FIELDS_TO_URL_FRAGMENTS);
  //   applyApis.forEach(apiId => {
  //     const toggleAction: IToggleSelectedApi = {
  //       apiId,
  //       type: constants.TOGGLE_SELECTED_API,
  //     };

  //     let newApp = benefits(app, toggleAction);
  //     expect(newApp.inputs).toEqual(
  //       expect.objectContaining({
  //         apis: expect.objectContaining({
  //           [apiId]: true,
  //         }),
  //       }),
  //     );

  //     newApp = benefits(newApp, toggleAction);
  //     expect(newApp.inputs).toEqual(
  //       expect.objectContaining({
  //         apis: expect.objectContaining({
  //           [apiId]: false,
  //         }),
  //       }),
  //     );
  //   });
  // });

  // it('should not toggle an API that does not exist', () => {
  //   const newInputs = benefits(app, {
  //     apiId: 'fakeapi',
  //     type: constants.TOGGLE_SELECTED_API,
  //   }).inputs;

  //   expect(newInputs).toEqual(app.inputs);
  // });

  it('should set state to sending when application send begins', () => {
    expect(uploadBenefits(app, { type: constants.SUBMIT_BENEFITS_BEGIN })).toEqual(
      expect.objectContaining({
        sending: true,
      }),
    );
  });

  it('should set errorStatus application send errors', () => {
    const newApp = uploadBenefits(app, {
      type: constants.SUBMIT_BENEFITS_BEGIN,
    });
    expect(
      uploadBenefits(newApp, {
        status: 'Error happened',
        type: constants.SUBMIT_BENEFITS_ERROR,
      }),
    ).toEqual(
      expect.objectContaining({
        errorStatus: 'Error happened',
        sending: false,
      }),
    );
  });

  it('should set response data on a successful submit', () => {
    const newApp = uploadBenefits(app, {
      type: constants.SUBMIT_BENEFITS_BEGIN,
    });
    expect(
      uploadBenefits(newApp, {
        payloadResponse: {
          claimStatus: 'pending',
          firstName: 'TestFirstName',
          journal: [],
          lastName: 'TestLastName',
          submissionData: '',
          trackingCode: 'TestTrackingCode',
          vaTrackingCode: 'TestVATrackingCode',
        },
        type: constants.SUBMIT_BENEFITS_SUCCESS,
      }),
    ).toEqual(
      expect.objectContaining({
        result: expect.objectContaining({
          claimStatus: 'pending',
          firstName: 'TestFirstName',
          journal: [],
          lastName: 'TestLastName',
          submissionData: '',
          trackingCode: 'TestTrackingCode',
          vaTrackingCode: 'TestVATrackingCode',
        }),
        sending: false,
      }),
    );
  });

  // it('should toggle termsOfService acceptance', () => {
  //   const newApp = benefits(app, { type: constants.TOGGLE_ACCEPT_TOS });
  //   expect(newApp.inputs).toEqual(
  //     expect.objectContaining({
  //       termsOfService: true,
  //     }),
  //   );
  //   expect(benefits(newApp, { type: constants.TOGGLE_ACCEPT_TOS }).inputs).toEqual(
  //     expect.objectContaining({
  //       termsOfService: false,
  //     }),
  //   );
  // });
});
