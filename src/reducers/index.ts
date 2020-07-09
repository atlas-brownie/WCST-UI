import { IEnvironment } from 'src/types';

export * from './upload-benefits';
export * from './benefits-status';

export const initialEnvironment: IEnvironment = { version: process.env.REACT_APP_VERSION };
export function environment(state: IEnvironment = { version: '' }): IEnvironment {
  return state;
}
