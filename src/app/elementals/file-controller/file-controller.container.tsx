import React, { FunctionComponent, ReactElement, useState } from 'react';
import { FileControllerRender, FileControllerRenderProps } from './file-controller.render';
import Papa from 'papaparse';
import { postApplication$ } from 'app/pages/applicant-page/applicant.service';
import { selectUser } from 'app/app.service';
import { useSelector } from 'react-redux';
import { User } from 'app/shared';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { SupervisorReview } from 'app/models';

export interface FileControllerProps {
    show: boolean;
    setShow: any;
}

const buildFormControls = (formData: any, onSubmit: any) => {
    return {
        initialValues: formData.toJSON,
        validationSchema: Yup.object({
            applicationType: Yup.string().required('Application Type is Required')
        }),
        onSubmit
    };
};

export const FileController: FunctionComponent<FileControllerProps> = ({ show, setShow }): ReactElement => {
    const [file, setFile] = useState(new File([], ''));
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const user = useSelector(selectUser) || new User({ firstName: 'Pete', roles: ['PUBLIC'] });

    const UploadForm = new SupervisorReview({
        applicationType: ''
    });

    const cancelFunc = () => {
        setShow(false);
    };

    const uploadFunc = (values: SupervisorReview) => {
        if (file.name !== '') {
            setShowSuccess(false);
            setShowWarning(false);
            postApplication$(user.email, values.applicationType);
            setShowSuccess(true);
        } else {
            setShowSuccess(false);
            setShowWarning(true);
        }
    };

    const controls = useFormik(buildFormControls(UploadForm, uploadFunc));

    const definitions: FileControllerRenderProps = {
        controls,
        handleChange: (files: File[]) => {
            setFile(files[0]);

            // let data: any;
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: function (results: any) {
                    // data = results;
                }
            });
        },
        show,
        showWarning,
        showSuccess,
        cancelFunc,
        uploadFunc,
        applicationType: { name: 'applicationType', required: true, label: 'Application Type' }
    };
    return <FileControllerRender {...definitions} />;
};
