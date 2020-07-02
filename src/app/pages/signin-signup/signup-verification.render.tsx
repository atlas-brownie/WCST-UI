import React, { FunctionComponent, ReactElement } from 'react';
import './signup-verification.scss';
import { K2Column, K2Form, K2TextField, K2RaisedButton, K2Row, K2TextFieldProps } from 'app/k2-mui-core';
import { Link } from 'react-router-dom';
import { Divider, Paper } from '@material-ui/core';
export interface SignupVerificationRenderProps {
    controls: any;
    email: K2TextFieldProps;
    verificationCode: K2TextFieldProps;
}

export const SignupVerificationRender: FunctionComponent<SignupVerificationRenderProps> = ({ controls, ...props }): ReactElement => {
    return (
        <Paper className="signup-verification">
            <K2Form {...controls}>
                <K2Column alignContent="center">
                    <h2>Verification Code</h2>
                    <K2TextField label="Email" {...props.email} />
                    <K2TextField label="Verification Code" {...props.verificationCode} />
                    <Link to="/resend-confirmation" className="text-link">
                        <span>Re-send Verification</span>
                    </Link>
                    <Divider />
                    <K2Row justify="space-between" spacing={3}>
                        <K2RaisedButton type="submit">Verify</K2RaisedButton>
                        <Link to="/signin">
                            <K2RaisedButton color="default">Cancel</K2RaisedButton>
                        </Link>
                    </K2Row>
                </K2Column>
            </K2Form>
        </Paper>
    );
};
