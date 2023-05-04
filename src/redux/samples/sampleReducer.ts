import {createSlice, createNextState} from "@reduxjs/toolkit";

const initialState = {
  typeLesson: '',
  welcomeText: '',
  title: '',
};

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    setType(state, action) {
      return createNextState(state, (draft) => draft.typeLesson = action.payload)
    },
    // setType(state, action) => createNextState(draft) => state.title = action.payload,
    setTitle: (state, action) => state.title = action.payload,
    setWelcomeText: (state, action) => state.welcomeText = action.payload,
  },
});

export const sampleReducer = sampleSlice.reducer;
export const { setType, setWelcomeText, setTitle } = sampleSlice.actions;
