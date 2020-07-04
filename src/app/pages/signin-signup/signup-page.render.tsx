import React, { FunctionComponent, ReactElement } from 'react';
import './signup-page.scss';
import { K2Column, K2Form, K2TextField, K2RaisedButton, K2Row, K2TextFieldProps } from 'app/k2-mui-core';
import { Link } from 'react-router-dom';
import { Divider, Paper } from '@material-ui/core';

export interface SignupPageRenderProps {
    controls: any;
    email: K2TextFieldProps;
    password: K2TextFieldProps;
    confirmPassword: K2TextFieldProps;
}

export const SignupPageRender: FunctionComponent<SignupPageRenderProps> = ({ controls, ...props }): ReactElement => {
    return (
        <Paper className="signup-page">
            <K2Form {...controls}>
                <K2Column alignContent="center">
                    <h2>Sign Up</h2>
                    <K2TextField label="Email" {...props.email} />
                    <K2TextField label="Password" {...props.password} />
                    <K2TextField label="Confirm Password" {...props.confirmPassword} />
                    <Divider />
                    <K2Row justify="space-between" spacing={3}>
                        <K2RaisedButton type="submit">Sign Up</K2RaisedButton>
                        <Link to="/">
                            <K2RaisedButton color="default">Cancel</K2RaisedButton>
                        </Link>
                    </K2Row>
                </K2Column>
            </K2Form>
        </Paper>
    );
};
