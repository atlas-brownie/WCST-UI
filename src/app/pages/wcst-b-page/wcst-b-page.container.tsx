import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import { WcstBPageRender } from './wcst-b-page.render';
import { getMetadataFile, postDocumentUploadLocation$ } from './wcst-b.service';
import { K2DropzoneProps } from 'app/k2-mui-core';

export const WcstBPage: FunctionComponent = (props): ReactElement => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    const handleDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        console.log('onDrop File=', acceptedFiles);
        setPdfFile(acceptedFiles[0]);
    }, []);

    const handleClickUploadDocument = useCallback(
        (evt: MouseEvent) => {
            console.log('clicked btn');

            const form = document.getElementById('metadata-form') as HTMLFormElement;
            const formData = new FormData(form);
            const object: any = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            console.log('formData json=', json);

            const metadataFile = getMetadataFile(json);

            postDocumentUploadLocation$(metadataFile, pdfFile);
        },
        [pdfFile]
    );
    console.log('files=', pdfFile);

    const dropzone: K2DropzoneProps = { onDrop: handleDrop, onDropAccepted: handleDrop, onDropRejected: handleDrop };

    return <WcstBPageRender {...{ handleClickUploadDocument, dropzone }} />;
};
