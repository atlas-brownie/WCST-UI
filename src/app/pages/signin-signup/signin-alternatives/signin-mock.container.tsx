import React, { FunctionComponent, ReactElement, useContext, useState, useEffect } from 'react';
import { SigninMockRender } from './signin-mock.render';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SigninForm } from 'app/models';
import { getMockUsers$, getMockSelectOptions, SigninPageProps, credentialsSlice } from 'app/pages/signin-signup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { FormSubmitCallback, User } from 'app/shared';
import { userSlice } from 'app/app.service';

const buildFormControls = (formData: SigninForm, onSubmit: FormSubmitCallback<SigninForm>) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            email: Yup.string().required('Email is Required')
        }),
        onSubmit
    };
};

export const SigninMock: FunctionComponent<SigninPageProps> = (props): ReactElement => {
    const [mockUserList, setMockUserList] = useState<User[]>([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const pageLayoutContext = useContext(PageLayoutContext);

    useEffect(() => {
        if (mockUserList.length === 0) {
            getMockUsers$().subscribe(({ payload }) => {
                setMockUserList(payload);
            });
        }
    }, [mockUserList]);

    const handleSubmit: FormSubmitCallback<SigninForm> = (values: SigninForm): void => {
        const user = mockUserList.filter((user) => {
            return user.email === values.email;
        })[0];

        dispatch(userSlice.actions.changeUser(user));
        dispatch(credentialsSlice.actions.setCredentials([user]));

        const { openSnackbar } = pageLayoutContext;
        openSnackbar({ severity: 'success', message: 'Successful login! Loading applications now!' });

        window.setTimeout(() => {
            if (user.hasRole('SUPERVISOR')) {
                history.replace('/supervisor-review-page');
            } else if (user.hasRole('AUTHENTICATED_USER')) {
                history.replace('/applicant-page');
            } else {
                history.replace('/');
            }
        }, 500);
    };

    const signinForm = new SigninForm({ email: '', password: '' });
    const controls = useFormik(buildFormControls(signinForm, handleSubmit));

    return (
        <SigninMockRender
            {...{
                email: {
                    name: 'email',
                    required: true,
                    menuitems: getMockSelectOptions(mockUserList)
                },
                password: { name: 'password', type: 'password', disabled: true },
                controls
            }}
        />
    );
};
