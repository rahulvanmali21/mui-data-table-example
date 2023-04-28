import React from "react";

import { useVirtual } from "react-virtual";
import { useTable } from "../TableContext";

const useVirtualizeTable = ({ ref,table }: any) => {
  
  const rows = table ? table?.getRowModel?.().rows : [];
  const rowVirtualizer = useVirtual({
    parentRef: ref,
    size: rows?.length ?? 10000,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  console.log({virtualRows})
  return { virtualRows, totalSize};
};

export default useVirtualizeTable;
