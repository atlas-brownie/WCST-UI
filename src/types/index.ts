import { RouterState } from 'react-router-redux';

import { IBenefitsStatus } from './benefits-status';
import { IBenefits } from './upload-benefits';

export * from './form';
export * from './upload-benefits';
export * from './benefits-status';

export interface IRootState {
  benefitsStatus: IBenefitsStatus;
  uploadBenefits: IBenefits;
  routing: RouterState;
}
