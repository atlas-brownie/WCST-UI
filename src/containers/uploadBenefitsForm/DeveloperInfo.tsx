import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

import classNames from 'classnames';

interface IDeveloperInfoProps {
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
  updateZipCode: (value: IErrorableInput) => void;
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

type DeveloperInfoDispatch = ThunkDispatch<IRootState, undefined, actions.UpdateBenefitsAction>;

const mapDispatchToProps = (dispatch: DeveloperInfoDispatch) => {
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
    updateZipCode: (value: IErrorableInput) => {
      dispatch(actions.updateBenefitsZipCode(value));
    },
  };
};

class DeveloperInfo extends React.Component<IDeveloperInfoProps> {
  constructor(props: IDeveloperInfoProps) {
    super(props);
    this.handleChangeContentFile = this.handleChangeContentFile.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <div>Click to select the file from your device.</div>
        <div className="feature">
          <h4>Drag and drop files here, or click to select files for upload.</h4>
          <div className={classNames('usa-input')}>
            {/* <span
              className="usa-input-message undefined"
              role="alert"
              id="file-input-149-error-message"
            >
              <span className="sr-only">Error</span>
              PDF document is required.
            </span> */}
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
              name="Name"
              onChange={this.handleChangeContentFile}
            />
          </div>
        </div>
        <div className={classNames('usa-form-small')}>
          <ErrorableTextInput
            label="First name"
            field={this.props.veteranFirstName}
            onValueChange={this.props.updateVeteranFirstName}
            required={true}
          />

          <ErrorableTextInput
            label="Last name"
            field={this.props.veteranLastName}
            onValueChange={this.props.updateVeteranLastName}
            required={true}
          />

          <ErrorableTextInput
            errorMessage={this.props.fileNumber.validation}
            label="Social Security Number"
            field={this.props.fileNumber}
            onValueChange={this.props.updateFileNumber(this.props.fileNumber.validation)}
            required={true}
            minLength={8}
            maxLength={9}
          />

          <ErrorableTextInput
            label="Postal Code"
            field={this.props.zipCode}
            onValueChange={this.props.updateZipCode}
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

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperInfo);
