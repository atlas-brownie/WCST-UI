import React, { FunctionComponent, ReactElement, Children } from 'react';
import { Grid, GridProps } from '@material-ui/core';

interface K2ColumnProps extends GridProps {}

export const K2Column: FunctionComponent<K2ColumnProps> = ({ children, spacing = 2, ...props }): ReactElement => {
    return (
        <Grid container spacing={spacing} direction="column" {...props} wrap="nowrap">
            {Children.toArray(children).map((child, idx) => (
                <Grid key={`item-${idx}`} item>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};
