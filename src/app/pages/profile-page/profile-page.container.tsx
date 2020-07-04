import React, { Fragment, FunctionComponent, ReactElement, useState, useContext } from 'react';
import { ProfilePageRender, ProfilePageRenderProps } from './profile-page.render';
import { Profile } from 'app/models';
import { User } from 'app/shared';
// import { createAPost$ } from 'app/pages/profile-page/profile.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { selectUser, userSlice } from 'app/app.service';
import { getApplicantProfile$ } from 'app/pages/applicant-page/applicant.service';
import { useHistory } from 'react-router-dom';
import { PageLayoutContext } from 'app/elementals';
import { useDispatch } from 'react-redux';

export interface ProfilePageProps {}

const buildFormControls = (formData: Profile, onSubmit: any) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email is Required'),
            firstName: Yup.string().required('First name is Required')
        }),
        onSubmit
    };
};

export const ProfilePage: FunctionComponent<ProfilePageProps> = (props): ReactElement => {
    const [applicantProfile, setApplicantProfile] = useState<Profile>(Profile.default);
    const [isEditMode, setIsEditMode] = useState(false);
    const user = useSelector(selectUser) || null;
    const history = useHistory();
    const dispatch = useDispatch();
    const pageLayoutContext = useContext(PageLayoutContext);

    const handleSubmit: Function = (values: Profile) => {
        const { openSnackbar } = pageLayoutContext;
        openSnackbar({ severity: 'success', message: 'Changes saved successfully!' });
        const updatedUser = new User({ firstName: values.firstName, lastName: values.lastName, email: values.email, roles: user.roles });
        dispatch(userSlice.actions.changeUser(updatedUser));

        // create a POST service
        // createAPost$(values).subscribe(({ payload, error }) => {
        //    console.log('payload', payload);
        //    console.log('error', error);
        // });
    };

    const controls = useFormik(buildFormControls(applicantProfile, handleSubmit));

    if (applicantProfile.id === Profile.default.id && user !== null) {
        getApplicantProfile$(user).subscribe(({ payload }) => {
            console.log('getApplicantProfile$ payload=', payload);
            // const curProfile = payload.filter((profile) => {
            //     return profile.email === user.email;
            // });
            // setApplicantProfile(curProfile[0]);
            setApplicantProfile(payload[0]);
            controls.resetForm();
        });
    }

    const handleClickEdit = () => {
        setIsEditMode(true);
    };

    const definitions: ProfilePageRenderProps = {
        controls,
        id: { name: 'id', disabled: !isEditMode },
        firstName: { name: 'firstName', disabled: !isEditMode },
        lastName: { name: 'lastName', disabled: !isEditMode },
        email: { name: 'email', disabled: !isEditMode },
        gender: { name: 'gender', disabled: !isEditMode },
        phoneNumber: { name: 'phoneNumber', disabled: !isEditMode },
        saveButton: { isHidden: !isEditMode },
        editButton: { isHidden: isEditMode, onClick: handleClickEdit },
        pageTitle: isEditMode ? 'Edit Profile' : 'Review Profile'
    };

    if (user === null) {
        history.replace('/');
        return <Fragment />;
    }

    return <ProfilePageRender {...definitions} />;
};
