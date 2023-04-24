import { useEffect, useMemo, useState } from "react";
import { useTable } from "../TableContext";
import { debounce } from "../util/debounce";
import { TextField } from "@mui/material";
import useTableOptions from "../hooks/useTableOptions";

const SearchFeild = () => {
  const table = useTable();
  const tableOptions = useTableOptions();
  const globalFilterOptions = tableOptions?.globalFilterOptions;
  const [value, setValue] = useState<string>("");
  const manual = globalFilterOptions?.manual ?? false;

  useEffect(() => {
    if (globalFilterOptions?.value) {
      setValue(globalFilterOptions.value);
    }
  }, [globalFilterOptions?.value]);
  const handleChange = (e: any) => {
    setValue(e.target.value);
    debouceSearch(e.target.value);
  };
  const debouceSearch = useMemo(() => {
    if (manual && globalFilterOptions?.onChange) {
      return debounce(globalFilterOptions?.onChange, 400);
    }
    return debounce(table?.setGlobalFilter, 400);
  }, []);

  return (
    <TextField
      size="small"
      placeholder="Search"
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchFeild;
