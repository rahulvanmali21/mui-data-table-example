import React from 'react'
import {TablePagination as MUITablePagination} from '@mui/material';
import { Table } from '@tanstack/react-table';
import useTable from '../hooks/useTable';
import useTableOptions from '../hooks/useTableOptions';
import { TableOptions } from '../types/TableControl';

type Props = {}

const TablePagination = (props: Props) => {
    const table:Table<any> = useTable()
    const options:TableOptions | undefined = useTableOptions();
    const pageIndex = options?.manualPagination ? options.paginationOption?.pageIndex : table.getState().pagination.pageIndex
    const count = options?.manualPagination ? options.paginationOption?.totalCount : table.getPageCount() * table.getState().pagination.pageSize
    const rowsPerPage = options?.manualPagination ? options.paginationOption?.rowsPerPage : table.getState().pagination.pageSize;
    const gotoPage = options?.manualPagination ? options?.paginationOption?.gotoPage : table.setPageIndex;
    const onRowsPerPageChange = options?.manualPagination ?  options?.paginationOption?.onRowsPerPageChange : table.setPageSize
  return (
    <MUITablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count?? 0}
          rowsPerPage={rowsPerPage ?? 0}
          page={pageIndex ?? 0}
          onPageChange={(e,page)=>  gotoPage?.(page)}
          onRowsPerPageChange={(e)=>{onRowsPerPageChange?.(parseInt(e.target.value, 10))}}
        />

  )
}

export default TablePagination