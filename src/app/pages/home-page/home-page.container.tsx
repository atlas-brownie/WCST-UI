import React, { FunctionComponent, ReactElement } from 'react';
import { HomePageRender, HomePageRenderProps } from './home-page.render';
import { Home } from 'app/models';
// import { createAPost$ } from 'app/pages/home-page/home.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/app.service';
import { User } from 'app/shared';

export interface HomePageProps {}

const buildFormControls = (formData: Home, onSubmit: any) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            //mockProperty: Yup.string().required('mockProperty is Required')
        }),
        onSubmit
    };
};

export const HomePage: FunctionComponent<HomePageProps> = (props): ReactElement => {
    // TODO: add to starters - get current user or load public pete
    const user = useSelector(selectUser) || new User({ firstName: 'Pete', roles: ['PUBLIC'] });
    let homeMessage = 'Welcome to the WCST Project React applicaton';

    if (user.hasRole('AUTHENTICATED_USER|SUPERVISOR')) {
        homeMessage = `${homeMessage}, ${user.firstName}!`;
    } else {
        homeMessage = `${homeMessage}. You can sign in or sign up.`;
    }

    const HomeForm = new Home({
        //mockProperty: ''
    });

    const handleSubmit: Function = (values: Home) => {
        console.log('HomeForm values=', values);
        // create a POST service
        // createAPost$(values).subscribe(({ payload, error }) => {
        //    console.log('payload', payload);
        //    console.log('error', error);
        // });
    };

    const controls = useFormik(buildFormControls(HomeForm, handleSubmit));

    const definitions: HomePageRenderProps = {
        controls,
        homeMessage
        //mockProperty: { name: 'mockProperty', label: 'mockLabel', required: false },
    };

    return <HomePageRender {...definitions} />;
};
