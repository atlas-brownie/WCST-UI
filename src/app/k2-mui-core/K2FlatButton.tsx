import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export interface K2FlatButtonProps extends ButtonProps {
    isHidden?: boolean;
}

export const K2FlatButton: FunctionComponent<K2FlatButtonProps> = ({ children, isHidden = false, ...props }): ReactElement => {
    if (isHidden) {
        return <Fragment />;
    } else {
        return (
            <Button color="primary" {...props}>
                {children}
            </Button>
        );
    }
};
