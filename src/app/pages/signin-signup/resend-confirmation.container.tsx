import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { ResendConfirmationRender } from './resend-confirmation.render';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resendConfirmationCode$ } from './signin-signup.service';
import { ForgotPasswordForm } from 'app/models';
import { useHistory } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { SignInSignUpLocationState } from '.';
import { FormSubmitCallback } from 'app/shared';

export interface ResendConfirmationProps {}

const buildFormControls = (formData: ForgotPasswordForm, onSubmit: FormSubmitCallback<ForgotPasswordForm>) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email is Required')
        }),
        onSubmit
    };
};

export const ResendConfirmation: FunctionComponent<ResendConfirmationProps> = (props): ReactElement => {
    const history = useHistory();
    const pageLayoutContext = useContext(PageLayoutContext);

    const handleSubmit: FormSubmitCallback<ForgotPasswordForm> = (values: ForgotPasswordForm): void => {
        resendConfirmationCode$(values.email).subscribe(({ payload, error }) => {
            const { openSnackbar } = pageLayoutContext;
            if (error) {
                openSnackbar({ severity: 'error', message: error.message });
            } else {
                openSnackbar({ severity: 'success', message: 'Success! Check email for confirmation code!' });
                history.push('/signup-verification', { email: values.email } as SignInSignUpLocationState);
            }
        });
    };

    const formData = new ForgotPasswordForm({ email: '' });
    const controls = useFormik(buildFormControls(formData, handleSubmit));

    return <ResendConfirmationRender {...{ email: { name: 'email', autoComplete: 'on' }, controls }} />;
};
