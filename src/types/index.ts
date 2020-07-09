import { RouterState } from 'react-router-redux';

import { IBenefitsStatus } from './benefits-status';
import { IBenefits } from './upload-benefits';

export * from './form';
export * from './upload-benefits';
export * from './benefits-status';

export interface IEnvironment {
  version: string | undefined;
}

export interface IRootState {
  environment: IEnvironment;
  benefitsStatus: IBenefitsStatus;
  uploadBenefits: IBenefits;
  routing: RouterState;
}
