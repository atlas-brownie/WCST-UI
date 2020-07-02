import React, { FunctionComponent, ReactElement } from 'react';
import './profile-page.scss';
import { K2TextFieldProps, K2Form, K2TextField, K2RaisedButton, K2RaisedButtonProps } from 'app/k2-mui-core';
import { Paper } from '@material-ui/core';

export interface ProfilePageRenderProps {
    controls: any;
    id: K2TextFieldProps;
    firstName: K2TextFieldProps;
    lastName?: K2TextFieldProps;
    email: K2TextFieldProps;
    phoneNumber: K2TextFieldProps;
    gender?: K2TextFieldProps;
    saveButton: K2RaisedButtonProps;
    editButton: K2RaisedButtonProps;
    pageTitle: string;
}

export const ProfilePageRender: FunctionComponent<ProfilePageRenderProps> = ({ controls, ...props }): ReactElement => {
    return (
        <Paper className="profile-page">
            <br />
            <K2Form {...controls}>
                <h2>{props.pageTitle}</h2>
                <br />
                <K2TextField fullWidth={false} label="Email" {...props.email} />
                <br />
                <br />
                <K2TextField fullWidth={false} label="First Name" {...props.firstName} />
                <br />
                <br />
                <K2TextField fullWidth={false} label="Last Name" {...props.lastName} />
                <br />
                <br />
                <K2TextField fullWidth={false} label="Phone Number" {...props.phoneNumber} />
                <br />
                <br />
                <K2TextField fullWidth={false} label="Gender" {...props.gender} />
                <br />
                <br />
                <K2RaisedButton type="submit" {...props.saveButton}>
                    Save Changes
                </K2RaisedButton>
                <K2RaisedButton {...props.editButton}>Edit Profile</K2RaisedButton>
            </K2Form>
            <br />
        </Paper>
    );
};
