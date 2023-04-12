import { TableCell as MuiTableCell, styled } from "@mui/material";

type Props = {
    pinned?: boolean | "right" | "left",
    offset?:string | null,
}

const TableCell =  styled(MuiTableCell)<Props>((props)=>({
    ...(props.pinned ? { background:"#efefef"} : {}),
    ...(props.pinned==="left" ? { position:"sticky",left:props.offset ?? "unset",zIndex:1000 } : {}),
    ...(props.pinned==="right" ? { position:"sticky",right: props.offset ?? "unset",zIndex:1000 } : {}),
    // ,position:"sticky",right: props.offset ?? "unset"
    boxSizing:"border-box",


}))

export default TableCell