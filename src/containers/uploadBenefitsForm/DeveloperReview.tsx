import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

import classNames from 'classnames';

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

class DeveloperReview extends React.Component<IDeveloperInfoProps> {
  public render() {
    return (
      <React.Fragment>
        <div>Confirm the information below is correct, then submit your form to the VA.</div>
        <div className={classNames('usa-form-small')}>
          <label className={classNames('vads-u-color--gray-light')}>Uploaded File</label>
          <input
            value={'Content.pdf'}
            disabled={true}
            className={classNames('vads-u-background-color--gray-lighter')}
          />

          <label className={classNames('vads-u-color--gray-light')}>First name</label>
          <input
            value={this.props.veteranFirstName.value}
            disabled={true}
            className={classNames('vads-u-background-color--gray-lighter')}
          />

          <label className={classNames('vads-u-color--gray-light')}>Last name</label>
          <input
            value={this.props.veteranLastName.value}
            disabled={true}
            className={classNames('vads-u-background-color--gray-lighter')}
          />

          <label className={classNames('vads-u-color--gray-light')}>Social Security Number</label>
          <input
            value={this.props.fileNumber.value}
            disabled={true}
            className={classNames('vads-u-background-color--gray-lighter')}
          />

          <label className={classNames('vads-u-color--gray-light')}>Postal Code</label>
          <input
            value={this.props.zipCode.value}
            disabled={true}
            className={classNames('vads-u-background-color--gray-lighter')}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperReview);
