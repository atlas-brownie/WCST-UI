import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';

import AdditionalInfo from '@department-of-veterans-affairs/formation-react/AdditionalInfo';
import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import { Link } from 'react-router-dom';
import { IRootState, IUploadBenefitsResponsePayload } from '../../../src/types';

import copy from 'copy-to-clipboard';
import { isEmpty } from 'lodash';
import { Redirect } from 'react-router-dom';

export interface IUploadBenefitsFormSuccessProps extends IUploadBenefitsResponsePayload {
  isRedirectUploadBenefitsForm: boolean;
}

const mapStateToProps = (state: IRootState) => {
  return {
    isRedirectUploadBenefitsForm: isEmpty(state.uploadBenefits.result?.trackingCode),
    ...(state.uploadBenefits.result || {
      trackingCode: 'No Confirmation Code Available',
      vaTrackingCode: 'No Tracking ID Available',
    }),
  };
};

class UploadBenefitsFormSuccess extends React.Component<IUploadBenefitsFormSuccessProps> {
  public render() {
    if (this.props.isRedirectUploadBenefitsForm) {
      return <Redirect to="/upload-benefits-form" />;
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
                  <h2>Widget Claim</h2>
                  <span className={classNames('vads-u-margin-x--4')}>Form T4NG</span>
                </div>
                <div
                  className={classNames(
                    'vads-u-display--flex',
                    'vads-u-flex-direction--row',
                    'vads-u-align-items--center',
                    'vads-u-flex-wrap--nowrap',
                    'vads-u-margin-y--2',
                  )}
                >
                  <div
                    className={classNames(
                      'progress-segment',
                      'progress-segment-complete',
                      'vads-u-padding-y--0p5',
                    )}
                  />
                  <div
                    className={classNames(
                      'progress-segment',
                      'progress-segment-complete',
                      'vads-u-padding-y--0p5',
                    )}
                  />
                </div>
                <div
                  className={classNames(
                    'vads-u-display--flex',
                    'vads-u-flex-direction--row',
                    'vads-u-align-items--center',
                    'vads-u-flex-wrap--nowrap',
                    'vads-u-margin-y--2',
                    'no-print',
                  )}
                >
                  <div className="fa-stack">
                    <i
                      className={classNames(
                        'fa',
                        'fa-circle',
                        'fa-stack-2x',
                        'vads-u-color--primary',
                        'vads-u-padding-x--0',
                      )}
                    />
                    <strong className={classNames('fa-stack-1x', 'vads-u-color--white')}>2</strong>
                  </div>
                  <div>of 2</div>
                  <h4 className={classNames('vads-u-margin-x--1', 'vads-u-margin-y--0')}>
                    Submit to the VA
                  </h4>
                </div>
              </div>

              <div className={classNames('message-container', 'no-print')}>
                <AlertBox
                  headline="Form submitted successfully"
                  content="Your form has been submitted to the VA."
                  status="success"
                />

                <br />

                <div className="vads-u-margin-left--4">
                  Congratulations, your form has been successfully submitted to the VA for
                  processing. You can use the confirmation code below to&nbsp;
                  <Link to="/check-benefits-status">check the status</Link> of your submission at
                  any time in the future.
                </div>
              </div>

              <div className="feature">
                <h3>Confirmation Code</h3>
                <h1>{this.props.trackingCode || this.props.vaTrackingCode}</h1>

                <AdditionalInfo triggerText="Additional Information">
                  <div>
                    <div>{this.props.vaTrackingCode}</div>
                    <div>
                      Use the Widget Claim PDF form (Form T4NG) ID/Tracking ID to refer to your form
                      submission and document upload when contacting the VA. This longer identifier
                      is used to track your submission in VA systems. It might be called a "guid" or
                      "uuid" by VA personnel.
                    </div>

                    <button
                      className={classNames('usa-button', 'usa-button-secondary')}
                      onClick={copy.bind(null, this.props.vaTrackingCode)}
                    >
                      <span
                        className={classNames(
                          'vads-u-display--flex',
                          'vads-u-align-items--center',
                          'vads-u-flex-wrap--nowrap',
                        )}
                      >
                        <i className={classNames('fa', 'fa-paste')} />
                        <span className={classNames('vads-u-margin-x--2')}>Copy VA ID</span>
                      </span>
                    </button>
                  </div>
                </AdditionalInfo>

                <br />

                <button
                  className={classNames('usa-button', 'usa-button-secondary')}
                  onClick={copy.bind(null, this.props.trackingCode)}
                >
                  <span
                    className={classNames(
                      'vads-u-display--flex',
                      'vads-u-align-items--center',
                      'vads-u-flex-wrap--nowrap',
                    )}
                  >
                    <i className={classNames('fa', 'fa-paste')} />
                    <span className={classNames('vads-u-margin-x--2')}>Copy Confirmation Code</span>
                  </span>
                </button>
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
                    to="/upload-benefits-form"
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
                      <span className={classNames('vads-u-margin-x--2')}>Submit Another Form</span>
                    </span>
                  </Link>
                  <button
                    className={classNames('usa-button', 'usa-button-primary')}
                    onClick={window.print}
                  >
                    Print Confirmation Code
                  </button>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(UploadBenefitsFormSuccess);
