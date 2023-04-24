import { TableCell as MuiTableCell, styled } from "@mui/material";

type Props = {
    pinned?: boolean | "right" | "left",
    offset?:string | null,
    isDragged?:boolean,
    isHoveredOn?:boolean,
}

const TableCell =  styled(MuiTableCell)<Props>((props)=>({
    borderLeft:"1px solid transparent",
    borderRight:"1px solid transparent",
    ...(props.pinned ? { background:"#efefef"} : {}),
    ...(props.pinned==="left" ? { position:"sticky",left:props.offset ?? "unset",zIndex:1000 } : {}),
    ...(props.pinned==="right" ? { position:"sticky",right: props.offset ?? "unset",zIndex:1000 } : {}),
    boxSizing:"border-box",
    ...(props.isHoveredOn && {
        borderLeft:"1px dashed " + props.theme.palette.primary.main,
        borderRight:"1px dashed " + props.theme.palette.primary.main,
        opacity:0.9,
    }),
    ...(props.isDragged && {
        borderLeft:"1px dashed " + props.theme.palette.divider,
        borderRight:"1px dashed " + props.theme.palette.divider,
    }),
    ...((props.isDragged || props.isHoveredOn) && {
        opacity:0.5
    })


}))

export default TableCell