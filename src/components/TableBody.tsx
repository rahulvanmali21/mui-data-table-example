import { flexRender } from "@tanstack/react-table";
import React from "react";
import { useTable } from "../TableContext";
import {
  TableCell,
  TableRow,
  TableBody as MuiTableBody,
  Box,
  CircularProgress,
} from "@mui/material";
import LoadingComponent from "./LoadingComponent";

const TableBody = ({ loading }: { loading: boolean }) => {
  const table = useTable();
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <MuiTableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow hover key={row.id}>
          {row.getVisibleCells().map((cell, i) => (
            <TableCell
              size="small"
              key={cell.id}
              padding={i === 0 ? "checkbox" : "normal"}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export default TableBody;
