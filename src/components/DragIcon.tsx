import { Box, styled } from '@mui/material'
import React from 'react'
import DragHandleIcon from "@mui/icons-material/DragHandle";

const DragIcon = React.forwardRef((props,ref) => {
  return (
    <Box display="flex" ref={ref}>
    <Icon
      sx={(theme: any) => ({ fill: theme.palette.divider })}
      fontSize="small"
    />
  </Box>
  )
})

export default DragIcon


const Icon = styled(DragHandleIcon)({
    cursor:"grab",
    "&:active":{
        cursor:"grabbing"
    }  
})