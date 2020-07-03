import React, { FunctionComponent, ReactElement } from 'react';
import './wcst-c-page.scss';
import { K2RaisedButton } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface WcstCPageRenderProps {
    handleClickDocumentUploadLocation: FuncAny;
}

export const WcstCPageRender: FunctionComponent<WcstCPageRenderProps> = (props): ReactElement => {
    return <K2RaisedButton onClick={props.handleClickDocumentUploadLocation}>Document Search By Guid</K2RaisedButton>;
};
