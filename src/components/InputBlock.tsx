import React, {useState} from 'react';
import TextField from "@mui/material/TextField";

type InputBlockType = {
  id: string,
  title: string,
  multiline: boolean,
  rows: number,
}

const InputBlock = (props: InputBlockType): JSX.Element => {
  const [data, setData] = useState('');

  const handleChange = (event) => setData(event.target.value);

  return (
    <div style={{marginBottom: '30px'}}>
      <p>{props.title}<span style={{color: "red"}}> *</span></p>
      <TextField
        id={props.id}
        value={data}
        multiline={props.multiline}
        rows={props.rows}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
    </div>
  )
};

export default InputBlock;
