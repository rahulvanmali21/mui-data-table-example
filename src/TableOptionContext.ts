import { createContext } from "react";
import { TableOptions } from "./types/TableControl";


const defaultValue:TableOptions = {
    manualPagination:false,
    paginationOption:{
        totalCount:0,
        rowsPerPage:0,
        onRowsPerPageChange:(v:number)=>{},
        gotoPage:(pageNo:number)=>{},
        
    }
}

export const TableOptionContext = createContext<TableOptions | undefined>(defaultValue)


