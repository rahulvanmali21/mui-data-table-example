import { InputBase, OutlinedInput } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

export const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    const [show, setShow] = React.useState(false);

    const type = useMemo(() => {
      if (column.columnDef.meta?.type === "datetime") {
        return "datetime-local";
      }
      if (column.columnDef.meta?.type) {
        return column.columnDef.meta?.type;
      }
      return "text";
    }, [column.columnDef]);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, column.id, value);
      setShow(false);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if (!show) {
      return <span onDoubleClick={() => setShow((s) => !s)}>{value + ""}</span>;
    }

    return (
      <InputBase
        size="small"
        type={type}
        fullWidth
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};
