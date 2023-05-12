import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchAuth = createAsyncThunk("auth/fetchAuth",
  async (params) => await axios.post("/auth/login", params)
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async () => (await axios.get("/auth/me")).data
);

export const fetchTeachCourses = createAsyncThunk(
  "auth/fetchTeachCourses",
  async () => {
    const {data} = await axios.get("/auth/me");

    return data.teachCourses;
  }
);

export const fetchStudentCourses = createAsyncThunk(
  "auth/fetchStudentCourses",
  async () => {
    const {data} = await axios.get("/auth/me");

    return data.studentCourses;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => await axios.post("/auth/register", params)
);

const initialState = {
  data: null,
  teachCourses: null,
  studentCourses: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchTeachCourses.pending]: (state) => {
      // state.status = "loading";
      state.teachCourses = null;
    },
    [fetchTeachCourses.fulfilled]: (state, action) => {
      // state.status = "loaded";
      state.teachCourses = action.payload;
    },
    [fetchTeachCourses.rejected]: (state) => {
      // state.status = "error";
      state.teachCourses = null;
    },

    [fetchStudentCourses.pending]: (state) => {
      // state.status = "loading";
      state.studentCourses = null;
    },
    [fetchStudentCourses.fulfilled]: (state, action) => {
      // state.status = "loaded";
      state.studentCourses = action.payload;
    },
    [fetchStudentCourses.rejected]: (state) => {
      // state.status = "error";
      state.studentCourses = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
