import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  type: '',
  welcomeText: '',
  title: '',
  desc: '',
  videoUrl: '',
  sentence: '',
  translate: '',
  itemsTest: [],
  options: new Array(4).fill(''),
  answer: -1,
  question: '',

  remarks: '',
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

      state.remarks = action.payload.remarks;
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
    setDataTestSample: (state, action) => {
      state.welcomeText = 'Тест';
      state.title = action.payload.title;
      state.itemsTest = action.payload.itemsTest;
    },
    setDataTranslateSample: (state, action) => {
      state.welcomeText = 'Перевод';
      state.title = action.payload.title;
      state.options = action.payload.options;
      state.answer = action.payload.answer;
      state.question = action.payload.question;
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
    setItemsTest: (state, action) => {
      state.itemsTest = action.payload
    },
    setOptions: (state, action) => {
      state.options = action.payload
    },
    setAnswer: (state, action) => {
      state.answer = action.payload
    },
    setQuestion: (state, action) => {
      state.question = action.payload
    },
  },
});

export const sampleLessonReducer = sampleSlice.reducer;
export const {
  setDataVideoSample,
  setDataTextSample,
  setDataSentenceSample,
  setDataPassesSample,
  setDataTestSample,
  setDataTranslateSample,

  setType,
  setWelcomeText,
  setTitle,
  setDesc,
  setVideoUrl,
  setSentence,
  setTranslate,
  setItemsTest,
  setAnswer,
  setOptions,
  setQuestion
} = sampleSlice.actions;
