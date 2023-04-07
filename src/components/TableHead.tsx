import React, { RefObject, useRef, useState } from "react";
import { useTable } from "../TableContext";
import { flexRender } from "@tanstack/react-table";
import {
  TableCell,
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
import ColumnSelection from "./ColumnSelection"
import useTableOptions from "../hooks/useTableOptions";
import { SortOrder } from "../types/TableControl";

const SORTS:SortOrder[] = [undefined,"asc","desc"]


const TableHead = () => {
  const table = useTable();
  const tableOptions = useTableOptions();



  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [mainAnchor, setmainAnchor] = useState<Element | null>(null);
  const [menuType, setMenuType] = useState<string | null>(null);
  const [sorts,setSort] = useState<any>({})

  const menuAnchor = useRef<HTMLTableRowElement>(null);



  const manualSorting  = tableOptions?.manualSorting ?? false;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, column: any) => {
    setAnchorEl(e.currentTarget);
  };

  const showCommonMenu = (type: string) => {
    setMenuType(type);
    setmainAnchor(menuAnchor?.current);
  };


  const getIsSorted = (columnId:string) :SortOrder=>{
    if(sorts[columnId]){
      return sorts[columnId].order
    }
    return undefined
  }
  
  const getToggleSortingHandler = (columnId:any)=>{
    let sortObj
    if(!sorts[columnId] || !sorts[columnId].order){
      sortObj = {[columnId]:{order:"asc"}}
    }else if (sorts[columnId]?.order ==="asc"){
      sortObj = {[columnId]:{order:"desc"}}
    }else{
      const copy = structuredClone(sorts);
      delete copy[columnId]
      sortObj = copy
    }
    setSort(sortObj)
    tableOptions?.sortingOptions?.onSort(sortObj)
  }





  return (
    <>
      <MuiTableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell
                variant="head"
                title={header.id}
                padding={header.id === "select" ? "checkbox" : "normal"}
                component="th"
                colSpan={header.colSpan}
                sx={{
                  width: header.getSize(),
                  position: "relative",
                }}
                key={header.id}
              >
                {header.isPlaceholder ? null : (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <TableSortLabel
                          sx={{marginRight:"auto"}}
                          active={manualSorting ? !!getIsSorted(header.column.id) : !!header.column.getIsSorted()}
                          onClick={manualSorting ? ()=>getToggleSortingHandler(header.column.id) : header.column.getToggleSortingHandler()}
                          direction={manualSorting ? getIsSorted(header.column.id) : header.column.getIsSorted() || undefined}
                        />
                      )}
                    {header.id !== "select" && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleClick(e, header.column)}
                      >
                        <MoreVertIcon sx={(theme)=>({fill:theme.palette.divider})} fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                )}

                <Resizer
                  {...{
                    onMouseDown: header.getResizeHandler(),
                    onTouchStart: header.getResizeHandler(),
                    resizing: header.column.getIsResizing(),
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
        <tr ref={menuAnchor}>
          <td>
            <Popover
              disablePortal
              anchorEl={mainAnchor}
              open={!!mainAnchor}
              onClose={(e) => setmainAnchor(null)}
            >
              {menuType === "filters" && <Filter/>}
              {menuType === "columns" && <ColumnSelection/> }
            </Popover>
          </td>
        </tr>
      </MuiTableHead>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          dense
          onClick={() => {
            setAnchorEl(null);
            showCommonMenu("columns");
          }}
        >
          Manange Columns
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            setAnchorEl(null);
            showCommonMenu("filters");
          }}
        >
          Filters
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableHead;
