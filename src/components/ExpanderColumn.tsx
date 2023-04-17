import { IconButton, styled } from "@mui/material";
import React, { useMemo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import useTableOptions from "../hooks/useTableOptions";

type ExpandedType = "full" | "partial" | "empty";

export const RowExpander = {
  id: "expander",
  maxSize: 30,
  header: (props: any) => {
    const { table } = props;
    const tableOptions = useTableOptions();
    const state = table.getState();
    const rowSize = state.pagination.pageSize;
    const expandedType: ExpandedType = useMemo(() => {
      const expandSize = Object.keys(state.expanded).length;
      if (rowSize === expandSize) return "full";
      else if (expandSize > 0) return "partial";
      else return "empty";
    }, [state.expanded, rowSize]);

    const expandAll = () => {
      const expandeRow: any = {};
      if (expandedType !== "full")
        for (let i = 0; i < rowSize; i++) expandeRow[i] = true;
      table.setExpanded(expandeRow);
    };

    return (
      <IconButton size="small" onClick={expandAll} disabled={!!tableOptions?.loading}>
        <ExpanderHeaderIcon expandedType={expandedType} />
      </IconButton>
    );
  },
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

type Props = {
  expandedType: ExpandedType;
};
const ExpanderHeaderIcon = styled(KeyboardDoubleArrowDownIcon)<Props>(
  (props) => ({
    transition: "all 0.4s ease-in-out",
    ...(props.expandedType !== "empty"
      ? {
          transform: `rotate(${
            props.expandedType === "partial" ? "-90" : "180"
          }deg)`,
        }
      : {}),
  })
);
