import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../scss/k2-mui-core/_k2-image-dropzone.scss';

export interface K2ImageDropzoneProps {
    //file: any[];
}

const styles = {
    thumb: {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    } as React.CSSProperties,

    thumbsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    } as React.CSSProperties,

    thumbInner: {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    } as React.CSSProperties,

    img: {
        display: 'block',
        width: 'auto',
        height: '100%'
    } as React.CSSProperties
};

export const K2ImageDropzone: FunctionComponent<K2ImageDropzoneProps> = ({ children, ...props }): ReactElement => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            setFiles(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const thumbs = files.map((file: any) => (
        <div style={styles.thumb} key={file.name}>
            <div style={styles.thumbInner}>
                <img src={file.preview} alt={file} style={styles.img} />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className="k2-dropzone-container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className="attachement-container" style={styles.thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
};
