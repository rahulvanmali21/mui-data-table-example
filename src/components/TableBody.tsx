import { flexRender } from "@tanstack/react-table";
import React from "react";
import { useTable } from "../TableContext";
import {
  TableRow,
  TableBody as MuiTableBody,
} from "@mui/material";
import LoadingComponent from "./LoadingComponent";
import TableCell from "./ui/TableCell";

const TableBody = ({ loading }: { loading: boolean }) => {
  const table = useTable();
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <MuiTableBody>
      {table.getRowModel().rows.map((row,i) => (
        <TableRow hover key={i}>
          {row.getVisibleCells().map((cell, j) => {
            const pinned = cell.column.getIsPinned()
            return (
            <TableCell
              size="small"
              key={j}
              pinned={pinned ?? false}
              padding={j === 0 ? "checkbox" : "normal"}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
            )
          })}
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export default TableBody;
