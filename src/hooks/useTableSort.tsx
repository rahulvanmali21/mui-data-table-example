import React, { useState } from "react";
import useTableOptions from "./useTableOptions";
import { SortOrder } from "../types/TableControl";


type Sorts = {
    order: SortOrder
}

const useTableSort = () => {
  const tableOptions = useTableOptions();
  const manualSorting = tableOptions?.manualSorting ?? false;
  const [sorts, setSort] = useState<Map<any,any>>(new Map);
  

 
  const getIsSorted = (columnId: string): SortOrder => {
        const value =  sorts.get(columnId)?.order ?? undefined;
        return value
  };

  const getToggleSortingHandler = (columnId: any) => {
    let sortObj = manualSorting ? sorts : new Map();
    if (!sortObj.has(columnId)) {
      sortObj.set(columnId,{order:"asc"})
    } else if ( sortObj.get(columnId).order ==="asc") {
        sortObj.set(columnId,{order:"desc"})
    } else {
      sortObj.delete(columnId)
    }
    console.log({sortObj})
    setSort(new Map(sortObj));
    tableOptions?.sortingOptions?.onSort(Object.fromEntries(sortObj));
  };

  console.log("hook-rendered")

  return {
    manualSorting,
    getIsSorted,
    getToggleSortingHandler
  };
};

export default useTableSort;
