import React, { ReactElement, FunctionComponent } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export interface K2AlertProps extends AlertProps {
    message?: string;
    open?: boolean;
    autoHideDuration?: number;
}

export const K2Alert: FunctionComponent<K2AlertProps> = ({ message, ...props }): ReactElement => {
    return (
        <MuiAlert elevation={6} variant="filled" {...props}>
            {message}
        </MuiAlert>
    );
};
