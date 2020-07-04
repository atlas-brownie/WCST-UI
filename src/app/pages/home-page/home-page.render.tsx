import React, { FunctionComponent, ReactElement } from 'react';
import './home-page.scss';

export interface HomePageRenderProps {
    controls: any;
    homeMessage: string;
}

export const HomePageRender: FunctionComponent<HomePageRenderProps> = ({ controls, homeMessage, ...props }): ReactElement => {
    return (
        <div className="home-page">
            <p>{homeMessage}</p>
        </div>
    );
};
