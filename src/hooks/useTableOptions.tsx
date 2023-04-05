import React, { useContext } from 'react'
import { TableOptionContext } from '../TableOptionContext'

const useTableOptions = () => {
  const option  = useContext(TableOptionContext)
  return option;
}

export default useTableOptions