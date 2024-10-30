import { combineReducers } from "@reduxjs/toolkit";
import arrayVisualizerReducer from "../features/visualizer/arrays/arrayVisualizerSlice";
import visualizerReducer from "../features/visualizer/visualizerSlice";
import bubbleSortVisualizerReducer from "../features/visualizer/algorithms/sorting/bubbleSortVisualizerSlice";
import codeEditorReducer from "../features/code_editor/codeEditorSlice";

const rootReducer = combineReducers({
  arrayVisualizer: arrayVisualizerReducer,
  visualizer: visualizerReducer,
  bubbleSortVisualizer: bubbleSortVisualizerReducer,
  codeEditor: codeEditorReducer,
  // Add other reducers here as needed
});

export default rootReducer;
