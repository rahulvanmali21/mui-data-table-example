import React, { useMemo } from "react";
import { useTable } from "../TableContext";

const useRowSelection = () => {
  const table = useTable();
  const selectedRows = table.getSelectedRowModel();
  const selectedIDsSet = useMemo(() => {
    const set = new Set();
    selectedRows.flatRows.forEach((row: any) => {
      set.add(row.id);
    });
    return set;
  }, [selectedRows]);
  return { selectedRows, selectedIDsSet };
};

export default useRowSelection;
