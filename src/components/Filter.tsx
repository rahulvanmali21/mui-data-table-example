import React, { useEffect, useMemo, useState } from "react";
import useTable from "../hooks/useTable";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { DATE_OPERATOR, NUMBERIC_OPERATOR, STRING_OPERATOR } from "../constants/filters";
import { RowData } from "@tanstack/react-table";
import useTableOptions from "../hooks/useTableOptions";


declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends RowData, TValue> {
      type?: string
    }
  }


const Filter = () => {
  const table = useTable();
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const tableOptions = useTableOptions()
  
  const type = selectedColumn ? table.getColumn(selectedColumn)?.columnDef?.meta?.type : "text";


  useEffect(()=>{
    if(selectedColumn && value && operator){
      tableOptions?.filterOptions?.setFilters({
        columnId:selectedColumn ,  operator,value
      })
    }
  },[value,operator,selectedColumn])
    
  
  const operators = useMemo(() => {
    if(selectedColumn){
        const colDef =  table.getColumn(selectedColumn)?.columnDef;
        if(colDef?.meta?.type ==="number"){
            return NUMBERIC_OPERATOR;
        }
        if(colDef?.meta?.type ==="date"){
            return DATE_OPERATOR;
        }
        return STRING_OPERATOR;
    }
    return STRING_OPERATOR;
  }, [selectedColumn]);




  return (
    <Box sx={{ maxWidth: 600, p: 2, width: 600 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel variant="standard">column</InputLabel>
            <NativeSelect
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              defaultValue={30}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              {table
                .getAllLeafColumns()
                .filter((c) => c.id !== "select")
                .map((column, cid) => (
                  <option key={cid} value={column.id}>{column.id}</option>
                ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel variant="standard">column</InputLabel>
            <NativeSelect
              onChange={(e) => setOperator(e.target.value)}
              value={operator}
              defaultValue={30}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              {operators.map((column, cid) => (
                <option value={column} key={cid}>{column}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="value "
            variant="standard"
            type={type}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
