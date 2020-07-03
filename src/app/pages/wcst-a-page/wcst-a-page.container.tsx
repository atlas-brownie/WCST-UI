import { WcstAPageRender } from './wcst-a-page.render';
import React, { FunctionComponent, ReactElement } from 'react';
import { postDocumentUploadLocation$ } from './wcst-a.service';

export const WcstAPage: FunctionComponent = (props): ReactElement => {
    const handleClickDocumentUploadLocation = (evt: MouseEvent) => {
        console.log('clicked btn');
        postDocumentUploadLocation$().subscribe(({ payload, error }) => {
            console.log('postDocumentUploadLocation payload, error=', payload, error);
        });
    };

    return <WcstAPageRender {...{ handleClickDocumentUploadLocation }} />;
};
