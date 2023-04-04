import { Box, styled } from '@mui/material'
import React from 'react'

type InputProps = {
    resizing?: boolean,
    onMouseDown:(event:unknown)=>void,
    onTouchStart:(event:unknown)=>void,
  }



const Resizer = styled(Box)<InputProps>(({theme})=>({
    position: "absolute",
    right: 0,
    top: "50%",
    height: "40%",
    maxHeight:"22px",
    transform:"translateY(-50%)",
    width: "2px",
    background: theme.palette.divider,
    cursor: "col-resize",
    userAelect: "none",
    touchAction: "none",
    "&:hover":{
        opacity:1,
    }
}))

export default Resizer
