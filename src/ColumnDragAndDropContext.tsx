import React, { createContext, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
        <DndProvider backend={HTML5Backend}>
        {props.children}
        </DndProvider>
    </ColumnDragAndDropContext.Provider>
  )
}

export default ColumnDragAndDrop