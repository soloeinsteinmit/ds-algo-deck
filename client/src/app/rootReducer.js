import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import arrayVisualizerReducer from "../features/visualizer/arrays/arrayVisualizerSlice";
import visualizerReducer from "../features/visualizer/visualizerSlice";
import bubbleSortVisualizerReducer from "../features/visualizer/algorithms/sorting/bubbleSortVisualizerSlice";
import codeEditorReducer from "../features/code_editor/codeEditorSlice";

const rootReducer = combineReducers({
  arrayVisualizer: arrayVisualizerReducer,
  visualizer: visualizerReducer,
  bubbleSortVisualizer: bubbleSortVisualizerReducer,
  codeEditor: codeEditorReducer,
});

export default rootReducer;
