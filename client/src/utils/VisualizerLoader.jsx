import { memo, useMemo } from "react";
import BubbleSortVisualizer from "../components/visualizer/algorithms/sorting/BubbleSortVisualizer";
import ArrayControls from "../components/visualizer/data_structures/array/ArrayControls";
import ArrayVisualizer from "../components/visualizer/data_structures/array/ArrayVisualizer";

import { VisualizerType } from "../types/visualizer"; // Import the visualizer types
import BubbleSortControls from "../components/visualizer/algorithms/sorting/BubbleSortControl";

/**
 * VisualizerLoader is a higher-order component that maps a visualizer type to
 * its respective visualizer and control components. It takes a single prop,
 * `type`, which should be one of the values from the `VisualizerType` enum.
 *
 * If the type doesn't match, it defaults to the 'array' type.
 *
 * The component returns an object with the following properties:
 * - `title`: The title of the visualizer
 * - `visualizer`: The visualizer component
 * - `controls`: The controls component
 *
 * @param {VisualizerType} type - The type of visualizer to load
 * @returns {{title: string, visualizer: JSX.Element, controls: JSX.Element}}
 */
const VisualizerLoader = ({ type }) => {
  // Map visualizer types to their respective visualizer and control components
  const visualizerMap = useMemo(
    () => ({
      [VisualizerType.BASIC_ARRAY_OPERATIONS]: {
        visualizer: ArrayVisualizer,
        controls: ArrayControls,
        title: "Basic Array Operations",
      },
      [VisualizerType.BUBBLE_SORT]: {
        visualizer: BubbleSortVisualizer,
        controls: BubbleSortControls,
        title: "Bubble Sort Algorithm",
      },
    }),
    []
  ); // Empty dependency array as this map is static

  // Validate the type prop and provide a fallback
  const current = useMemo(() => {
    if (type && Object.values(VisualizerType).includes(type)) {
      return visualizerMap[type];
    } else {
      console.warn(
        `Invalid visualizer type: ${type}. Defaulting to Basic Array Operations.`
      );
      // TODO: Add a default visualizer
      return visualizerMap[VisualizerType.BASIC_ARRAY_OPERATIONS]; // Fallback to a default
    }
  }, [type, visualizerMap]);

  // Ensure current is defined before accessing its properties
  if (!current) {
    return {
      title: "Error",
      visualizer: null,
      controls: null,
    };
  }

  // Memoize component instances to prevent unnecessary re-renders
  const Visualizer = current.visualizer;
  const Controls = current.controls;

  const visualizerElement = useMemo(() => <Visualizer />, [Visualizer]);
  const controlsElement = useMemo(() => <Controls />, [Controls]);

  // Return the selected visualizer with title, visualizer, and controls
  return {
    title: current.title,
    visualizer: visualizerElement,
    controls: controlsElement,
  };
};

// VisualizerLoader.prototype = {
//   type: PropTypes.oneOf(Object.values(VisualizerType)),
// };

export default VisualizerLoader;
