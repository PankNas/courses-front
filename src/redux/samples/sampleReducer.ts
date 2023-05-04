import {createSlice, createNextState} from "@reduxjs/toolkit";

const initialState = {
  type: '',
  welcomeText: '',
  title: '',
  desc: '',
  videoUrl: '',
};

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
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
  },
});

export const sampleReducer = sampleSlice.reducer;
export const {
  setType,
  setWelcomeText,
  setTitle,
  setDesc,
  setVideoUrl,
} = sampleSlice.actions;
