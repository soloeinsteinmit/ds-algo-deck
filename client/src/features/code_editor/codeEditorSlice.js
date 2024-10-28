import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "",
  language: "javascript",
};

const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setCode, setLanguage } = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
