import { Box, Chip, Paper, Stack, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";
import useTableOptions from "../hooks/useTableOptions";
import useDragableHeader from "../hooks/useDragableHeader";
import useColumnDnd from "../hooks/useColumnDnd";
import { IconButton, styled } from "@mui/material";
import useTable from "../hooks/useTable";
import ToolbarAction from "./ToolbarAction";
export const TOOLBAR_ID = "DATATABLE_TOOLBAR";
const TableToolbar = () => {
  const tableOptions = useTableOptions();
  const table = useTable();
  const column = { id: TOOLBAR_ID };
  const { dropRef } = useDragableHeader({ column });
  const { state } = useColumnDnd();
  const isHovering = state?.hoverOn?.[TOOLBAR_ID];


  const groupColumn = table.getState().grouping;

  const removeGroup = (i: number, col: string) => {
    table.setGrouping((s: any) => {
      let temp = [...s];
      temp.splice(i, 1);
      return temp;
    });
   
  };

  return (
    <Paper
      ref={dropRef}
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: 0,
        minHeight: "80px",
        px: 0.5,
        py: 0.75,
      }}
      variant="outlined"
    >
      {isHovering ? (
        <ColumnDrop ishovering={isHovering}>
          <Typography variant="body1" textAlign={"center"}>
            Drop Column to group
          </Typography>
        </ColumnDrop>
      ) : (
        <Box>
          <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
            {tableOptions?.titleOptions?.title && (
              <>
              <Typography variant="h5">
                {tableOptions?.titleOptions?.title}
              </Typography>
              <ToolbarAction/>
              </>
            )}
          </Toolbar>
          {groupColumn.length > 0 && (
            <Stack direction={"row"} paddingX={2} alignItems="center" gap={3}>
              <Typography>Grouped By</Typography>
              {groupColumn.map((col: string, i: number) => (
                <Chip
                  color="primary"
                  label={col}
                  key={i}
                  onDelete={() => removeGroup(i, col)}
                />
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default TableToolbar;

type Props = {
  ishovering?: boolean;
};

const ColumnDrop = styled(Box)<Props>(({ theme, ishovering }) => ({
  padding: "1rem 2rem",
  border: "2px dashed " + theme?.palette?.primary?.light,
  width: "100%",
}));
