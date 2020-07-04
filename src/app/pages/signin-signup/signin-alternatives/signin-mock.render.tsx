import React, { FunctionComponent, ReactElement, Fragment } from 'react';
import './signin-page.scss';
import { K2Column, K2Form, K2RaisedButton, K2Row, K2Select, K2SelectProps } from 'app/k2-mui-core';
import { Link } from 'react-router-dom';
import { Divider, Paper } from '@material-ui/core';

export interface SigninMockRenderProps {
    controls: any;
    email: K2SelectProps;
}

export const SigninMockRender: FunctionComponent<SigninMockRenderProps> = ({ controls, ...props }): ReactElement => {
    return (
        <Fragment>
            <Paper className="signin-page">
                <K2Form {...controls}>
                    <K2Column alignContent="center">
                        <h2>Login MOCK</h2>
                        <K2Select label="Email" {...props.email} />
                        {/* <K2TextField label="Password" {...props.password} /> */}
                        <Link to="/forgot-password" className="text-link">
                            <span>Forgot Password</span>
                        </Link>
                        <Divider />
                        <K2Row justify="space-between" spacing={3}>
                            <K2RaisedButton type="submit">Log In</K2RaisedButton>
                            <Link to="/">
                                <K2RaisedButton color="default">Cancel</K2RaisedButton>
                            </Link>
                        </K2Row>
                    </K2Column>
                </K2Form>
            </Paper>
        </Fragment>
    );
};
