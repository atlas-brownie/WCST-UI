import React, { FunctionComponent, ReactElement } from 'react';
import { Button, Dialog, DialogProps, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { FuncAny } from 'app/shared';
import { isEmpty } from 'lodash';

export interface K2DialogActions {
    label: string;
    onClick: FuncAny;
}

export interface K2DialogProps extends DialogProps {
    title?: string;
    actions?: K2DialogActions[];
}

const isActionsVisible = (props: K2DialogProps) => {
    return !isEmpty(props.actions);
};

export const K2Dialog: FunctionComponent<K2DialogProps> = ({ children, ...props }): ReactElement => {
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" fullWidth={props.fullWidth || false} maxWidth={props.maxWidth || 'xl'}>
            {props.title ? <DialogTitle id="form-dialog-title">{props.title}</DialogTitle> : null}
            <DialogContent>{children}</DialogContent>
            {isActionsVisible(props) && (
                <DialogActions>
                    {props.actions?.map((action, index) => {
                        return (
                            <Button key={`btn-${index}`} onClick={action.onClick} color="primary">
                                {action.label}
                            </Button>
                        );
                    })}
                </DialogActions>
            )}
        </Dialog>
    );
};
