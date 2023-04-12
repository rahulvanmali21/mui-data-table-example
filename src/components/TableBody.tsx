import { flexRender } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { useTable } from "../TableContext";
import { TableRow, TableBody as MuiTableBody } from "@mui/material";
import LoadingComponent from "./LoadingComponent";
import TableCell from "./ui/TableCell";
import Collapse from "@mui/material/Collapse";
import useTableOptions from "../hooks/useTableOptions";
import usePinColumn from "../hooks/usePinColumn";

const TableBody = ({ loading }: { loading: boolean }) => {
  const table = useTable();
  const tableOptions = useTableOptions();

  const SubComponent =tableOptions?.subComponentOptions?.component || null;


  const {getColumnOffset} = usePinColumn();


  

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <MuiTableBody>
      {table.getRowModel().rows.map((row, i) => (
        <React.Fragment key={i}>
          <TableRow hover>
            {row.getVisibleCells().map((cell, j) => {
              const pinned = cell.column.getIsPinned();
              return (
                <TableCell
                  size="small"
                  key={j}
                  pinned={pinned ?? false}
                  padding={j === 0 ? "checkbox" : "normal"}
                  offset={pinned ? getColumnOffset(cell.column.id,pinned) : null}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell
              sx={{ pb: 0, pt: 0 ,border:0 }}
              colSpan={row.getVisibleCells().length}
            >
              <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
                {SubComponent ? <SubComponent row={row}/> : ""}
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </MuiTableBody>
  );
};

export default TableBody;
