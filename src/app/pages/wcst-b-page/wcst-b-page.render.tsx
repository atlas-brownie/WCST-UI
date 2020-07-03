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
            <K2RaisedButton onClick={props.handleClickUploadDocument}>Upload Document</K2RaisedButton>
        </Fragment>
    );
};
