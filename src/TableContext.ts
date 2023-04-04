import React, { useContext } from "react";
import { Table } from "@tanstack/react-table";
export const TableContext = React.createContext<Table<any>>({} as Table<null>)



export const useTable = ()=>{
    const table = useContext(TableContext);
    return table;
}