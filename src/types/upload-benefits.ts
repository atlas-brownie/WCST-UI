import { IErrorableInput } from './form';

export interface IUploadBenefitsApiList {
  appeals: boolean;
  benefits: boolean;
  claims: boolean;
  confirmation: boolean;
  facilities: boolean;
  health: boolean;
  vaForms: boolean;
  verification: boolean;
  communityCare: boolean;
}

export interface IUploadBenefitsInputs {
  contentFile: File;
  docType: string;
  fileNumber: IErrorableInput;
  source: string;
  veteranFirstName: IErrorableInput;
  veteranLastName: IErrorableInput;
  zipCode: IErrorableInput;
}

export interface IUploadBenefitsSuccessResult {
  fileNumber: string;
  token: string;
  clientID: string;
  clientSecret: string;
}

export interface IBenefits {
  inputs: IUploadBenefitsInputs;
  sending: boolean;
  errorStatus?: string;
  result?: IUploadBenefitsSuccessResult;
}
