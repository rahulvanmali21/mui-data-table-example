import { useCallback } from "react";
import useTableOptions from "./useTableOptions";
import useTable from "./useTable";

export const useTableFilter = () => {
  const tableOptions = useTableOptions();

  const table = useTable()
  const column = table.getColumn("first_name")

  const columnFilterValue = column?.getFilterValue()
  console.log(columnFilterValue)
  const filter = tableOptions?.filterOptions.filters ?? null;
  const mannualFilter = tableOptions?.mannualFilter ?? false;
  const setFilters = useCallback(
    (filter:any) => {
      if(mannualFilter){
        tableOptions?.filterOptions?.setFilters(filter);
      }else{
        console.log(filter)

      }
    },
    [mannualFilter],
  )
  
  
  
  return {
    filter,
    mannualFilter,
    setFilters
  };
};
