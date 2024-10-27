import React, { useState } from "react";

const TreeNode = ({ value, x, y, children }) => (
  <g>
    {children && children[0] && (
      <line
        x1={x}
        y1={y + 10}
        x2={x - 40}
        y2={y + 50}
        stroke="#4B5563"
        strokeWidth="2"
      />
    )}
    {children && children[1] && (
      <line
        x1={x}
        y1={y + 10}
        x2={x + 40}
        y2={y + 50}
        stroke="#4B5563"
        strokeWidth="2"
      />
    )}
    <circle
      cx={x}
      cy={y}
      r="16"
      fill="#8B5CF6"
      className="transition-all duration-300"
    />
    <text x={x} y={y} textAnchor="middle" dy="0.3em" fill="white" fontSize="12">
      {value}
    </text>
  </g>
);

const DataStructureCard = () => {
  const [value, setValue] = useState("");
  const [tree, setTree] = useState({
    value: 50,
    children: [
      {
        value: 30,
        children: [
          { value: 20, children: [] },
          { value: 40, children: [] },
        ],
      },
      {
        value: 70,
        children: [
          { value: 60, children: [] },
          { value: 80, children: [] },
        ],
      },
    ],
  });

  const insertNode = (newValue) => {
    const insert = (node) => {
      if (!node) return { value: parseInt(newValue), children: [] };

      if (parseInt(newValue) < node.value) {
        return {
          ...node,
          children: [insert(node.children[0]), node.children[1]],
        };
      } else {
        return {
          ...node,
          children: [node.children[0], insert(node.children[1])],
        };
      }
    };

    if (!isNaN(parseInt(newValue))) {
      setTree(insert(tree));
      setValue("");
    }
  };

  const renderTree = (node, x = 200, y = 40, level = 0) => {
    if (!node) return null;

    return (
      <g key={`${node.value}-${x}-${y}`}>
        <TreeNode value={node.value} x={x} y={y}>
          {node.children}
        </TreeNode>
        {node.children[0] &&
          renderTree(node.children[0], x - 80 / (level + 1), y + 60, level + 1)}
        {node.children[1] &&
          renderTree(node.children[1], x + 80 / (level + 1), y + 60, level + 1)}
      </g>
    );
  };

  const resetTree = () => {
    setTree({
      value: 50,
      children: [
        {
          value: 30,
          children: [
            { value: 20, children: [] },
            { value: 40, children: [] },
          ],
        },
        {
          value: 70,
          children: [
            { value: 60, children: [] },
            { value: 80, children: [] },
          ],
        },
      ],
    });
  };

  return (
    <div className="relative rounded-lg bg-slate-900 p-2">
      <div className="relative flex text-center">
        <div className="flex pl-3.5 pt-3">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/20"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/20"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/20"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
        </div>
        <span className="absolute inset-x-0 top-2 text-xs text-slate-500">
          binarySearchTree.js
        </span>
      </div>

      <div className="mt-5 space-y-1.5 px-5 pb-10">
        <div className="mb-6">
          <p className="font-mono text-xs font-normal tracking-wide text-violet-400">
            <span className="text-slate-500">{"// "}</span>
            <span className="text-blue-400">
              Binary Search Tree Visualization
            </span>
          </p>

          <div className="mt-4 flex justify-center">
            <svg width="400" height="300" className="overflow-visible">
              {renderTree(tree)}
            </svg>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter number"
              className="w-24 rounded bg-slate-700 px-2 py-2 text-xs text-white"
            />
            <button
              onClick={() => insertNode(value)}
              className="rounded bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-600"
            >
              Insert Node
            </button>
            <button
              onClick={resetTree}
              className="rounded bg-slate-700 px-4 py-2 text-xs text-white hover:bg-slate-600"
            >
              Reset
            </button>
          </div>
        </div>

        <p className="font-mono text-xs font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">{"class "}</span>
          <span className="text-blue-400">TreeNode</span>
          <span className="text-slate-500">{" {"}</span>
        </p>
        <p className="ml-4 font-mono text-xs font-normal tracking-wide text-violet-400">
          <span className="text-blue-400">{"constructor(value) {"}</span>
        </p>
        <p className="ml-8 font-mono text-xs font-normal tracking-wide text-violet-400">
          <span className="text-blue-400">{"this.value = value;"}</span>
        </p>
        <p className="ml-8 font-mono text-xs font-normal tracking-wide text-violet-400">
          <span className="text-blue-400">{"this.left = null;"}</span>
        </p>
        <p className="ml-8 font-mono text-xs font-normal tracking-wide text-violet-400">
          <span className="text-blue-400">{"this.right = null;"}</span>
        </p>
        <p className="ml-4 font-mono text-xs font-normal tracking-wide text-slate-500">
          {"}"}
        </p>
        <p className="font-mono text-xs font-normal tracking-wide text-slate-500">
          {"}"}
        </p>
      </div>
    </div>
  );
};

export default DataStructureCard;
