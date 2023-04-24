import React, { useRef, useState } from "react";
import { useTable } from "../TableContext";
import {
  TableRow,
  TableHead as MuiTableHead,
  Popover,
  LinearProgress,
} from "@mui/material";

import Filter from "./Filter";
import ColumnSelection from "./ColumnSelection";
import useTableOptions from "../hooks/useTableOptions";
import ColumnMenu from "./ColumnMenu";
import ComplexFilter from "./ui/ComplexFilter.tsx/ComplexFilter";
import ColumnHeader from "./ColumnHeader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TableHead = () => {
  const table = useTable();
  const tableOptions = useTableOptions();

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const headRef = useRef<any>();
  const loading = tableOptions?.loading ?? false;
  const [mainAnchor, setmainAnchor] = useState<Element | null>(null);
  const [menuType, setMenuType] = useState<any | null>(null);

  const [selectedColumn, setSelectedColumn] = useState<string>();

  const menuAnchor = useRef<HTMLTableRowElement>(null);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, column: any) => {
    setSelectedColumn(column.id);
    setAnchorEl(e.currentTarget);
  };

  const showCommonMenu = (type: string) => {
    setMenuType(type);
    setmainAnchor(menuAnchor?.current);
  };

  return (
    <>
      <MuiTableHead ref={headRef}>
        {table.getHeaderGroups().map((headerGroup, ij) => (
          <TableRow key={ij}>
            {headerGroup.headers.map((header, i) => (
              <ColumnHeader header={header} key={i} onClick={handleClick} />
            ))}
          </TableRow>
        ))}
        <tr ref={menuAnchor}>
          <td style={{ padding: 0 }} colSpan={table.getAllLeafColumns().length}>
            {loading && <LinearProgress />}
            <Popover
              disablePortal
              anchorEl={mainAnchor}
              open={!!mainAnchor}
              onClose={(e) => setmainAnchor(null)}
            >
              {(() => {
                switch (menuType) {
                  case "filters":
                    return <Filter selectedColumnId={selectedColumn} />;
                  case "columns":
                    return <ColumnSelection />;
                  case "complex_filters":
                    return <ComplexFilter selectedColumnId={selectedColumn} />;
                }
              })()}
            </Popover>
          </td>
        </tr>
      </MuiTableHead>
      <ColumnMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onMenuClick={(type: string) => {
          showCommonMenu(type);
          setAnchorEl(null);
        }}
        selectedColumnId={selectedColumn}
      />
    </>
  );
};

export default TableHead;
