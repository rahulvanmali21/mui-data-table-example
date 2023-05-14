import React, { useEffect, useMemo, useRef, useState } from "react";
import useTable from "../hooks/useTable";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import {
  DATE_OPERATOR,
  NUMBERIC_OPERATOR,
  STRING_OPERATOR,
} from "../constants/filters";
import { RowData } from "@tanstack/react-table";
import useTableOptions from "../hooks/useTableOptions";
import { useTableFilter } from "../hooks/useTableFilter";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    type?: string;
  }
}

type Props = {
  selectedColumnId?: string | null;
};

const Filter = ({ selectedColumnId }: Props) => {
  const table = useTable();
  const [selectedColumn, setSelectedColumn] = useState<string | null>(
    selectedColumnId ?? ""
  );
  const [operator, setOperator] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const columnnIdRef = useRef<HTMLSelectElement>();
  const operatorRef = useRef<HTMLSelectElement>();
  const valueRef = useRef<HTMLInputElement>();


  const { filter, setFilters } = useTableFilter();

  let type = selectedColumn
    ? table.getColumn(selectedColumn)?.columnDef?.meta?.type
    : "text";
  type = type === "datetime" ? "datetime-local" : type;

  useEffect(() => {
    setSelectedColumn(filter?.columnId ?? null);
    setOperator(filter?.operator ?? null);
    setValue(filter?.value ?? null);
  }, [filter]);

  const operators = useMemo(() => {
    if (selectedColumn) {
      const colDef = table.getColumn(selectedColumn)?.columnDef;
      if (colDef?.meta?.type === "number") {
        return NUMBERIC_OPERATOR;
      }
      if (colDef?.meta?.type === "date" || colDef?.meta?.type === "datetime") {
        return DATE_OPERATOR;
      }
      return STRING_OPERATOR;
    }
    return STRING_OPERATOR;
  }, [selectedColumn]);

  const applyFilter = () => {
    if (
      columnnIdRef.current?.value &&
      operatorRef.current?.value &&
      valueRef.current?.value
    ) {
      let filters = {
        columnId: columnnIdRef.current?.value,
        operator: operatorRef.current?.value,
        value: valueRef.current?.value,
      };

      setFilters?.(filters);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, p: 2, width: 600 }}>
      <Grid container columnSpacing={2} columns={10} alignItems="flex-end">
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel variant="standard" shrink={true}>
              column
            </InputLabel>
            <NativeSelect
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              defaultValue={30}
              inputRef={columnnIdRef}
              inputProps={{
                name: "columnId",
              }}
            >
              {table
                .getAllLeafColumns()
                .filter((c) => c.id !== "select" && c.id !== "expander")
                .map((column, cid) => (
                  <option key={cid} value={column.id}>
                    {column.id}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel variant="standard">operator</InputLabel>
            <NativeSelect
              onChange={(e) => setOperator(e.target.value)}
              value={operator}
              defaultValue={30}
              inputRef={operatorRef}
              inputProps={{
                name: "operator",
              }}
            >
              {operators.map((column, cid) => (
                <option value={column} key={cid}>
                  {column}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            value={value}
            inputRef={valueRef}
            onChange={(e) => setValue(e.target.value)}
            label="value "
            variant="standard"
            type={type}
          />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={applyFilter} sx={{ textTransform: "unset" }}>
            Apply
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
