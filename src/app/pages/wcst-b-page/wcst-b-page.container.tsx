import { WcstBPageRender } from './wcst-b-page.render';
import React, { FunctionComponent, ReactElement } from 'react';
// import { postDocumentUploadLocation$ } from './wcst-b.service';

export const WcstBPage: FunctionComponent = (props): ReactElement => {
    const handleClickDocumentUploadLocation = (evt: MouseEvent) => {
        console.log('clicked btn');
        // postDocumentUploadLocation$().subscribe(({ payload, error }) => {
        //     console.log('postDocumentUploadLocation payload, error=', payload, error);
        // });
    };

    return <WcstBPageRender {...{ handleClickDocumentUploadLocation }} />;
};
