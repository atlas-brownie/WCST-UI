import React, { FunctionComponent, ReactElement } from 'react';
import './resend-confirmation.scss';
import { K2Column, K2Form, K2TextField, K2RaisedButton, K2Row, K2TextFieldProps } from 'app/k2-mui-core';
import { Divider, Paper } from '@material-ui/core';

export interface ResendConfirmationRenderProps {
    controls: any;
    email: K2TextFieldProps;
}

export const ResendConfirmationRender: FunctionComponent<ResendConfirmationRenderProps> = ({ controls, ...props }): ReactElement => {
    return (
        <Paper className="resend-confirmation">
            <K2Form {...controls}>
                <K2Column alignContent="center">
                    <h2>Resend Confirmation Code</h2>
                    <K2TextField label="Email" {...props.email} />
                    <Divider />
                    <K2Row justify="center">
                        <K2RaisedButton type="submit" fullWidth={false}>
                            Send It!
                        </K2RaisedButton>
                    </K2Row>
                </K2Column>
            </K2Form>
        </Paper>
    );
};
