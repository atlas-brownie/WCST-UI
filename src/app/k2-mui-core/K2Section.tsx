import React, { FunctionComponent, ReactElement } from 'react';
import { Paper } from '@material-ui/core';

export interface K2SectionProps {}

export const K2Section: FunctionComponent<K2SectionProps> = ({ children, ...props }): ReactElement => {
    return (
        <Paper variant="outlined" {...props}>
            {children}
        </Paper>
    );
};
