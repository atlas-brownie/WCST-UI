import { FunctionComponent, ReactElement, Dispatch, createElement } from 'react';
import { AppBarRender, AppBarRenderProps } from './app-bar.render';
import { useSelector } from 'react-redux';
import { userSlice, selectHealth } from 'app/app.service';
import { credentialsSlice, signOut$ } from 'app/pages/signin-signup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserDefault } from 'app/shared';

export interface AppBarProps {
    open: boolean;
    setOpen: Dispatch<any>;
}

export const AppBar: FunctionComponent<AppBarProps> = ({ open, setOpen, ...props }): ReactElement => {
    const credentials = UserDefault.isAuthenticated;
    const health = useSelector(selectHealth) || false;
    const successColor = '#3f51b5';
    const appBarColor = health ? successColor : `red`;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClickSignout: any = (evt: any): void => {
        if (UserDefault.keycloak) UserDefault.keycloak.logout();

        signOut$().subscribe(() => {
            UserDefault.isAuthenticated = false;
            history.push('/');
            dispatch(credentialsSlice.actions.setCredentials(null));
            dispatch(userSlice.actions.changeUser(null));
        });
    };

    const definitions: AppBarRenderProps = { user: UserDefault, credentials, open, setOpen, handleClickSignout, appBarColor };

    return createElement(AppBarRender, definitions);
};
