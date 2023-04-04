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
  InputBase,
  Table as MuiTable,
  Paper,
  TableContainer,
} from "@mui/material";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { makeData } from "../util/makeData";
import TablePagination from "./TablePagination";
import useSkipper from "../hooks/useSkipper";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    type?: string;
  }
}

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
  dob: Date;
};

const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    const [show, setShow] = React.useState(false);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, column.id, value);
      setShow(false)
    };


    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    



    return (
      <InputBase
        size="small"
        type={column.columnDef.meta?.type ?? "text"}
        readOnly={!show}
        onDoubleClick={()=>setShow(s=>!s)}
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

const DataTable = (props: any) => {
  const [data, setData] = React.useState<Person[]>(makeData(300));

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "select",
        maxSize: 20,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: "firstName",
        header: () => <span>First Name</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "lastName",
        accessorKey: "lastName",
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        type: "number",
        meta: {
          type: "number",
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        type: "number",
        meta: {
          type: "number",
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        meta: {
          type: "date",
        },
        type: "date",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
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
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <TableContext.Provider value={table}>
      <TableContainer component={Paper}>
        <MuiTable sx={{ width: "100%" || table.getCenterTotalSize() }}>
          <TableHead />
          <TableBody />
        </MuiTable>
        <TablePagination />
      </TableContainer>
    </TableContext.Provider>
  );
};

export default DataTable;
