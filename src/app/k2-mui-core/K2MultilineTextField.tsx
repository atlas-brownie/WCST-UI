import React, { FunctionComponent, ReactElement, useContext, useState, Dispatch } from 'react';
import { TextField, OutlinedTextFieldProps } from '@material-ui/core';
import { getIn } from 'formik';
import { FormContext } from './';

export interface K2MultilineTextFieldProps extends Omit<OutlinedTextFieldProps, 'variant' | 'multiline | aria-multiline'> {}

function mapFormikControlsToTextField(formContext: any, props: K2MultilineTextFieldProps, value: string, setValue: Dispatch<any>): OutlinedTextFieldProps {
    const { name = '', label = '', required = false, autoComplete = 'off' } = props;
    const displayLabel = required ? `${label}*` : label;
    const fieldError = getIn(formContext.errors, name);
    const showError = getIn(formContext.touched, name) && !!fieldError;
    const placeholder = props.placeholder || 'Type ' + props.label;
    const fieldProps = formContext.getFieldProps(name);

    return {
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
        onFocus: (evt) => {
            formContext.setFieldTouched(name, false);
        },
        onChange: (evt) => {
            setValue(evt.target.value);
        },
        onBlur: (evt) => {
            formContext.setFieldTouched(name, true);
            fieldProps.onChange(evt);
        }
    };
}

export const K2MultilineTextField: FunctionComponent<K2MultilineTextFieldProps> = ({ children, ...props }): ReactElement => {
    const formContext: any = useContext(FormContext);
    const [value, setValue] = useState(formContext.getFieldProps(props.name).value);
    return (
        <TextField {...mapFormikControlsToTextField(formContext, props, value, setValue)} multiline aria-multiline="true">
            {children}
        </TextField>
    );
};
