import { useCallback } from "react";
import useTableOptions from "./useTableOptions";

export const useTableFilter = () => {
  const tableOptions = useTableOptions();

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
