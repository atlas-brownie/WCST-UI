import { SubmitBenefitsFormAction, UpdateBenefitsAction } from '../actions';
import { IBenefits, IErrorableInput, IUploadBenefitsInputs } from '../types';
import * as constants from '../types/constants';

const newErrorableInput: () => IErrorableInput = () => {
  return {
    dirty: false,
    value: '',
  };
};

const initialUploadBenefitsInputs: IUploadBenefitsInputs = {
  // description: newErrorableInput(),
  fileNumber: newErrorableInput(),
  veteranFirstName: newErrorableInput(),
  veteranLastName: newErrorableInput(),
  // oAuthApplicationType: newErrorableInput(),
  // oAuthRedirectURI: newErrorableInput(),
  zipCode: newErrorableInput(),
  // termsOfService: false,
};

export const initialUploadBenefitsState: IBenefits = {
  inputs: initialUploadBenefitsInputs,
  sending: false,
};

export function uploadBenefitsInput(
  inputs: IUploadBenefitsInputs = initialUploadBenefitsInputs,
  action: UpdateBenefitsAction,
): IUploadBenefitsInputs {
  switch (action.type) {
    case constants.UPDATE_BENEFITS_FILE_NUMBER:
      return { ...inputs, fileNumber: action.newValue };
    case constants.UPDATE_BENEFITS_VETERAN_FIRST_NAME:
      return { ...inputs, veteranFirstName: action.newValue };
    case constants.UPDATE_BENEFITS_VETERAN_LAST_NAME:
      return { ...inputs, veteranLastName: action.newValue };
  }
  return inputs;
}

export function benefits(
  state: IBenefits = initialUploadBenefitsState,
  action: SubmitBenefitsFormAction | UpdateBenefitsAction,
): IBenefits {
  switch (action.type) {
    case constants.SUBMIT_BENEFITS_BEGIN:
      return { ...state, sending: true, errorStatus: undefined };
    case constants.SUBMIT_BENEFITS_SUCCESS:
      return {
        ...state,
        inputs: initialUploadBenefitsInputs,
        // result: {
        //   apis: state.inputs.apis,
        //   clientID: action.clientID,
        //   clientSecret: action.clientSecret,
        //   fileNumber: state.inputs.fileNumber.value,
        //   token: action.token,
        // },
        sending: false,
      };
    case constants.SUBMIT_BENEFITS_ERROR:
      return { ...state, sending: false, errorStatus: action.status };
    default:
      return { ...state, inputs: uploadBenefitsInput(state.inputs, action) };
  }
}
