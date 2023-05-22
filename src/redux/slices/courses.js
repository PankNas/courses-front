import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => (await axios.get("/courses")).data
);

export const fetchRemoveCourse = createAsyncThunk(
  "courses/fetchRemoveCourse",
  async (id) => await axios.delete(`/courses/${id}`)
);

export const fetchGetCourse = createAsyncThunk(
  "courses/fetchGetCourse",
  async (id) => (await axios.get(`/courses/${id}`)).data
);

// export const fetchCheckCourses = createAsyncThunk(
//   "courses/fetchCheckCourses",
//   async () => {
//     const {data} = await axios.get("/courses");
//
//     return data.filter(course => course.status === 'check');
//   }
// );

const initialState = {
  items: [],
  course: null,
  // checkCourses: null,
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

    //course
    [fetchGetCourse.pending]: (state) => {
      state.course = null;
      // state.status = "loading";
    },
    [fetchGetCourse.fulfilled]: (state, action) => {
      state.course = action.payload;
      // state.status = "loaded";
    },
    [fetchGetCourse.rejected]: (state) => {
      state.course = null;
      // state.status = "error";
    },

    // check
    // [fetchCheckCourses.pending]: (state) => {
    //   state.checkCourses = null;
    //   // state.status = "loading";
    // },
    // [fetchCheckCourses.fulfilled]: (state, action) => {
    //   state.checkCourses = action.payload;
    //   // state.status = "loaded";
    // },
    // [fetchCheckCourses.rejected]: (state) => {
    //   state.checkCourses = null;
    //   // state.status = "error";
    // },

    // удаление курса
    [fetchRemoveCourse.pending]: (state, action) => {
      state.items = state.items.filter(obj => obj._id !== action.meta.arg);
    },
  },
});

export const coursesReducer = coursesSlice.reducer;
