import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import { isEmpty } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { IRootState } from '../../../src/types';

interface IBenefitsStatusFormSuccessProps {
  claimStatus: string;
  confirmationCodeValue: string;
  isRedirectCheckBenefitsStatus: boolean;
}

const mapStateToProps = (state: IRootState) => {
  return {
    claimStatus: state.benefitsStatus.result?.claimStatus || 'unknown',
    confirmationCodeValue: state.benefitsStatus.inputs.confirmationCode.value || 'Unknown',
    isRedirectCheckBenefitsStatus: isEmpty(state.benefitsStatus.inputs.confirmationCode.value),
  };
};

class BenefitsStatusFormSuccess extends React.Component<IBenefitsStatusFormSuccessProps> {
  public render() {
    if (this.props.isRedirectCheckBenefitsStatus) {
      return <Redirect to="/check-benefits-status" />;
    } else {
      return (
        <div
          className="vads-l-grid-container vads-u-margin-top--6 vads-u-margin-x--auto"
          style={{ margin: '20px' }}
        >
          <div className="vads-l-row">
            <div className="medium-screen:vads-l-col--8 small-screen:vads-u-padding-left--2 small-screen:vads-l-col--6 va-api-u-margin-y--auto vads-u-margin-x--auto">
              <div className="top-container">
                <div
                  className={classNames(
                    'vads-u-display--flex',
                    'vads-u-align-items--center',
                    'vads-u-flex-wrap--nowrap',
                    'vads-u-margin-y--2',
                  )}
                >
                  <h2>Check the Status of Your Widget Claim Form (T4NG)</h2>
                </div>
              </div>

              <div className="feature">
                <h3>Confirmation Code</h3>
                <h1>{this.props.confirmationCodeValue}</h1>
              </div>

              <div className={classNames('message-container', 'no-print')}>
                <AlertBox
                  headline={
                    <span>
                      <strong>Status:&nbsp;</strong>
                      <span className="text-capitalize">{this.props.claimStatus}</span>
                    </span>
                  }
                  content={this.getClaimStatusDescription()}
                  status="success"
                />
              </div>

              <div
                className={classNames(
                  'vads-u-display--flex',
                  'vads-u-flex-wrap--nowrap',
                  'vads-u-margin-y--2',
                  'no-print',
                )}
              >
                <div className={classNames('va-api-nav-secondary', 'vads-u-margin-y--2')}>
                  <Link
                    to="/check-benefits-status"
                    className={classNames('usa-button', 'usa-button-secondary')}
                  >
                    <span
                      className={classNames(
                        'vads-u-display--flex',
                        'vads-u-align-items--center',
                        'vads-u-flex-wrap--nowrap',
                      )}
                    >
                      <i className={classNames('fa', 'fa-angle-double-left')} />
                      <span className={classNames('vads-u-margin-x--2')}>Check Another Form</span>
                    </span>
                  </Link>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      );
    }
  }

  private getClaimStatusDescription(): string {
    switch (this.props.claimStatus) {
      case 'unknown':
        return 'The status of your claim is unkown at this point in time.';
      case 'error':
        return 'The VA has encountered an error processing your form.  We recommend you re-submit your form';
      case 'received':
        return 'Your form has been received by the VA but is not yet in processing';
      default:
        return 'Your form is complete!';
    }
  }
}

export default connect(mapStateToProps)(BenefitsStatusFormSuccess);
