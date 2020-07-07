import classNames from 'classnames';
import * as React from 'react';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import './SubmissionForm.scss';

interface ISubmissionSuccessFormState {
  code: string;
}

class SubmissionSuccessForm extends React.Component<{}, ISubmissionSuccessFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      code: 'cx901vP7',
    };
  }

  public render() {
    const submitBtnText = '<< Submit Another Form';

    return (
      <div className="vads-l-grid-container large-screen:vads-u-padding-x--0">
        <div className="vads-l-row vads-u-margin-x--neg2p5">
          <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--8">
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
                headline="Success alert"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id felis pulvinar ligula ultricies sollicitudin eget nec dui. Cras augue velit, pellentesque sit amet nisl ut, tristique suscipit sem. Cras sollicitudin auctor mattis."
                status="success"
              />

              <br />

              <div className="message">
                Congratulations, your form has been successfully submitted to the VA for processing.
                You can use the confirmation code below to check the status of your submission at
                any time in the future.
              </div>
            </div>

            <div className="feature">
              <h3>Confirmation Code</h3>
              <h1>{this.state.code}</h1>
            </div>

            <button className="usa-button-secondary">{submitBtnText}</button>

            <br />
          </div>
          <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--4" />
        </div>
      </div>
    );
  }
}

export default SubmissionSuccessForm;
