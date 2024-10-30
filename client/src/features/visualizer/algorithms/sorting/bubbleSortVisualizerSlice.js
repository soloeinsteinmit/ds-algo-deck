import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  array: [],
  steps: [],
  currentStep: 0,
  isPlaying: false,
  animationSpeed: 1,
};

const bubbleSortVisualizerSlice = createSlice({
  name: "bubbleSortVisualizer",
  initialState,
  reducers: {
    /**
     * Sets the array to visualize in the bubble sort visualizer.
     * @param {array} action.payload The array to visualize.
     */
    setArray: (state, action) => {
      state.array = action.payload;
    },
    /**
     * Sets the steps to visualize in the bubble sort visualizer.
     * @param {array} action.payload The steps to visualize, where each step is an object with the following properties:
     * - array: The current state of the array being sorted.
     * - comparing: A pair of array indices being compared.
     * - swapping: Whether the pair of elements were swapped.
     */
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    /**
     * Sets the current step in the bubble sort visualizer.
     * @param {number} action.payload The index of the step to set as current.
     */
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    /**
     * Sets whether the bubble sort visualizer is currently playing an animation.
     * @param {boolean} action.payload Whether the visualizer is playing an animation.
     */
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    /**
     * Sets the animation speed in the bubble sort visualizer.
     * @param {number} action.payload The animation speed, with higher numbers being faster.
     */
    setAnimationSpeed: (state, action) => {
      state.animationSpeed = action.payload;
    },
  },
});

export const {
  setSteps,
  setCurrentStep,
  setIsPlaying,
  setAnimationSpeed,
  setArray,
} = bubbleSortVisualizerSlice.actions;
export default bubbleSortVisualizerSlice.reducer;
