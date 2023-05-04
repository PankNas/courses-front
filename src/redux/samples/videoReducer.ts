import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  welcomeText: 'Видеоурок',
  title: '',
  desc: '',
  videoUrl: '',
};

const videoSlice = createSlice({
  name: 'videoSample',
  initialState,
  reducers: {
    setTitle: (state, action) => state.title = action.payload,
    setDesc: (state, action) => state.desc = action.payload,
    setVideoUrl: (state, action) => state.videoUrl = action.payload,
  },
});

export const videoReducer = videoSlice.reducer;
export const { setTitle, setDesc, setVideoUrl } = videoSlice.actions;
