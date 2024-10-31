import { useSelector } from "react-redux";
import VisualizerLoader from "../../utils/VisualizerLoader";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { memo } from "react";

/**
 * VisualizingPanel component renders a dynamic visualization interface.
 *
 * This component retrieves the current visualizer type from the Redux
 * store and uses the VisualizerLoader utility to obtain the relevant
 * title, visualizer, and controls components. If no visualizer is
 * selected or available, it displays the NothingState component.
 *
 * The component is structured into three main sections:
 * - Header: Displays the title of the visualizer and can include additional controls.
 * - Main Visualization Area: Hosts the visualizer component.
 * - Controls Area: Contains the controls related to the visualizer.
 *
 * The component uses Tailwind CSS classes for styling.
 */
function VisualizingPanel() {
  // Assuming you store current visualizer type in Redux
  const { currentView } = useSelector((state) => state.visualizer);

  // Load the appropriate components
  const { title, visualizer, controls } = VisualizerLoader({
    type: currentView,
  });

  // console.log(currentView);

  if (!currentView || !visualizer) {
    console.log(visualizer);
    return <NothingState />;
  }

  return (
    <Card className="w-full h-full flex flex-col bg-background/60 backdrop-blur-lg">
      {/* Header */}
      <CardHeader className="flex-none px-6 py-3 border-b border-divider bg-content2/50">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-lg font-medium text-default-800">{title}</h3>
          {/* Optional: Add additional header controls/buttons here */}
          <div className="flex gap-2">
            {/* Example: Add buttons for different views or controls */}
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

export default memo(VisualizingPanel);

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
const NothingState = () => (
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
