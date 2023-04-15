import React from "react";

import {
  PaginationState,
  getPaginationRowModel,
  getCoreRowModel,
  ColumnDef,
  ColumnOrderState,
  useReactTable,
  getSortedRowModel,
  SortingState,
  RowData,
  VisibilityState,
  getExpandedRowModel,
} from "@tanstack/react-table";

import { TableContext } from "../TableContext";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { Table as MuiTable, Paper, TableContainer } from "@mui/material";
import TablePagination from "./TablePagination";
import useSkipper from "../hooks/useSkipper";
import { defaultColumn } from "./DefaultColumn";
import { rowSelectionOption } from "./RowSelection";
import { DataTableProp } from "../types/TableControl";
import { TableOptionContext } from "../TableOptionContext";
import { RowExpander } from "./ExpanderColumn";
import TableFooter from "./TableFooter";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    type?: string;
  }
}

const DataTable = (props: DataTableProp) => {
  //   const [data, setData] = React.useState<Person[]>(makeData(311));

  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});


  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  let columns = [rowSelectionOption, ...props.columns];


  if(props.tableOptions?.subComponentOptions){
    if(props.tableOptions?.subComponentOptions.position === "start"){
      columns = [RowExpander,...columns]
    }else{
      columns.push(RowExpander)
    }
  }

  
  const table = useReactTable({
    data: props.data ?? [],
    columns: columns,
    defaultColumn,
    state: {
      rowSelection,
      sorting,
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    getRowCanExpand: () => true,
    onSortingChange: setSorting,
    columnResizeMode: "onChange",
    enableRowSelection: true,
    onRowSelectionChange: (row) => {
      setRowSelection(row);
    },
    onPaginationChange: () => {
      props.tableOptions?.manualPagination && setRowSelection({});
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    manualPagination: props.tableOptions?.manualPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        props.onCellUpdate({ rowIndex, columnId, value });
      },
    },
  });

  return (
    <TableContext.Provider value={table}>
      <TableOptionContext.Provider value={props.tableOptions}>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ maxWidth: "100%", overflowX: "auto" }}
        >
          <MuiTable stickyHeader sx={{width:`clamp(100%,${table.getCenterTotalSize()}px,600%)`}}>
            <TableHead />
            <TableBody/>
            <TableFooter/>
          </MuiTable>
        </TableContainer>
        <TablePagination />

      </TableOptionContext.Provider>
    </TableContext.Provider>
  );
};

export default DataTable;
