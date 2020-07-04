import React, { FunctionComponent, ReactElement, Children } from 'react';
import { Grid, GridProps } from '@material-ui/core';

interface K2RowProps extends GridProps {
    justifyChild?: 'flex-start' | 'center' | 'flex-end';
}

export const K2Row: FunctionComponent<K2RowProps> = ({ children, spacing, justifyChild, ...props }): ReactElement => {
    return (
        <Grid container spacing={spacing} {...props} wrap="nowrap">
            {Children.toArray(children).map((child, idx) => (
                <Grid key={`item-${idx}`} item>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};
