import { WcstCPageRender } from './wcst-c-page.render';
import React, { FunctionComponent, ReactElement } from 'react';
import { getDocumentStatus$ } from './wcst-c.service';

export const WcstCPage: FunctionComponent = (props): ReactElement => {
    const handleClickDocumentUploadLocation = (evt: MouseEvent) => {
        console.log('clicked btn');
        const guid = 'd7887142-0877-4dec-bd6f-089a94627e15';
        getDocumentStatus$(guid).subscribe(({ payload, error }) => {
            console.log('getDocumentStatus payload, error=', payload, error);
        });
    };

    return <WcstCPageRender {...{ handleClickDocumentUploadLocation }} />;
};
