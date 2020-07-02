import React, { FunctionComponent, ReactElement } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface DropDownProps {
    rowData: any;
    dropDownProps?: any;
}

export const DropDown: FunctionComponent<DropDownProps> = (props): ReactElement => {
    const [dropdown, setDropdown] = React.useState('');

    const handleChange = (event: any) => {
        setDropdown(event.target.value);
    };

    let hasDropDownProps = false;

    if (props.dropDownProps) {
        hasDropDownProps = props.dropDownProps.length > 0 ? true : false;
    }

    return (
        <div style={{ maxWidth: '100%' }}>
            {hasDropDownProps ? (
                <Select style={{ width: '200px' }} placeholder={props.rowData.status} value={dropdown} onChange={handleChange}>
                    {props.dropDownProps.map((item: any, itemIdx: number) => (
                        <MenuItem value={itemIdx}>{item}</MenuItem>
                    ))}
                </Select>
            ) : (
                <Select style={{ width: '200px' }} placeholder={props.rowData.status} value={dropdown} onChange={handleChange}>
                    <MenuItem value={0}>To-Do</MenuItem>
                    <MenuItem value={1}>In-Progress</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>
                </Select>
            )}
        </div>
    );
};
