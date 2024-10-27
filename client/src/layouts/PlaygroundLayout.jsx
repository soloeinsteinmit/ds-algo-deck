import React from "react";
import LeftSideBar from "../components/playground/LeftSideBar";
import VisualizingPanel from "../components/playground/VisualizingPanel";
import CodeEditor from "../components/playground/CodeEditor";

function PlaygroundLayout() {
  return (
    <div className="flex gap-2 h-screen mx-5">
      <LeftSideBar />
      <VisualizingPanel />
      <CodeEditor />
    </div>
  );
}

export default PlaygroundLayout;
