import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import './wcst-c-page.scss';
import { K2RaisedButton } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface WcstCPageRenderProps {
    handleClickDocumentUploadLocation: FuncAny;
}

export const WcstCPageRender: FunctionComponent<WcstCPageRenderProps> = (props): ReactElement => {
    return (
        <Fragment>
            <form id="search-form">
                <label htmlFor="confirmation-code">Confirmation Code</label>
                <input type="text" maxLength={40} id="confirmation-code" name="confirmation-code" />
            </form>
            <K2RaisedButton onClick={props.handleClickDocumentUploadLocation} fullWidth={false}>
                Submit
            </K2RaisedButton>
        </Fragment>
    );
};
