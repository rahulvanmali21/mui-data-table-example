import { TableCell as MuiTableCell, styled } from "@mui/material";

type Props = {
    pinned?: boolean | "right" | "left"
}

const TableCell =  styled(MuiTableCell)<Props>((props)=>({
    ...(props.pinned ? { background:"#efefef" } : {})
}))

export default TableCell