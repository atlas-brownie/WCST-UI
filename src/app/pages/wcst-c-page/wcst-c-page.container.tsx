import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import { WcstCPageRender } from './wcst-c-page.render';
import { getCurrentGuid, getDocumentStatus$ } from './wcst-c.service';

export const WcstCPage: FunctionComponent = (props): ReactElement => {
    const [status, setStatus] = useState<string>('');
    const handleClickDocumentUploadLocation = useCallback((evt: MouseEvent) => {
        const form = document.getElementById('search-form') as HTMLFormElement;
        console.log('clicked btn, form.elements.namedItem=', form.elements.namedItem('confirmation-code'));
        const formData = new FormData(form);

        getDocumentStatus$(formData.get('confirmation-code') as string).subscribe(({ payload, error }) => {
            console.log('getDocumentStatus payload, error=', payload, error);
            let returnStatus = 'Invalid Confirmation Code';
            if (payload[0] && payload[0].data) returnStatus = payload[0].data.attributes.status;
            setStatus(returnStatus);
        });
    }, []);

    return <WcstCPageRender {...{ handleClickDocumentUploadLocation, confirmationCode: getCurrentGuid(), status }} />;
};
