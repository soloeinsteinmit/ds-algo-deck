import React from "react";
import LeftSideBar from "../components/playground/LeftSideBar";
import VisualizingPanel from "../components/playground/VisualizingPanel";
import CodeEditor from "../components/playground/CodeEditor";

function PlaygroundLayout() {
  return (
    <div className="flex justify-evenly gap-2 max-h-[87vh] mx-auto w-full my-5">
      <LeftSideBar />
      <VisualizingPanel />
      {/* <CodeEditor /> */}
    </div>
  );
}

export default PlaygroundLayout;
