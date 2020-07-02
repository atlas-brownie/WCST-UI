import React, { FunctionComponent, ReactElement, useContext, useState, useEffect } from 'react';
import { SigninAWSRender } from './signin-aws.render';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SigninForm } from 'app/models';
import { signIn$, credentialsSlice, SigninPageProps, getAWSUsers$ } from 'app/pages/signin-signup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { FormSubmitCallback, User } from 'app/shared';
import { userSlice } from 'app/app.service';

const buildFormControls = (formData: SigninForm, onSubmit: FormSubmitCallback<SigninForm>) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email is Required'),
            password: Yup.string().required('Password is Required')
        }),
        onSubmit
    };
};

export const SigninAWS: FunctionComponent<SigninPageProps> = (props): ReactElement => {
    const [awsUserList, setAWSUserList] = useState<User[]>([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const pageLayoutContext = useContext(PageLayoutContext);

    useEffect(() => {
        if (awsUserList.length === 0) {
            getAWSUsers$().subscribe(({ payload }) => {
                setAWSUserList(payload);
            });
        }
    }, [awsUserList, setAWSUserList]);

    const handleSubmit: FormSubmitCallback<SigninForm> = (values: SigninForm): void => {
        signIn$(values.email, values.password).subscribe(({ payload, error }) => {
            const { openSnackbar } = pageLayoutContext;
            if (error) {
                openSnackbar({ severity: 'error', message: error.message });
                dispatch(credentialsSlice.actions.setCredentials(null));
            } else {
                const user = awsUserList.filter((user) => {
                    return user.email === values.email;
                })[0];

                console.log('SigninAWS user=', user);

                dispatch(userSlice.actions.changeUser(user));
                dispatch(credentialsSlice.actions.setCredentials(payload));

                openSnackbar({ severity: 'success', message: 'Successful login! Loading your tasks now!' });

                window.setTimeout(() => {
                    history.replace('/');
                }, 500);
            }
        });
    };

    const signinForm = new SigninForm({ email: '', password: '' });
    const controls = useFormik(buildFormControls(signinForm, handleSubmit));

    return (
        <SigninAWSRender
            {...{
                email: { name: 'email', required: true, autoComplete: 'on' },
                password: { name: 'password', type: 'password', required: true },
                controls
            }}
        />
    );
};
