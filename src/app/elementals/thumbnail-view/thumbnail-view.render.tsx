import React, { FunctionComponent, ReactElement } from 'react';
import clsx from 'clsx';
import './thumbnail-view.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { User } from 'app/shared';

export interface ThumbnailViewRenderProps {
    user: User;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: theme.spacing(20)
    }
}));

export const ThumbnailViewRender: FunctionComponent<ThumbnailViewRenderProps> = ({ user = new User({ firstName: 'Default Name' }) }): ReactElement => {
    const classes = useStyles();
    const columnCount = 3;
    return (
        <div className={clsx('thumbnail-view', classes.root)}>
            <h1>Thumbnail view for {user ? user.firstName : 'Default Name'}</h1>
            <Grid container spacing={3}>
                <Grid item xs={columnCount}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs={columnCount}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs={columnCount}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs={columnCount}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs={columnCount}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
                <Grid item xs={columnCount}>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
            </Grid>
        </div>
    );
};
