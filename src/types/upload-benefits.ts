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
  // apis: IApiList;
  // description: IErrorableInput;
  fileNumber: IErrorableInput;
  veteranFirstName: IErrorableInput;
  veteranLastName: IErrorableInput;
  // oAuthApplicationType: IErrorableInput;
  // oAuthRedirectURI: IErrorableInput;
  zipCode: IErrorableInput;
  // termsOfService: boolean;
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
