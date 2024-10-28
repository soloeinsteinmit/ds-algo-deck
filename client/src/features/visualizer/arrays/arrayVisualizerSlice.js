import { createSlice } from "@reduxjs/toolkit";
import React from "react";

let index = 0;
let element = 0;
let message = "" || React.ReactNode;

const initialState = {
  array: [],
  index,
  element,
  message,
};

const arrayVisualizerSlice = createSlice({
  name: "arrayVisualizer",
  initialState,
  reducers: {
    setArray: (state, action) => {
      state.array = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setElement: (state, action) => {
      state.element = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setArray, setIndex, setElement, setMessage } =
  arrayVisualizerSlice.actions;

export default arrayVisualizerSlice.reducer;
