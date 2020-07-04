import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import { WcstAPageRender } from './wcst-a-page.render';
import { getWhatServerSees$ } from './wcst-a.service';

export const WcstAPage: FunctionComponent = (props): ReactElement => {
    const handleClickWhatServerSees = useCallback((evt: MouseEvent) => {
        const form = document.getElementById('search-form') as HTMLFormElement;
        console.log('clicked btn, form.elements.namedItem=', form.elements.namedItem('confirmation-code'));
        const formData = new FormData(form);

        console.log('clicked btn');
        getWhatServerSees$(formData.get('confirmation-code') as string);
    }, []);

    return <WcstAPageRender {...{ handleClickWhatServerSees }} />;
};
