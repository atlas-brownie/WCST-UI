import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import { WcstBPageRender } from './wcst-b-page.render';
import { getMetadata, postDocumentUploadLocation$ } from './wcst-b.service';
import { K2DropzoneProps } from 'app/k2-mui-core';

export const WcstBPage: FunctionComponent = (props): ReactElement => {
    const [files, setFiles] = useState<any[]>([]);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            // Do something with the files
            console.log('onDrop Files=', acceptedFiles);
            setFiles(files.concat(acceptedFiles, getMetadata()));
        },
        [files]
    );

    const handleClickUploadDocument = useCallback(
        (evt: MouseEvent) => {
            console.log('clicked btn');
            postDocumentUploadLocation$(files);
        },
        [files]
    );
    console.log('files=', files);

    const dropzone: K2DropzoneProps = { onDrop: handleDrop, onDropAccepted: handleDrop, onDropRejected: handleDrop };

    return <WcstBPageRender {...{ handleClickUploadDocument, dropzone }} />;
};
