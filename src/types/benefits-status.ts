import { IErrorableInput } from './form';

export interface IBenefitsStatusInputs {
  confirmationCode: IErrorableInput;
}

export interface IBenefitsStatusSuccessResult {
  fileNumber: string;
  token: string;
  clientID: string;
  clientSecret: string;
}

export interface IBenefitsStatus {
  inputs: IBenefitsStatusInputs;
  sending: boolean;
  errorStatus?: string;
  result?: IBenefitsStatusSuccessResult;
}
