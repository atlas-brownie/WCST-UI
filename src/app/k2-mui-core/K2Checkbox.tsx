import React, { FunctionComponent, ReactElement } from 'react';
import { Checkbox, CheckboxProps, FormControlLabel } from '@material-ui/core';

export interface K2CheckboxProps extends CheckboxProps {
    label?: string;
    labelPlacement?: any;
}

export const K2Checkbox: FunctionComponent<K2CheckboxProps> = (props): ReactElement => {
    return <FormControlLabel control={<Checkbox {...props} />} label={props.label} labelPlacement={props.labelPlacement}/>
};
