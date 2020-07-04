import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { SignupVerificationRender } from './signup-verification.render';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signupVerifyCode$ } from './signin-signup.service';
import { SignupVerificationForm } from 'app/models';
import { useHistory, useLocation } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { Location } from 'history';
import { SignInSignUpLocationState } from '.';
import { FormSubmitCallback } from 'app/shared';

export interface SignupVerificationProps {}

const buildFormControls = (formData: SignupVerificationForm, onSubmit: FormSubmitCallback<SignupVerificationForm>) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            verificationCode: Yup.string().required('Verification Code is Required')
        }),
        onSubmit
    };
};

export const SignupVerification: FunctionComponent<SignupVerificationProps> = (props): ReactElement => {
    const history = useHistory();
    const pageLayoutContext = useContext(PageLayoutContext);

    const location: Location<SignInSignUpLocationState> = useLocation();

    let email = '';
    if (location.state) {
        email = location.state.email;
    }

    const handleSubmit: FormSubmitCallback<SignupVerificationForm> = (values: SignupVerificationForm): void => {
        signupVerifyCode$(values.email, values.verificationCode).subscribe(({ payload, error }) => {
            const { openSnackbar } = pageLayoutContext;
            if (error) {
                openSnackbar({ severity: 'error', message: error.message });
            } else {
                openSnackbar({ severity: 'success', message: 'Success! Please sign in.' });
                history.push('/signin');
            }
        });
    };

    const formData = new SignupVerificationForm({ email, verificationCode: '' });
    const controls = useFormik(buildFormControls(formData, handleSubmit));

    return (
        <SignupVerificationRender
            {...{
                email: { name: 'email', disabled: true },
                verificationCode: { name: 'verificationCode' },
                controls
            }}
        />
    );
};
