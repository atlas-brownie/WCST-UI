import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { SignupPageRender } from './signup-page.render';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp$ } from './signin-signup.service';
import { SignupForm } from 'app/models';
import { useHistory } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { SignInSignUpLocationState } from '.';
import { FormSubmitCallback } from 'app/shared';

export interface SignupPageProps {}

const buildFormControls = (formData: SignupForm, onSubmit: FormSubmitCallback<SignupForm>) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email is Required'),
            password: Yup.string().required('Password is Required'),
            confirmPassword: Yup.string().required('Confirm Password is Required')
        }),
        onSubmit
    };
};

export const SignupPage: FunctionComponent<SignupPageProps> = (props): ReactElement => {
    const history = useHistory();
    const pageLayoutContext = useContext(PageLayoutContext);

    const handleSubmit: FormSubmitCallback<SignupForm> = (values: SignupForm): void => {
        signUp$(values.email, values.password).subscribe(({ payload, error }) => {
            const { openSnackbar } = pageLayoutContext;
            if (error) {
                openSnackbar({ severity: 'error', message: error.message });
            } else {
                openSnackbar({ severity: 'success', message: 'Success! Look for verification code in your email account.' });
                history.push('/signup-verification', { email: values.email } as SignInSignUpLocationState);
            }
        });
    };

    const signupForm = new SignupForm({ email: '', password: '', confirmPassword: '' });
    const controls = useFormik(buildFormControls(signupForm, handleSubmit));

    return (
        <SignupPageRender
            {...{
                email: { name: 'email', required: true, autoComplete: 'on' },
                password: { name: 'password', type: 'password', required: true },
                confirmPassword: { name: 'confirmPassword', type: 'password', required: true },
                controls
            }}
        />
    );
};
