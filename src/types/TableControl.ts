import { ColumnDef } from "@tanstack/react-table"

type PaginationOptions ={
    totalCount:number,
    rowsPerPage:number,
    onRowsPerPageChange:(v:number)=>void,
    gotoPage:(pageNo:number)=>void,
}

export type TableOptions = {
    manualPagination?:boolean,
    paginationOption?:PaginationOptions
}


export interface DataTableProp {
    columns:ColumnDef<any,any>[],
    data?:any[],
    tableOptions?:TableOptions,
}
