import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../../actions';
import { history } from '../../store';
import { IBenefits, IErrorableInput, IRootState } from '../../types';
import UploadBenefitsFormFields from './UploadBenefitsFormFields';

interface IBenefitsProps extends IBenefits {
  clearErrorMessage: () => void;
  updateDescription: (value: IErrorableInput) => void;
}

type BenefitsDispatch = ThunkDispatch<
  IRootState,
  undefined,
  actions.SubmitBenefitsFormAction | actions.UpdateBenefitsAction
>;

const mapDispatchToProps = (dispatch: BenefitsDispatch) => {
  return {
    clearErrorMessage: () => {
      dispatch(actions.submitBenefitsFormError(null));
    },
  };
};

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.uploadBenefits,
  };
};

class UploadBenefitsForm extends React.Component<IBenefitsProps> {
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
              <fieldset>
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
                <UploadBenefitsFormFields />
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
                      // clear any error message that may have been set for file upload
                      this.props.clearErrorMessage();
                      history.push('/review-benefits-form');
                    }}
                    buttonClass="usa-button-primary"
                  />
                </div>
              </fieldset>
            </form>
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

  private allFieldsComplete() {
    const fieldNames = ['fileNumber', 'veteranFirstName', 'veteranLastName', 'zipCode'];
    const incompleteFields = fieldNames.filter((fieldName) => {
      return !this.props.inputs[fieldName].value;
    });
    return incompleteFields.length === 0;
  }

  private readyToSubmit() {
    const {
      inputs: { contentFile, fileNumber, zipCode },
    } = this.props;

    const fileNumberComplete = fileNumber.value.length !== 0 && fileNumber.validation === undefined;
    const contentFileComplete = contentFile.lastModified !== -1;
    const zipCodeComplete = zipCode.value.length !== 0 && zipCode.validation === undefined;

    return this.allFieldsComplete() && fileNumberComplete && contentFileComplete && zipCodeComplete;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadBenefitsForm);
