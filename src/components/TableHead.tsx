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
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import Resizer from "./Resizer";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TableHead = () => {
  const table = useTable();
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [mainAnchor, setmainAnchor] = useState<Element | null>(null);
  const [menuType, setMenuType] = useState<string | null>(null);
  const menuAnchor = useRef<HTMLTableRowElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, column: any) => {
    setAnchorEl(e.currentTarget);
  };

  const showCommonMenu = (type: string) => {
    setMenuType(type);
    setmainAnchor(menuAnchor?.current);
  };

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
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <TableSortLabel
                          active={!!header.column.getIsSorted()}
                          onClick={header.column.getToggleSortingHandler()}
                          // react-table has a unsorted state which is not treated here
                          direction={header.column.getIsSorted() || undefined}
                        />
                      )}
                    </span>
                    {header.id !== "select" && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleClick(e, header.column)}
                      >
                        <MoreVertIcon fontSize="small" />
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
              {menuType === "filters" && (
                <Box sx={{ maxWidth: 600 ,p:2 ,width:600}}>
                  <Grid container>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel
                          variant="standard"
                          htmlFor="uncontrolled-native"
                        >
                          column
                        </InputLabel>
                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: "age",
                            id: "uncontrolled-native",
                          }}
                        >
                        {
                            table.getAllLeafColumns().filter(c=>c.id!=="select").map((column,cid)=>(
                                <option value={column.id}>{column.id}</option>
                            ))
                        }

                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </Box>
              )}
              {menuType === "columns" && (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  subheader={<ListSubheader>Columns</ListSubheader>}
                >
                  {table
                    .getAllLeafColumns()
                    .filter((c) => c.id !== "selection")
                    .map((column, index) => (
                      <ListItem key={index}>
                        <ListItemIcon
                          sx={{
                            "&.MuiListItemIcon-root": { minWidth: "unset" },
                          }}
                        >
                          <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            {...{
                              checked: column.getIsVisible(),
                              onChange: column.getToggleVisibilityHandler(),
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText id={column.id} primary={column.id} />
                      </ListItem>
                    ))}
                </List>
              )}
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
