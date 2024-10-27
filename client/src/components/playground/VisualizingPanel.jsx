import React from "react";

function VisualizingPanel({}) {
  return (
    <div className="w-[45%] rounded-medium shadow-medium overflow-hidden flex flex-col">
      <h3 className="text-center text-base py-3 w-full bg-content2">Header</h3>
      <div className="bg-red-700 flex-grow flex items-center justify-center">
        Visualizing Panel
      </div>
      <div className="h-32 bg-green-800 text-center">Controls</div>
    </div>
  );
}

export default VisualizingPanel;
