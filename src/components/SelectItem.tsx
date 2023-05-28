import React from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";

type SelectItemType = {
  id: string,
  options: string[],
  value: string,
  style?: any,
  height?: any,
  label?: string,
  onChange(event: any): void,
  required: boolean,
}

const SelectItem = (props:SelectItemType):JSX.Element => {
  return (
    <FormControl variant="outlined" style={props.style} required={props.required}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        key={props.id}
        native
        value={props.value}
        onChange={props.onChange}
        defaultValue={`${props.value}`}
        inputProps={{
          id: `${props.id}`,
        }}
        style={props.height}
        label={props.label}
      >
        <option key={0} aria-label="None" value=""/>
        {
          props.options.map((option, index) =>
            <option key={index + 1} value={option}>{option}</option>
          )
        }
      </Select>
    </FormControl>
  )
};

export default SelectItem;
