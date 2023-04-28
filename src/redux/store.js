import { configureStore } from "@reduxjs/toolkit";

import { coursesReducer } from "./slices/courses";
import { authReducer } from "./slices/auth";
import editCourseReducer from "./editCourse";
import {editReducer} from "./slices/edit";
import {lessonsReducer} from "./slices/lessons";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
    lessons: lessonsReducer,
  },
});

export default store;
