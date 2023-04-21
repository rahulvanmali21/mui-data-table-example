import React, { useEffect } from "react";

import {
  PaginationState,
  getGroupedRowModel,
  getPaginationRowModel,
  getCoreRowModel,
  ColumnOrderState,
  useReactTable,
  getSortedRowModel,
  SortingState,
  RowData,
  VisibilityState,
  getExpandedRowModel,
  getFilteredRowModel,
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
import ColumnDragAndDrop from "../ColumnDragAndDropContext";
import TableToolbar from "./TableToolbar";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    type?: string;
  }
}

const DataTable = (props: DataTableProp) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = React.useState({});

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  let columns = [rowSelectionOption, ...props.columns];
  const tableOptions = props.tableOptions;

  if (tableOptions?.subComponentOptions) {
    if (tableOptions?.subComponentOptions.position === "start") {
      columns = [RowExpander, ...columns];
    } else {
      columns.push(RowExpander);
    }
  }
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string)
  );

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
    enableGrouping: true,
    enableMultiSort: true,
    onRowSelectionChange: setRowSelection,
    ...(
      tableOptions?.manualPagination && {onPaginationChange:  ()=>setRowSelection({})}
    ),
  
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    manualPagination: tableOptions?.manualPagination,
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

  // data,
  // columns,
  // // Pipeline
  // getCoreRowModel: getCoreRowModel(),
  // getFilteredRowModel: getFilteredRowModel(),
  // getPaginationRowModel: getPaginationRowModel(),
  // //
  // debugTable: true,

  return (
    <TableContext.Provider value={table}>
      <TableOptionContext.Provider value={tableOptions}>
        <ColumnDragAndDrop>
          <TableToolbar />
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              maxWidth: "100%",
              overflowX: "auto",
              borderRadius: 0,
              borderBottom: 0,
            }}
          >
            <MuiTable
              stickyHeader
              sx={{ width: `clamp(100%,${table.getCenterTotalSize()}px,600%)` }}
            >
              <TableHead />
              <TableBody />
              <TableFooter />
            </MuiTable>
          </TableContainer>
          <TablePagination />
        </ColumnDragAndDrop>
      </TableOptionContext.Provider>
    </TableContext.Provider>
  );
};

export default DataTable;
