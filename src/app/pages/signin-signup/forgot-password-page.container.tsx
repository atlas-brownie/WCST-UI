import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { ForgotPasswordPageRender } from './forgot-password-page.render';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getForgotPasswordCode$ } from './signin-signup.service';
import { ForgotPasswordForm } from 'app/models';
import { useHistory } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { SignInSignUpLocationState } from '.';
import { FormSubmitCallback } from 'app/shared';

export interface ForgotPasswordPageProps {}

const buildFormControls = (formData: ForgotPasswordForm, onSubmit: FormSubmitCallback<ForgotPasswordForm>) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email is Required')
        }),
        onSubmit
    };
};

export const ForgotPasswordPage: FunctionComponent<ForgotPasswordPageProps> = (props): ReactElement => {
    const history = useHistory();
    const pageLayoutContext = useContext(PageLayoutContext);

    const handleSubmit: FormSubmitCallback<ForgotPasswordForm> = (values: ForgotPasswordForm): void => {
        getForgotPasswordCode$(values.email).subscribe(({ payload, error }) => {
            const { openSnackbar } = pageLayoutContext;
            if (error) {
                openSnackbar({ severity: 'error', message: error.message });
            } else {
                openSnackbar({ severity: 'success', message: 'Success! Check email for confirmation code!' });
                history.push('/reset-password', { email: values.email } as SignInSignUpLocationState);
            }
        });
    };

    const formData = new ForgotPasswordForm({ email: '' });
    const controls = useFormik(buildFormControls(formData, handleSubmit));

    return <ForgotPasswordPageRender {...{ email: { name: 'email', autoComplete: 'on' }, controls }} />;
};
