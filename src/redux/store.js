import { configureStore } from "@reduxjs/toolkit";

import { coursesReducer } from "./slices/courses";
import { authReducer } from "./slices/auth";
import {lessonsReducer} from "./slices/lessons";
import {getDefaultMiddleware} from '@reduxjs/toolkit';
import {sampleReducer} from "./slices/sampleReducer";

const customizedMiddleware = getDefaultMiddleware({serializableCheck: false});

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
    lessons: lessonsReducer,
    sample: sampleReducer,
  },
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});

export default store;
