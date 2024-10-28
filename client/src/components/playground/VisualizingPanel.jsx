import React from "react";
import ArrayVisualizer from "../visualizer/data_structures/array/ArrayVisualizer";
// import BubbleSortVisualizer from "../visualizer/algorithms/sorting/BubbleSortVisualizer";
import ArrayControls from "../visualizer/data_structures/array/ArrayControls";

function VisualizingPanel({}) {
  return (
    <div className="w-[45%] rounded-medium shadow-medium overflow-hidden flex flex-col">
      <h3 className="text-center text-base py-3 w-full bg-content2">
        Basic Array Operations
      </h3>
      <div className=" flex-grow flex items-center justify-center">
        <ArrayVisualizer />
        {/* <BubbleSortVisualizer /> */}
      </div>
      <div className=" flex items-center justify-center h-32 text-center border-t border-divider">
        <ArrayControls />
      </div>
    </div>
  );
}

export default VisualizingPanel;
