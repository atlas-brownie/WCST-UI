import { RouterState } from 'react-router-redux';
import { IApplication } from './apply';
import { IBenefits } from './upload-benefits';

export * from './apply';
export * from './form';
export * from './upload-benefits';

export interface IApiNameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface IApiVersioning {
  docUrl: string;
  metadata: any;
  requestedApiVersion: string;
}

export interface IRootState {
  apiVersioning: IApiVersioning;
  application: IApplication;
  uploadBenefits: IBenefits;
  routing: RouterState;
}
