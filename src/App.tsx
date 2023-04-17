import { useEffect, useMemo, useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import { Box, Container } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, TableOptions } from "./types/TableControl";

const operators = new Map(Object.entries({
  is: "$eqi",
  "is not": "$ne",
  "is after": "$gt",
  "is on or after": "$gte",
  "is before": "$lt",
  "is on or before": "$lt",
  "is empty": "$null",
  "is not empty": "$notNull",
  "contains": "$contains",
  "not contains": "$notContains",
  "equals": "$eqi",
  "startsWith": "$startsWith",
  "endsWith": "$endsWith",
  "isEmpty": "$null",
  "isNotEmpty": "$notNull",
  "isAnyOf": "$between",
  "=": "$eqi",
  "!=": "$ne",
  ">": "$gt",
  "<": "$lt",
  ">=": "$gte",
  "<=": "$lte",
}));

function App() {
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        id: "first_name",

        accessorKey: "attributes.first_name",
        header: () => <span>First Name</span>,
        footer: (props) => props.column.id,
        
        size:200,
      },
      {
        id: "last_name",

        accessorKey: "attributes.last_name",
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
        
        size:200,
      },
      {
        id: "email",

        accessorKey: "attributes.email",
        header: () => "Email",
        footer: (props) => props.column.id,
        
        size:200,
      },
      {
        id: "views",

        accessorKey: "attributes.views",
        header: () => <span>views</span>,
        meta: {
          type: "number",
        },
        footer: (props) => props.column.id,
        
        size:200,
      },
      {
        id: "dob",

        accessorKey: "attributes.dob",
        header: "Date of Birth",
        meta: {
          type: "date",
        },
        footer: (props) => props.column.id,
        
        size:200,
      },
      {
        id: "createdAt",

        accessorKey: "attributes.createdAt",
        header: "Created At",
        meta: {
          type: "datetime",
        },
        footer: (props) => props.column.id,
        
        size:200,
      },
      {
        id: "updatedAt",

        accessorKey: "attributes.updatedAt",
        header: "Updated At",
        meta: {
          type: "datetime",
        },
        footer: (props) => props.column.id,
        
        size:200,
      },
      {
        id: "updatedAt",

        accessorKey: "attributes.updatedAt",
        header: "Published At",
        meta: {
          type: "datetime",
        },
        footer: (props) => props.column.id,
        
        size:200,
      },
    ],
    []
  );

  const [rowsPerPage, setrowsPerPage] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [sort, setSort] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [filters, setFilters] = useState<Filter>();

  const fetchData = async (page = 0, limit = 10) => {
    const url = new URL("http://localhost:1337/api/employees");



    // pagination
    url.searchParams.append("pagination[page]", `${page + 1}`);
    url.searchParams.append("pagination[pageSize]", `${limit}`);

    // sorting
    if (sort && Object.keys(sort).length > 0) {
      Object.keys(sort)?.forEach?.((column, index) => {
        url.searchParams.append(
          `sort[${index}]`,
          column + ":" + sort[column].order
        );
      });
    }
    // simple filter
    if (filters && filters.value && filters.operator && filters.value) {
      const op: string = (filters?.operator as string) ?? "";
      url.searchParams.append(
        `filters[${filters.columnId}][${operators.get(op) ?? ""}]`,
        filters.value ?? ""
      );
    }
    // complex filter

    try {
      setLoading(true);
      let res = await fetch(url.toString());
      let data = await res.json();
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(pageIndex, rowsPerPage);
  }, [rowsPerPage, pageIndex, sort, filters]);

  const tableOptions: TableOptions = {
    manualPagination: true,
    manualSorting: true,
    paginationOption: {
      totalCount: data?.meta.pagination.total ?? undefined,
      rowsPerPage: rowsPerPage,
      onRowsPerPageChange: (s: number) => setrowsPerPage(s),
      gotoPage: (pageNum: number) => {
        setPageIndex(pageNum);
      },
      pageIndex: pageIndex,
    },
    sortingOptions: {
      currentSort: sort,
      order: undefined,
      onSort: (sortObj: any) => {
        setSort(sortObj);
      },
    },
    subComponentOptions:{
      position:"start",
      component:({row})=><Box paddingX={3} paddingY={4}>
        <pre>
        {
          JSON.stringify(row?.original,null,2)
        }
        </pre>
      </Box>
    },
    filterOptions: {
      setFilters,
      filters,
    },
    loading:loading
  };

  return (
    <Container sx={{ mt: 6 }} maxWidth={false}>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        onCellUpdate={(value) => console.log({ value })}
        tableOptions={tableOptions}
      />
    </Container>
  );
}


export default App;
