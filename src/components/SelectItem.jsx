import React from 'react';
import {FormControl, Select} from "@mui/material";

const SelectItem = (props) => {
  return (
    <FormControl variant="outlined" style={props.style}>
      <Select
        native
        // onChange={handleChange}
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
