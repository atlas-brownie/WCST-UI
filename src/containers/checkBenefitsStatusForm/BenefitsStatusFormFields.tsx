import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

import classNames from 'classnames';

interface IBenefitsStatusFormFieldsProps {
  confirmationCode: IErrorableInput;
  updateBenefitsStatusConfirmationCode: (value: IErrorableInput) => void;
}

const mapStateToProps = (state: IRootState) => {
  return {
    confirmationCode: state.benefitsStatus.inputs.confirmationCode,
  };
};

type BenefitsStatusFormFieldsDispatch = ThunkDispatch<
  IRootState,
  undefined,
  actions.BenefitsStatusAction
>;

const mapDispatchToProps = (dispatch: BenefitsStatusFormFieldsDispatch) => {
  return {
    updateBenefitsStatusConfirmationCode: (value: IErrorableInput) => {
      dispatch(actions.updateBenefitsStatusConfirmationCode(value));
    },
  };
};

class BenefitsStatusFormFields extends React.Component<IBenefitsStatusFormFieldsProps> {
  public render() {
    return (
      <React.Fragment>
        <div>Enter your confirmation code below to check the status of your submission</div>
        <div className={classNames('usa-form-small')}>
          <ErrorableTextInput
            label="Confirmation Code"
            placeholder="Type Confirmation Code"
            field={this.props.confirmationCode}
            onValueChange={this.props.updateBenefitsStatusConfirmationCode}
            required={true}
            minLength={8}
            maxLength={8}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BenefitsStatusFormFields);
