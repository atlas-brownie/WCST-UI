import * as React from 'react';
import { connect } from 'react-redux';

import { IErrorableInput, IRootState } from '../../types';

import classNames from 'classnames';

interface IDeveloperReviewProps {
  docType: string;
  fileNumber: IErrorableInput;
  source: string;
  veteranFirstName: IErrorableInput;
  veteranLastName: IErrorableInput;
  zipCode: IErrorableInput;
}

const mapStateToProps = (state: IRootState) => {
  return {
    docType: state.uploadBenefits.inputs.docType,
    fileNumber: state.uploadBenefits.inputs.fileNumber,
    source: state.uploadBenefits.inputs.source,
    veteranFirstName: state.uploadBenefits.inputs.veteranFirstName,
    veteranLastName: state.uploadBenefits.inputs.veteranLastName,
    zipCode: state.uploadBenefits.inputs.zipCode,
  };
};

class DeveloperReview extends React.Component<IDeveloperReviewProps> {
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

export default connect(mapStateToProps)(DeveloperReview);
