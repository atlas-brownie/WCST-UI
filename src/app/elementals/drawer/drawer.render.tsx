import React, { FunctionComponent, ReactElement, Fragment } from 'react';
import './drawer.scss';
import { makeStyles } from '@material-ui/core/styles';
import { FilterList as FilterListIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import { List, ListItemText, ListItem, ListItemIcon, IconButton, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface DrawerRenderProps {
    open: boolean;
    setOpen: Function;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
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
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export const DrawerRender: FunctionComponent<DrawerRenderProps> = ({ open, setOpen }): ReactElement => {
    const classes = useStyles();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let links: Array<object>;
    links = [
        { to: '/', primary: 'Home', isHidden: false },
        /* PLOP_INJECT_DRAWER_LINK */
        { to: '/wcst-a-page', primary: 'Wcst A Page', isHidden: false }
    ];

    return (
        <Fragment>
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            {open && (
                <Fragment>
                    <List>
                        {/* <Link to="/">
                            <ListItem button>
                                <ListItemIcon>
                                    <FilterListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Divider /> */}
                        {links.map((item: any, itemIdx: number) => (
                            <Fragment key={`item-${itemIdx}`}>
                                {!item.isHidden && (
                                    <Fragment>
                                        <Divider />
                                        <Link to={item.to}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <FilterListIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={item.primary} />
                                            </ListItem>
                                        </Link>
                                    </Fragment>
                                )}
                            </Fragment>
                        ))}
                        <Divider />
                    </List>
                </Fragment>
            )}
        </Fragment>
    );
};
