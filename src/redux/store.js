import { configureStore } from "@reduxjs/toolkit";

import { coursesReducer } from "./slices/courses";
import { authReducer } from "./slices/auth";
import editCourseReducer from "./editCourse";
import {editReducer} from "./slices/editSamples";
import {lessonsReducer} from "./slices/lessons";
import {getDefaultMiddleware} from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({serializableCheck: false});

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
    lessons: lessonsReducer,
  },
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});

export default store;
