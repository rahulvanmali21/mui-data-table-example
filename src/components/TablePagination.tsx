import React from 'react'
import {TablePagination as MUITablePagination} from '@mui/material';
import { useTable } from '../TableContext';
import { Table } from '@tanstack/react-table';

type Props = {}

const TablePagination = (props: Props) => {
    const table:Table<any> = useTable()

  return (
    <MUITablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={1000}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(e,page)=>table.setPageIndex(page)}
          onRowsPerPageChange={(e)=>{table.setPageSize(parseInt(e.target.value, 10))}}
        />

  )
}

export default TablePagination