import { Box, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import useTableOptions from "../hooks/useTableOptions";
import useDragableHeader from "../hooks/useDragableHeader";
import useColumnDnd from "../hooks/useColumnDnd";
import { IconButton, styled } from "@mui/material";
export const TOOLBAR_ID = "DATATABLE_TOOLBAR";
const TableToolbar = () => {
  const tableOptions = useTableOptions();
  const column = { id: TOOLBAR_ID };
  const { dropRef } = useDragableHeader({ column });
  const { state } = useColumnDnd();
  const isHovering = state?.hoverOn?.[TOOLBAR_ID];
  console.log(isHovering);
  return (
    <Paper
      ref={dropRef}
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: 0,
        height:"80px",
        px:0.5,
        py:0.75,
      }}
      variant="outlined"
    >
        {isHovering ? (
          <ColumnDrop ishovering={isHovering}>
            <Typography variant="body1" textAlign={"center"}>Drop Column to group</Typography>
          </ColumnDrop>
        ) : (
          <Box>
            {tableOptions?.titleOptions?.title && (
              <Typography variant="h5">
                {tableOptions?.titleOptions?.title}
              </Typography>
            )}
          </Box>
        )}
    </Paper>
  );
};

export default TableToolbar;


type Props = {
    ishovering?:boolean
}
const ColumnDrop = styled(Box)<Props>(({theme,ishovering})=>({
    padding:"1rem 2rem",
    border:"2px dashed " + theme?.palette?.primary?.light,
    width:"100%"
}))