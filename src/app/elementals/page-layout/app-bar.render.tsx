import React, { FunctionComponent, ReactElement, Dispatch, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { User } from 'app/shared';

export interface AppBarRenderProps {
    user: User;
    credentials: any;
    open: boolean;
    setOpen: Dispatch<any>;
    handleClickSignout: any;
    appBarColor: string;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    title: {
        flexGrow: 1
    }
}));

export const AppBarRender: FunctionComponent<AppBarRenderProps> = ({ user, credentials, open, setOpen, handleClickSignout, appBarColor }): ReactElement => {
    let classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    useEffect(() => {}, [user]);

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open
            })}
            style={{ background: appBarColor }}
        >
            <Toolbar className={clsx(classes.toolbar)}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open
                    })}
                >
                    <ChevronRightIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    <Link to="/">
                        <span>WCST Project</span>
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
