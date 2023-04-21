import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

const ToolbarAction = () => {
  return (
    <Stack direction={"row"}>

        <TextField size='small'/>
        <IconButton>
            <SearchIcon/>
        </IconButton>
    </Stack>
  )
}

export default ToolbarAction