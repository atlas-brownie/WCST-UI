import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import './home-page.scss';
import { VAErrorableTextInput, VAFieldProp } from 'app/shared/va-components.d';
import { FuncAny } from 'app/shared';

export interface HomePageRenderProps {
    controls: any;
    homeMessage: string;
}

const defaultField: VAFieldProp = {
    value: 'Test1',
    dirty: false
};

export const HomePageRender: FunctionComponent<HomePageRenderProps> = ({ controls, homeMessage, ...props }): ReactElement => {
    const [f1, setF1] = useState<VAFieldProp>(defaultField);
    const handleValueChange: FuncAny = useCallback((evt) => {
        console.log('evt=', evt);
        setF1({ value: evt.value, dirty: true });
    }, []);

    return (
        <div className="home-page">
            <p>{homeMessage}</p>
            <VAErrorableTextInput label="First Field" type="text" field={f1} onValueChange={handleValueChange} errorMessage="Required" />
        </div>
    );
};
