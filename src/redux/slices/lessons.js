import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLessons = createAsyncThunk(
  "lessons/fetchModules",
  async (id) => {
    const {modules} = (await axios.get(`/courses/${id}`)).data;

    return modules;
  }
);

export const fetchRemoveLesson = createAsyncThunk(
  "lessons/fetchRemoveLessons",
  async (id) => (await axios.delete(`/lessons/${id}`)).data
);

export const fetchRemoveModule = createAsyncThunk(
  "lessons/fetchRemoveModule",
  async (id) => (await axios.delete(`/modules/${id}`)).data
);

const initialState = {
  modules: [],
  course: {
    id: '',
    title: '',
    desc: '',
    language: '',
    levelLanguage: '',
    imageUrl: '',
    status: '',
  },
  flag: false,
  status: "loading",
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      const modules = state.modules.slice();
      modules[+action.payload.id].title = action.payload.value;

      state.modules = modules;
    },

    setFlag:(state, action) => {
      state.flag = action.payload;
    },

    setDataCourse: (state, action) => {
      state.course.id = action.payload.id;
      state.course.title = action.payload.title;
      state.course.desc = action.payload.desc;
      state.course.language = action.payload.language;
      state.course.levelLanguage = action.payload.levelLanguage;
      state.course.imageUrl = action.payload.imageUrl;
      state.course.status = action.payload.status;
    },

    setTitleCourse: (state, action) => {
      state.course.title = action.payload;
    },
    setDescCourse: (state, action) => {
      state.course.desc = action.payload;
    },
    setLanguageCourse: (state, action) => {
      state.course.language = action.payload;
    },
    setLevelLanguageCourse: (state, action) => {
      state.course.levelLanguage = action.payload;
    },
    setImageUrlCourse: (state, action) => {
      state.course.imageUrl = action.payload;
    },
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
      state.modules = state.modules.map(obj => obj.lessons.filter(lesson => lesson._id !== action.meta.arg));
      // state.modules = state.modules.filter(obj => obj.lessons._id !== action.meta.arg);
    },

    // удаление модуля
    [fetchRemoveModule.pending]: (state, action) => {
      state.modules = state.modules.filter(obj => obj._id !== action.meta.arg);
    },
  }
});

export const {
  setTitle,

  setDescCourse,
  setImageUrlCourse,
  setLanguageCourse,
  setLevelLanguageCourse,
  setTitleCourse,
  setDataCourse,
  setFlag,
} = lessonsSlice.actions;
export const lessonsReducer = lessonsSlice.reducer;
export const selectFlag = (state) => state.lessons.flag;
