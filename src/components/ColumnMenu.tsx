import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import useTable from "../hooks/useTable";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PushPinIcon from "@mui/icons-material/PushPin";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useTableSort from "../hooks/useTableSort";
import { SortOrder } from "../types/TableControl";

type Props = {
  anchorEl: any;
  onClose: () => void;
  onMenuClick: (type: string) => void;
  selectedColumnId?: string;
};

const ColumnMenu = ({
  anchorEl,
  onClose,
  onMenuClick,
  selectedColumnId,
}: Props) => {
  const table = useTable();
  const column = selectedColumnId ? table.getColumn(selectedColumnId) : null;
  const { getIsSorted, getToggleSortingHandler, sorts } = useTableSort();
  const getToggleGroupingHandler = () => {
    const fn = column?.getToggleGroupingHandler();
    fn?.();
    onClose?.();
  };

  const hideColumn = () => {
    selectedColumnId &&
      table.setColumnVisibility((oldColumns) => ({
        ...oldColumns,
        [selectedColumnId]: false,
      }));
    onClose?.();
  };

  const handlerSort = (order?: SortOrder) => {
    getToggleSortingHandler(selectedColumnId, order);
    onClose?.();
  };

  return (
    <Menu
      PaperProps={{ elevation: 1 }}
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => onClose?.()}
    >
      <MenuItem
        dense
        disabled={getIsSorted(selectedColumnId ?? "") === "asc"}
        onClick={() => handlerSort("asc")}
      >
        <ListItemIcon>
          <ArrowUpwardIcon />
        </ListItemIcon>
        <ListItemText>Sort by ASC</ListItemText>
      </MenuItem>
      <MenuItem
        dense
        disabled={getIsSorted(selectedColumnId ?? "") === "desc"}
        onClick={() => handlerSort("desc")}
      >
        <ListItemIcon>
          <ArrowDownwardIcon />
        </ListItemIcon>
        <ListItemText>Sort by DESC</ListItemText>
      </MenuItem>
      <MenuItem
        dense
        disabled={!getIsSorted(selectedColumnId ?? "")}
        onClick={() => handlerSort()}
      >
        <ListItemIcon></ListItemIcon>
        <ListItemText>Unsort</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={() => onMenuClick("columns")}>
        <ListItemIcon>
          <ViewColumnIcon />
        </ListItemIcon>
        <ListItemText>Manange Columns</ListItemText>
      </MenuItem>
      <MenuItem dense onClick={hideColumn}>
        <ListItemIcon>
          <VisibilityOffIcon />
        </ListItemIcon>
        <ListItemText>Hide</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={getToggleGroupingHandler}>
        <ListItemIcon>
          <VerticalSplitIcon />
        </ListItemIcon>
        <ListItemText>Group By {column?.id ?? ""}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={() => onMenuClick("filters")}>
        <ListItemIcon>
          <FilterAltIcon />
        </ListItemIcon>
        <ListItemText>Filters</ListItemText>
      </MenuItem>

      <MenuItem dense onClick={() => onMenuClick("complex_filters")}>
        <ListItemIcon>
          <FilterAltIcon />
        </ListItemIcon>
        <ListItemText>Complex Filters</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem
        dense
        disabled={!column?.getIsPinned()}
        onClick={() => {
          onClose?.();
          column?.pin(false);
        }}
      >
        <ListItemIcon></ListItemIcon>
        <ListItemText>Unpin</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          onClose?.();
          column?.pin("left");
        }}
        disabled={column?.getIsPinned() === "left"}
        dense
      >
        <ListItemIcon>
          <PushPinIcon sx={{ transform: "rotate(30deg)" }} />
        </ListItemIcon>
        <ListItemText>Pin Left</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          onClose?.();
          column?.pin("right");
        }}
        disabled={column?.getIsPinned() === "right"}
        dense
      >
        <ListItemIcon>
          <PushPinIcon sx={{ transform: "rotate(-30deg)" }} />
        </ListItemIcon>
        <ListItemText>Pin Right</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ColumnMenu;
