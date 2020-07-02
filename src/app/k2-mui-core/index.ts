import React from 'react';
import { ModelBase } from 'app/shared';
//THIS NEEDS TO STAY IN HERE FOR PLOP
/* PLOP_INJECT_EXPORT */
export * from './K2MasterDetailGrid';
export * from './K2Divider';
export * from './K2Checkbox';
export * from './K2Dialog';
export * from './K2TabSectionContainer';
export * from './K2Pane';
export * from './K2SplitPane';
export * from './K2Section';
export * from './K2Card';
export * from './K2TabContainer';
export * from './K2ToggleButton';

export * from './K2Form';
export * from './K2FileAttachment';
export * from './K2FlatButton';
export * from './K2RaisedButton';
export * from './K2Row';
export * from './K2TextField';
export * from './K2MultilineTextField';
export * from './K2Grid';
export * from './K2Column';
export * from './K2Select';
export * from './K2Dropzone';
export * from './K2ImageDropzone';
export * from './K2InlineDatePicker';
export * from './K2Alert';
export * from './K2Tree';

export class K2Render<T> extends ModelBase {
    props: T;
    Component: React.FunctionComponent<T>;

    display() {
        return React.createElement(this.Component, this.props);
    }
}
