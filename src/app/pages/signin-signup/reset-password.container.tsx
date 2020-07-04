import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { ResetPasswordRender } from './reset-password.render';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resetPassword$ } from './signin-signup.service';
import { ResetPasswordForm } from 'app/models';
import { useHistory, useLocation } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { Location } from 'history';
import { SignInSignUpLocationState } from '.';
import { FormSubmitCallback } from 'app/shared';

export interface ResetPasswordProps {}

const buildFormControls = (formData: ResetPasswordForm, onSubmit: FormSubmitCallback<ResetPasswordForm>) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email is Required'),
            confirmationCode: Yup.string().required('Code is Required'),
            newPassword: Yup.string().required('Password is Required')
        }),
        onSubmit
    };
};

export const ResetPassword: FunctionComponent<ResetPasswordProps> = (props): ReactElement => {
    const history = useHistory();
    const pageLayoutContext = useContext(PageLayoutContext);

    const location: Location<SignInSignUpLocationState> = useLocation();

    let email = '';
    if (location.state) {
        email = location.state.email;
    }

    const handleSubmit: FormSubmitCallback<ResetPasswordForm> = (values: ResetPasswordForm): void => {
        resetPassword$(values.email, values.confirmationCode, values.newPassword).subscribe(({ payload, error }) => {
            const { openSnackbar } = pageLayoutContext;
            if (error) {
                openSnackbar({ severity: 'error', message: error.message });
            } else {
                openSnackbar({ severity: 'success', message: 'Success! Please sign in.' });
                history.push('/signin');
            }
        });
    };

    const formData = new ResetPasswordForm({ email, confirmationCode: '', newPassword: '' });
    const controls = useFormik(buildFormControls(formData, handleSubmit));

    return (
        <ResetPasswordRender
            {...{
                email: { name: 'email', disabled: true, autoComplete: 'on' },
                confirmationCode: { name: 'confirmationCode' },
                newPassword: { name: 'newPassword', type: 'password' },
                controls
            }}
        />
    );
};
