import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async (id) => {
    const {modules} = (await axios.get(`/courses/${id}`)).data;

    return modules;
  }
);

export const fetchRemoveLesson = createAsyncThunk(
  "lessons/fetchRemoveLessons",
  async (id) => (await axios.delete(`/lessons/${id}`)).data
);

const initialState = {
  modules: [],
  status: "loading",
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.modules[+action.payload.id].title = +action.payload.value;
    }
  },
  extraReducers: {
    [fetchLessons.pending]: (state) => {
      state.modules = [];
      state.status = "loading";
    },
    [fetchLessons.fulfilled]: (state, action) => {
      state.modules = action.payload;
      state.status = "loaded";
    },
    [fetchLessons.rejected]: (state) => {
      state.modules = [];
      state.status = "error";
    },

    // удаление урока
    [fetchRemoveLesson.pending]: (state, action) => {
      // state.items = state.items.filter(obj => obj._id !== action.meta.arg);
    },
  }
});

export const {
  setTitle,
} = lessonsSlice.actions;
export const lessonsReducer = lessonsSlice.reducer;
