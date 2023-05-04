import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {setTitle} from "../../../redux/samples/sampleReducer";
import VideoSample from "./VideoSample/VideoSample";
import TextSample from "./TextSample/TextSample";
import SentenceSample from "./SentenceSample/SentenceSample";
import PassesSample from "./PassesSample/PassesSample";

const Samples = () => {
  const dispatch = useDispatch();
  const sampleLesson = useSelector(state => state.sample);

  const {id, sampleId} = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => navigate(-1);
  const handleInput = (event) => dispatch(setTitle(event.target.value));
  const handleSaveBtn = async () => {
    try {
      // const fields = {
      //   type: 'sentence',
      //   title,
      //   sentence,
      //   translate,
      //   course: id,
      // };
      //
      // sampleId ?
      //   await axios.patch(`/lessons/sentence/${sampleId}`, fields)
      //   : await axios.post(`/lessons/sentence`, fields);
      //
      // navigate(-1);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };

  return (
    <div>
      <h1>{sampleLesson.welcomeText}</h1>
      <TextField
        id={'name-lesson'}
        value={sampleLesson.title}
        label="Название урока"
        onChange={handleInput}
        variant="outlined"
        fullWidth
        style={{marginBottom: '10px'}}
      />

      {setComponent(sampleLesson.typeLesson)}

      <Button variant="outlined" onClick={handleSaveBtn} style={{marginRight: '15px'}}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={handleNavigate}>
        Отмена
      </Button>
    </div>
  );

  // const [title, setTitle] = useState('');
  // const [sentence, setSentence] = useState('');
  // const [translate, setTranslate] = useState('');
  //
  // const {id, sampleId} = useParams();
  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //   if (!sampleId) return;
  //
  //   axios
  //     .get(`lessons/${sampleId}`)
  //     .then(({data}) => {
  //       setTitle(data.title);
  //       setSentence(data.sentence);
  //       setTranslate(data.translate);
  //     });
  //
  // }, []);
  //
  // const handleChange = (event) => {
  //   switch (event.target.id) {
  //     case 'name-lesson':
  //       return setTitle(event.target.value);
  //     case 'sentence':
  //       return setSentence(event.target.value);
  //     case 'translate':
  //       return setTranslate(event.target.value);
  //     default: break;
  //   }
  // };
  //
  // const handleSaveBtn = async () => {
  //   try {
  //     const fields = {
  //       type: 'sentence',
  //       title,
  //       sentence,
  //       translate,
  //       course: id,
  //     };
  //
  //     sampleId ?
  //       await axios.patch(`/lessons/sentence/${sampleId}`, fields)
  //       : await axios.post(`/lessons/sentence`, fields);
  //
  //     navigate(-1);
  //   } catch (err) {
  //     console.warn(err);
  //
  //     alert('Ошибка при создании урока');
  //   }
  // };
  //
  // const handleNavigate = () => navigate(-1);
  //
  // return (
  //   <div>
  //     <h1>Составить текст</h1>
  //     <TextField
  //       id={'name-lesson'}
  //       value={title}
  //       label="Название урока"
  //       onChange={handleChange}
  //       variant="outlined"
  //       fullWidth
  //       style={{marginBottom: '10px'}}
  //     />
  //     <TextField
  //       id={'sentence'}
  //       value={sentence}
  //       label="Введите текст на иностранном языке"
  //       multiline
  //       rows={4}
  //       onChange={handleChange}
  //       variant="outlined"
  //       fullWidth
  //     />
  //     <p>Примечание: число блоков для составления текста будет равняться числу слов.</p>
  //     <TextField
  //       id={'translate'}
  //       value={translate}
  //       label="Введите перевод"
  //       multiline
  //       rows={4}
  //       onChange={handleChange}
  //       variant="outlined"
  //       fullWidth
  //       style={{marginBottom: '20px'}}
  //     />
  //     <Button variant="outlined" onClick={handleSaveBtn} style={{marginRight: '15px'}}>
  //       Сохранить
  //     </Button>
  //     <Button variant="outlined" onClick={handleNavigate}>
  //       Отмена
  //     </Button>
  //   </div>
  // );
};

function setComponent(type) {
  switch (type) {
    case 'video':
      return <VideoSample />;
    case 'text':
      return <TextSample />;
    case 'sentence':
      return <SentenceSample />;
    case 'passes':
      return <PassesSample />;
    default:
      return;
  }
}

export default Samples;
