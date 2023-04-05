import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataTable from './components/DataTable'
import { Container } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'





function App() {
  // const columns = useMemo<ColumnDef<any,any>[]>(
  //   () => [
  //     {
  //       accessorKey: "firstName",
  //       header: () => <span>First Name</span>,
  //       footer: (props) => props.column.id,
  //     },
  //     {
  //       id: "lastName",
  //       accessorKey: "lastName",
  //       header: () => <span>Last Name</span>,
  //       footer: (props) => props.column.id,
  //     },
  //     {
  //       accessorKey: "age",
  //       header: () => "Age",
  //       type: "number",
  //       meta: {
  //         type: "number",
  //       },
  //       footer: (props) => props.column.id,
  //     },
  //     {
  //       accessorKey: "visits",
  //       header: () => <span>Visits</span>,
  //       type: "number",
  //       meta: {
  //         type: "number",
  //       },
  //       footer: (props) => props.column.id,
  //     },
  //     {
  //       accessorKey: "status",
  //       header: "Status",
  //       footer: (props) => props.column.id,
  //     },
  //     {
  //       accessorKey: "progress",
  //       header: "Profile Progress",
  //       footer: (props) => props.column.id,
  //     },
  //     {
  //       accessorKey: "dob",
  //       header: "Date of Birth",
  //       meta: {
  //         type: "date",
  //       },
  //       type: "date",
  //       footer: (props) => props.column.id,
  //     },
  //   ],
  //   []
  // );


  const columns = useMemo<ColumnDef<any,any>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <span>Name</span>,
      },
      {
        id: "url",
        accessorKey: "url",
        header: () => <span>Url</span>,
      },
    ],[]);
  const [rowsPerPage, setrowsPerPage] = useState<number>(10)
  const [data, setData] = useState<any>();

  const fetchData = async(page=1,limit=10)=>{
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=${limit}`);
    let data = await res.json();
    console.log(data);
    setData(data)
  }
  useEffect(()=>{
    fetchData();
  },[rowsPerPage])


  const tableOptions = {
    manualPagination:true,
    paginationOption:{
      totalCount:data?.count ?? undefined,
      rowsPerPage:rowsPerPage,
      onRowsPerPageChange:(s:number)=>setrowsPerPage(s),
      gotoPage:()=>{},
    }
  }

  return (
    <Container sx={{mt:6}} maxWidth={false}>
    <DataTable 
    columns={columns}
     data={data?.results ?? []} 
     onCellUpdate={(value)=>console.log({value})}
     tableOptions={tableOptions}/>
    </Container>
  )
}

export default App
