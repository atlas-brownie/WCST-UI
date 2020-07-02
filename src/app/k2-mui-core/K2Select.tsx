import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { MenuItem, TextField, OutlinedTextFieldProps } from '@material-ui/core';
import { getIn } from 'formik';
import { FormContext } from '.';

export interface K2SelectProps extends Omit<OutlinedTextFieldProps, 'variant' | 'multiline' | 'aria-multiline'> {
    menuitems: any[];
}

function mapFormikControlsToTextField(formContext: any, props: K2SelectProps): OutlinedTextFieldProps {
    const { name = '' } = props;
    const fieldError = getIn(formContext.errors, name);
    const showError = getIn(formContext.touched, name) && !!fieldError;
    const placeholder = props.placeholder || 'Select ' + props.label;

    return {
        ...props,
        ...formContext.getFieldProps(name),
        select: true,
        fullWidth: true,
        error: showError,
        helperText: showError ? fieldError : props.helperText,
        placeholder,
        disabled: props.disabled,
        multiline: false,
        'aria-multiline': 'false',
        size: 'small',
        variant: 'outlined'
    };
}

const mockData = [
    { code: undefined, description: 'Choose...' },
    { code: 'T1', description: 'Default Sample LOV 1' },
    { code: 'T2', description: 'Default Sample LOV 2' },
    { code: 'T3', description: 'Default Sample LOV 3' }
];

export const K2Select: FunctionComponent<K2SelectProps> = ({ children, ...props }): ReactElement => {
    const formContext = useContext(FormContext);
    const definitions = props.menuitems || mockData;
    return (
        <TextField {...mapFormikControlsToTextField(formContext, props)}>
            {definitions.map((item, i) => (
                <MenuItem value={item.code} key={i}>
                    {item.description}
                </MenuItem>
            ))}
        </TextField>
    );
};
