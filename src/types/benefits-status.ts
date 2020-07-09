import { IErrorableInput } from './form';

export interface IBenefitsStatusInputs {
  confirmationCode: IErrorableInput;
}

export interface IBenefitsStatusResponsePayload {
  claimStatus: string;
  journal: any[];
}

export interface IBenefitsStatusSuccessResult {
  dateTime: string;
  errorMap: any;
  hasError: boolean;
  length: number;
  message: string;
  payload: IBenefitsStatusResponsePayload[];
  payloadType: string;
}

export interface IBenefitsStatus {
  inputs: IBenefitsStatusInputs;
  sending: boolean;
  errorStatus?: string;
  result?: IBenefitsStatusResponsePayload;
}
