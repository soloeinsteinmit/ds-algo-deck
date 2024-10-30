import { configureStore } from "@reduxjs/toolkit";
// store/index.js
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
