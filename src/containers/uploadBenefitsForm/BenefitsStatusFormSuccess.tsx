import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import { Link } from 'react-router-dom';
import { IRootState, IUploadBenefitsResponsePayload } from 'src/types';

const mapStateToProps = (state: IRootState) => {
  return {
    ...(state.uploadBenefits.result || { trackingCode: 'No Confirmation Code Available' }),
  };
};

class BenefitsStatusFormSuccess extends React.Component<IUploadBenefitsResponsePayload> {
  public render() {
    console.log('this.props=', this.props);
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
              <h1>{this.props.trackingCode}</h1>
            </div>

            <div className={classNames('message-container', 'no-print')}>
              <AlertBox
                headline="Form submitted successfully"
                content="Your form has been submitted to the VA."
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
              <div className={classNames('va-api-nav-secondary')}>
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

export default connect(mapStateToProps)(BenefitsStatusFormSuccess);
