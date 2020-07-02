import React, { FunctionComponent, ReactElement } from 'react';
import './wcst-a-page.scss';
import { K2Grid, K2GridProps } from 'app/k2-mui-core';
import InfiniteScroll from 'react-infinite-scroller';

export interface WcstAPageRenderProps {
    grid: K2GridProps;
    label?: string;
    loadFunc?: any;
    more?: boolean;
}

export const WcstAPageRender: FunctionComponent<WcstAPageRenderProps> = ({ label, grid, loadFunc, more }): ReactElement => {
    const pixelThreshold = 50;
    const initLoad = false;

    return (
        <InfiniteScroll
            loadMore={loadFunc}
            hasMore={more}
            initialLoad={initLoad}
            threshold={pixelThreshold}
            loader={
                <div className="loader" key={0}>
                    Loading ...
                </div>
            }
        >
            <K2Grid {...grid} />
        </InfiniteScroll>
    );
};