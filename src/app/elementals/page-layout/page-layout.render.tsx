import React, { FunctionComponent, ReactElement, useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer as MuiDrawer, Snackbar } from '@material-ui/core';
import { Drawer } from 'app/elementals';
import { AppBar } from '.';
import { User } from 'app/shared';
import { K2Alert, K2AlertProps } from 'app/k2-mui-core';
import { K2TabContainer } from 'app/k2-mui-core';

export interface PageLayoutRenderProps {
    user: User;
    snackbarProps: K2AlertProps;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    }
}));

export const PageLayoutRender: FunctionComponent<PageLayoutRenderProps> = ({ user, snackbarProps, ...props }): ReactElement => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    useEffect(() => {}, [user]);

    return (
        <div className={clsx(classes.root, 'page-layout')}>
            <CssBaseline />
            <AppBar open={open} setOpen={setOpen} />
            <MuiDrawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <Drawer open={open} setOpen={setOpen} />
            </MuiDrawer>
            <K2TabContainer />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                onClose={snackbarProps.onClose}
                open={snackbarProps.open}
                autoHideDuration={snackbarProps.autoHideDuration}
            >
                <Fragment>
                    {snackbarProps.open && <K2Alert severity={snackbarProps.severity} message={snackbarProps.message} />}
                    {!snackbarProps.open && <span />}
                </Fragment>
            </Snackbar>
        </div>
    );
};
