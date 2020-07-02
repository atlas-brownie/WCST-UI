import React, { FunctionComponent, ReactElement } from 'react';
import { ReviewDetailPanelRender, ReviewDetailPanelRenderProps } from './review-detail-panel.render';
import { IHashString } from 'app/shared';

export interface ReviewDetailPanelProps {
    rowData: IHashString;
}

export const ReviewDetailPanel: FunctionComponent<ReviewDetailPanelProps> = (props): ReactElement => {
    console.log('ReviewDetailPanelProps props=', props);
    const definitions: ReviewDetailPanelRenderProps = { rowData: props.rowData };
    return <ReviewDetailPanelRender {...definitions} />;
};
