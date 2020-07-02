import React, { FunctionComponent, ReactElement } from 'react';
import { useTable, useExpanded, useRowSelect, Hooks } from 'react-table';
import styled from 'styled-components';
import { K2Checkbox } from './K2Checkbox';

export interface K2MasterDetailGridProps {
    columnDefs: any;
    rowData: any;
}

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;
        width: 100%;
        display: flex;
        flex-direction: column;

        tr {
            display: inline-flex;
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        thead {
            display: sticky;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
        }

        tbody {
            overflow-y: auto;
            height: 70vh;
            display: flex;
            flex-direction: column;
        }

        th,
        td {
            justify-content: center;
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;
            display: inline-flex;
            min-height: 59px;
            height: 100%;
            flex: 100 0 auto;
            width: 100px;

            :last-child {
                border-right: 0;
            }
        }

        td {
            input {
                font-size: 1rem;
                padding: 0;
                margin: 0;
                border: 0;
            }
        }
    }

    .pagination {
        padding: 0.5rem;
    }
`;

const selectionHook = (hooks: Hooks<any>) => {
    hooks.allColumns.push((columns: any) => [
        // Let's make a column for selection
        {
            id: '_selector',
            disableResizing: true,
            disableGroupBy: true,
            minWidth: 45,
            width: 45,
            maxWidth: 45,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    &nbsp;&nbsp;&nbsp;
                    <K2Checkbox {...getToggleAllRowsSelectedProps()} />
                </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: any) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span {...row.getToggleRowExpandedProps()}>&nbsp;&nbsp;&nbsp;&nbsp;{row.isExpanded ? '👇' : '👉'}&nbsp;&nbsp;&nbsp;</span>
                    <K2Checkbox {...row.getToggleRowSelectedProps()} />
                </div>
            )
        },
        ...columns
    ]);
    // hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    //     // fix the parent group of the selection button to not be resizable
    //     const selectionGroupHeader = headerGroups[0].headers[0];
    // });
};

export const K2MasterDetailGrid: FunctionComponent<K2MasterDetailGridProps> = (props): ReactElement => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns: props.columnDefs,
            data: props.rowData
        },
        useExpanded,
        useRowSelect,
        selectionHook
    );

    const element: any = React.Children.toArray(props.children)[0];

    return (
        <Styles>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any, i) => {
                        prepareRow(row);
                        return (
                            <>
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell: any) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                <>{cell.render('Cell', { editable: false })}</>
                                            </td>
                                        );
                                    })}
                                </tr>
                                {row.isExpanded && props.children ? (
                                    <tr role="row">
                                        <td colSpan={props.columnDefs.length + 1}>{React.cloneElement(element, { data: row.original })}</td>
                                    </tr>
                                ) : null}
                            </>
                        );
                    })}
                </tbody>
            </table>
        </Styles>
    );
};
