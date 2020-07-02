import * as K2 from 'app/k2-mui-core';
import { ModelBase } from 'app/shared';

const menuitems = [
    { code: undefined, description: 'Choose...' },
    { code: 'T1', description: 'Sample LOV 1' },
    { code: 'T2', description: 'Sample LOV 2' },
    { code: 'T3', description: 'Sample LOV 3' }
];

const cols: object[] = [
    { headerName: 'Col 1', field: '1' },
    { headerName: 'Col 2', field: '2' },
    { headerName: 'Col 3', field: '3' }
];

const rowData = [
    { '1': '1', '2': '2', '3': '3' },
    { '1': '4', '2': '5', '3': '6' }
];

export class ComponentsFormDefinitions {
    card: K2.K2CardProps = { children: 'Card' };
    textField: K2.K2TextFieldProps = { label: 'TextField', name: 'textField', required: false, value: 'Hello, World' };
    multiline: K2.K2MultilineTextFieldProps = { label: 'Multiline Text Field', name: 'multiline', required: false };
    error: K2.K2AlertProps = { severity: 'error', message: 'Error Alert' };
    warning: K2.K2AlertProps = { severity: 'warning', message: 'Warning Alert' };
    info: K2.K2AlertProps = { severity: 'info', message: 'Info Alert' };
    success: K2.K2AlertProps = { severity: 'success', message: 'Sucess Alert' };
    select: K2.K2SelectProps = { label: 'select', name: 'select', required: false, menuitems };
    dropzone: K2.K2DropzoneProps = {};
    fileAttachment: K2.K2FileAttachmentProps = { label: 'File Attachment', onDrop: () => {} };
    imageDropzone: K2.K2ImageDropzoneProps = { label: 'Image Dropzone' };
    inlineDatePicker: K2.K2InlineDatePickerProps = { label: 'Inline DatePicker', disablePast: true, name: 'inlineDatePicker' };
    grid: K2.K2GridProps = { title: 'Sample Grid', columnDefs: cols, rowData };
}

export class ComponentsClass extends ModelBase {
    textField: string;
    multiline: string;
    select: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export const Components = new ComponentsClass();
