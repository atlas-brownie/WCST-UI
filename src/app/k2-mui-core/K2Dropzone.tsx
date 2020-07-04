import React, { FunctionComponent, ReactElement } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import '../../scss/k2-mui-core/_k2-dropzone.scss';
import { ModelBase } from 'app/shared';

export interface K2DropzoneProps extends DropzoneProps {
    //file: any[];
}

export const K2Dropzone: FunctionComponent<K2DropzoneProps> = ({ children, ...props }): ReactElement => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ ...props });

    const files = acceptedFiles.map((file: any) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="k2-dropzone-container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {!!acceptedFiles.length && (
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>
            )}
        </section>
    );
};

export class DropzoneDefinition extends ModelBase {
    constructor(properties: K2DropzoneProps) {
        super();
        this.override(properties);
    }
}
