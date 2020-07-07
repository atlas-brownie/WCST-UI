import classNames from 'classnames';
import * as React from 'react';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import { Link } from 'react-router-dom';

interface IUploadBenefitsFormSuccessState {
  code: string;
}

class UploadBenefitsFormSuccess extends React.Component<{}, IUploadBenefitsFormSuccessState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      code: 'cx901vP7',
    };
  }

  public render() {
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

            <div className="message-container">
              <AlertBox
                headline="Form submitted successfully"
                content="Your form has been submitted to the VA."
                status="success"
              />

              <br />

              <div className="vads-u-margin-left--4">
                Congratulations, your form has been successfully submitted to the VA for processing.
                You can use the confirmation code below to check the status of your submission at
                any time in the future.
              </div>
            </div>

            <div className="feature">
              <h3>Confirmation Code</h3>
              <h1>{this.state.code}</h1>
            </div>

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
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadBenefitsFormSuccess;
