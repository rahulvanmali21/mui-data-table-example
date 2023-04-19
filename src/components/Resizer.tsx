import { Box, styled } from '@mui/material'
import React from 'react'

type InputProps = {
    resizing?: boolean,
    onMouseDown:(event:unknown)=>void,
    onTouchStart:(event:unknown)=>void,
  }



const Resizer = styled(Box)<InputProps>(({theme,resizing})=>({
    position: "absolute",
    right: "-2%",
    top: "50%",
    height: "70%",
    maxHeight:"22px",
    transform:"translateY(-50%)",
    width: "2px",
    background: resizing ? theme.palette.primary.main :theme.palette.divider,
    cursor: "col-resize",
    userSelect: "none",
    touchAction: "none",
    "&:hover":{
        background: resizing ? theme.palette.primary.main :theme.palette.grey["500"],
        opacity:1,
    }
}))

export default Resizer
