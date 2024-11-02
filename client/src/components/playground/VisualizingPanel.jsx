import { useSelector } from "react-redux";
import VisualizerLoader from "../../utils/VisualizerLoader";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
} from "@nextui-org/react";
import { memo, useEffect, useState } from "react";
import { PiInfo } from "react-icons/pi";
import { TopicsShortNotes } from "./TopicsShortNotes";

function VisualizingPanel() {
  const { currentView } = useSelector((state) => state.visualizer);
  const { title, visualizer, controls, shortNotes } = VisualizerLoader({
    type: currentView,
  });

  return (
    <Card className="w-full h-full flex flex-col bg-background/60 backdrop-blur-lg">
      {/* Header */}
      <CardHeader className="flex-none px-6 py-3 border-b border-divider bg-content2/50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-default-800">{title}</h3>
            <Popover>
              <PopoverTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <PiInfo className="text-xl" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {shortNotes && <TopicsShortNotes noteData={shortNotes} />}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>

      {/* Main Visualization Area */}
      <CardBody className="flex-1 flex items-center justify-center p-6">
        <div className="w-full h-full flex items-center justify-center relative">
          {visualizer}
        </div>
      </CardBody>

      {/* Controls Area */}
      <CardFooter className="flex-none border-t border-divider bg-content1/50">
        <div className="w-full h-32 max-h-36 overflow-y-auto p-4">
          {controls}
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * LoadingState component displays a centered loading animation.
 *
 * This component is used by {@link VisualizingPanel} to display a loading state
 * while the visualizer and controls are loading.
 *
 * @returns A JSX element representing the loading state.
 */
const LoadingState = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * NothingState component displays a centered message when no visualizer is selected.
 *
 * This component is used by {@link VisualizingPanel} to display a message when
 * the user has not selected a visualizer.
 *
 * @returns A JSX element representing the nothing state.
 */
export const NothingState = () => (
  <div className="w-full h-full flex items-center justify-center">
    <h4 className="text-xl font-medium">No Topic Selected</h4>
  </div>
);

/**
 * ErrorState component displays an error message in a centered layout.
 *
 * This component is used to inform the user of an error that occurred
 * while loading a visualizer. It displays a fixed title and a custom
 * error message passed through the `message` prop.
 *
 * Props:
 * - message (string): The error message to be displayed.
 *
 * The component uses Tailwind CSS classes for styling to ensure a
 * consistent and centered layout with red-colored text for error indication.
 */
const ErrorState = ({ message }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-danger text-center">
      <h4 className="text-lg font-medium">Error Loading Visualizer</h4>
      <p className="text-sm text-default-600">{message}</p>
    </div>
  </div>
);

const MemoizedVisualizingPanel = memo(VisualizingPanel);

export default MemoizedVisualizingPanel;
