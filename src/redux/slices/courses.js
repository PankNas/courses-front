import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => (await axios.get("/courses")).data
);

export const fetchRemoveCourse = createAsyncThunk(
  "courses/fetchRemovePosts",
  async (id) => await axios.delete(`/courses/${id}`)
);

const initialState = {
  items: [],
  status: "loading",
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: {
    // курсы
    [fetchCourses.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchCourses.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },

    // удаление курса
    [fetchRemoveCourse.pending]: (state, action) => {
      state.items = state.items.filter(obj => obj._id !== action.meta.arg);
    },
  },
});

export const coursesReducer = coursesSlice.reducer;
