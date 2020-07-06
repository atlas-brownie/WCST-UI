import * as Sentry from '@sentry/browser';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IErrorableInput, IRootState } from '../types';
import * as constants from '../types/constants';

export interface IBenefitsStatusConfirmationCode extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_BENEFITS_STATUS_CONFIRMATION_CODE;
}

export type BenefitsStatusAction = IBenefitsStatusConfirmationCode;

export interface ISubmitBenefitsStatusForm extends Action {
  type: constants.SUBMIT_BENEFITS_STATUS_BEGIN;
}

export interface ISubmitBenefitsStatusFormSuccess extends Action {
  clientID: string;
  clientSecret: string;
  type: constants.SUBMIT_BENEFITS_STATUS_SUCCESS;
  token: string;
}

export interface ISubmitBenefitsStatusFormError extends Action {
  type: constants.SUBMIT_BENEFITS_STATUS_ERROR;
  status: string;
}

export type SubmitBenefitsStatusFormAction =
  | ISubmitBenefitsStatusForm
  | ISubmitBenefitsStatusFormSuccess
  | ISubmitBenefitsStatusFormError;

export type SubmitBenefitsStatusFormThunk = ThunkAction<
  Promise<SubmitBenefitsStatusFormAction>,
  IRootState,
  undefined,
  SubmitBenefitsStatusFormAction
>;

enum RESPONSE {
  FAILED,
  SUCCEEDED,
}

const getResponseStatus = (responseJson: any): any => {
  const { hasError, message, payload } = responseJson;
  if (hasError) {
    return { status: RESPONSE.FAILED, message, payload };
  } else {
    const formStatus = payload[0];
    if (formStatus === 'error') {
      return { status: RESPONSE.FAILED, message, payload };
    } else {
      return { status: RESPONSE.SUCCEEDED, message, payload };
    }
  }
};

export const submitBenefitsStatusForm: ActionCreator<SubmitBenefitsStatusFormThunk> = () => {
  return (dispatch, state) => {
    dispatch(submitBenefitsStatusFormBegin());

    const { benefitsStatus } = state();
    const confirmationCode = benefitsStatus.inputs.confirmationCode.value;

    // const url = `${process.env.REACT_APP_BENEFITS_API_URL}/api/v1/uploads/${confirmationCode}`;
    const url = `${process.env.REACT_APP_BENEFITS_API_URL}/api/v1/uploads/va/${confirmationCode}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(json => {
        console.log('benefits-status json=', json);
        const responseStatus = getResponseStatus(json);
        if (responseStatus.status) {
          const result = dispatch(
            submitBenefitsStatusFormSuccess(json.token, json.clientID, json.clientSecret),
          );
          // history.push('/');
          return result;
        } else {
          return dispatch(submitBenefitsStatusFormError(responseStatus.message));
        }
      })
      .catch(error => {
        console.log('benefits-status error=', error);
        Sentry.withScope(scope => {
          scope.setLevel(Sentry.Severity.fromString('warning'));
          Sentry.captureException(error);
        });
        return dispatch(submitBenefitsStatusFormError(error.message));
      });
  };
};

export const submitBenefitsStatusFormBegin: ActionCreator<ISubmitBenefitsStatusForm> = () => {
  return {
    type: constants.SUBMIT_BENEFITS_STATUS_BEGIN,
  };
};

export const submitBenefitsStatusFormSuccess: ActionCreator<ISubmitBenefitsStatusFormSuccess> = (
  token: string,
  clientID: string,
  clientSecret: string,
) => {
  return {
    clientID,
    clientSecret,
    token,
    type: constants.SUBMIT_BENEFITS_STATUS_SUCCESS,
  };
};

export const submitBenefitsStatusFormError: ActionCreator<ISubmitBenefitsStatusFormError> = (
  status: string,
) => {
  return {
    status,
    type: constants.SUBMIT_BENEFITS_STATUS_ERROR,
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
export const updateBenefitsStatusConfirmationCode: ActionCreator<IBenefitsStatusConfirmationCode> = (
  newValue: IErrorableInput,
) => {
  return {
    newValue,
    type: constants.UPDATE_BENEFITS_STATUS_CONFIRMATION_CODE,
  };
};
