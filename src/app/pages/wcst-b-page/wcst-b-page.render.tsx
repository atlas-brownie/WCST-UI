import React, { FunctionComponent, ReactElement } from 'react';
import './wcst-b-page.scss';
import { K2RaisedButton } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface WcstBPageRenderProps {
    handleClickDocumentUploadLocation: FuncAny;
}

export const WcstBPageRender: FunctionComponent<WcstBPageRenderProps> = (props): ReactElement => {
    return <K2RaisedButton onClick={props.handleClickDocumentUploadLocation}>Upload Document</K2RaisedButton>;
};
