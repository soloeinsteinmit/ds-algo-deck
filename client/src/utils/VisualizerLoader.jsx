import BubbleSortVisualizer, {
  BubbleSortControls,
} from "../components/visualizer/algorithms/sorting/BubbleSortVisualizer";
import ArrayControls from "../components/visualizer/data_structures/array/ArrayControls";
import ArrayVisualizer from "../components/visualizer/data_structures/array/ArrayVisualizer";

import { VisualizerType } from "../types/visualizer"; // Import the visualizer types

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
  const visualizerMap = {
    [VisualizerType.ARRAY]: {
      visualizer: ArrayVisualizer,
      controls: ArrayControls,
      title: "Basic Array Operations",
    },
    [VisualizerType.BUBBLE_SORT]: {
      visualizer: BubbleSortVisualizer,
      controls: BubbleSortControls,
      title: "Bubble Sort Algorithm",
    },
    // Add more visualizers here as needed
  };

  // If the type doesn't match, default to the 'array' type
  const current = visualizerMap[type] || visualizerMap[VisualizerType.ARRAY];
  const Visualizer = current.visualizer;
  const Controls = current.controls;

  // Return the selected visualizer with title, visualizer, and controls
  return {
    title: current.title,
    visualizer: <Visualizer />,
    controls: <Controls />,
  };
};

export default VisualizerLoader;
