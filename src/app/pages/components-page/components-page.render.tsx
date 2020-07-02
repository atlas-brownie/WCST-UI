import React, { FunctionComponent, ReactElement } from 'react';
import * as K2 from 'app/k2-mui-core';
import './components-page.scss';
import { ComponentsFormDefinitions } from 'app/models';

class Props {
    formControls: any;
    formDefinitions: ComponentsFormDefinitions;
}

export class ComponentsPageRender extends K2.K2Render<Props> {
    constructor(props?: Props) {
        super();
        this.override({ props });
    }

    props = new Props();
    Component: FunctionComponent<Props> = ({ formControls, formDefinitions, ...props }): ReactElement => {
        return (
            <div className="components-page">
                <K2.K2Form {...formControls}>
                    <h1>Custom K2 Components by Kube Kai</h1>
                    <K2.K2Row>
                        <h3>Split Pane &amp; Panes</h3>
                        <K2.K2SplitPane split="vertical">
                            <K2.K2Pane>Pane 1</K2.K2Pane>
                            <K2.K2Pane>&nbsp; Pane 2</K2.K2Pane>
                            <K2.K2Pane>&nbsp; Pane 3</K2.K2Pane>
                        </K2.K2SplitPane>
                    </K2.K2Row>
                    <br />

                    <K2.K2Row>
                        <h3>Card:</h3>
                        <K2.K2Card {...formDefinitions.card} />
                    </K2.K2Row>
                    <br />
                    <h3>
                        Rows: Automatically spaced by the number of elements in them. Each of the following is only one row, but the numbers inside the elements display values that
                        can be added to a row to dictate its size
                    </h3>
                    <h4>1 Element:</h4>
                    <K2.K2Row spacing={1} xs={12} item={true}>
                        <K2.K2RaisedButton>xs=12</K2.K2RaisedButton>
                    </K2.K2Row>
                    <h4>2 Elements:</h4>
                    <K2.K2Row spacing={1}>
                        <K2.K2RaisedButton>xs=6</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=6</K2.K2RaisedButton>
                    </K2.K2Row>
                    <h4>3 Elements:</h4>
                    <K2.K2Row spacing={1}>
                        <K2.K2RaisedButton>xs=4</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=4</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=4</K2.K2RaisedButton>
                    </K2.K2Row>
                    <h4>4 Elements:</h4>
                    <K2.K2Row spacing={1}>
                        <K2.K2RaisedButton>xs=3</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=3</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=3</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=3</K2.K2RaisedButton>
                    </K2.K2Row>
                    <h4>6 Elements:</h4>
                    <K2.K2Row spacing={1}>
                        <K2.K2RaisedButton>xs=2</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=2</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=2</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=2</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=2</K2.K2RaisedButton>
                        <K2.K2RaisedButton>xs=2</K2.K2RaisedButton>
                    </K2.K2Row>
                    <br />
                    <h3>Column: Displays child elements in a column</h3>
                    <K2.K2Column>
                        <K2.K2RaisedButton>Child 1</K2.K2RaisedButton>
                        <K2.K2RaisedButton>Child 2</K2.K2RaisedButton>
                        <K2.K2RaisedButton>Child 3</K2.K2RaisedButton>
                        <K2.K2RaisedButton>Child 4</K2.K2RaisedButton>
                    </K2.K2Column>
                    <br />
                    <K2.K2Row>
                        <h3>Flat Button:</h3>
                        <K2.K2FlatButton>Flat Button</K2.K2FlatButton>
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <h3>Raised Button:</h3>
                        <K2.K2RaisedButton fullWidth={false}>Raised Button</K2.K2RaisedButton>
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <h3>Text Field:</h3>
                        <K2.K2TextField {...formDefinitions.textField} />
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <div>
                            <h3>Multiline Text Field:</h3>
                            <K2.K2MultilineTextField fullWidth rows={2} rowsMax={10} label="Multiline Text Field" {...formDefinitions.multiline} />
                        </div>
                    </K2.K2Row>
                    <br />
                    <K2.K2Row justify="space-between" spacing={1}>
                        <h3>Alerts:</h3>
                        <K2.K2Alert {...formDefinitions.error}>{formDefinitions.error.message}</K2.K2Alert>
                        <K2.K2Alert {...formDefinitions.warning}>{formDefinitions.warning.message}</K2.K2Alert>
                        <K2.K2Alert {...formDefinitions.info}>{formDefinitions.info.message}</K2.K2Alert>
                        <K2.K2Alert {...formDefinitions.success}>{formDefinitions.success.message}</K2.K2Alert>
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <h3>Select:</h3>
                        <K2.K2Select {...formDefinitions.select} />
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <h3>Inline Date Picker:</h3>
                        <K2.K2InlineDatePicker {...formDefinitions.inlineDatePicker} />
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <div>
                            <h3>Grid:</h3>
                            <K2.K2Grid {...formDefinitions.grid}></K2.K2Grid>
                        </div>
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <div>
                            <h3>Dropzone:</h3>
                            <K2.K2Dropzone {...formDefinitions.dropzone} />
                        </div>
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <div>
                            <h3>File Attachment:</h3>
                            <K2.K2FileAttachment {...formDefinitions.fileAttachment} />
                        </div>
                    </K2.K2Row>
                    <br />
                    <K2.K2Row>
                        <div>
                            <h3>Image Dropzone:</h3>
                            <K2.K2ImageDropzone {...formDefinitions.imageDropzone} />
                        </div>
                    </K2.K2Row>
                    <br />
                    <K2.K2RaisedButton type="submit">Test Submit</K2.K2RaisedButton>
                </K2.K2Form>
            </div>
        );
    };
}
