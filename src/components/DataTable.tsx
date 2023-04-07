import React from "react";

import {
  PaginationState,
  getPaginationRowModel,
  getCoreRowModel,
  ColumnDef,
  useReactTable,
  getSortedRowModel,
  SortingState,
  RowData,
} from "@tanstack/react-table";

import { TableContext } from "../TableContext";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import {
  Table as MuiTable,
  Paper,
  TableContainer,
} from "@mui/material";
import { makeData } from "../util/makeData";
import TablePagination from "./TablePagination";
import useSkipper from "../hooks/useSkipper";
import { defaultColumn } from "./DefaultColumn";
import { rowSelectionOption } from "./RowSelection";
import { DataTableProp } from "../types/TableControl";
import { TableOptionContext } from "../TableOptionContext";

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

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data:props.data ?? [],
    columns:[rowSelectionOption,...props.columns],
    defaultColumn,
    state: {
      rowSelection,
      sorting,
    },
    onSortingChange: setSorting,
    columnResizeMode: "onChange",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    manualPagination:true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        props.onCellUpdate({rowIndex,columnId,value})
      },
    },
  });

  

  return (
    <TableContext.Provider value={table}>
    <TableOptionContext.Provider value={props.tableOptions}>
      <TableContainer component={Paper}>
        <MuiTable sx={{ width: "100%" || table.getCenterTotalSize() }}>
          <TableHead />
          <TableBody loading={props.loading ?? false} />
        </MuiTable>
        <TablePagination />
      </TableContainer>
      </TableOptionContext.Provider>
    </TableContext.Provider>
  );
};

export default DataTable;
