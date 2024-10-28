import { combineReducers } from "@reduxjs/toolkit";
import arrayVisualizerReducer from "../features/visualizer/arrays/arrayVisualizerSlice";
import visualizerReducer from "../features/visualizer/visualizerSlice";

const rootReducer = combineReducers({
  arrayVisualizer: arrayVisualizerReducer,
  visualizer: visualizerReducer,
  // Add other reducers here as needed
});

export default rootReducer;
