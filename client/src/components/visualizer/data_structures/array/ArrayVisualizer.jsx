import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArray,
  setIndex,
} from "../../../../features/visualizer/arrays/arrayVisualizerSlice";
import "./ArrayVisualizer.css";

const ArrayVisualizer = () => {
  const dispatch = useDispatch();
  const { array, index, isInserting, isUpdating, isDeleting } = useSelector(
    (state) => state.arrayVisualizer
  );

  useEffect(() => {
    if (array.length === 0) {
      dispatch(setArray([52, 2, 5, 11, 10, 3]));
    }
  }, [dispatch]);

  const getElementClassName = useMemo(
    () => (idx) => {
      const baseClass = "array-element-wrapper";
      const classes = [baseClass];

      // Special handling for last index insertion - only animate the very last element
      if (
        isInserting &&
        index === array.length - 2 &&
        idx === array.length - 1
      ) {
        classes.push("inserting");
      }
      // Regular cases (but exclude the second-to-last element when inserting at end)
      else if (idx === index && !(isInserting && index === array.length - 2)) {
        if (isInserting) classes.push("inserting");
        if (isUpdating) classes.push("updating");
        if (isDeleting) classes.push("deleting");
      }

      return classes.join(" ");
    },
    [isInserting, isUpdating, isDeleting, index, array.length]
  );

  const getContainerClassName = useMemo(
    () => () => {
      const classes = ["array-container"];
      if (isInserting) classes.push("is-inserting");
      if (isUpdating) classes.push("is-updating");
      if (isDeleting) classes.push("is-deleting");
      return classes.join(" ");
    },
    [isInserting, isUpdating, isDeleting]
  );

  // Add new array that includes the position for the new element
  const displayArray = useMemo(() => {
    if (isInserting && index === array.length - 2) {
      // Create a copy of the array with an extra element for animation
      return [...array];
    }
    return array;
  }, [array, isInserting, index]);

  return (
    <div className="transition-all array-visualizer w-full max-w-4xl mx-auto p-8 ">
      <div className="transition-all h-fit w-full flex items-center justify-center">
        {displayArray.length === 0 && (
          <div className="text-center text-foreground">
            <h3 className="text-3xl">Array is empty🙂, add some elements!</h3>
          </div>
        )}
        <div className={getContainerClassName()}>
          {displayArray.map((value, idx) => (
            <div key={`${idx}-${value}`} className={getElementClassName(idx)}>
              <div className="array-element">
                <span className="array-element__value text-xl text-white">
                  {value}
                </span>
              </div>
              <div className="array-element__index text-xl text-foreground">
                {idx}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
