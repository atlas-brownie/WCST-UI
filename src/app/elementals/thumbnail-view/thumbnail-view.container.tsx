import React, { FunctionComponent, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { ThumbnailViewRender, ThumbnailViewRenderProps } from './thumbnail-view.render';
import { selectUser } from 'app/app.service';

export interface ThumbnailViewProps {}

export const ThumbnailView: FunctionComponent<ThumbnailViewProps> = (props): ReactElement => {
    const user = useSelector(selectUser);

    const definitions: ThumbnailViewRenderProps = { user };
    return <ThumbnailViewRender {...definitions} />;
};
