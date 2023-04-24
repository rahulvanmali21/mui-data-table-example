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
    order?:SortOrder
    onSort:(column:any)=>void,
    multiSort?:boolean
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

export type TitleOption = {
        title:string,
}

export type GlobalFilterOptions = {
    value?:string,
    onChange?:(value:string)=>void,
    manual:boolean
}

export type TableOptions = {
    titleOptions?:TitleOption,
    globalFilterOptions?:GlobalFilterOptions,
    manualPagination?:boolean,
    manualSorting?:boolean,
    paginationOption?:PaginationOptions,
    sortingOptions?:SortingOptions,
    filterOptions:FilterOptions,
    subComponentOptions?:SubComponentOptions
    loading?:boolean
    showFooter?:boolean
}


export interface DataTableProp {
    columns:ColumnDef<any,any>[],
    data?:any[],
    onCellUpdate:(v:any)=>void
    tableOptions?:TableOptions,
}
