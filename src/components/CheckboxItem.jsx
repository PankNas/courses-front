import React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

const CheckboxItem = ({options, answer, fnChange, numItem}) => {
  const isChecked = (index) => index === answer;

  return (
    <FormGroup>
      {
        options.map((option, index) =>
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                id={`${index}`}
                checked={isChecked(index)}
                onChange={(event) => fnChange(event, index, numItem)}/>
            }
            label={option}/>
        )
      }
    </FormGroup>
  )
}

export default CheckboxItem;
