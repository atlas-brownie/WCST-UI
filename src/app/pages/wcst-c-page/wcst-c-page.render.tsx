import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import './wcst-c-page.scss';
import { K2RaisedButton } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface WcstCPageRenderProps {
    handleClickDocumentUploadLocation: FuncAny;
    confirmationCode: string;
    status: string;
}

export const WcstCPageRender: FunctionComponent<WcstCPageRenderProps> = (props): ReactElement => {
    return (
        <Fragment>
            <br />
            <br />
            <br />
            <br />
            <br />
            <form id="search-form">
                <label htmlFor="confirmation-code">Confirmation Code (*Required)</label>
                <br />
                <input type="text" maxLength={40} size={80} id="confirmation-code" name="confirmation-code" placeholder="Confirmation Code" defaultValue={props.confirmationCode} />
                <br />
                <br />
                <br />
                <br />
                <br />
            </form>
            {!!props.status && (
                <div>
                    <h4>Status:</h4>
                    <div>{props.status}</div>
                </div>
            )}
            <br />
            <br />
            <br />
            <br />
            <br />
            <K2RaisedButton onClick={props.handleClickDocumentUploadLocation} fullWidth={false}>
                Submit
            </K2RaisedButton>
        </Fragment>
    );
};
