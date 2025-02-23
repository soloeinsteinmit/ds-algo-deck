/**
 * @fileoverview Hark! Behold the grand stage upon which our algorithms shall dance!
 * This sacred layout doth provide the perfect environment for visualization and learning.
 */

import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@nextui-org/react";
import { FaCode } from "react-icons/fa6";

// Import our noble components
import LeftSideBar from "../components/playground/LeftSideBar";
import CodeEditor from "../components/playground/CodeEditor";
import MemoizedVisualizingPanel from "../pages/Playground/VisualizingPanel";

/**
 * @typedef {Object} PlaygroundLayoutProps
 * @property {boolean} isEditorOpen - Whether the sacred code editor is visible
 * @property {boolean} isListOpen - Whether the noble sidebar doth show
 * @property {function} setIsEditorOpen - A function to toggle the editor's presence
 * @property {function} setIsListOpen - A function to toggle the sidebar's visibility
 */

/**
 * @component PlaygroundLayout
 * @description Lo! This grand theater presents three noble acts:
 * 1. A sidebar most wise, containing our algorithmic treasures
 * 2. A visualizing panel, where algorithms come to life
 * 3. A code editor most sacred, where wisdom is writ
 *
 * Each may be shown or hidden at the user's command, like actors
 * entering and exiting our grand stage.
 */
const PlaygroundLayout = () => {
  // Our state managers, like puppet strings for our performance
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background">
      {/* The Left Sidebar, a scroll of knowledge */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isListOpen ? "w-[350px]" : "w-0"
        }`}
      >
        <LeftSideBar />
      </div>

      {/* The Sidebar Toggle, like a curtain's rope */}
      <Button
        onClick={() => setIsListOpen(!isListOpen)}
        className="absolute left-4 top-14 z-50"
        size="sm"
        isIconOnly
        variant="flat"
      >
        {isListOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* The Main Stage */}
      <div className="flex flex-1 overflow-hidden">
        {/* The Visualizing Panel, where magic happens */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isEditorOpen ? "w-2/3" : "w-full"
          }`}
        >
          <MemoizedVisualizingPanel />
        </div>

        {/* The Code Editor, where wisdom is writ */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isEditorOpen ? "w-2/6" : "w-0"
          }`}
        >
          <CodeEditor />
        </div>
      </div>

      {/* The Editor Toggle, like a magician's wand */}
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
