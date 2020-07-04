import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import './wcst-a-page.scss';
import { K2RaisedButton } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface WcstAPageRenderProps {
    handleClickWhatServerSees: FuncAny;
}

export const WcstAPageRender: FunctionComponent<WcstAPageRenderProps> = (props): ReactElement => {
    return (
        <Fragment>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <form id="search-form">
                <label htmlFor="confirmation-code">Confirmation Code (*Required)</label>
                <br />
                <input type="text" maxLength={40} size={80} id="confirmation-code" name="confirmation-code" placeholder="Confirmation Code" defaultValue="" />
                <br />
                <br />
                <br />
                <br />
                <br />
            </form>
            <br />
            <br />
            <br />
            <br />
            <K2RaisedButton onClick={props.handleClickWhatServerSees}>What server sees</K2RaisedButton>
        </Fragment>
    );
};
