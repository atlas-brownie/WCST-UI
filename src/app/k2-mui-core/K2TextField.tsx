import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { TextField, OutlinedTextFieldProps } from '@material-ui/core';
import { getIn } from 'formik';
import { FormContext } from './';

export interface K2TextFieldProps extends Omit<OutlinedTextFieldProps, 'variant' | 'multiline | aria-multiline'> {}

function mapFormikControlsToTextField(formContext: any, props: K2TextFieldProps, value: string): OutlinedTextFieldProps {
    const { name = '', label = '', required = false, autoComplete = 'off' } = props;
    const displayLabel = required ? `${label}*` : label;
    const fieldError = getIn(formContext.errors, name);
    const showError = getIn(formContext.touched, name) && !!fieldError;
    const placeholder = props.placeholder || 'Type ' + props.label;
    const fieldProps = formContext.getFieldProps(name);

    const textFieldProps: OutlinedTextFieldProps = {
        ...props,
        label: displayLabel,
        required: false,
        error: showError,
        fullWidth: true,
        helperText: showError ? fieldError : props.helperText,
        placeholder,
        disabled: props.disabled,
        size: 'small',
        variant: 'outlined',
        autoComplete,
        value,
        multiline: false,
        'aria-multiline': 'false',
        onFocus: (evt) => {
            formContext.setFieldTouched(name, false);
        },
        onChange: (evt) => {
            fieldProps.onChange(evt);
        },
        onBlur: (evt) => {
            formContext.setFieldTouched(name, true);
            // formContext.setFieldValue(name, value);
            fieldProps.onChange(evt);
        }
    };
    return textFieldProps;
}

export const K2TextField: FunctionComponent<K2TextFieldProps> = (props): ReactElement => {
    const formContext: any = useContext(FormContext);
    const fieldValue = formContext.getFieldProps(props.name).value;
    return <TextField {...mapFormikControlsToTextField(formContext, props, fieldValue)} />;
};
