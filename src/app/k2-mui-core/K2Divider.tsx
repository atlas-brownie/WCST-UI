import React, { FunctionComponent, ReactElement } from 'react';
import { Divider, DividerProps } from '@material-ui/core';

export interface K2DividerProps extends DividerProps {}

export const K2Divider: FunctionComponent<K2DividerProps> = (props): ReactElement => {
    return (
        <Divider {...props} />
    );
};
