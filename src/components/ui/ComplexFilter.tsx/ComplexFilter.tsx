import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  NativeSelect,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DATE_OPERATOR,
  NUMBERIC_OPERATOR,
  STRING_OPERATOR,
} from "../../../constants/filters";
import { useTable } from "../../../TableContext";
import CloseIcon from "@mui/icons-material/Close";
import useTableOptions from "../../../hooks/useTableOptions";

const filterColumn = new Set();
const MAX_FILTERS = 7;

const ComplexFilter = ({ selectedColumnId }: any) => {
  const tableOptions = useTableOptions();
  const filter = tableOptions?.filterOptions.filters ?? null;

  useEffect(() => {
    return () => filterColumn.clear();
  }, []);

  useEffect(() => {
    if (Array.isArray(filter)) {
      setfilters(filter);
    }
  }, [filter]);

  const [filters, setfilters] = useState<any[]>(
    filter && Array.isArray(filter)
      ? filter
      : [{ selectedColumn: selectedColumnId ?? "", operator: "", value: "" }]
  );
  const addFilters = () => {
    if (setfilters.length >= MAX_FILTERS) return;
    setfilters((s) => [...s, {}]);
  };
  const handleFilters = (index: number, filter: any) => {
    filterColumn.add(`${filter.selectedColumn}-${filter.operator}`);
    setfilters((s) =>
      s.map((oldFilter, i) => {
        if (i === index) return filter;
        return oldFilter;
      })
    );
  };

  const applyFilter = () => {
    tableOptions?.filterOptions.setFilters(filters);
  };
  const removeFilter = (index: number) => {
    if (index !== 0) {
      setfilters((s) => s.filter((_, i) => i !== index));
    }
  };

  const canAddFilter = useMemo(() => {
    if (!!filters.at(-1).value && filters.length < MAX_FILTERS) return true;
    return false;
  }, [filters]);

  const width = filters.length > 1 ? 700 : 600;

  return (
    <Box sx={{ maxWidth: width, p: 2, width: width }}>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        columns={filters.length > 1 ? 12 : 10}
        alignItems="flex-end"
      >
        {filters.map((filter, index, arr) => (
          <FilterForm
            filter={filter}
            setFilter={(filter: any) => handleFilters(index, filter)}
            keys={index}
            index={index}
            count={arr.length}
            removeFilter={() => removeFilter(index)}
          />
        ))}
        <Grid item xs={10}>
          <Stack direction="row" gap={3}>
            <Button onClick={addFilters} disabled={!canAddFilter} size="small">
              Add Filters
            </Button>
            <Button
              size="small"
              disabled={!filters.at(-1).value}
              onClick={applyFilter}
            >
              Apply
            </Button>
            <Button size="small">Reset</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplexFilter;

const FilterForm = ({ filter, setFilter, removeFilter, index, count }: any) => {
  const [selectedColumn, setSelectedColumn] = useState<string | null>(
    filter.setSelectedColumn ?? ""
  );
  const [value, setValue] = useState<string | null>(filter.value ?? null);
  const [logicOperator, setLogicOperator] = useState<string | null>(null);
  const table = useTable();
  const columnnIdRef = useRef<HTMLSelectElement>();
  let type = selectedColumn
    ? table.getColumn(selectedColumn)?.columnDef?.meta?.type
    : "text";
  type = type === "datetime" ? "datetime-local" : type;

  const operators = useMemo(() => {
    let newOperator: any[] = STRING_OPERATOR;

    if (selectedColumn) {
      const colDef = table.getColumn(selectedColumn)?.columnDef;
      if (colDef?.meta?.type === "number") {
        newOperator = NUMBERIC_OPERATOR;
      }
      if (colDef?.meta?.type === "date" || colDef?.meta?.type === "datetime") {
        newOperator = DATE_OPERATOR;
      }
    }
    return newOperator.filter(
      (op) => !filterColumn?.has(selectedColumn + "-" + op)
    );
  }, [selectedColumn]);

  const [operator, setOperator] = useState<string | null>(operators?.[0] ?? "");

  useEffect(() => {
    if (selectedColumn && operator && value) {
      setFilter({
        selectedColumn,
        operator,
        value,
        logicOperator,
      });
    }
  }, [selectedColumn, operator, value, logicOperator]);

  return (
    <>
      <Grid item xs={1}>
        <IconButton
          size="small"
          onClick={removeFilter}
          sx={{ textTransform: "unset" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>
      {count > 1 && (
        <Grid item xs={2}>
          {index > 0 && (
            <NativeSelect
              value={logicOperator}
              fullWidth
              onChange={(e) => setLogicOperator(e.target.value)}
            >
              <option value="">select </option>

              {["and", "or"].map((column, cid) => (
                <option value={column} key={cid}>
                  {column}
                </option>
              ))}
            </NativeSelect>
          )}
        </Grid>
      )}
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel variant="standard" shrink={true}>
            column
          </InputLabel>
          <NativeSelect
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            inputRef={columnnIdRef}
            inputProps={{
              name: "columnId",
            }}
          >
            <option value="">select column </option>

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
          <InputLabel variant="standard" shrink={true}>
            operator
          </InputLabel>
          <NativeSelect
            onChange={(e) => setOperator(e.target.value)}
            value={operator}
            inputProps={{
              name: "operator",
            }}
          >
            <option value="">select operator</option>
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
          onChange={(e) => setValue(e.target.value)}
          label="value "
          variant="standard"
          type={type}
        />
      </Grid>
    </>
  );
};
