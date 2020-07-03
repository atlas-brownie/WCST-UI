import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import './wcst-b-page.scss';
import { K2RaisedButton, K2Dropzone, K2DropzoneProps } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface WcstBPageRenderProps {
    handleClickUploadDocument: FuncAny;
    dropzone: K2DropzoneProps;
}

export const WcstBPageRender: FunctionComponent<WcstBPageRenderProps> = (props): ReactElement => {
    return (
        <Fragment>
            <K2Dropzone {...props.dropzone} />
            <form id="metadata-form">
                <label htmlFor="confirmation-code">First Name (*Required)</label>
                <br />
                <input type="text" maxLength={50} id="veteranFirstName" name="veteranFirstName" value="Tony" />
                <br />
                <br />
                <label htmlFor="confirmation-code">Last Name (*Required)</label>
                <br />
                <input type="text" maxLength={50} id="veteranLastName" name="veteranLastName" value="Stark" />
                <br />
                <br />
                <label htmlFor="confirmation-code">Social Security Number (*Required)</label>
                <br />
                <input type="number" minLength={7} maxLength={8} id="fileNumber" name="fileNumber" value="32459399" />
                <br />
                <br />
                <label htmlFor="zipCode">Postal Code (*Required)</label>
                <br />
                <input type="text" maxLength={10} id="zipCode" name="zipCode" value="90265" />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>TODO: Hide these fields after testing:</div>
                <input type="text" name="source" value="MBL-WCST" />
                <br />
                <input type="text" name="docType" value="29-4364" />
                <br />
                <br />
                <br />
            </form>
            <K2RaisedButton onClick={props.handleClickUploadDocument} fullWidth={false}>
                Upload Document
            </K2RaisedButton>
        </Fragment>
    );
};
