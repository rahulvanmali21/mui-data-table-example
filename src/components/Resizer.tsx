import { Box, styled } from '@mui/material'
import React from 'react'

type InputProps = {
    resizing?: boolean,
    onMouseDown:(event:unknown)=>void,
    onTouchStart:(event:unknown)=>void,
  }



const Resizer = styled(Box)<InputProps>(({theme})=>({
    position: "absolute",
    right: "-2%",
    top: "50%",
    height: "70%",
    maxHeight:"22px",
    transform:"translateY(-50%)",
    width: "2px",
    background: theme.palette.divider,
    cursor: "col-resize",
    userSelect: "none",
    touchAction: "none",
    "&:hover":{
        opacity:1,
    }
}))

export default Resizer
