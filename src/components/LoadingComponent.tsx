import { Box, CircularProgress, Skeleton, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import useTable from '../hooks/useTable'

const LoadingComponent = () => {
    const table = useTable()
    const pageSize = table.getState().pagination.pageSize
    const columns = table
      .getAllLeafColumns()
    
  return (
    <TableBody>
        {
            Array(pageSize ?? 0).fill(0).map((_,i)=>(
                <TableRow key={i}>

                {columns.map((col)=>(
                    <TableCell key={col.id} >
                        <Skeleton animation="wave" width={Math.round(col.getSize() * 0.85)}/>
                    </TableCell>
                ))}
                </TableRow>
            ))
        }

      </TableBody>
  )
}

export default LoadingComponent