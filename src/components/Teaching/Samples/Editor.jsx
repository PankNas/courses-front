import React from 'react';
import styles from "./VideoSample/VideoSample.module.scss";
import SimpleMDE from "react-simplemde-editor";
import {setDesc} from "../../../redux/slices/sampleLesson";
import {useDispatch} from "react-redux";

const Editor = ({value, height, placeholder, fnDispatch}) => {
  const dispatch = useDispatch();

  const handleChangeEdit = React.useCallback((value) => dispatch(fnDispatch(value)), []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: `${height}`,
      placeholder: `${placeholder}`,
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }), []);

  return (
    <SimpleMDE
      className={styles.editor}
      value={value}
      onChange={handleChangeEdit}
      options={options}
      style={{paddingRight: '30px', paddingLeft: '30px'}}
    />
  )
}

export default Editor;
