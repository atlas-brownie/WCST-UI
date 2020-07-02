import React, { FunctionComponent, ReactElement } from 'react';
import { DropzoneArea, DropzoneAreaProps } from 'material-ui-dropzone';

export interface K2FileAttachmentProps extends DropzoneAreaProps {
    label?: string;
}

export const K2FileAttachment: FunctionComponent<K2FileAttachmentProps> = ({ onDrop }): ReactElement => {
    return <DropzoneArea onDrop={onDrop} />;
};
