import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArray,
  setIndex,
} from "../../../../features/visualizer/arrays/arrayVisualizerSlice";
import "./ArrayVisualizer.css";

/**
 * A React component that renders an array visualizer.
 *
 * The component renders a horizontal list of elements, each element being a
 * div with a CSS class of "array-element-wrapper". The component also renders
 * a CSS class of "array-container" on the outermost div.
 *
 * The component takes no props.
 *
 * The component uses the useReducer hook to store the array state in the Redux
 * store. The component uses the useSelector hook to access the array state from
 * the Redux store. The component uses the useDispatch hook to dispatch actions
 * to the Redux store.
 *
 * The component uses the useEffect hook to initialize the array state with the
 * value [52, 2, 5, 11, 10, 3] when the component is first mounted.
 *
 * The component uses the useMemo hook to memoize the following functions:
 * 1. getElementClassName: A function that takes an index and returns a CSS
 *    class name for the element at that index. The function takes into account
 *    the state of the Redux store and whether the element is being inserted,
 *    updated, or deleted.
 * 2. getContainerClassName: A function that takes no arguments and returns a
 *    CSS class name for the outermost div. The function takes into account the
 *    state of the Redux store and whether any elements are being inserted,
 *    updated, or deleted.
 * 3. displayArray: A function that takes no arguments and returns the array
 *    state from the Redux store. The function takes into account whether the
 *    array is empty and whether an element is being inserted at the end of the
 *    array.
 *
 * The component renders a horizontal list of elements, each element being a
 * div with a CSS class of "array-element-wrapper". The component also renders
 * a CSS class of "array-container" on the outermost div. The component renders
 * the array elements in the order they are stored in the Redux store.
 *
 * The component uses the useReducer hook to store the array state in the Redux
 * store. The component uses the useSelector hook to access the array state from
 * the Redux store. The component uses the useDispatch hook to dispatch actions
 * to the Redux store.
 *
 * The component uses the useEffect hook to initialize the array state with the
 * value [52, 2, 5, 11, 10, 3] when the component is first mounted.
 *
 * The component uses the useMemo hook to memoize the following functions:
 * 1. getElementClassName: A function that takes an index and returns a CSS
 *    class name for the element at that index. The function takes into account
 *    the state of the Redux store and whether the element is being inserted,
 *    updated, or deleted.
 * 2. getContainerClassName: A function that takes no arguments and returns a
 *    CSS class name for the outermost div. The function takes into account the
 *    state of the Redux store and whether any elements are being inserted,
 *    updated, or deleted.
 * 3. displayArray: A function that takes no arguments and returns the array
 *    state from the Redux store. The function takes into account whether the
 *    array is empty and whether an element is being inserted at the end of the
 *    array.
 *
 * The component renders a horizontal list of elements, each element being a
 * div with a CSS class of "array-element-wrapper". The component also renders
 * a CSS class of "array-container" on the outermost div. The component renders
 * the array elements in the order they are stored in the Redux store.
 */
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
