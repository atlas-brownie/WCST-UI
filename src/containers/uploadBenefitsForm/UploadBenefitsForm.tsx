import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
// import ErrorableCheckbox from '@department-of-veterans-affairs/formation-react/ErrorableCheckbox';
// import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../../actions';
// import { includesOauthAPI } from '../../apiDefs/query';
import { IBenefits, IErrorableInput, IRootState } from '../../types';
// import { APPLY_FIELDS_TO_URL_FRAGMENTS } from '../../types/constants';
import ApplyHeader from './ApplyHeader';
import DeveloperInfo from './DeveloperInfo';
// import OAuthAppInfo from './OAuthAppInfo';
// import SelectedApis from './SelectedApis';

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
        <ApplyHeader />
        <div className="vads-l-row">
          <div
            className={classNames(
              'vads-l-col--12',
              'medium-screen:vads-l-col--8',
              'vads-u-padding-x--2p5',
            )}
          >
            <form className="usa-form">
              <h2>Application</h2>
              <DeveloperInfo />
              <ProgressButton
                buttonText={props.sending ? 'Sending...' : 'Submit'}
                disabled={!this.readyToSubmit() || props.sending}
                onButtonClick={props.submitForm}
                buttonClass="usa-button-primary"
              />
            </form>
            {this.renderError()}
          </div>
          <div
            className={classNames(
              'vads-l-col--12',
              'medium-screen:vads-l-col--4',
              'vads-u-padding-x--2p5',
            )}
          >
            <div className="feature">
              <h3>Stay In Touch</h3>
              <p>
                Want to get news and updates about VA API Program? Sign up to receive email updates.
              </p>
              <a
                className="usa-button"
                href="https://public.govdelivery.com/accounts/USVAOIT/subscriber/new?topic_id=USVAOIT_20"
              >
                Sign Up
              </a>
            </div>
          </div>
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

  // private selectedApis() {
  //   const apis = this.props.inputs.apis;
  //   return Object.keys(apis).filter(apiName => apis[apiName]);
  // }

  // private anyOAuthApisSelected() {
  //   const apiIdsByField = this.selectedApis().flatMap(
  //     formField => APPLY_FIELDS_TO_URL_FRAGMENTS[formField],
  //   );
  //   return includesOauthAPI(apiIdsByField);
  // }

  // private anyApiSelected() {
  //   const numSelected = this.selectedApis().length;
  //   return numSelected > 0;
  // }

  private allBioFieldsComplete() {
    const bioFieldNames = ['fileNumber', 'veteranFirstName', 'veteranLastName', 'zipCode'];
    const incompleteFields = bioFieldNames.filter(fieldName => {
      return !this.props.inputs[fieldName].value;
    });
    return incompleteFields.length === 0;
  }

  private readyToSubmit() {
    // const {
    //   inputs: { oAuthApplicationType, oAuthRedirectURI, termsOfService },
    // } = this.props;
    // let applicationTypeComplete = true;
    // let redirectURIComplete = true;
    // if (this.anyOAuthApisSelected()) {
    //   applicationTypeComplete = oAuthApplicationType.value.length !== 0;
    //   redirectURIComplete =
    //     oAuthRedirectURI.value.length !== 0 && oAuthRedirectURI.validation === undefined;
    // }
    return this.allBioFieldsComplete();
    // this.anyApiSelected() &&
    // termsOfService &&
    // applicationTypeComplete &&
    // redirectURIComplete
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadBenefitsForm);
