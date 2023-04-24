import React, {useState} from 'react';
import TextField from "@mui/material/TextField";

const InputItem = ({id, multiline, rows, label, onInputChange}) => {
  const [data, setData] = useState('');

  const handleChange = (event) => {
    setData(event.target.value);
    onInputChange(event.target.value);
  };

  return (
    <TextField
      id={id}
      value={data}
      label={label ?? label}
      multiline={multiline}
      rows={rows}
      onChange={handleChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default InputItem;
