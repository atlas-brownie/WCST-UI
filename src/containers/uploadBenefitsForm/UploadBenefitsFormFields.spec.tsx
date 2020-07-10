import 'jest';
import * as React from 'react';

import { mount, shallow } from 'enzyme';
import UploadBenefitsFormFields, {
  IUploadBenefitsFormFieldsProps,
} from './UploadBenefitsFormFields';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { IErrorableInput } from 'src/types';
import store from '../../store';

const getMetadataFile = (metadata: any) => {
  const file = new File([metadata], 'test.json', { type: 'application/json' });
  return file;
};

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

const testProps: IUploadBenefitsFormFieldsProps = {
  contentFile: getMetadataFile({ veteranFirstName: 'Tony' }),
  docType: '',
  fileNumber: {
    dirty: false,
    value: '',
  },
  source: '',
  veteranFirstName: {
    dirty: false,
    value: '',
  },
  veteranLastName: {
    dirty: false,
    value: '',
  },
  zipCode: {
    dirty: false,
    value: '',
  },
  updateContentFile: (value: File) => newErrorableInput,
  updateVeteranFirstName: (value: IErrorableInput) => newErrorableInput,
  updateVeteranLastName: (value: IErrorableInput) => newErrorableInput,
  updateFileNumber: (oldValidation?: string) => (value: IErrorableInput) => newErrorableInput,
  updateZipCode: (oldValidation?: string) => (value: IErrorableInput) => newErrorableInput,
};

const componentTree = mount(
  <AppProviders>
    <UploadBenefitsFormFields {...testProps} />
  </AppProviders>,
);

describe('UploadBenefitsFormFields', () => {
  it('returns "UploadBenefitsFormFields"', () => {
    expect(UploadBenefitsFormFields);
  });

  it('should render componentTree', () => {
    expect(componentTree).toBeTruthy();
  });

  it('should see h4', () => {
    const component = shallow(
      <Provider store={store}>
        <UploadBenefitsFormFields {...testProps} />
      </Provider>,
    );
    expect(component.find('h4').length).toBe(0);
  });
});
