import { flexRender } from "@tanstack/react-table";
import React, { useEffect, useMemo, useRef } from "react";
import { useTable } from "../TableContext";
import {
  TableRow,
  TableBody as MuiTableBody,
  Box,
  Typography,
} from "@mui/material";
import LoadingComponent from "./LoadingComponent";
import TableCell from "./ui/TableCell";
import Collapse from "@mui/material/Collapse";
import useTableOptions from "../hooks/useTableOptions";
import useRowSelection from "../hooks/useRowSelection";
import BodyTableCell from "./BodyTableCell";

const TableBody = () => {
  const table = useTable();
  const tableOptions = useTableOptions();
  const bodyRowRef = useRef<any>();
  const SubComponent = tableOptions?.subComponentOptions?.component || null;

  const { selectedIDsSet } = useRowSelection();

  const rows = table.getRowModel().rows;

  if (tableOptions?.loading) {
    return <LoadingComponent />;
  }

  return (
    <MuiTableBody>
      {rows.length > 0 ? (
        rows.map((row, i) => (
          <React.Fragment key={i}>
            <TableRow
              hover
              {...(i === 0 && { ref: bodyRowRef })}
              selected={selectedIDsSet?.has(row.id)}
            >
              {row.getVisibleCells().map((cell, j) => (
                <BodyTableCell
                  cell={cell}
                  row={row}
                  key={j}
                  rowIndex={i + 1}
                  padding={cell.id === "select" ? "checkbox" : "normal"}
                />
              ))}
            </TableRow>
            {/* subcomponent */}
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
          <TableCell colSpan={table.getAllLeafColumns().length}>
            <Box width={"100%"} py={3}>
              <Typography variant="h6" textAlign={"center"}>
                No records found
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </MuiTableBody>
  );
};

export default TableBody;
