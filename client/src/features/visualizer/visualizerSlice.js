import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: null,
  array: [],
  animationSpeed: 1,
  isPlaying: false,
  currentStep: 0,
};

const visualizerSlice = createSlice({
  name: "visualizer",
  initialState,
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setArray: (state, action) => {
      state.array = action.payload;
    },
    setAnimationSpeed: (state, action) => {
      state.animationSpeed = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const {
  setCurrentView,
  setArray,
  setAnimationSpeed,
  setIsPlaying,
  setCurrentStep,
} = visualizerSlice.actions;

export default visualizerSlice.reducer;
