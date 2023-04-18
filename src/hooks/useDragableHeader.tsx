import React, { useEffect } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { useTable } from "../TableContext";
import { Column, ColumnOrderState } from "@tanstack/react-table";
import useTableOptions from "./useTableOptions";
import useColumnDnd from "./useColumnDnd";

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

const useDragableHeader = ({ header }: any) => {
  const table = useTable();
  const tableOptions = useTableOptions();
  const { setters } = useColumnDnd();
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [{isOver}, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<any>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
      setters?.setDraggedColumn(null)
      setters.setHoverOn(null);

    },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor:DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  useEffect(() => {
    if (isDragging) {
      setters?.setDraggedColumn(header.id)
    }
  }, [isDragging, setters, header]);

  useEffect(()=>{
    if(isOver){
      setters?.setHoverOn(header.id)
    }
  },[isOver])
  return { isDragging, dragRef, previewRef, dropRef };
};

export default useDragableHeader;
