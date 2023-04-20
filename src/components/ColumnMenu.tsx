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
  const getToggleGroupingHandler = ()=>{
    const fn= column?.getToggleGroupingHandler();
    fn?.();
    onClose?.();
  }  
  return (
    <Menu PaperProps={{elevation:1}} anchorEl={anchorEl} open={!!anchorEl} onClose={() => onClose?.()}>
      <MenuItem dense onClick={() => onMenuClick("columns")}>
        <ListItemIcon>
          <ViewColumnIcon />
        </ListItemIcon>
        <ListItemText>Manange Columns</ListItemText>
      </MenuItem>
      <MenuItem dense onClick={getToggleGroupingHandler}>
        <ListItemIcon>
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
          disabled={column?.getIsPinned() ==="left"}
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
          disabled={column?.getIsPinned() ==="right"}
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
