import React, {useState} from 'react';
import TextField from "@mui/material/TextField";

type InputItemType = {
  id: string,
  multiline?: boolean,
  rows?: number,
  label?: string,
  value: any,
  onInputChange(_event:any): void,
}

const InputItem = (props: InputItemType):JSX.Element => {

  return (
    <TextField
      id={props.id}
      value={props.value}
      label={props?.label}
      multiline={props?.multiline}
      rows={props?.rows}
      onChange={props.onInputChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default InputItem;
