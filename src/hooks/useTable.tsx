import { useContext } from "react";
import { TableContext } from "../TableContext";


const useTable = ()=>{
    const table = useContext(TableContext);
    return table;
}

export default useTable