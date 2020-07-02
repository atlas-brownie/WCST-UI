import React, { FunctionComponent, ReactElement, createElement, Fragment, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useLocation as useLocationForceReRender } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, ContainerProps } from '@material-ui/core';
import { AppRoute } from 'app/models';

const useStyles = makeStyles((theme) => ({
    startBeneathAppBar: {
        paddingTop: Number(theme.mixins.toolbar.minHeight) + theme.spacing(2)
    }
}));
export interface K2TabContainerProps extends ContainerProps {}

const a11yProps = (index: any) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    };
};

export const K2TabContainer: FunctionComponent<K2TabContainerProps> = (props): ReactElement => {
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const useStylesDynamic = makeStyles((theme) => ({
        pageHeight: {
            height: pageHeight - (Number(theme.mixins.toolbar.minHeight) + theme.spacing(10))
        }
    }));

    const dynamicHeight = useStylesDynamic();

    function reportWindowSize() {
        setPageHeight(window.innerHeight);
    }
    window.onresize = reportWindowSize;

    const classes = useStyles();

    useLocationForceReRender();
    const { pages, tabIndex, isHideTabs, tabs } = AppRoute.getDisplayState();

    // To prevent unmounting of tab container pages we need to hide/display tab container content.
    return (
        <Fragment>
            <Container maxWidth="xl" className={classes.startBeneathAppBar}>
                {pages.map((page, pageIndex) => {
                    return createElement(page || Fragment, { key: `page-${pageIndex}` });
                })}
                <div hidden={isHideTabs}>
                    <Tabs value={tabIndex} indicatorColor="primary" textColor="primary" aria-label="tabs">
                        {tabs.map((tabItem, tabItemIndex: number) => (
                            <Tab
                                key={`tab-${tabItemIndex}`}
                                label={
                                    <Link
                                        to={{
                                            pathname: `${tabItem.path}`
                                        }}
                                    >
                                        <span>{tabItem.label}</span>
                                    </Link>
                                }
                                {...a11yProps(tabItemIndex)}
                            />
                        ))}
                    </Tabs>
                    <SwipeableViews index={tabIndex}>
                        {tabs.map((tabItem, tabItemIndex: number) => {
                            return (
                                <div
                                    className={dynamicHeight.pageHeight}
                                    key={`tab-panel-${tabItemIndex}`}
                                    role="tabpanel"
                                    id={`tabpanel-${tabItemIndex}`}
                                    hidden={tabIndex !== tabItemIndex}
                                    aria-labelledby={`tab-${tabItemIndex}`}
                                >
                                    {createElement(tabItem.component)}
                                </div>
                            );
                        })}
                    </SwipeableViews>
                </div>
            </Container>
        </Fragment>
    );
};
