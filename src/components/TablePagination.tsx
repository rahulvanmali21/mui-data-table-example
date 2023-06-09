import {
  TablePagination as MUITablePagination,
  Paper,
} from "@mui/material";
import useTablePagination from "../hooks/useTablePagination";

type Props = {};

const TablePagination = (props: any) => {
  const { rowsPerPage, gotoPage, count, pageNo, onRowsPerPageChange,hidePagination } =
    useTablePagination();

    if(hidePagination){
      return null;
    }

  return (
    <Paper
      sx={{ borderTop: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
      variant="outlined"
    >
      {/* <LinearProgress /> */}
      <MUITablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count ?? 0}
        rowsPerPage={rowsPerPage ?? 0}
        page={pageNo ?? 4}
        onPageChange={(e, page) => gotoPage(page)}
        onRowsPerPageChange={(e) => {
          onRowsPerPageChange?.(parseInt(e.target.value, 10));
        }}
      />
    </Paper>
  );
};

export default TablePagination;


