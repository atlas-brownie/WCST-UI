import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

import classNames from 'classnames';

interface IUploadBenefitsFormFieldsProps {
  contentFile: File;
  docType: string;
  fileNumber: IErrorableInput;
  source: string;
  veteranFirstName: IErrorableInput;
  veteranLastName: IErrorableInput;
  zipCode: IErrorableInput;
  updateContentFile: (value: File) => void;
  updateVeteranFirstName: (value: IErrorableInput) => void;
  updateVeteranLastName: (value: IErrorableInput) => void;
  updateFileNumber: (oldValidation?: string) => (value: IErrorableInput) => void;
  updateZipCode: (oldValidation?: string) => (value: IErrorableInput) => void;
}

const mapStateToProps = (state: IRootState) => {
  return {
    contentFile: state.uploadBenefits.inputs.contentFile,
    docType: state.uploadBenefits.inputs.docType,
    fileNumber: state.uploadBenefits.inputs.fileNumber,
    source: state.uploadBenefits.inputs.source,
    veteranFirstName: state.uploadBenefits.inputs.veteranFirstName,
    veteranLastName: state.uploadBenefits.inputs.veteranLastName,
    zipCode: state.uploadBenefits.inputs.zipCode,
  };
};

type UploadBenefitsFormFieldsDispatch = ThunkDispatch<
  IRootState,
  undefined,
  actions.UpdateBenefitsAction
>;

const mapDispatchToProps = (dispatch: UploadBenefitsFormFieldsDispatch) => {
  return {
    updateContentFile: (value: File) => {
      dispatch(actions.updateBenefitsContentFile(value));
    },
    updateFileNumber: (oldValidation?: string) => {
      return (value: IErrorableInput) => {
        dispatch(actions.updateBenefitsFileNumber(value, oldValidation));
      };
    },
    updateVeteranFirstName: (value: IErrorableInput) => {
      dispatch(actions.updateBenefitsVeteranFirstName(value));
    },
    updateVeteranLastName: (value: IErrorableInput) => {
      dispatch(actions.updateBenefitsVeteranLastName(value));
    },
    updateZipCode: (oldValidation?: string) => {
      return (value: IErrorableInput) => {
        dispatch(actions.updateBenefitsZipCode(value, oldValidation));
      };
    },
  };
};

const getRequiredSpan = (props: IUploadBenefitsFormFieldsProps) => {
  const { contentFile } = props;
  let requiredSpan;
  if (contentFile.lastModified === -1) {
    requiredSpan = (
      <span className="usa-input-error-message undefined" role="alert">
        <span className="sr-only">Error</span>
        PDF document is required.
      </span>
    );
  }
  return requiredSpan;
};

class UploadBenefitsFormFields extends React.Component<IUploadBenefitsFormFieldsProps> {
  constructor(props: IUploadBenefitsFormFieldsProps) {
    super(props);
    this.handleChangeContentFile = this.handleChangeContentFile.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <div>Click to select the file from your device.</div>
        <div className="feature">
          <h4>Click to select files for upload.</h4>
          <div className={classNames('usa-input')}>
            {getRequiredSpan(this.props)}
            <label
              role="button"
              tabIndex={0}
              htmlFor="file-input-pdf"
              className={classNames('usa-button usa-button-primary')}
            >
              <span>
                Select file to upload <i className={classNames('fa fa-plus fa-xs')} />
              </span>
            </label>
            <input
              type="file"
              multiple={false}
              style={{ display: 'none' }}
              accept="application/pdf"
              id="file-input-pdf"
              name="contentFile"
              onChange={this.handleChangeContentFile}
            />
          </div>
        </div>
        <div className={classNames('usa-form-small')}>
          <ErrorableTextInput
            label="First name"
            placeholder="Type First name"
            field={this.props.veteranFirstName}
            onValueChange={this.props.updateVeteranFirstName}
            required={true}
          />

          <ErrorableTextInput
            label="Last name"
            placeholder="Type Last name"
            field={this.props.veteranLastName}
            onValueChange={this.props.updateVeteranLastName}
            required={true}
          />

          <ErrorableTextInput
            errorMessage={this.props.fileNumber.validation}
            label="Social Security Number"
            placeholder="###-##-####"
            field={this.props.fileNumber}
            onValueChange={this.props.updateFileNumber(this.props.fileNumber.validation)}
            required={true}
            minLength={9}
            maxLength={11}
          />

          <ErrorableTextInput
            errorMessage={this.props.zipCode.validation}
            label="Postal Code"
            placeholder="Type Postal Code"
            field={this.props.zipCode}
            onValueChange={this.props.updateZipCode(this.props.zipCode.validation)}
            required={true}
            minLength={5}
            maxLength={10}
          />

          <input
            type="hidden"
            name="docType"
            autoComplete="off"
            defaultValue={this.props.docType}
          />
          <br />
          <input type="hidden" name="source" autoComplete="off" defaultValue={this.props.source} />
        </div>
      </React.Fragment>
    );
  }
  private handleChangeContentFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event && event.target && event.target.files) {
      this.props.updateContentFile(event.target.files[0]);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadBenefitsFormFields);
