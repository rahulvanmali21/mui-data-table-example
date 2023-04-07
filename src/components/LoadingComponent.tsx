import { Box, CircularProgress, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import useTable from '../hooks/useTable'

const LoadingComponent = () => {
    const table = useTable()
  return (
    <TableBody>
        <TableRow>
            <TableCell colSpan={table.getAllLeafColumns().length} >
                <Box width="100%" height="400px" display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress/>
                </Box>
            </TableCell>
        </TableRow>
      </TableBody>
  )
}

export default LoadingComponent