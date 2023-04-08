import { InputBase, OutlinedInput } from "@mui/material"
import { ColumnDef } from "@tanstack/react-table"
import React from 'react'




export const defaultColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);
      const [show, setShow] = React.useState(false);
  
      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, column.id, value);
        setShow(false)
      };
  
  
      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
  
      
      if(!show){
          return <span onDoubleClick={()=>setShow(s=>!s)}>
              {value+""}
          </span>
      }
  
  
      return (
        <OutlinedInput
          size="small"
          type={column.columnDef.meta?.type??"text"}
          fullWidth
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  };