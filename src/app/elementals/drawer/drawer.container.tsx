import React, { FunctionComponent, ReactElement } from 'react';
import { DrawerRender } from './drawer.render';

export interface DrawerProps {
    open: boolean;
    setOpen: Function;
}

export const Drawer: FunctionComponent<DrawerProps> = ({ open, setOpen }): ReactElement | null => {
    return <DrawerRender {...{ open, setOpen }} />;
};
