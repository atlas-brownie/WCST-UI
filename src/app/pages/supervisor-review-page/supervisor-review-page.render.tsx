import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import './supervisor-review-page.scss';
import { K2Grid } from 'app/k2-mui-core';
import InfiniteScroll from 'react-infinite-scroller';

export interface SupervisorReviewPageRenderProps {
    data: Array<object>;
    cols: Array<object>;
    label?: string;
    loadFunc?: any;
    more?: boolean;
    detailPanel?: any;
}

export const SupervisorReviewPageRender: FunctionComponent<SupervisorReviewPageRenderProps> = ({ label, data, cols, loadFunc, more, detailPanel }): ReactElement => {
    const pixelThreshold = 50;
    const initLoad = false;
    const title = 'Applications for Review';

    return (
        <Fragment>
            <InfiniteScroll loadMore={loadFunc} hasMore={more} initialLoad={initLoad} threshold={pixelThreshold} loader={<Fragment />} useWindow={false}>
                <K2Grid columnDefs={cols} rowData={data} title={title} />
            </InfiniteScroll>
        </Fragment>
    );
};
