/**
 * @fileoverview
 * Hark! Behold the grand theater of array visualization!
 * Here lies the stage where elements dance, shift, and transform
 * in a most elegant ballet of data structures.
 */

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArray,
  setAlertVisible,
} from "../../../../features/visualizer/arrays/arrayVisualizerSlice";
import "./ArrayVisualizer.css";
import ControlsAlert from "../../../playground/ControlsAlert";

/**
 * @component ArrayVisualizer
 *
 * @description
 * Lo! This noble component doth present an array most visual,
 * where elements dance and shift in perfect harmony.
 */
const ArrayVisualizer = () => {
  const dispatch = useDispatch();
  const {
    array,
    index,
    isInserting,
    isUpdating,
    isDeleting,
    message,
    isError,
    alertVisible,
  } = useSelector((state) => state.arrayVisualizer);

  /**
   * @function getElementClassName
   * @description
   * Like a master choreographer, this function determines
   * how each element shall move and appear on our stage.
   */
  const getElementClassName = useMemo(
    () => (idx) => {
      const classes = ["array-element-wrapper"];

      if (isInserting) {
        if (idx === index) {
          classes.push("inserting");
        } else if (idx >= index) {
          classes.push("shifting-right");
        }
      } else if (isDeleting) {
        if (idx === index) {
          classes.push("deleting");
        } else if (idx > index) {
          classes.push("shifting-left");
        }
      } else if (isUpdating && idx === index) {
        classes.push("updating");
      }

      return classes.join(" ");
    },
    [isInserting, isDeleting, isUpdating, index]
  );

  /**
   * @function getContainerClassName
   * @description
   * Sets the stage for our grand performance,
   * preparing the container for each type of animation.
   */
  const getContainerClassName = useMemo(
    () => () => {
      const classes = ["array-container"];
      if (isInserting) classes.push("is-inserting");
      if (isDeleting) classes.push("is-deleting");
      if (isUpdating) classes.push("is-updating");
      return classes.join(" ");
    },
    [isInserting, isDeleting, isUpdating]
  );

  return (
    <div className="transition-all array-visualizer max-w-4xl mx-auto p-8 flex flex-col items-center justify-center w-full">
      <div className="transition-all h-fit w-full flex items-center justify-center mb-4">
        {array.length === 0 ? (
          <div className="text-center text-foreground w-full">
            <h3 className="text-3xl">
              An empty array is like a blank canvas 🎨 - add some elements to
              get started and explore the different operations! 💻
            </h3>
          </div>
        ) : (
          <div className={getContainerClassName()}>
            {array.map((value, idx) => (
              <div
                key={`${idx}-${value}-${isDeleting ? "deleting" : ""}`}
                className={getElementClassName(idx)}
              >
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
        )}
      </div>
      <div className="h-10">
        <ControlsAlert
          message={message}
          isError={isError}
          isVisible={alertVisible}
          onHide={() => dispatch(setAlertVisible(false))}
        />
      </div>
    </div>
  );
};

export default ArrayVisualizer;
