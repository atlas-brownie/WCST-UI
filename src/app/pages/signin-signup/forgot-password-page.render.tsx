import React, { FunctionComponent, ReactElement } from 'react';
import './forgot-password-page.scss';
import { K2Column, K2Form, K2TextField, K2RaisedButton, K2Row, K2TextFieldProps } from 'app/k2-mui-core';
import { Divider, Paper } from '@material-ui/core';

export interface ForgotPasswordPageRenderProps {
    controls: any;
    email: K2TextFieldProps;
}

export const ForgotPasswordPageRender: FunctionComponent<ForgotPasswordPageRenderProps> = ({ controls, ...props }): ReactElement => {
    return (
        <Paper className="forgot-password-page">
            <K2Form {...controls}>
                <K2Column alignContent="center">
                    <h2>Forgot Password</h2>
                    <K2TextField label="Email" {...props.email} />
                    <Divider />
                    <K2Row justify="center">
                        <K2RaisedButton type="submit" fullWidth={false}>
                            Help Me!
                        </K2RaisedButton>
                    </K2Row>
                </K2Column>
            </K2Form>
        </Paper>
    );
};
