import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../../actions';
import { IBenefitsStatus, IRootState } from '../../types';
import BenefitsStatusFormFields from './BenefitsStatusFormFields';

interface IBenefitsStatusProps extends IBenefitsStatus {
  submitForm: () => void;
  // toggleAcceptTos: () => void;
  // updateDescription: (value: IErrorableInput) => void;
}

type BenefitsStatusDispatch = ThunkDispatch<
  IRootState,
  undefined,
  actions.SubmitFormAction | actions.UpdateApplicationAction
>;

const mapDispatchToProps = (dispatch: BenefitsStatusDispatch) => {
  return {
    submitForm: () => {
      dispatch(actions.submitBenefitsStatusForm());
    },
  };
};

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.benefitsStatus,
  };
};

class BenefitsStatusForm extends React.Component<IBenefitsStatusProps> {
  constructor(props: IBenefitsStatusProps) {
    super(props);
  }

  public render() {
    const { ...props } = this.props;
    return (
      <div role="region" aria-labelledby="benefits-header">
        {/* <ApplyHeader /> */}

        <div className={classNames('medium-screen:vads-l-col--12', 'vads-u-padding-x--2p5')}>
          <div className="vads-l-row">
            <form
              className={classNames(
                'vads-u-margin-x--auto',
                'medium-screen:va-api-u-min-width--400',
              )}
            >
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
              <BenefitsStatusFormFields />
              <div
                className={classNames(
                  'vads-u-display--flex',
                  'vads-u-flex-wrap--nowrap',

                  'vads-u-margin-y--2',
                )}
              >
                {/* <div className={classNames('va-api-nav-secondary')}>
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
                </div> */}
                <ProgressButton
                  buttonText={props.sending ? 'Sending...' : <span>Check Status</span>}
                  disabled={!this.readyToSubmit() || props.sending}
                  onButtonClick={(evt: MouseEvent) => {
                    evt.preventDefault();
                    props.submitForm();
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
    const fieldNames = ['confirmationCode'];
    const incompleteFields = fieldNames.filter(fieldName => {
      return !this.props.inputs[fieldName].value;
    });
    return incompleteFields.length === 0;
  }

  private readyToSubmit() {
    console.log('readyToSubmit this.props=', this.props);
    return this.allFieldsComplete();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BenefitsStatusForm);
