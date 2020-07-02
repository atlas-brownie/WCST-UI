import React from 'react';
import { K2RaisedButton, K2FlatButton, K2TextField, K2FileAttachment, K2Row } from 'app/k2-mui-core';

export default {
    title: 'Core Components'
};

export const RaisedButton = () => <K2RaisedButton>Raised Button</K2RaisedButton>;
export const FlatButton = () => <K2FlatButton>Flat Button</K2FlatButton>;
export const TextField = () => <K2TextField name="f1" label="My Label" placeholder="The Placeholder" />;
export const TextFieldError = () => <K2TextField name="f1" label="My Label" placeholder="The Placeholder" error={true} defaultValue="Bad Value" helperText="Incorrect entry." />;
export const FileUpload = () => <K2FileAttachment onDrop={() => {}} />;

export const Row = () => (
    <K2Row>
        <div>Row Item 1</div>
        <div>Row Item 2</div>
        <div>Row Item 3</div>
        <div>Row Item 4</div>
    </K2Row>
);
