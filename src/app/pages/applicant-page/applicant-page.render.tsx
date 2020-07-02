import React, { FunctionComponent, ReactElement } from 'react';
import './applicant-page.scss';
import { K2Row, K2RaisedButton, K2Grid, K2GridProps } from 'app/k2-mui-core';
import { FileController } from 'app/elementals';
import InfiniteScroll from 'react-infinite-scroller';

export interface ApplicantPageRenderProps {
    grid: K2GridProps;
    label?: string;
    loadFunc?: any;
    more?: boolean;
    show: boolean;
    setShow: any;
    showFileUpload: any;
}

export const ApplicantPageRender: FunctionComponent<ApplicantPageRenderProps> = ({ label, grid, loadFunc, more, show, setShow, showFileUpload }): ReactElement => {
    const pixelThreshold = 20;
    const initLoad = false;

    return (
        <div>
            <FileController show={show} setShow={setShow} />
            <br />
            <K2Row spacing={1}>
                <div>
                    <K2RaisedButton onClick={showFileUpload} fullWidth={false}>
                        Add Document
                    </K2RaisedButton>
                    &nbsp;
                    <K2RaisedButton fullWidth={false}>Edit Selection</K2RaisedButton>
                </div>
            </K2Row>
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
                useWindow={false}
            >
                <K2Grid {...grid} />
            </InfiniteScroll>
        </div>
    );
};
