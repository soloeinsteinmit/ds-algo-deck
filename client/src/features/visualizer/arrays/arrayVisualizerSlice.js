import { createSlice } from "@reduxjs/toolkit";
import React from "react";

let index = 0;
let element = 0;
let message = "" || React.ReactNode;
let animatingIndex = null;
let isInserting = false;
let isTransitioning = false;
let isDeleting = false;
let isUpdating = false;
let animationStage = null;
let isOperationInProgress = false;
let insertLastIndex = null;

const initialState = {
  array: [],
  index,
  element,
  message,
  elementPositions: [],
  animatingIndex,
  isInserting,
  isDeleting,
  isUpdating,
  animationStage,
  isTransitioning,
  isOperationInProgress,
  insertLastIndex,
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
    setElementPositions: (state, action) => {
      state.elementPositions = action.payload;
    },
    setAnimatingIndex: (state, action) => {
      state.animatingIndex = action.payload;
    },

    setIsInserting: (state, action) => {
      state.isInserting = action.payload;
    },

    setIsDeleting: (state, action) => {
      state.isDeleting = action.payload;
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
    setAnimationStage: (state, action) => {
      state.animationStage = action.payload;
    },
    setIsTransitioning: (state, action) => {
      state.isTransitioning = action.payload;
    },
    setIsOperationInProgress: (state, action) => {
      state.isOperationInProgress = action.payload;
    },
    setInsertLastIndex: (state, action) => {
      state.insertLastIndex = action.payload;
    },
  },
});

export const {
  setArray,
  setIndex,
  setElement,
  setMessage,
  setElementPositions,
  setAnimatingIndex,

  setIsInserting,
  setIsDeleting,
  setIsUpdating,
  setAnimationStage,
  setIsTransitioning,
  setIsOperationInProgress,
  setInsertLastIndex,
} = arrayVisualizerSlice.actions;

export default arrayVisualizerSlice.reducer;
