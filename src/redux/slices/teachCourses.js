// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axios.js";
//
// export const fetchTeachCourses = createAsyncThunk(
//   "courses/fetchCourses",
//   async (user) => (await axios.get("/courses")).data
// );
//
// export const fetchRemoveTeachCourse = createAsyncThunk(
//   "courses/fetchRemovePosts",
//   async (id) => await axios.delete(`/courses/${id}`)
// );
//
// const initialState = {
//   teachCourses: {
//     items: [],
//     status: "loading",
//   }
// };
//
// const teachCoursesSlice = createSlice({
//   name: "teachCourses",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     // курсы
//     [fetchTeachCourses.pending]: (state) => {
//       state.courses.items = [];
//       state.courses.status = "loading";
//     },
//     [fetchTeachCourses.fulfilled]: (state, action) => {
//       state.courses.items = action.payload;
//       state.courses.status = "loaded";
//     },
//     [fetchTeachCourses.rejected]: (state) => {
//       state.courses.items = [];
//       state.courses.status = "error";
//     },
//
//     // удаление курса
//     [fetchRemoveTeachCourse.pending]: (state, action) => {
//       state.courses.items = state.courses.items.filter(obj => obj._id !== action.meta.arg);
//     },
//   },
// });
//
// export const teachCoursesReducer = teachCoursesSlice.reducer;
