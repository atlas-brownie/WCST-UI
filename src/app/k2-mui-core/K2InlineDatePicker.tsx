import React, { FunctionComponent, ReactElement, useContext, useState, Dispatch } from 'react';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { getIn } from 'formik';
import { FormContext } from './';
import '../../scss/k2-mui-core/_k2-dropzone.scss';

export interface K2InlineDatePickerProps extends Omit<KeyboardDatePickerProps, 'value' | 'error' | 'onChange'> {}

function mapFormikControlsToTextField(formContext: any, props: K2InlineDatePickerProps, value: string, setValue: Dispatch<any>): KeyboardDatePickerProps {
    const { name = '', label = '', required = false, autoComplete = 'off' } = props;
    const displayLabel = required ? `${label}*` : label;
    const fieldError = getIn(formContext.errors, name);
    const showError = getIn(formContext.touched, name) && !!fieldError;
    const placeholder = props.placeholder || 'Type ' + props.label;

    return {
        ...props,
        label: displayLabel,
        ...formContext.getFieldProps(name),
        error: showError,
        fullWidth: true,
        helperText: showError ? fieldError : props.helperText,
        placeholder,
        disabled: props.disabled,
        size: 'small',
        disableToolbar: true,
        inputVariant: 'outlined',
        variant: 'inline',
        format: 'MM/dd/yyyy',
        KeyboardButtonProps: {
            'aria-label': 'change date'
        },
        autoOk: true,
        mask: '__/__/____',
        autoComplete,
        value,
        onFocus: (evt) => {
            formContext.setFieldTouched(name, false);
        },
        onChange: (date: Date | null) => {
            setValue(date);
        },
        onBlur: (evt) => {
            formContext.setFieldTouched(name, true);
            formContext.setFieldValue(name, value);
        },
        onAccept: (date: Date | null) => {
            formContext.setFieldValue(name, date);
            formContext.setFieldTouched(name, false);
        }
    };
}

export const K2InlineDatePicker: FunctionComponent<K2InlineDatePickerProps> = ({ children, ...props }): ReactElement => {
    const formContext: any = useContext(FormContext);
    const [value, setValue] = useState(formContext.getFieldProps(props.name).value);
    // Keep an eye on @date-io/date-fns - it is finicky but necessary for @material-ui/pickers to function
    return <KeyboardDatePicker {...mapFormikControlsToTextField(formContext, props, value, setValue)} />;
};
