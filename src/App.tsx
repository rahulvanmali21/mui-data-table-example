import { useEffect, useMemo, useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import { Container } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { TableOptions } from "./types/TableControl";

function App() {
  const columns = useMemo<ColumnDef<any,any>[]>(
    () => [
      { 
        id:"first_name",
        accessorKey: "attributes.first_name",
        header: () => <span>First Name</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "last_name",
        accessorKey: "attributes.last_name",
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "email",
        accessorKey: "attributes.email",
        header: () => "Email",
        footer: (props) => props.column.id,
      },
      {
        id: "views",
        accessorKey: "attributes.views",
        header: () => <span>views</span>,
        type: "number",
        meta: {
          type: "number",
        },
        footer: (props) => props.column.id,
      },
      {
        id: "dob",
        accessorKey: "attributes.dob",
        header: "Date of Birth",
        meta: {
          type: "date",
        },
        type: "date",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  // const columns = useMemo<ColumnDef<any, any>[]>(
  //   () => [
  //     {
  //       accessorKey: "name",
  //       header: () => <span>Name</span>,
  //     },
  //     {
  //       id: "url",
  //       accessorKey: "url",
  //       header: () => <span>Url</span>,
  //     },
  //   ],
  //   []
  // );
  const [rowsPerPage, setrowsPerPage] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [sort, setSort] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const fetchData = async (page = 0, limit = 10) => {
    const url = new URL('http://localhost:1337/api/employees')
   
    if(sort && Object.keys(sort).length > 0){
      Object.keys(sort)?.forEach?.((column,index)=>{
        url.searchParams.append(`sort[${index}]`,column + ":"+sort[column].order)
      })
    }
    url.searchParams.append("pagination[page]",`${page+1}`)
    url.searchParams.append("pagination[pageSize]",`${limit}`)
    console.log(url.toString() )
    try {
      setLoading(true);
      // let res = await fetch(
      //   `http://localhost:1337/api/employees?pagination[page]=${page+1}&pagination[pageSize]=${limit}`
      // );
      let res = await fetch(
        url.toString()
      );
      let data = await res.json();
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(pageIndex, rowsPerPage);
  }, [rowsPerPage, pageIndex,sort]);

  const tableOptions:TableOptions = {
    manualPagination: true,
    manualSorting:true,
    paginationOption: {
      totalCount: data?.meta.pagination.total ?? undefined,
      rowsPerPage: rowsPerPage,
      onRowsPerPageChange: (s: number) => setrowsPerPage(s),
      gotoPage: (pageNum: number) => {
        setPageIndex(pageNum);
      },
      pageIndex: pageIndex,
    },
    sortingOptions:{
      currentSort:sort,
      order:undefined,
      onSort:(sortObj:any)=>{
        setSort(sortObj);
      }
    }
  };

  return (
    <Container sx={{ mt: 6 }} maxWidth={false}>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        onCellUpdate={(value) => console.log({ value })}
        tableOptions={tableOptions}
        loading={loading}
      />
    </Container>
  );
}

export default App;
