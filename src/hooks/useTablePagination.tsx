import React, { useCallback } from "react";
import useTable from "./useTable";
import { TableOptions } from "../types/TableControl";
import useTableOptions from "./useTableOptions";

const useTablePagination = () => {
  const table = useTable();
  const options: TableOptions | undefined = useTableOptions();
  const paginationOption = options?.paginationOption;
  const { pageSize, pageIndex } = table.getState().pagination
  const hidePagination = paginationOption?.infiniteScroll
  const manualPagination = options?.manualPagination ?? false;
  const rowsPerPage = manualPagination ? paginationOption?.rowsPerPage : pageSize;

  const pageNo = manualPagination ? paginationOption?.pageIndex : pageIndex;
  const count = manualPagination ? paginationOption?.totalCount : table.getFilteredRowModel().rows.length;

  const gotoPage = useCallback((pageIndex:string|number)=>{
    if(manualPagination) paginationOption?.gotoPage(Number(pageIndex)) 
      
    else table.setPageIndex(Number(pageIndex))
    
  },[manualPagination,paginationOption,table]);


  const onRowsPerPageChange = (pageSize:number | string)=>{
    manualPagination ? paginationOption?.onRowsPerPageChange(Number(pageSize)) : table.setPageSize(Number(pageSize));

  } 
  return {
    rowsPerPage,
    gotoPage,
    onRowsPerPageChange,
    pageNo,
    count,
    hidePagination
  };
};

export default useTablePagination;
