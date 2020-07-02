import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { K2FlatButton, K2FlatButtonProps } from './';

export interface K2RaisedButtonProps extends K2FlatButtonProps {
    isHidden?: boolean;
}

export const K2RaisedButton: FunctionComponent<K2RaisedButtonProps> = ({ children, fullWidth = true, isHidden = false, ...props }): ReactElement => {
    if (isHidden) {
        return <Fragment />;
    } else {
        return (
            <K2FlatButton {...props} variant="contained" fullWidth={fullWidth}>
                {children}
            </K2FlatButton>
        );
    }
};
