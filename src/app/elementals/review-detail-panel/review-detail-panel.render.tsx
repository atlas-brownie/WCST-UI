import React, { FunctionComponent, ReactElement, Fragment, useContext } from 'react';
import './review-detail-panel.scss';
import { IHashString } from 'app/shared';
import { DropDown } from 'app/elementals';
import { K2RaisedButton } from 'app/k2-mui-core';
import { PageLayoutContext } from 'app/elementals';

export interface ReviewDetailPanelRenderProps {
    rowData: IHashString;
}

export const ReviewDetailPanelRender: FunctionComponent<ReviewDetailPanelRenderProps> = (props): ReactElement => {
    const pageLayoutContext = useContext(PageLayoutContext);

    const handleOnSave = () => {
        const { openSnackbar } = pageLayoutContext;
        openSnackbar({ severity: 'success', message: 'Successfully Updated the Applicants Information.' });
    };

    let dropDownProps = ['Approve', 'Disapprove'];

    return (
        <Fragment>
            <div className="review-detail-panel">
                <div>
                    <b>Full Name:</b>&nbsp;<span className="fname">{props.rowData.applicantFirstname}</span>&nbsp;<span className="lname">{props.rowData.applicantLastname}</span>
                </div>
                <div>
                    <b>Email:</b>&nbsp;<span className="email">{props.rowData.applicantEmail}</span>
                </div>
                <span className="dropdown">
                    <DropDown rowData={props.rowData} dropDownProps={dropDownProps} />
                </span>
                <span className="button">
                    <K2RaisedButton onClick={handleOnSave}>Save</K2RaisedButton>
                </span>
            </div>
        </Fragment>
    );
};
