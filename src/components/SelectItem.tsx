import React from 'react';
import {FormControl, Select} from "@mui/material";

type SelectItemType = {
  id: string,
  options: {
    value: string,
    text: string,
  }[],
  style?: any,
  onChange(event: any): void,
}

const SelectItem = (props:SelectItemType):JSX.Element => {
  return (
    <FormControl variant="outlined" style={props.style}>
      <Select
        native
        onChange={props.onChange}
        defaultValue={`${props.options[0].value}`}
        inputProps={{
          id: `${props.id}`,
        }}
      >
        <option aria-label="None" value=""/>
        {
          props.options.map(option =>
            <option value={option.value}>{option.text}</option>
          )
        }
      </Select>
    </FormControl>
  )
};

export default SelectItem;
