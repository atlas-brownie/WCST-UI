import React, { FunctionComponent, ReactElement } from 'react';
import Pane from 'react-split-pane';
import { makeStyles } from '@material-ui/core';

export interface K2PaneProps {
    size?: string;
    minSize?: string;
    maxSize?: string;
}

const useStyles = makeStyles((theme) => ({
    paneDivWrapper: {
        height: '100%'
    }
}));

export const K2Pane: FunctionComponent<K2PaneProps> = ({ children, ...props }): ReactElement => {
    const classes = useStyles();

    return (
        <Pane {...props}>
            <div className={classes.paneDivWrapper}>{children}</div>
        </Pane>
    );
};
