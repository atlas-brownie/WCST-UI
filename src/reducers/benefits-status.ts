import { BenefitsStatusAction, SubmitBenefitsStatusFormAction } from '../actions';
import { IBenefitsStatus, IBenefitsStatusInputs, IErrorableInput } from '../types';
import * as constants from '../types/constants';

const newErrorableInput: () => IErrorableInput = () => {
  return {
    dirty: false,
    value: '',
  };
};

const initialBenefitsStatusInputs: IBenefitsStatusInputs = {
  confirmationCode: newErrorableInput(),
};

export const initialBenefitsStatusState: IBenefitsStatus = {
  inputs: initialBenefitsStatusInputs,
  sending: false,
};

export function uploadBenefitsStatusInput(
  inputs: IBenefitsStatusInputs = initialBenefitsStatusInputs,
  action: BenefitsStatusAction,
): IBenefitsStatusInputs {
  if (action.type === constants.UPDATE_BENEFITS_STATUS_CONFIRMATION_CODE) {
    return { ...inputs, confirmationCode: action.newValue };
  } else {
    return inputs;
  }
  // NOTE: linting rules only allow switch statements if there are at least 3 cases
  // switch (action.type) {
  //   case constants.UPDATE_BENEFITS_STATUS_CONFIRMATION_CODE:
  //     return { ...inputs, confirmationCode: action.newValue };
  //   default:
  //     return inputs;
  // }
}

export function benefitsStatus(
  state: IBenefitsStatus = initialBenefitsStatusState,
  action: SubmitBenefitsStatusFormAction | BenefitsStatusAction,
): IBenefitsStatus {
  switch (action.type) {
    case constants.SUBMIT_BENEFITS_STATUS_BEGIN:
      return { ...state, sending: true, errorStatus: undefined };
    case constants.SUBMIT_BENEFITS_STATUS_SUCCESS:
      return {
        ...state,
        inputs: initialBenefitsStatusInputs,
        // result: {
        //   apis: state.inputs.apis,
        //   clientID: action.clientID,
        //   clientSecret: action.clientSecret,
        //   fileNumber: state.inputs.fileNumber.value,
        //   token: action.token,
        // },
        sending: false,
      };
    case constants.SUBMIT_BENEFITS_STATUS_ERROR:
      return { ...state, sending: false, errorStatus: action.status };
    default:
      return { ...state, inputs: uploadBenefitsStatusInput(state.inputs, action) };
  }
}