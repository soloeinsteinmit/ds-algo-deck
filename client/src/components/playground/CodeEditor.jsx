import React from "react";
import MonacoEditor from "./MonacoEditor";
import Console from "./Console";

function CodeEditor() {
  return (
    <div className="w-[40%] rounded-medium shadow-medium">
      <MonacoEditor />
      <Console />
    </div>
  );
}

export default CodeEditor;
