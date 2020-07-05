import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

interface IDeveloperInfoProps {
  veteranFirstName: IErrorableInput;
  veteranLastName: IErrorableInput;
  fileNumber: IErrorableInput;
  zipCode: IErrorableInput;
  updateVeteranFirstName: (value: IErrorableInput) => void;
  updateVeteranLastName: (value: IErrorableInput) => void;
  updateFileNumber: (oldValidation?: string) => (value: IErrorableInput) => void;
  updateZipCode: (value: IErrorableInput) => void;
}

const mapStateToProps = (state: IRootState) => {
  return {
    fileNumber: state.uploadBenefits.inputs.fileNumber,
    veteranFirstName: state.uploadBenefits.inputs.veteranFirstName,
    veteranLastName: state.uploadBenefits.inputs.veteranLastName,
    zipCode: state.uploadBenefits.inputs.zipCode,
  };
};

type DeveloperInfoDispatch = ThunkDispatch<IRootState, undefined, actions.UpdateApplicationAction>;

const mapDispatchToProps = (dispatch: DeveloperInfoDispatch) => {
  return {
    updateFileNumber: (oldValidation?: string) => {
      return (value: IErrorableInput) => {
        dispatch(actions.updateApplicationEmail(value, oldValidation));
      };
    },
    updateVeteranFirstName: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationFirstName(value));
    },
    updateVeteranLastName: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationLastName(value));
    },
    updateZipCode: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationOrganization(value));
    },
  };
};

class DeveloperInfo extends React.Component<IDeveloperInfoProps> {
  public render() {
    return (
      <React.Fragment>
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
        />

        <ErrorableTextInput
          label="Postal Code"
          field={this.props.zipCode}
          onValueChange={this.props.updateZipCode}
          required={true}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperInfo);
