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
} from "@mui/material";
import Resizer from "./Resizer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Filter from "./Filter";
import ColumnSelection from "./ColumnSelection";
import useTableOptions from "../hooks/useTableOptions";
import { SortOrder } from "../types/TableControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ColumnMenu from "./ColumnMenu";
import usePinColumn from "../hooks/usePinColumn";
import TableCell from "./ui/TableCell";
import ComplexFilter from "./ui/ComplexFilter.tsx/ComplexFilter";

const TableHead = () => {
  const table = useTable();
  const tableOptions = useTableOptions();

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [mainAnchor, setmainAnchor] = useState<Element | null>(null);
  const [menuType, setMenuType] = useState<any | null>(null);
  const [sorts, setSort] = useState<any>({});
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const menuAnchor = useRef<HTMLTableRowElement>(null);

  const manualSorting = tableOptions?.manualSorting ?? false;

  const { getColumnOffset } = usePinColumn();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, column: any) => {
    setSelectedColumn(column.id);
    setAnchorEl(e.currentTarget);
  };

  const showCommonMenu = (type: string) => {
    setMenuType(type);
    setmainAnchor(menuAnchor?.current);
  };

  const getIsSorted = (columnId: string): SortOrder => {
    if (sorts[columnId]) {
      return sorts[columnId].order;
    }
    return undefined;
  };

  const getToggleSortingHandler = (columnId: any) => {
    let sortObj;
    if (!sorts[columnId] || !sorts[columnId].order) {
      sortObj = { [columnId]: { order: "asc" } };
    } else if (sorts[columnId]?.order === "asc") {
      sortObj = { [columnId]: { order: "desc" } };
    } else {
      const copy = structuredClone(sorts);
      delete copy[columnId];
      sortObj = copy;
    }
    setSort(sortObj);
    tableOptions?.sortingOptions?.onSort(sortObj);
  };
  const headRef = useRef<any>();


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

                    {/* {header.id !== "select" && header.id !== "expander" && ( */}
                    <Resizer
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        resizing: header.column.getIsResizing(),
                      }}
                    />
                    {/* )} */}
                  </Box>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        <tr ref={menuAnchor}>
          <td style={{ padding: 0 }}>
            <Popover
              disablePortal
              anchorEl={mainAnchor}
              open={!!mainAnchor}
              onClose={(e) => setmainAnchor(null)}
            >
              {
                (()=>{
                  switch (menuType) {
                    case "filters":
                      return <Filter selectedColumnId={selectedColumn} />
                    case "columns":
                      return <ColumnSelection />                    
                    case "complex_filters":
                      return <ComplexFilter selectedColumnId={selectedColumn} />
                  }
                })()
              }
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
