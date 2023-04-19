import React, { useEffect } from "react";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import { useTable } from "../TableContext";
import { Column, ColumnOrderState } from "@tanstack/react-table";
import useColumnDnd from "./useColumnDnd";
import { TOOLBAR_ID } from "../components/TableToolbar";

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

const useDragableHeader = ({ column }: any) => {
  const table = useTable();
  const { setters } = useColumnDnd();
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();

  const [{ isOver}, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<any>, monitor: DropTargetMonitor) => {
        if(column.id === TOOLBAR_ID) {
         return;
        }
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );

      setColumnOrder(newColumnOrder);
      setters?.setDraggedColumn(null);
      setters.setHoverOn(null);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      didDrop: monitor.didDrop(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  useEffect(() => {
      setters?.setDraggedColumn((s:any)=>({...s ,[column.id]:isDragging}));
  }, [isDragging]);

  useEffect(() => {
      setters?.setHoverOn((s:any)=>({...s ,[column.id]:isOver}));
  }, [isOver]);


  return { isDragging, dragRef, previewRef, dropRef };
};

export default useDragableHeader;
