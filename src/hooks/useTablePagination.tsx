import React from "react";
import useTable from "./useTable";
import { TableOptions } from "../types/TableControl";
import useTableOptions from "./useTableOptions";

const useTablePagination = () => {
  const table = useTable();
  const options: TableOptions | undefined = useTableOptions();
  const state = table.getState();
  const manualPagination = options?.manualPagination ?? false;

  const rowsPerPage = manualPagination
    ? options?.paginationOption?.rowsPerPage
    : state.pagination.pageSize;
  const gotoPage = manualPagination
    ? options?.paginationOption?.gotoPage
    : table.setPageIndex;
  const onRowsPerPageChange = manualPagination
    ? options?.paginationOption?.onRowsPerPageChange
    : table.setPageSize;
  const pageIndex = manualPagination
    ? options?.paginationOption?.pageIndex
    : state.pagination.pageIndex;
  const count = manualPagination
    ? options?.paginationOption?.totalCount
    : table.getPageCount() * state.pagination.pageSize;
  return {
    rowsPerPage,
    gotoPage,
    onRowsPerPageChange,
    pageIndex,
    count,
  };
};

export default useTablePagination;
