import React, { useContext } from 'react'
import { ColumnDragAndDropContext } from '../ColumnDragAndDropContext'

const useColumnDnd = () => {
    const {state,setters} = useContext(ColumnDragAndDropContext)
  return {state,setters}
}

export default useColumnDnd