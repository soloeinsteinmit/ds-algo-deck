import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";

import "./ArrayVisualizer.css";

import {
  setArray,
  setIndex,
  setElement,
  setMessage,
  setIsInserting,
  setIsDeleting,
  setIsUpdating,
} from "../../../../features/visualizer/arrays/arrayVisualizerSlice";
import ControlsAlert from "../../../playground/ControlsAlert";

const ArrayControls = () => {
  const [isError, setIsError] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const dispatch = useDispatch();
  const { array, index, element, message } = useSelector(
    (state) => state.arrayVisualizer
  );
  const [lastArrayIndex, setLastArrayIndex] = useState(array?.length - 1);

  /**
   * Inserts the element at the specified index in the array.
   *
   * Takes the current array from the state, creates a copy, and inserts
   * the element at the given index. Dispatches the updated array to the Redux store.
   */
  const handleInsert = () => {
    // Validation checks
    if (isNaN(element) || isNaN(index)) {
      dispatch(setMessage("Element or Index must be a number"));
      setIsError(true);
      return;
    }

    if (index < 0 || (index > array.length - 1 && index !== array.length)) {
      dispatch(
        setMessage("Index out of bounds: Cannot insert element at this index")
      );
      setIsError(true);
      return;
    }

    // Set inserting state first
    dispatch(setIsInserting(true));

    // Update array immediately
    const newArray = [...array];

    if (index === newArray.length - 1) {
      newArray.push(element);

      dispatch(setMessage(`Inserted ${element} at the end of the array`));
    } else {
      newArray.splice(index, 0, element);
      dispatch(setMessage(`Inserted ${element} at index ${index}`));
    }

    dispatch(setArray(newArray));
    setAlertVisible(true);

    // Reset inserting state after animation completes

    setTimeout(() => {
      dispatch(setIsInserting(false));
    }, 1000); // Match this with CSS --animation-duration
  };

  useEffect(() => {
    setLastArrayIndex(array?.length - 1);
  }, [array]);

  /**
   * Deletes the element at the specified index in the array.
   *
   * Takes the current array from the state, filters out the element at the given index, and dispatches the updated array to the Redux store.
   */
  const handleDelete = () => {
    // Validation checks first
    if (isNaN(index) || index === "") {
      dispatch(setMessage("Index must be a number"));
      setIsError(true);
      return;
    }

    if (array.length === 0) {
      dispatch(setMessage("Array is empty, cannot delete from an empty array"));
      setIsError(true);
      return;
    }

    if (index < 0 || index >= array.length) {
      dispatch(
        setMessage("Index out of bounds: Cannot delete element at this index")
      );
      setIsError(true);
      return;
    }

    // Start delete animation
    dispatch(setIsDeleting(true));

    // Create appropriate message
    let deleteMessage = `Deleted element at index ${index}`;
    if (index === array.length - 1) {
      deleteMessage += " (the last element)";
    } else if (index === 0) {
      deleteMessage += " (the first element)";
    }

    setTimeout(() => {
      const newArray = [...array];
      newArray.splice(index, 1);
      dispatch(setArray(newArray));
    }, 1000);
    setIsError(false);
    dispatch(setMessage(deleteMessage));
    setAlertVisible(true);

    // Delay the actual array update to allow animation to complete
    setTimeout(() => {
      // Reset delete state
      // requestAnimationFrame(() => {
      dispatch(setIsDeleting(false));
      // });
    }, 1000); // Slightly before animation ends
  };

  /**
   * Updates the element at the specified index in the array.
   *
   * Takes the current array from the state, creates a copy, and updates
   * the element at the given index with the new element from the state.
   * Dispatches the updated array to the Redux store.
   *
   * @param {number} value - The new value to update the element at the specified index.
   */
  const handleUpdate = () => {
    // Validation checks first
    if (isNaN(element) || isNaN(index)) {
      dispatch(setMessage("Element or Index must be a number"));
      return;
      setIsError(true);
    }

    if (array.length === 0) {
      dispatch(setMessage("Array is empty, cannot update an empty array"));
      setIsError(true);
      return;
    }

    if (index < 0 || index > array.length - 1) {
      dispatch(
        setMessage("Index out of bounds: Cannot update element at this index")
      );
      setIsError(true);
      return;
    }

    // Start update animation
    dispatch(setIsUpdating(true));

    // Update the array
    const newArray = [...array];
    newArray[index] = element;
    dispatch(setArray(newArray));
    dispatch(setMessage(`Updated element at index ${index} to ${element}`));
    setAlertVisible(true);
    setIsError(false);

    // Reset update state after animation

    setTimeout(() => {
      dispatch(setIsUpdating(false));
    }, 1000); // Match this with CSS --animation-duration
  };

  return (
    <div className="p-4 space-y-4 ">
      <div className="flex items-end justify-center gap-4 transition-all">
        <Input
          type="number"
          label="Element"
          labelPlacement="outside"
          placeholder="Element"
          className="w-24"
          value={element?.toString() || ""}
          onChange={(e) => dispatch(setElement(parseInt(e.target.value)))}
          id="insertValue"
        />
        <Input
          type="number"
          label="Index"
          labelPlacement="outside"
          placeholder="Index"
          className="w-24"
          max={lastArrayIndex}
          min={0}
          value={index?.toString()}
          onChange={(e) => dispatch(setIndex(parseInt(e.target.value)))}
        />
        <Button onClick={() => handleInsert()}>Insert</Button>
        <Button onClick={() => handleDelete()} color="danger">
          Delete
        </Button>
        <Button onClick={() => handleUpdate()} color="primary">
          Update
        </Button>
      </div>
      {array === 0 ? (
        <p className="text-center">Array is empty</p>
      ) : (
        <ControlsAlert
          message={message}
          isError={isError}
          isVisible={alertVisible}
          onHide={() => setAlertVisible(false)}
        />
      )}
    </div>
  );
};

export default ArrayControls;
