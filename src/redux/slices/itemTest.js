import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchItemTest = createAsyncThunk(
  "lessons/fetchItemTest",
  async (id) => (await axios.get(`/lessons/test/item/${id}`)).data
);

export const fetchRemoveItemTest = createAsyncThunk(
  "lessons/fetchRemoveItemTest",
  async (id) => (await axios.delete(`/lessons/test/item/${id}`)).data
);

const initialState = {
  item: {
    question: '',
    options: new Array(4).fill(''),
    answer: '',
    score: '',
  },
  status: "loading",
};

const itemTestSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.item.score = action.payload;
    },
  },
  extraReducers: {
    [fetchItemTest.pending]: (state) => {
      state.item = {};
      state.status = "loading";
    },
    [fetchItemTest.fulfilled]: (state, action) => {
      state.item = action.payload;
      state.status = "loaded";
    },
    [fetchItemTest.rejected]: (state) => {
      state.item = {};
      state.status = "error";
    },

    // удаление урока
    [fetchRemoveItemTest.pending]: (state, action) => {
      state.item = state.item.filter(obj => obj._id !== action.meta.arg);
    },
  }
});

export const itemTestReducer = itemTestSlice.reducer;
export const {
  setScore,
} = itemTestSlice.actions;
