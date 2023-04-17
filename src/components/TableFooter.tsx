import React from 'react'
import { useTable } from '../TableContext'
import { flexRender } from '@tanstack/react-table';
import { TableRow,TableFooter as MuiTableFooter, TableCell, LinearProgress } from '@mui/material';
import useTableOptions from '../hooks/useTableOptions';

const TableFooter = () => {
 const table = useTable();
 const tableOption = useTableOptions()
 const loading = tableOption?.loading;
 const showFooter = tableOption?.showFooter;
  return (
    <MuiTableFooter>
    <tr>
    <td style={{ padding: 0 }} colSpan={table.getAllLeafColumns().length}>
      {loading && <LinearProgress/>}
    </td>
    </tr>
    { showFooter && table.getFooterGroups().map((footerGroup) => (
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