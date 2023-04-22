import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useMemo } from 'react'
import useTable from '../hooks/useTable';
import { debounce } from '../util/debounce';

const ToolbarAction = () => {
  return (
    <Stack direction={"row"}>

        <SearchFeild />
        
    </Stack>
  )
}

export default ToolbarAction



function SearchFeild() {
  const table = useTable()
  const [value, setValue] = React.useState<string>("");
  const handleChange=(e:any)=>{
    setValue(e.target.value);
    debouceSearch(e.target.value)
  }
  const debouceSearch =  useMemo(()=>debounce(table?.setGlobalFilter,400),[]) 

  return (
    <TextField size='small' placeholder='Search'  value={value} onChange={handleChange} />
  )
}