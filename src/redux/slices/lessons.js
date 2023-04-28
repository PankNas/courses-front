import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async (id) => (await axios.get(`/courses/${id}`)).data
);

export const fetchRemoveLesson = createAsyncThunk(
  "lessons/fetchRemoveLessons",
  async (id) => (await axios.get(`/lesson/video/${id}`)).data
);

const initialState = {
  items: [],
  status: "loading",
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLessons.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchLessons.fulfilled]: (state, action) => {
      state.items = action.payload.lessons;
      state.status = "loaded";
    },
    [fetchLessons.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },

    // удаление урока
    [fetchRemoveLesson.pending]: (state, action) => {
      state.items = state.courses.items.filter(obj => obj._id !== action.meta.arg);
    },
  }
});

export const lessonsReducer = lessonsSlice.reducer;
