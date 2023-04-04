import React from 'react'
import { useTable } from '../TableContext'
import { flexRender } from '@tanstack/react-table';
import { TableRow,TableFooter as MuiTableFooter, TableCell } from '@mui/material';

const TableFooter = () => {
 const table = useTable();
  return (
    <MuiTableFooter>
    {table.getFooterGroups().map((footerGroup) => (
      <TableRow key={footerGroup.id}>
        {footerGroup.headers.map((header) => (
          <TableCell key={header.id} component={"th"}>
            {header.isPlaceholder
              ? null
              : flexRender(
                  header.column.columnDef.footer,
                  header.getContext()
                )}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </MuiTableFooter>
  )
}

export default TableFooter