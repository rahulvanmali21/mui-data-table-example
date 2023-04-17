import useTableOptions from "../hooks/useTableOptions";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

export const rowSelectionOption = {
  id: "select",
  maxSize: 30,
  header: ({ table }: any) => {
    const tableOption = useTableOptions();
    return (
      <IndeterminateCheckbox
        {...{
          disabled:tableOption?.loading, 
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    );
  },
  cell: ({ row }: any) => (
    <IndeterminateCheckbox
      {...{
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        indeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler(),
      }}
    />
  ),
};
