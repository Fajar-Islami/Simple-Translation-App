import { TextField } from "@mui/material";
import React from "react";

export const TextFieldComponent = (props) => {
  return (
    <TextField
      placeholder={props.placeholder}
      disabled={props.disabled}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      fullWidth
      id="fullWidth"
      multiline
      rows={4}
      InputProps={{
        ...props.InputProps,
      }}
    />
  );
};
