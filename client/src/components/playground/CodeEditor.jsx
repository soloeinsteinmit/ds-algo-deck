import React from "react";
import MonacoEditor from "./MonacoEditor";
import Console from "./Console";

function CodeEditor() {
  return (
    <div className="w-[40%] rounded-medium shadow-medium overflow-hidden">
      <div className="flex-grow">
        <MonacoEditor />
      </div>
      <Console height="200px" />
    </div>
  );
}

export default CodeEditor;
