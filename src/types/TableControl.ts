import { ColumnDef } from "@tanstack/react-table"


export type SortOrder = "asc" | "desc" | undefined

type PaginationOptions ={
    totalCount:number,
    rowsPerPage:number,
    pageIndex:number,
    onRowsPerPageChange:(v:number)=>void,
    gotoPage:(pageNo:number)=>void,
}


type SortingOptions = {
    currentSort:string[] | string | null,
    order:SortOrder
    onSort:(column:any)=>void
}

type FilterOptions = {
    filters?:Filter,
    setFilters:(filters:any)=>void
}
export type Filter = {
    columnId:string | null,
    operator:string | null,
    value:string | null
}

export type SubComponentOptions = {
    component:React.ComponentType<any>,
    position: "start" | "end",
    onOpen?:(...args:any)=>void
    onClose?:()=>void
}


export type TableOptions = {
    manualPagination?:boolean,
    manualSorting?:boolean,
    paginationOption?:PaginationOptions,
    sortingOptions?:SortingOptions,
    filterOptions:FilterOptions,
    subComponentOptions?:SubComponentOptions
}


export interface DataTableProp {
    columns:ColumnDef<any,any>[],
    data?:any[],
    loading?:boolean
    onCellUpdate:(v:any)=>void
    tableOptions?:TableOptions,
}
