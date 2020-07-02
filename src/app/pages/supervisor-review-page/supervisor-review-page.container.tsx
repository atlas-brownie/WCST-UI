import { SupervisorReviewPageRender } from './supervisor-review-page.render';
import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSupervisorReview$, supervisorReviewSlice, selectSupervisorReview } from './supervisor-review.service';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { IHashString } from 'app/shared';
import { ReviewDetailPanel } from 'app/elementals';

export interface SupervisorReviewPageProps {
    label?: string;
}

// Try to keep component size to a minimum and pull out things that could be moved to another module.
// This will give us the potential to make things more generalized.
// const cols: object[] = [
//     { field: 'id', title: 'Applicant ID #' },
//     { field: 'applicantEmail', title: 'Applicant Email' },
//     { field: 'applicantLastname', title: 'Applicant Last Name' },
//     { field: 'applicantFirstname', title: 'Applicant First Name' },
//     { field: 'applicantPhone', title: 'Phone #' },
//     { field: 'applicationType', title: 'Application Type' },
//     { field: 'status', title: 'Status' },
//     { field: 'documentLinks', title: 'Document Links' }
// ];

const cols = [
    {
        headerName: 'Applicant ID #',
        field: 'id'
    },
    {
        headerName: 'Applicant Email',
        field: 'applicantEmail'
    },
    {
        headerName: 'Applicant Last Name',
        field: 'applicantLastname'
    },
    {
        headerName: 'Applicant First Name',
        field: 'applicantFirstname'
    },
    {
        headerName: 'Phone #',
        field: 'applicantPhone'
    },
    // {
    //     headerName: 'Date Entered',
    //     field: 'dateEntered'
    // },
    {
        headerName: 'Application Type',
        field: 'applicationType'
    },
    {
        headerName: 'Status',
        field: 'status'
    },
    {
        headerName: 'Document Links',
        field: 'documentLinks'
    }
];

const detailPanel: React.ReactNode = (rowData: IHashString) => {
    return <ReviewDetailPanel rowData={rowData} />;
};

export const SupervisorReviewPage: FunctionComponent<SupervisorReviewPageProps> = (props): ReactElement => {
    const dispatch = useDispatch();
    const data = useSelector(selectSupervisorReview);
    const [more, setMore] = useState(false);
    // Protect against errors downloading SupervisorReview.
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        if (isEmpty(data) && retryCount < 3) {
            getSupervisorReview$();
            setRetryCount(retryCount + 1);
        }
    }, [data, retryCount, setRetryCount]);

    const loadFunc = () => {
        setMore(false);
        // this will be changed to an api call that gets the next set of data and puts it in the tasks slice
        dispatch(supervisorReviewSlice.actions.loadSupervisorReview(data.concat(data)));
        setMore(true);
    };

    return <SupervisorReviewPageRender {...{ data, cols, loadFunc, more, detailPanel }} />;
};
