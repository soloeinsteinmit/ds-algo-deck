import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import LeftSideBar from "../components/playground/LeftSideBar";

import CodeEditor from "../components/playground/CodeEditor";
import { Button } from "@nextui-org/react";
import { FaCode } from "react-icons/fa6";
import MemoizedVisualizingPanel from "../components/playground/VisualizingPanel.jsx";

/**
 * A layout component for the Playground page, which consists of a left sidebar
 * with a toggle button, a main content area with a visualizing panel and a code
 * editor, and a toggle button for the code editor.
 *
 * The left sidebar can be toggled open or closed by clicking the toggle button.
 * The visualizing panel and the code editor are displayed in a horizontal layout,
 * with the visualizing panel taking up 2/3 of the width when the code editor is
 * open, and the full width when the code editor is closed. The code editor can be
 * toggled open or closed by clicking the toggle button.
 *
 * The code editor is displayed on the right side of the main content area, and
 * can be toggled open or closed by clicking the toggle button.
 *
 * The component uses the `useState` hook to keep track of the state of the left
 * sidebar and the code editor.
 */
const PlaygroundLayout = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <div className="relative flex h-[calc(100vh-64px)]  w-full overflow-hidden">
      {/* Left Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out  ${
          isListOpen ? "w-[350px]" : "w-0"
        }`}
      >
        <LeftSideBar />
      </div>

      {/* Left Sidebar Toggle */}
      <Button
        onClick={() => setIsListOpen(!isListOpen)}
        className="absolute left-4 top-14 z-50"
        size="sm"
        isIconOnly
        variant="flat"
      >
        {isListOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Visualizing Panel */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isEditorOpen ? "w-2/3" : "w-full"
          }`}
        >
          <MemoizedVisualizingPanel />
        </div>

        {/* Code Editor */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isEditorOpen ? "w-2/6" : "w-0"
          }`}
        >
          <CodeEditor />
        </div>
      </div>

      {/* Editor Toggle Button */}
      <Button
        onClick={() => setIsEditorOpen(!isEditorOpen)}
        className={`absolute ${
          isEditorOpen ? "right-16" : "right-4"
        } top-2 z-50`}
        size="sm"
        isIconOnly
        variant="flat"
      >
        <FaCode />
      </Button>
    </div>
  );
};

export default PlaygroundLayout;
