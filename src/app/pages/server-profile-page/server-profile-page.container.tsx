import React, { FunctionComponent, ReactElement, useState } from 'react';
import { ServerProfilePageRender, ServerProfilePageRenderProps } from './server-profile-page.render';
import { ServerProfile } from 'app/models';
// import { createAPost$ } from 'app/pages/server-profile-page/server-profile.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getApplicantProfile$ } from 'app/pages/applicant-page/applicant.service';
import { Profile } from 'app/models';
import { User } from 'app/shared';

export interface ServerProfilePageProps {}

const buildFormControls = (formData: ServerProfile, onSubmit: any) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            mockProperty: Yup.string().required('mockProperty is Required')
        }),
        onSubmit
    };
};

export const ServerProfilePage: FunctionComponent<ServerProfilePageProps> = (props): ReactElement => {
    const [profile, setProfile] = useState(new Profile(Profile.default));
    const ServerProfileForm = new ServerProfile({
        mockProperty: ''
    });

    if (profile.id === Profile.default.id) {
        const fakeUser = new User({ id: '1VWAS7A3XFC582340' });
        getApplicantProfile$(fakeUser).subscribe(({ payload }) => {
            console.log('payload=', payload);
            setProfile(payload[0]);
        });
    }

    const handleSubmit: Function = (values: ServerProfile) => {
        console.log('ServerProfileForm values=', values);
        // create a POST service
        // createAPost$(values).subscribe(({ payload, error }) => {
        //    console.log('payload', payload);
        //    console.log('error', error);
        // });
    };

    const controls = useFormik(buildFormControls(ServerProfileForm, handleSubmit));

    const definitions: ServerProfilePageRenderProps = {
        controls,
        profile: profile
    };

    return <ServerProfilePageRender {...definitions} />;
};
