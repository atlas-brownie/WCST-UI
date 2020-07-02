import React, { FunctionComponent, ReactElement } from 'react';
import './card-carousel-view.scss';
import { CardCarouselViewRenderProps } from './card-carousel-view.d';

export const CardCarouselViewRender: FunctionComponent<CardCarouselViewRenderProps> = ({ user }): ReactElement => {
    return (
        <div className="card-carousel-view">
            <h1>Card View for {user ? user.firstName : 'Default Name'}</h1>;
        </div>
    );
};
