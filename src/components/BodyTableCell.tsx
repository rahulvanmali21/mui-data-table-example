import React from "react";
import useColumnDnd from "../hooks/useColumnDnd";
import usePinColumn from "../hooks/usePinColumn";
import useDragableHeader from "../hooks/useDragableHeader";
import TableCell from "./ui/TableCell";
import { flexRender } from "@tanstack/react-table";
import useTablePagination from "../hooks/useTablePagination";
import { IconButton } from "@mui/material";
import { ExpanderColumnIcon } from "./ExpanderColumn";

const BodyTableCell = ({ cell, padding, rowIndex, row }: any) => {
  const { state } = useColumnDnd();
  const { getColumnOffset } = usePinColumn();
  const { dropRef } = useDragableHeader({ column: cell.column });

  const pinned = cell.column.getIsPinned();
  const { rowsPerPage } = useTablePagination();

  return (
    <TableCell
      ref={dropRef}
      isHoveredOn={state.hoverOn && !!state.hoverOn[cell.column.id]}
      isDragged={state.draggedColumn && !!state.draggedColumn[cell.column.id]}
      size="small"
      pinned={pinned ?? false}
      padding={padding}
      offset={pinned ? getColumnOffset(cell.column.id, pinned) : null}
      sx={(theme) => ({
        ...(rowIndex === rowsPerPage &&
          state.hoverOn &&
          !!state.hoverOn[cell.column.id] && {
            borderBottom: "1px dashed " + theme.palette.success.main,
          }),
      })}
    >
      {cell.getIsGrouped() ? (
        <>
          <IconButton size="small" onClick={row.getToggleExpandedHandler()}>
            <ExpanderColumnIcon expanded={row.getIsExpanded()} />
          </IconButton>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}(
          {row.subRows.length})
        </>
      ) : cell.getIsAggregated() ? (
        flexRender(
          cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
          cell.getContext()
        )
      ) : cell.getIsPlaceholder() ? null : (
        flexRender(cell.column.columnDef.cell, cell.getContext())
      )}
    </TableCell>
  );
};

export default BodyTableCell;
