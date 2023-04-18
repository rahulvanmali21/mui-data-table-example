import React, { createContext, useState } from 'react'

const defaultValue:any = {
    state:{},
    settters:()=>{}
}

export const ColumnDragAndDropContext = createContext(defaultValue)

type Props = {
    children:React.ReactNode
}

const ColumnDragAndDrop = (props:Props) => {

     const [draggedColumn, setDraggedColumn] = useState<string|null>(null);
     const [hoverOn, setHoverOn] = useState<string|null>(null);

    const state ={
        draggedColumn,
        hoverOn
    }
    const setters ={
        setHoverOn,
        setDraggedColumn,
    }
  return (
    <ColumnDragAndDropContext.Provider value={{state,setters}}>
        {props.children}
    </ColumnDragAndDropContext.Provider>
  )
}

export default ColumnDragAndDrop