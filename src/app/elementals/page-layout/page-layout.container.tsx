import { FunctionComponent, ReactElement, createContext, useState, createElement } from 'react';
import { PageLayoutRender, PageLayoutRenderProps } from './page-layout.render';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/app.service';
import { K2AlertProps } from 'app/k2-mui-core';
import { AppRoute } from 'app/models';
import { useLocation, useHistory } from 'react-router-dom';

export const PageLayoutContext = createContext({} as any);

const defaultSnackbarProps = { severity: 'success', open: false, onClose: () => {}, autoHideDuration: 2000, message: 'Success!' } as K2AlertProps;

export const PageLayout: FunctionComponent = (): ReactElement => {
    const user = useSelector(selectUser);
    const [snackbarProps, setSnackbarProps] = useState<K2AlertProps>(defaultSnackbarProps);
    AppRoute.location = useLocation();
    AppRoute.history = useHistory();

    const closeSnackbar = () => {
        setSnackbarProps(Object.assign({}, snackbarProps, { open: false }));
    };
    const openSnackbar = ({ severity, message }: K2AlertProps) => {
        setSnackbarProps(Object.assign({}, snackbarProps, { severity, message, open: true, onClose: closeSnackbar }));
    };

    const PageLayoutProvider = PageLayoutContext.Provider;
    const contextValue = { openSnackbar, closeSnackbar };

    const definitions: PageLayoutRenderProps = {
        user,
        snackbarProps
    };

    return createElement(PageLayoutProvider, { value: contextValue }, createElement(PageLayoutRender, definitions));
};
