import { WcstAPageRender } from './wcst-a-page.render';
import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWcstA$, wcstASlice, selectWcstA } from './wcst-a.service';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { selectUser } from 'app/app.service';
import { User, UserDefault } from 'app/shared';

export interface WcstAPageProps {
    label?: string;
}

// Try to keep component size to a minimum and pull out things that could be moved to another module.
// This will give us the potential to make things more generalized.
const columnDefs: object[] = [
    // add mockaroo data here
];

export const WcstAPage: FunctionComponent<WcstAPageProps> = (props): ReactElement => {
    const dispatch = useDispatch();
    const rowData = useSelector(selectWcstA);
    const user = useSelector(selectUser) || UserDefault;
    const [more, setMore] = useState(true);
    // Protect against errors downloading WcstA.
    const [retryCount, setRetryCount] = useState(0);
    const gridTitle = user.hasRole('ANONYMOUS') ? `Items` : `${user.firstName}'s Items`;

    useEffect(() => {
        if (isEmpty(rowData) && retryCount < 3) {
            getWcstA$();
            setRetryCount(retryCount + 1);
        }
    }, [rowData, retryCount, setRetryCount, user.id]);

    const loadFunc = () => {
        setMore(false);
        // this will be changed to an api call that gets the next set of data and puts it in the tasks slice
        dispatch(wcstASlice.actions.loadWcstA(rowData.concat(rowData)));
        setMore(true);
    };

    const handleChangeSelection = (rowData: object[]) => {
        // POST DATA TO SERVER HERE
        console.log('params, rowData=', rowData);
    };

    return <WcstAPageRender {...{ grid: {title: gridTitle, rowData, columnDefs, handleChangeSelection}, loadFunc, more }} />;
};
