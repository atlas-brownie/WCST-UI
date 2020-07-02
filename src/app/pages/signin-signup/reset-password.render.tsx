import React, { FunctionComponent, ReactElement } from 'react';
import './reset-password.scss';
import { K2Column, K2Form, K2TextField, K2RaisedButton, K2Row, K2TextFieldProps } from 'app/k2-mui-core';
import { Divider, Paper } from '@material-ui/core';

export interface ResetPasswordRenderProps {
    controls: any;
    email: K2TextFieldProps;
    confirmationCode: K2TextFieldProps;
    newPassword: K2TextFieldProps;
}

export const ResetPasswordRender: FunctionComponent<ResetPasswordRenderProps> = ({ controls, ...props }): ReactElement => {
    return (
        <Paper className="forgot-password-page">
            <K2Form {...controls}>
                <K2Column alignContent="center">
                    <h2>Reset Password</h2>
                    <K2TextField label="Email" {...props.email} />
                    <K2TextField label="Confirmation Code" {...props.confirmationCode} />
                    <K2TextField label="New Password" {...props.newPassword} />
                    <Divider />
                    <K2Row justify="center">
                        <K2RaisedButton type="submit" fullWidth={false}>
                            Reset Password
                        </K2RaisedButton>
                    </K2Row>
                </K2Column>
            </K2Form>
        </Paper>
    );
};
