import React, { FunctionComponent, ReactElement } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export interface K2ToggleButtonProps {
    buttons?: any;
}

export const K2ToggleButton: FunctionComponent<K2ToggleButtonProps> = (props): ReactElement => {
    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
            {props.buttons.map((item: any, itemIdx: number) => (
                <ToggleButton value={item.value} aria-label={item.ariaLabel}>
                    {item.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};
