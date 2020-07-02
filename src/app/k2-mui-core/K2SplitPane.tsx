import React, { FunctionComponent, ReactElement } from 'react';
import SplitPane from 'react-split-pane';

export interface K2SplitPaneProps {
    split: any;
}

export const K2SplitPane: FunctionComponent<K2SplitPaneProps> = ({ children, ...props }): ReactElement => {
    return <SplitPane {...props}>{children}</SplitPane>;
};
