import { Autocomplete, TextField, Box } from "@mui/material";
import React from "react";

const LanguageDropDown = (props) => {
  const { option, onChange, disabled } = props;
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      autoHighlight
      disabled={disabled}
      options={option}
      getOptionLabel={(option) => option.language}
      sx={{ width: 300 }}
      onChange={(e, val) => onChange(val.code)}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.language} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Select Language" />
      )}
    />
  );
};

export default LanguageDropDown;
