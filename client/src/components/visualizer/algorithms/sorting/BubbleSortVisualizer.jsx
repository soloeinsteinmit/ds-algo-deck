import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import { Button, Slider } from "@nextui-org/react";

import {
  setArray,
  setCurrentStep,
  setIsPlaying,
} from "../../../../features/visualizer/visualizerSlice";

const BubbleSortVisualizer = () => {
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const { array, currentStep, isPlaying, animationSpeed } = useSelector(
    (state) => state.visualizer
  );
  const [sortingSteps, setSortingSteps] = useState([]);

  useEffect(() => {
    if (!array.length) {
      dispatch(setArray([64, 34, 25, 12, 22, 11, 90]));
    }
  }, []);

  const generateSortingSteps = (arr) => {
    const steps = [];
    const n = arr.length;
    const tempArray = [...arr];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...tempArray],
          comparing: [j, j + 1],
          swapping: false,
        });

        if (tempArray[j] > tempArray[j + 1]) {
          [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
          steps.push({
            array: [...tempArray],
            comparing: [j, j + 1],
            swapping: true,
          });
        }
      }
    }

    return steps;
  };

  useEffect(() => {
    if (!svgRef.current || !array.length) return;

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 300;
    const padding = 40;

    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(array.map((_, i) => i.toString()))
      .range([padding, width - padding])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...array)])
      .range([height - padding, padding]);

    // Create rectangles for array elements
    svg
      .selectAll("rect")
      .data(array)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i.toString()))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - padding - yScale(d))
      .attr("fill", (_, i) => {
        if (sortingSteps[currentStep]?.comparing?.includes(i)) {
          return sortingSteps[currentStep]?.swapping ? "#ef4444" : "#fbbf24";
        }
        return "#4f46e5";
      })
      .attr("rx", 4);

    // Add value labels
    svg
      .selectAll("text")
      .data(array)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (_, i) => xScale(i.toString()) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#4b5563");
  }, [array, currentStep, sortingSteps]);

  const startSorting = () => {
    const steps = generateSortingSteps([...array]);
    setSortingSteps(steps);
    dispatch(setIsPlaying(true));
    dispatch(setCurrentStep(0));

    const animate = (step) => {
      if (step >= steps.length) {
        dispatch(setIsPlaying(false));
        return;
      }

      dispatch(setArray(steps[step].array));
      dispatch(setCurrentStep(step));

      setTimeout(() => {
        animate(step + 1);
      }, 1000 / animationSpeed);
    };

    animate(0);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <svg ref={svgRef} width="600" height="300" className="mx-auto" />
      </div>
      <BubbleSortControls onStart={startSorting} />
    </div>
  );
};

const BubbleSortControls = ({ onStart }) => {
  const dispatch = useDispatch();
  const { isPlaying, animationSpeed } = useSelector(
    (state) => state.visualizer
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      <div className="flex gap-4">
        <Button onClick={onStart} disabled={isPlaying}>
          Start Sorting
        </Button>
        <Button
          onClick={() => {
            dispatch(
              setArray(
                [64, 34, 25, 12, 22, 11, 90].sort(() => Math.random() - 0.5)
              )
            );
          }}
          disabled={isPlaying}
        >
          Randomize
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Animation Speed:</span>
        <Slider
          value={[animationSpeed]}
          onValueChange={([value]) => dispatch(setAnimationSpeed(value))}
          min={0.5}
          max={3}
          step={0.5}
          className="w-48"
        />
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
