import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  type: '',
  welcomeText: '',
  title: '',
  desc: '',
  videoUrl: '',
  sentence: '',
  translate: '',
};

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    setDataVideoSample: (state, action) => {
      state.welcomeText = 'Видеоурок';
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.videoUrl = action.payload.videoUrl;
    },
    setDataTextSample: (state, action) => {
      state.welcomeText = 'Теоретический урок';
      state.title = action.payload.title;
      state.desc = action.payload.desc;
    },
    setDataSentenceSample: (state, action) => {
      state.welcomeText = 'Составить текст';
      state.title = action.payload.title;
      state.sentence = action.payload.sentence;
      state.translate = action.payload.translate;
    },
    setDataPassesSample: (state, action) => {
      state.welcomeText = 'Заполнить пропуски';
      state.title = action.payload.title;
      state.sentence = action.payload.sentence;
    },

    setType: (state, action) => {
      state.type = action.payload
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setWelcomeText: (state, action) => {
      state.welcomeText = action.payload
    },
    setDesc: (state, action) => {
      state.desc = action.payload
    },
    setVideoUrl: (state, action) => {
      state.videoUrl = action.payload
    },
    setSentence: (state, action) => {
      state.sentence = action.payload
    },
    setTranslate: (state, action) => {
      state.translate = action.payload
    },
  },
});

export const sampleLesson = sampleSlice.reducer;
export const {
  setDataVideoSample,
  setDataTextSample,
  setDataSentenceSample,
  setDataPassesSample,

  setType,
  setWelcomeText,
  setTitle,
  setDesc,
  setVideoUrl,
  setSentence,
  setTranslate,
} = sampleSlice.actions;
