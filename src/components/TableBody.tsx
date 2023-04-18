import { flexRender } from "@tanstack/react-table";
import React, { useEffect, useMemo, useRef } from "react";
import { useTable } from "../TableContext";
import { TableRow, TableBody as MuiTableBody, Box, Typography } from "@mui/material";
import LoadingComponent from "./LoadingComponent";
import TableCell from "./ui/TableCell";
import Collapse from "@mui/material/Collapse";
import useTableOptions from "../hooks/useTableOptions";
import usePinColumn from "../hooks/usePinColumn";
import useColumnDnd from "../hooks/useColumnDnd";

const TableBody = () => {
  const table = useTable();
  const tableOptions = useTableOptions();
  const bodyRowRef =useRef<any>()
  const SubComponent = tableOptions?.subComponentOptions?.component || null;

  const { getColumnOffset } = usePinColumn();

  const rows = table.getRowModel().rows;

  const {state} = useColumnDnd()

  console.log({hover:state.hoverOn})

  if (tableOptions?.loading) {
    return <LoadingComponent />;
  }


  return (
    <MuiTableBody>
      {rows.length > 0 ? (
        rows.map((row, i) => (
          <React.Fragment key={i}>
            <TableRow hover {...(i===0 && {ref:bodyRowRef})}>
              {row.getVisibleCells().map((cell, j) => {
                
                const pinned = cell.column.getIsPinned();
                return (
                  <TableCell
                    isHoveredOn={state.hoverOn == cell.column.id}
                    isDragged={state.draggedColumn === cell.column.id}

                    size="small"
                    key={j}
                    pinned={pinned ?? false}
                    padding={j === 0 ? "checkbox" : "normal"}
                    offset={
                      pinned ? getColumnOffset(cell.column.id, pinned) : null
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ pb: 0, pt: 0, border: 0 }}
                colSpan={row.getVisibleCells().length}
              >
                <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
                  {SubComponent ? <SubComponent row={row} /> : ""}
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={table.getAllLeafColumns().length} >
            <Box width={"100%"} py={3}>
              <Typography variant="h6" textAlign={"center"}> No records found</Typography>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </MuiTableBody>
  );
};

export default TableBody;
