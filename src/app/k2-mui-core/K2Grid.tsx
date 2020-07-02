import React, { FunctionComponent, ReactElement, useState } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { K2Row } from './K2Row';
import { K2RaisedButton } from './K2RaisedButton';
import { RowNode, GridApi } from 'ag-grid-community';
import RefreshIcon from '@material-ui/icons/Refresh';
import { K2FlatButton } from './K2FlatButton';
import { makeStyles } from '@material-ui/core';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';

export interface K2GridProps extends AgGridReactProps {
    columnDefs: any;
    rowData: any;
    title?: string;
    deleteFunction?: any;
    handleChangeSelection?: Function;
    suppressRowClickSelection?: boolean;
    height?: string;
    rowSelection?: string;
}

const useStyles = makeStyles((theme) => {
    return {
        iconButtons: {
            minWidth: 18,
            height: 18,
            maxHeight: 18,
            padding: 0,
            marginTop: 3,
            marginRight: 5,
            marginLeft: 17
        },
        displayedRecords: {
            fontSize: '0.875rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
            fontWeight: 500,
            lineHeight: 1.75,
            letterSpacing: '0.02857em',
            textTransform: 'uppercase',
            maxHeight: 21,
            minWidth: 21,
            float: 'right',
            marginRight: 22,
            color: '#3f51b5'
        }
    };
});

function isFirstColumn(params: any) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}

const defaultColumnDef = {
    sortable: true,
    filter: true,
    resizable: true,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn
    //lockPosition: true
    //editable: false
};

export const K2Grid: FunctionComponent<K2GridProps> = (props): ReactElement => {
    const classes = useStyles();
    const rowSelection = props.rowSelection ? props.rowSelection : 'multiple';
    let selectedRows = [];
    const [showButtons, setShowButtons] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [api, setApi] = useState(new GridApi());

    const handleSelectionChanged = (params: any) => {
        selectedRows = params.api.getSelectedRows();
        if (props.handleChangeSelection) {
            let isCallHandleChange = false as boolean;
            const updatedRowData = params.api.getModel().rowsToDisplay.map((rowNode: RowNode) => {
                if (rowNode.isSelected() === rowNode.data.selected) {
                    // if no change to data, just return data; helps with grid initialization
                    return rowNode.data;
                } else {
                    isCallHandleChange = true;
                    return Object.assign({}, rowNode.data, { selected: rowNode.isSelected() });
                }
            });

            if (isCallHandleChange === true) {
                props.handleChangeSelection(updatedRowData, selectedRows);
            }
        } else {
            setShowButtons(selectedRows.length > 0);
        }
    };

    const handleFirstDataRendered = (params: any) => {
        params.api.sizeColumnsToFit();
        setRowCount(params.api.getDisplayedRowCount());
        setApi(params.api);
    };

    const handleGridSizeChanged = (params: any) => {
        params.api.sizeColumnsToFit();
    };

    const handleNewColumnsLoaded = (params: any) => {
        params.api.sizeColumnsToFit();
    };

    const handleRefresh = () => {
        api.refreshView();
    };

    const handleExport = () => {
        api.exportDataAsCsv();
    };

    const handleGridReady = (params: any) => {
        const rowNodes = params.api.getModel().rowsToDisplay;
        rowNodes.forEach((rowNode: RowNode, index: number) => {
            rowNode.setSelected(rowNode.data.selected);
        });
    };

    const height = props.height ? props.height : '500px';

    return (
        <div style={{ height: '100%' }}>
            {props.title ? (
                <div>
                    <h2>{props.title}</h2> <br />
                </div>
            ) : null}
            {showButtons ? (
                <div>
                    <br />
                    <K2Row>
                        <K2RaisedButton fullWidth={false} onClick={props.deleteFunction}>
                            DELETE Element(s)
                        </K2RaisedButton>
                    </K2Row>
                    <br />
                </div>
            ) : null}
            <div style={{ height: height, width: '100%' }} className="ag-theme-alpine">
                <div style={{ height: 'calc(100% - 22px)' }}>
                    <AgGridReact
                        rowSelection={rowSelection}
                        defaultColDef={defaultColumnDef}
                        onSelectionChanged={handleSelectionChanged}
                        onFirstDataRendered={handleFirstDataRendered}
                        onGridSizeChanged={handleGridSizeChanged}
                        onNewColumnsLoaded={handleNewColumnsLoaded}
                        onGridReady={handleGridReady}
                        {...props}
                    ></AgGridReact>
                </div>
                <K2Row>
                    <div>
                        <K2FlatButton className={classes.iconButtons} onClick={handleRefresh} title="Refresh">
                            <RefreshIcon fontSize="small" />
                        </K2FlatButton>
                        <K2FlatButton className={classes.iconButtons} onClick={handleExport} title="Export as CSV">
                            <AssignmentReturnedIcon fontSize="small" /> Export
                        </K2FlatButton>
                    </div>
                    <div className={classes.displayedRecords}>{rowCount} records</div>
                </K2Row>
            </div>
        </div>
    );
};
