import { ApplicantPageRender } from './applicant-page.render';
import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/app.service';
import { getApplicant$, applicantSlice, selectApplicant } from './applicant.service';
import { UserDefault } from 'app/shared';
import { isEmpty, filter } from 'lodash';

export interface ApplicantPageProps {
    label?: string;
}

//Test
// Try to keep component size to a minimum and pull out things that could be moved to another module.
// This will give us the potential to make things more generalized.
// const cols: object[] = [
//     { field: 'id', title: 'Applicant ID #' },
//     { field: 'dateEntered', title: 'Date Entered' },
//     { field: 'applicationType', title: 'Applicant Type' },
//     { field: 'status', title: 'Status' }
// ];

const columnDefs = [
    {
        headerName: 'Applicant ID #',
        field: 'id'
    },
    {
        headerName: 'Date Entered',
        field: 'dateEntered'
    },
    {
        headerName: 'Application Type',
        field: 'applicationType'
    },
    {
        headerName: 'Status',
        field: 'status'
    }
];

export const ApplicantPage: FunctionComponent<ApplicantPageProps> = (props): ReactElement => {
    const dispatch = useDispatch();
    let rowData = useSelector(selectApplicant);
    const [more, setMore] = useState(false);
    // Protect against errors downloading Applicant.
    const [retryCount, setRetryCount] = useState(0);
    const user = useSelector(selectUser) || UserDefault;
    // TODO: add to starters - filter data based on user applicant
    rowData = filter(rowData, { applicantEmail: user.email || 'allison@gmail.com' });
    const [show, setShow] = useState(false);
    const gridTitle = user.hasRole('ANONYMOUS') ? `Applications` : `${user.firstName}'s Applications`;

    useEffect(() => {
        if (isEmpty(rowData) && retryCount < 3) {
            getApplicant$(user.email);
            setRetryCount(retryCount + 1);
        }
    }, [rowData, retryCount, setRetryCount, user.email]);

    const loadFunc = () => {
        setMore(false);
        // this will be changed to an api call that gets the next set of data and puts it in the tasks slice
        dispatch(applicantSlice.actions.loadApplicant(rowData.concat(rowData)));
        // data = [].concat(data);
        setMore(true);
    };

    const showFileUpload = () => {
        setShow(true);
    };

    const handleChangeSelection = (rowData: object[]) => {
        // POST DATA TO SERVER HERE
        console.log('params, rowData=', rowData);
    };

    return (
        <ApplicantPageRender
            {...{
                grid: {
                    title: gridTitle,
                    rowData,
                    columnDefs,
                    handleChangeSelection
                },
                loadFunc,
                more,
                show,
                setShow,
                showFileUpload
            }}
        />
    );
};
