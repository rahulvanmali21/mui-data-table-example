import React from "react";
import useColumnDnd from "../hooks/useColumnDnd";
import usePinColumn from "../hooks/usePinColumn";
import useDragableHeader from "../hooks/useDragableHeader";
import TableCell from "./ui/TableCell";
import { flexRender } from "@tanstack/react-table";

const BodyTableCell = ({ cell, padding }: any) => {
  const { state } = useColumnDnd();
  const { getColumnOffset } = usePinColumn();
  const { dropRef } = useDragableHeader({ column: cell.column });

  const pinned = cell.column.getIsPinned();

  return (
    <TableCell
      ref={dropRef}
      isHoveredOn={state.hoverOn && !!state.hoverOn[cell.column.id] }
      isDragged={state.draggedColumn && !!state.draggedColumn[cell.column.id]}
      size="small"
      pinned={pinned ?? false}
      offset={pinned ? getColumnOffset(cell.column.id, pinned) : null}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default BodyTableCell;
