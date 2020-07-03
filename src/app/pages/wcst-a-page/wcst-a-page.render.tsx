import React, { FunctionComponent, ReactElement } from 'react';
import './wcst-a-page.scss';
import { K2RaisedButton } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface WcstAPageRenderProps {
    handleClickDocumentUploadLocation: FuncAny;
}

export const WcstAPageRender: FunctionComponent<WcstAPageRenderProps> = (props): ReactElement => {
    return <K2RaisedButton onClick={props.handleClickDocumentUploadLocation}>Document Upload Location</K2RaisedButton>;
};
