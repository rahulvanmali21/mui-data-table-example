import { flexRender } from "@tanstack/react-table";
import TableCell from "./ui/TableCell";
import usePinColumn from "../hooks/usePinColumn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Resizer from "./Resizer";
import { Box, IconButton, TableSortLabel } from "@mui/material";
import useTableOptions from "../hooks/useTableOptions";
import useTableSort from "../hooks/useTableSort";
import useDragableHeader from "../hooks/useDragableHeader";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import useColumnDnd from "../hooks/useColumnDnd";
import DragIcon from "./DragIcon";

const ColumnHeader = ({ header, onClick }: any) => {
  const { getColumnOffset } = usePinColumn();
  const tableOptions = useTableOptions();
  const { manualSorting, getIsSorted, getToggleSortingHandler } =
    useTableSort();

  const { dragRef, previewRef, dropRef } = useDragableHeader({ header });

  const pinned = header.column.getIsPinned();
  const { state } = useColumnDnd();
  console.log({ draggedColumn: state.draggedColumn });
  return (
    <TableCell
      ref={dropRef}
      title={header.id}
      colSpan={header.colSpan}
      component="th"
      padding={header.id === "select" ? "checkbox" : "normal"}
      sx={{
        minWidth: header.getSize(),
        opacity: state.draggedColumn === header.id ? 0.5 : 1,
      }}
      isDragged={state.draggedColumn === header.id}
      isHoveredOn={state.hoverOn === header.id}
      pinned={pinned ?? false}
      offset={pinned ? getColumnOffset(header.column.id, pinned) : null}
    >
      <Box
        width={"100%"}
        height={"100%"}
        position={"relative"}
        ref={previewRef}
      >
        {header.isPlaceholder ? null : (
          <Box
            display="flex"
            justifyContent={header.id === "select" ? "center" : "space-between"}
            alignItems="center"
          >
            {tableOptions?.filterOptions.filters?.columnId ===
              header.column.id && (
              <FilterAltIcon
                sx={{ cursor: "pointer" }}
                onClick={() => tableOptions?.filterOptions.setFilters(null)}
                fontSize="small"
                color="primary"
              />
            )}

            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getCanSort() && (
              <TableSortLabel
                disabled={tableOptions?.loading}
                sx={{ marginRight: "auto" }}
                active={!!getIsSorted(header.column.id, header)}
                onClick={
                  manualSorting
                    ? () => getToggleSortingHandler(header.column.id)
                    : header.column.getToggleSortingHandler()
                }
                direction={getIsSorted(header.column.id, header)}
              />
            )}
            {header.id !== "select" && header.id !== "expander" && (
                <DragIcon ref={dragRef}/>
            )}
            {header.id !== "select" && header.id !== "expander" && (
              <IconButton
                size="small"
                disabled={tableOptions?.loading}
                onClick={(e) => onClick?.(e, header.column)}
              >
                <MoreVertIcon
                  sx={(theme: any) => ({ fill: theme.palette.divider })}
                  fontSize="small"
                />
              </IconButton>
            )}
          </Box>
        )}

        {header.id !== "select" && header.id !== "expander" && (
          <Resizer
            {...{
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              resizing: header.column.getIsResizing(),
            }}
          />
        )}
      </Box>
    </TableCell>
  );
};

export default ColumnHeader;
