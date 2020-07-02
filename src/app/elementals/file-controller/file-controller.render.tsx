import React, { FunctionComponent, ReactElement } from 'react';
import './file-controller.scss';
import { K2FileAttachment, K2FlatButton, K2Row, K2RaisedButton, K2Alert, K2TextField, K2TextFieldProps, K2Form } from 'app/k2-mui-core';
import { FuncAny } from 'app/shared';

export interface FileControllerRenderProps {
    controls: any;
    handleChange: FuncAny;
    show: boolean;
    showWarning: boolean;
    showSuccess: boolean;
    cancelFunc: any;
    uploadFunc: any;
    applicationType: K2TextFieldProps;
}

export const FileControllerRender: FunctionComponent<FileControllerRenderProps> = ({
    controls,
    handleChange,
    show,
    showWarning,
    showSuccess,
    cancelFunc,
    uploadFunc,
    applicationType
}): ReactElement => {
    return (
        <div>
            {show ? (
                <div>
                    <K2FileAttachment onDrop={handleChange} />
                    <br />
                    <K2Form {...controls}>
                        <K2TextField {...applicationType} />
                        <br />
                        <br />
                        {showWarning ? (
                            <div>
                                <K2Alert severity={'error'}>ERROR: No file uploaded</K2Alert> <br />
                            </div>
                        ) : null}
                        {showSuccess ? (
                            <div>
                                <K2Alert severity={'success'}>SUCCESS: File uploaded!</K2Alert> <br />
                            </div>
                        ) : null}
                        <K2Row justify="space-evenly" spacing={3}>
                            <div>
                                <K2FlatButton onClick={cancelFunc}>Cancel</K2FlatButton>
                                &nbsp;&nbsp;&nbsp;
                                <K2RaisedButton type="submit" fullWidth={false}>
                                    Upload
                                </K2RaisedButton>
                            </div>
                        </K2Row>{' '}
                    </K2Form>
                </div>
            ) : null}
        </div>
    );
};
