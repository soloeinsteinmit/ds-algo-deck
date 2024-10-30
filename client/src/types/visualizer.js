// Enum for visualizer types
export const VisualizerType = {
  ARRAY: "array",
  BUBBLE_SORT: "bubbleSort",
  LINKED_LIST: "linkedList",
  BINARY_TREE: "binaryTree",
};

// Config object structure for each visualizer
export const VisualizerConfig = {
  visualizer: null, // React component for visualizer (set when used)
  controls: null, // React component for controls (set when used)
  title: "",
  description: "",
  defaultSettings: {},
};

// State object for tracking visualizer
export const VisualizerState = {
  currentView: null || VisualizerType.ARRAY, // this will be the type of visualizer
  settings: {},
  isAnimating: false,
  speed: 1,
};
