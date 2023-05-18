import React, { useEffect, useState } from "react";
import useTableOptions from "./useTableOptions";
import { SortOrder } from "../types/TableControl";
import useTable from "./useTable";

type Sorts = {
  order: SortOrder;
};

const useTableSort = () => {
  const tableOptions = useTableOptions();
  const manualSorting = tableOptions?.manualSorting ?? false;
  const multiSort = tableOptions?.sortingOptions?.multiSort ?? false;
  const [sorts, setSort] = useState<Map<any, any>>(new Map());
  const currentSort = tableOptions?.sortingOptions?.currentSort;
  const table = useTable();

  const getIsSorted = (columnId: string, header?: any): SortOrder => {
    if(manualSorting){
      return sorts.get(columnId)?.order ?? undefined
    }else{
     return  header ? header.column.getIsSorted() : table?.getColumn(columnId)?.getIsSorted() || undefined;
    }
  };

  const getToggleSortingHandler = (columnId: any, order?: SortOrder) => {
    let sortObj = multiSort ? structuredClone(sorts) : new Map();
    if(order){
      sortObj.set(columnId, { order });
    }
    else if (!sortObj.has(columnId)) {
      sortObj.set(columnId, { order: "asc" });
    } else if (sortObj.get(columnId).order === "asc") {
      sortObj.set(columnId, { order: "desc" });
    } else {
      sortObj.delete(columnId);
    }
    tableOptions?.sortingOptions?.onSort(Object.fromEntries(sortObj));
  };

  useEffect(() => {
    if(currentSort && Object.keys(currentSort).length > 0 ){
      setSort(new Map(Object.entries(currentSort)));
    }else{
      setSort(new Map());
    }
  }, [currentSort])
  
  return {
    manualSorting,
    getIsSorted,
    getToggleSortingHandler,
    sorts
  };
};

export default useTableSort;
