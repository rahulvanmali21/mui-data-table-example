import { IconButton } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const RowExpander = {
  id: "expander",
  maxSize: 30,
  header: () => null,
  cell: ({ row }: any) =>
    row.getCanExpand() ? (
        <IconButton size="small" onClick={row?.getToggleExpandedHandler()}>
          {row?.getIsExpanded() ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
    ) : (
      <></>
    ),
};
