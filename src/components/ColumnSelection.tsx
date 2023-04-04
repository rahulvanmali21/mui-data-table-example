import { Checkbox, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import React from 'react'
import useTable from "../hooks/useTable";


const ColumnSelection = () => {
  const table =  useTable()
  return (
    <List 
    
    sx={{
      width: "100%",
      maxWidth: 360,
      bgcolor: "background.paper",
    }}
    subheader={<ListSubheader>Columns</ListSubheader>}
  >
     {table
      .getAllLeafColumns()
      .filter((c) => c.id !== "select")
      .map((column, index) => (
        <ListItem dense key={index}>
          <ListItemIcon
            sx={{
              "&.MuiListItemIcon-root": { minWidth: "unset" },
            }}
          >
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              {...{
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
            />
          </ListItemIcon>
          <ListItemText id={column.id} primary={column.id} />
          {
            (()=>{
                console.log({column})
                return ""
            })()
          }
        </ListItem>
      ))} 
  </List>
  )
}

export default ColumnSelection