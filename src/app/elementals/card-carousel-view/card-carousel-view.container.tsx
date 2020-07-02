import React, { FunctionComponent, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { CardCarouselViewRender } from './card-carousel-view.render';
import { CardCarouselViewProps, CardCarouselViewRenderProps } from './card-carousel-view.d';
import { selectUser } from 'app/app.service';

export const CardCarouselView: FunctionComponent<CardCarouselViewProps> = (props): ReactElement => {
    const user = useSelector(selectUser);

    const definitions: CardCarouselViewRenderProps = { user };
    return <CardCarouselViewRender {...definitions} />;
};
