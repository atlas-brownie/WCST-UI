import React, { FunctionComponent, ReactElement } from 'react';
import { Card, CardContent, CardProps } from '@material-ui/core';

export interface K2CardProps extends CardProps {}

export const K2Card: FunctionComponent<K2CardProps> = ({ children, ...props }): ReactElement => {
    return (
        <Card variant="outlined" {...props}>
            <CardContent>{children}</CardContent>
        </Card>
    );
};
