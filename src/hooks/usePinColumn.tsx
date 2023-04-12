import React, { useCallback, useMemo } from 'react'
import { useTable } from '../TableContext'

const usePinColumn = () => {
    const table = useTable()
    const {columnPinning} = table.getState();
    const leftPinnedColumns = useMemo(()=>{
        const leftPinConfig:any = {}
        let nextWidth = 0
        if(columnPinning?.left && Object.keys(columnPinning.left).length > 0){
          columnPinning.left.forEach((columnId)=>{
            leftPinConfig[columnId] = nextWidth
            nextWidth += table.getColumn(columnId)?.getSize() ?? 0
          });
        }
        return leftPinConfig;
      },[columnPinning.left])
    
      const rightPinnedColumns = useMemo(()=>{
        const rightPinConfig:any = {}
        let nextWidth = 0
        if(columnPinning?.right && Object.keys(columnPinning.right).length > 0){
          columnPinning.right.forEach((columnId)=>{
            rightPinConfig[columnId] = nextWidth
            nextWidth += table.getColumn(columnId)?.getSize() ?? 0
          });
        }
        return rightPinConfig;
      },[columnPinning.right])


    const getColumnOffset = useCallback((columnId:string,pinned:"left" | "right")=>{
        if(pinned == 'right'){
            return rightPinnedColumns[columnId]
        }
        return leftPinnedColumns[columnId];

    },[leftPinnedColumns , rightPinnedColumns])
    return {getColumnOffset}
}

export default usePinColumn