import React, { FunctionComponent, ReactElement, Fragment, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { isEmpty } from 'lodash';
import { Container } from '@material-ui/core';
import { K2FlatButton } from './K2FlatButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

export interface K2TabSectionContainerProps {
    selectTabs: any;
    selectTabsValue: any;
    deleteTab?: any;
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

const useStyles = makeStyles((theme) => ({
    closeButton: { minWidth: 14, minHeight: 14, padding: 0 }
}));

export const TabPanel: FunctionComponent<TabPanelProps> = (props): ReactElement => {
    const { children, value, index } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
            {value === index && <Fragment>{children}</Fragment>}
        </div>
    );
};

const a11yProps = (index: any) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    };
};

export const K2TabSectionContainer: FunctionComponent<K2TabSectionContainerProps> = (props): ReactElement => {
    const theme = useTheme();
    const selectValue: number = useSelector(props.selectTabsValue);
    const [value, setValue] = React.useState(selectValue);
    const closeButtonSize = 14;
    const tabs: Array<any> = useSelector(props.selectTabs);
    const classes = useStyles();

    useEffect(() => {
        setValue(selectValue);
    }, [props, setValue, selectValue]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log('handleChange newValue', newValue);
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        console.log('handleChangeIndex index', index);
        setValue(index);
    };

    if (value >= tabs.length) {
        setValue(0);
    }

    if (isEmpty(tabs)) return <Fragment>{props.children}</Fragment>;
    else
        return (
            <Fragment>
                <Container maxWidth="xl">
                    <Tabs onChange={handleChange} value={value} indicatorColor="primary" textColor="primary" aria-label="full width tabs example">
                        {tabs.map((item: any, itemIdx: number) => (
                            <Tab
                                icon={
                                    <div>
                                        {item.name} &nbsp;
                                        <K2FlatButton onClick={props.deleteTab} className={classes.closeButton}>
                                            <CloseIcon id={item.name} style={{ fontSize: closeButtonSize }} />
                                        </K2FlatButton>
                                    </div>
                                }
                                {...a11yProps(itemIdx)}
                            />
                        ))}
                    </Tabs>
                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                        {tabs.map((item: any, itemIdx: number) => {
                            return (
                                <TabPanel key={`tab-panel-${itemIdx}`} value={value} index={itemIdx} dir={theme.direction}>
                                    {item.component}
                                </TabPanel>
                            );
                        })}
                    </SwipeableViews>
                </Container>
            </Fragment>
        );
};
