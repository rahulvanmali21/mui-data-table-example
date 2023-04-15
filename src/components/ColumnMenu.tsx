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
type Props = {
  anchorEl: any;
  onClose: () => void;
  onMenuClick: (type: string) => void;
  selectedColumnId?: string | null;
};

const ColumnMenu = ({
  anchorEl,
  onClose,
  onMenuClick,
  selectedColumnId,
}: Props) => {
  const table = useTable();
  const column = selectedColumnId ? table.getColumn(selectedColumnId) : null;
  return (
    <Menu PaperProps={{elevation:1}} anchorEl={anchorEl} open={!!anchorEl} onClose={() => onClose?.()}>
      <MenuItem dense onClick={() => onMenuClick("columns")}>
        <ListItemIcon>
          <ViewColumnIcon />
        </ListItemIcon>
        <ListItemText>Manange Columns</ListItemText>
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

      {column?.getIsPinned() && (
        <MenuItem
          dense
          onClick={() => {
            onClose?.();
            column?.pin(false);
          }}
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText>Unpin</ListItemText>
        </MenuItem>
      )}
      {column?.getIsPinned() !== "left" ? (
        <MenuItem
          onClick={() => {
            onClose?.();
            column?.pin("left");
          }}
          dense
        >
          <ListItemIcon>
            <PushPinIcon sx={{ transform: "rotate(30deg)" }} />
          </ListItemIcon>
          <ListItemText>Pin Left</ListItemText>
        </MenuItem>
      ) : null}
      {column?.getIsPinned() !== "right" ? (
        <MenuItem
          onClick={() => {
            onClose?.();
            column?.pin("right");
          }}
          dense
        >
          <ListItemIcon>
            <PushPinIcon sx={{ transform: "rotate(-30deg)" }} />
          </ListItemIcon>
          <ListItemText>Pin Right</ListItemText>
        </MenuItem>
      ) : null}
    </Menu>
  );
};

export default ColumnMenu;
