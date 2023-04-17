import React, { RefObject, useEffect, useRef, useState } from "react";
import { useTable } from "../TableContext";
import { flexRender } from "@tanstack/react-table";
import {
  TableRow,
  TableHead as MuiTableHead,
  Box,
  TableSortLabel,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  LinearProgress,
} from "@mui/material";
import Resizer from "./Resizer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Filter from "./Filter";
import ColumnSelection from "./ColumnSelection";
import useTableOptions from "../hooks/useTableOptions";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ColumnMenu from "./ColumnMenu";
import usePinColumn from "../hooks/usePinColumn";
import TableCell from "./ui/TableCell";
import ComplexFilter from "./ui/ComplexFilter.tsx/ComplexFilter";
import useTableSort from "../hooks/useTableSort";

const TableHead = () => {
  const table = useTable();
  const tableOptions = useTableOptions();
  const {manualSorting,getIsSorted,getToggleSortingHandler}= useTableSort();

  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const headRef = useRef<any>();
  const loading = tableOptions?.loading ?? false;
  const [mainAnchor, setmainAnchor] = useState<Element | null>(null);
  const [menuType, setMenuType] = useState<any | null>(null);

  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const menuAnchor = useRef<HTMLTableRowElement>(null);


  const { getColumnOffset } = usePinColumn();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, column: any) => {
    setSelectedColumn(column.id);
    setAnchorEl(e.currentTarget);
  };

  const showCommonMenu = (type: string) => {
    setMenuType(type);
    setmainAnchor(menuAnchor?.current);
  };

  console.log("rendered")

 
  

  return (
    <>
      <MuiTableHead ref={headRef}>
        {table.getHeaderGroups().map((headerGroup, ij) => (
          <TableRow key={ij}>
            {headerGroup.headers.map((header, i) => {
              const pinned = header.column.getIsPinned();
              return (
                <TableCell
                  variant="head"
                  title={header.id}
                  padding={header.id === "select" ? "checkbox" : "normal"}
                  component="th"
                  colSpan={header.colSpan}
                  sx={{
                    minWidth: header.getSize(),
                  }}
                  key={i}
                  pinned={pinned ?? false}
                  offset={
                    pinned ? getColumnOffset(header.column.id, pinned) : null
                  }
                >
                  <Box width={"100%"} height={"100%"} position={"relative"}>
                    {header.isPlaceholder ? null : (
                      <Box
                        display="flex"
                        justifyContent={
                          header.id === "select" ? "center" : "space-between"
                        }
                        alignItems="center"
                      >
                        {tableOptions?.filterOptions.filters?.columnId ===
                          header.column.id && (
                          <FilterAltIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              tableOptions?.filterOptions.setFilters(null)
                            }
                            fontSize="small"
                            color="primary"
                          />
                        )}

                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <TableSortLabel
                          disabled={loading}                          
                            sx={{ marginRight: "auto" }}
                            active={
                              manualSorting
                                ? !!getIsSorted(header.column.id)
                                : !!header.column.getIsSorted()
                            }
                            onClick={
                              manualSorting
                                ? () =>
                                    getToggleSortingHandler(header.column.id)
                                : header.column.getToggleSortingHandler()
                            }
                            direction={
                              manualSorting
                                ? getIsSorted(header.column.id)
                                : header.column.getIsSorted() || undefined
                            }
                          />
                        )}
                        {header.id !== "select" && header.id !== "expander" && (
                          <IconButton
                            size="small"
                            disabled={loading}
                            onClick={(e) => handleClick(e, header.column)}
                          >
                            <MoreVertIcon
                              sx={(theme) => ({ fill: theme.palette.divider })}
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
            })}
          </TableRow>
        ))}
        <tr ref={menuAnchor}>
          <td style={{ padding: 0 }} colSpan={table.getAllLeafColumns().length}>
            {loading && <LinearProgress />}
            <Popover
              disablePortal
              anchorEl={mainAnchor}
              open={!!mainAnchor}
              onClose={(e) => setmainAnchor(null)}
            >
              {(() => {
                switch (menuType) {
                  case "filters":
                    return <Filter selectedColumnId={selectedColumn} />;
                  case "columns":
                    return <ColumnSelection />;
                  case "complex_filters":
                    return <ComplexFilter selectedColumnId={selectedColumn} />;
                }
              })()}
            </Popover>
          </td>
        </tr>
      </MuiTableHead>
      <ColumnMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onMenuClick={(type: string) => {
          showCommonMenu(type);
          setAnchorEl(null);
        }}
        selectedColumnId={selectedColumn}
      />
    </>
  );
};

export default TableHead;
