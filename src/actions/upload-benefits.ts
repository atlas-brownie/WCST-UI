import * as Sentry from '@sentry/browser';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { history } from '../store';
import {
  IErrorableInput,
  IRootState,
  IUploadBenefitsResponsePayload,
  IUploadBenefitsSuccessResult,
} from '../types';
import * as constants from '../types/constants';
import { validateByPattern } from '../utils/validators';

export interface IUploadBenefitsContentFile extends Action {
  newValue: File;
  type: constants.UPDATE_BENEFITS_CONTENT_FILE;
}

export interface IUploadBenefitsVeteranFirstName extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_BENEFITS_VETERAN_FIRST_NAME;
}

export interface IUploadBenefitsVeteranLastName extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_BENEFITS_VETERAN_LAST_NAME;
}

export interface IUploadBenefitsFileNumber extends Action {
  newValue: IErrorableInput;
  previousValidation?: string;
  type: constants.UPDATE_BENEFITS_FILE_NUMBER;
}

export interface IUploadBenefitsZipCode extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_BENEFITS_ZIP_CODE;
}

export type UpdateBenefitsAction =
  | IUploadBenefitsContentFile
  | IUploadBenefitsFileNumber
  | IUploadBenefitsVeteranFirstName
  | IUploadBenefitsVeteranLastName
  | IUploadBenefitsZipCode;

export interface ISubmitBenefitsForm extends Action {
  type: constants.SUBMIT_BENEFITS_BEGIN;
}

export interface ISubmitBenefitsFormSuccess extends Action {
  payloadResponse: IUploadBenefitsResponsePayload;
  type: constants.SUBMIT_BENEFITS_SUCCESS;
}

export interface ISubmitBenefitsFormError extends Action {
  type: constants.SUBMIT_BENEFITS_ERROR;
  status: string;
}

export type SubmitBenefitsFormAction =
  | ISubmitBenefitsForm
  | ISubmitBenefitsFormSuccess
  | ISubmitBenefitsFormError;

export type SubmitBenefitsFormThunk = ThunkAction<
  Promise<SubmitBenefitsFormAction>,
  IRootState,
  undefined,
  SubmitBenefitsFormAction
>;

function buildBenefitsBody({ uploadBenefits }: IRootState): FormData {
  const formData = new FormData();
  const claimFile = uploadBenefits.inputs.contentFile;
  const firstName = uploadBenefits.inputs.veteranFirstName.value;
  const lastName = uploadBenefits.inputs.veteranLastName.value;
  const ssn = uploadBenefits.inputs.fileNumber.value;
  const zipCode = uploadBenefits.inputs.zipCode.value;
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('ssn', ssn);
  formData.append('zipCode', zipCode);
  formData.append('claimFile', claimFile);

  return formData;
}

export const submitBenefitsForm: ActionCreator<SubmitBenefitsFormThunk> = () => {
  return (dispatch, state) => {
    dispatch(submitBenefitsFormBegin());

    const benefitsFormData = buildBenefitsBody(state());

    const url = `${process.env.REACT_APP_BENEFITS_API_URL}/api/v1/uploads`.replace('//api', '/api');

    const request = new Request(url, {
      body: benefitsFormData,
      headers: {
        accept: 'application/json',
      },
      method: 'POST',
    });
    return fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((responseJson: IUploadBenefitsSuccessResult) => {
        if (responseJson.hasError) {
          return dispatch(submitBenefitsFormError(responseJson.message));
        } else {
          const payloadResponse = responseJson.payload[0];
          const result = dispatch(submitBenefitsFormSuccess(payloadResponse));
          history.push('/upload-benefits-form-success');
          return result;
        }
      })
      .catch((error) => {
        Sentry.withScope((scope) => {
          scope.setLevel(Sentry.Severity.fromString('warning'));
          Sentry.captureException(error);
        });
        return dispatch(submitBenefitsFormError(error.message));
      });
  };
};

export const submitBenefitsFormBegin: ActionCreator<ISubmitBenefitsForm> = () => {
  return {
    type: constants.SUBMIT_BENEFITS_BEGIN,
  };
};

export const submitBenefitsFormSuccess: ActionCreator<ISubmitBenefitsFormSuccess> = (
  payloadResponse,
) => {
  return {
    payloadResponse,
    type: constants.SUBMIT_BENEFITS_SUCCESS,
  };
};

export const submitBenefitsFormError: ActionCreator<ISubmitBenefitsFormError> = (
  status: string,
) => {
  return {
    status,
    type: constants.SUBMIT_BENEFITS_ERROR,
  };
};

/*
  IErrorableInput is designed to work with the formation-react form controls, but
  formation-react text inputs (ErrorableTextInput, ErrorableNumberInput, and 
  ErrorableTextArea) take a sort of backwards approach to dirty fields and therefore 
  validation hooks. these components have a required onValueChange prop that accepts
  an object with a `value` string and a `dirty` bool that is used for both the onChange
  and onBlur events - meaning (a) that the component manages those events itself and (b)
  the handler prop must work for both events. 

  the big problem with that is that the dirty bool isn't set to a value that makes
  sense. in the change handler, `dirty` is set to the value of `props.field.dirty`,
  when the change event implies that the value *is* dirty. meanwhile, in the blur
  handler, `dirty` is always true, but the blur event *does not* imply that the value
  changed.

  the implication for us is that we want to validate when `dirty` is true, because we
  want to validate on blur. this will trigger validations that are unnecessary but not
  harmful (because if the value has not changed, the validation result will be the same).
  on the other hand, `dirty` doesn't actually mean "dirty", and we don't want to set 
  it to true ourselves because then we might validate outside

  code: https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/e7d2a079e7ed1979b125f8a43495b35da34d66e5/packages/formation-react/src/components/ErrorableTextInput/ErrorableTextInput.jsx#L41

  tl;dr dirty doesn't mean dirty, it means validate, and we shouldn't use it for 
  anything else.
*/
export const updateBenefitsContentFile: ActionCreator<IUploadBenefitsContentFile> = (
  newValue: File,
) => {
  return {
    newValue,
    type: constants.UPDATE_BENEFITS_CONTENT_FILE,
  };
};

export const updateBenefitsFileNumber: ActionCreator<IUploadBenefitsFileNumber> = (
  newValue: IErrorableInput,
  previousValidation?: string,
) => {
  if (newValue.dirty) {
    // validateByPattern mutates newValue
    validateByPattern(newValue, /^\d{3}-\d{2}-\d{4}$/, 'Format: ###-##-####');
    newValue.dirty = false;
  } else {
    // the newValue passed by IErrorableInput doesn't include validation
    newValue.validation = previousValidation;
  }

  return {
    newValue,
    type: constants.UPDATE_BENEFITS_FILE_NUMBER,
  };
};

export const updateBenefitsVeteranFirstName: ActionCreator<IUploadBenefitsVeteranFirstName> = (
  newValue: IErrorableInput,
) => {
  return {
    newValue,
    type: constants.UPDATE_BENEFITS_VETERAN_FIRST_NAME,
  };
};

export const updateBenefitsVeteranLastName: ActionCreator<IUploadBenefitsVeteranLastName> = (
  newValue: IErrorableInput,
) => {
  return {
    newValue,
    type: constants.UPDATE_BENEFITS_VETERAN_LAST_NAME,
  };
};

export const updateBenefitsZipCode: ActionCreator<IUploadBenefitsZipCode> = (
  newValue: IErrorableInput,
  previousValidation?: string,
) => {
  if (newValue.dirty) {
    // validateByPattern mutates newValue
    validateByPattern(newValue, /(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Format: #####-####');
    newValue.dirty = false;
  } else {
    // the newValue passed by IErrorableInput doesn't include validation
    newValue.validation = previousValidation;
  }

  return {
    newValue,
    type: constants.UPDATE_BENEFITS_ZIP_CODE,
  };
};
