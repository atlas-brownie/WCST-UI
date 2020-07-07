import { IErrorableInput } from './form';

export interface IUploadBenefitsInputs {
  contentFile: File;
  docType: string;
  fileNumber: IErrorableInput;
  source: string;
  veteranFirstName: IErrorableInput;
  veteranLastName: IErrorableInput;
  zipCode: IErrorableInput;
}

export interface IUploadBenefitsResponsePayload {
  claimStatus: string;
  firstName: string;
  lastName: string;
  submissionData: string;
  trackingCode: string;
  vaTrackingCode: string;
}

export interface IUploadBenefitsSuccessResult {
  dateTime: string;
  errorMap: string[] | null;
  hasError: boolean;
  length: number;
  message: string;
  payload: IUploadBenefitsResponsePayload[];
  payloadType: string;
}

export interface IBenefits {
  inputs: IUploadBenefitsInputs;
  sending: boolean;
  errorStatus?: string;
  result?: IUploadBenefitsSuccessResult;
}
