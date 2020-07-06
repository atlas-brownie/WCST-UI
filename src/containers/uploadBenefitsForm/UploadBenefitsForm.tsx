import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../../actions';
import { history } from '../../store';
import { IBenefits, IErrorableInput, IRootState } from '../../types';
import DeveloperInfo from './DeveloperInfo';

interface IBenefitsProps extends IBenefits {
  submitForm: () => void;
  toggleAcceptTos: () => void;
  updateDescription: (value: IErrorableInput) => void;
}

type BenefitsDispatch = ThunkDispatch<
  IRootState,
  undefined,
  actions.SubmitFormAction | actions.UpdateApplicationAction
>;

const mapDispatchToProps = (dispatch: BenefitsDispatch) => {
  return {
    submitForm: () => {
      dispatch(actions.submitForm());
    },
    toggleAcceptTos: () => {
      dispatch(actions.toggleAcceptTos());
    },
    updateDescription: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationDescription(value));
    },
  };
};

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.uploadBenefits,
  };
};

class UploadBenefitsForm extends React.Component<IBenefitsProps> {
  constructor(props: IBenefitsProps) {
    super(props);
  }

  public render() {
    const { ...props } = this.props;
    const applyClasses = classNames('vads-l-grid-container', 'vads-u-padding--4');

    return (
      <div role="region" aria-labelledby="apply-header" className={applyClasses}>
        {/* <ApplyHeader /> */}

        <div
          className={classNames(
            'vads-l-col--12',
            'medium-screen:vads-l-col--8',
            'vads-u-padding-x--2p5',
            'vads-u-margin-x--4',
          )}
        >
          <div className="vads-l-row">
            <form>
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
                <div className={classNames('progress-segment', 'vads-u-padding-y--0p5')} />
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
                  <strong className={classNames('fa-stack-1x', 'vads-u-color--white')}>1</strong>
                </div>
                <div>of 2</div>
                <h4 className={classNames('vads-u-margin-x--1', 'vads-u-margin-y--0')}>
                  Upload Form
                </h4>
              </div>
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
              <DeveloperInfo />
              <div
                className={classNames(
                  'vads-u-display--flex',
                  'vads-u-flex-wrap--nowrap',

                  'vads-u-margin-y--2',
                )}
              >
                <div className={classNames('va-api-nav-secondary')}>
                  <Link to="/" className={classNames('usa-button', 'usa-button-secondary')}>
                    <span
                      className={classNames(
                        'vads-u-display--flex',
                        'vads-u-align-items--center',
                        'vads-u-flex-wrap--nowrap',
                      )}
                    >
                      <i className={classNames('fa', 'fa-angle-double-left')} />
                      <span className={classNames('vads-u-margin-x--2')}>Back</span>
                    </span>
                  </Link>
                </div>
                <ProgressButton
                  buttonText={
                    props.sending ? (
                      'Sending...'
                    ) : (
                      <span
                        className={classNames(
                          'vads-u-display--flex',
                          'vads-u-align-items--center',
                          'vads-u-flex-wrap--nowrap',
                        )}
                      >
                        Continue
                        <i
                          className={classNames(
                            'fa',
                            'fa-angle-double-right',
                            'vads-u-margin-x--2',
                          )}
                        />
                      </span>
                    )
                  }
                  disabled={!this.readyToSubmit() || props.sending}
                  onButtonClick={(evt: MouseEvent) => {
                    evt.preventDefault();
                    console.log('clicked button');
                    history.push('/review-benefits-form');
                  }}
                  buttonClass="usa-button-primary"
                />
              </div>
            </form>
            {this.renderError()}
          </div>
          <div
            className={classNames(
              'vads-l-col--12',
              'medium-screen:vads-l-col--4',
              'vads-u-padding-x--2p5',
            )}
          />
        </div>
      </div>
    );
  }

  private renderError() {
    const assistanceTrailer = (
      <span>
        Do you want assistance? Create an issue through our <Link to="/support">Support page</Link>
      </span>
    );

    if (this.props.errorStatus) {
      return (
        <AlertBox
          status="error"
          headline={'We encountered a server error while saving your form. Please try again later.'}
          content={assistanceTrailer}
        />
      );
    }
    return null;
  }

  private allFieldsComplete() {
    const fieldNames = ['fileNumber', 'veteranFirstName', 'veteranLastName', 'zipCode'];
    const incompleteFields = fieldNames.filter(fieldName => {
      return !this.props.inputs[fieldName].value;
    });
    return incompleteFields.length === 0;
  }

  private readyToSubmit() {
    const {
      inputs: { contentFile, fileNumber },
    } = this.props;

    console.log('readyToSubmit contentFile.lastModified=', contentFile.lastModified);
    const fileNumberComplete = fileNumber.value.length !== 0 && fileNumber.validation === undefined;
    const contentFileComplete = contentFile.lastModified !== -1;

    return this.allFieldsComplete() && fileNumberComplete && contentFileComplete;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadBenefitsForm);
