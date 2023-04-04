import { Checkbox } from "@mui/material";
import React from "react";

const IndeterminateCheckbox = ({ indeterminate, ...rest }: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) => {

  const {onChange,disabled,checked} = rest
  return <Checkbox  size="small" indeterminate={indeterminate} onChange={onChange} disabled={disabled} checked={checked} />;
};

export default IndeterminateCheckbox;
