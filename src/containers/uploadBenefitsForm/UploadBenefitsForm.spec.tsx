import 'jest';
import * as React from 'react';

import { mount } from 'enzyme';
import { initialUploadBenefitsInputs } from '../../reducers/upload-benefits';
import UploadBenefitsForm, { IBenefitsProps } from './UploadBenefitsForm';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { IErrorableInput } from 'src/types';
import store from '../../store';

const newErrorableInput: () => IErrorableInput = () => {
  return {
    dirty: false,
    value: '',
  };
};

export const AppProviders: React.FunctionComponent = ({ children }): React.ReactElement => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

const testProps: IBenefitsProps = {
  clearErrorMessage: () => newErrorableInput,
  inputs: initialUploadBenefitsInputs,
  sending: false,
  updateDescription: (value: IErrorableInput) => newErrorableInput,
};

const componentTree = mount(
  <AppProviders>
    <UploadBenefitsForm {...testProps} />
  </AppProviders>,
);

describe('UploadBenefitsForm', () => {
  it('returns "UploadBenefitsForm"', () => {
    expect(UploadBenefitsForm);
  });

  it('should render componentTree', () => {
    expect(componentTree).toBeTruthy();
  });
});
