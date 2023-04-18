import { Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import useTableOptions from '../hooks/useTableOptions'

const TableToolbar = () => {
    const tableOptions = useTableOptions()
  return (
    <Paper sx={{borderBottomLeftRadius:0,borderBottomRightRadius:0,borderBottom:0}} variant='outlined'>
        <Toolbar>
            {tableOptions?.titleOptions?.title && <Typography variant='h5'>{tableOptions?.titleOptions?.title}</Typography>}
        </Toolbar>
    </Paper>
  )
}

export default TableToolbar