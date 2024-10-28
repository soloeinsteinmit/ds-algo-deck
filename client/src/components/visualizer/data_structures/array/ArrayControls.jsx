import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import { Button, input, Input } from "@nextui-org/react";

import {
  setArray,
  setIndex,
  setElement,
  setMessage,
} from "../../../../features/visualizer/arrays/arrayVisualizerSlice";
import ControlsAlert from "../../../playground/ControlsAlert";

const ArrayControls = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const { array, index, element, message } = useSelector(
    (state) => state.arrayVisualizer
  );

  /**
   * Inserts the element at the specified index in the array.
   *
   * Takes the current array from the state, creates a copy, and inserts
   * the element at the given index. Dispatches the updated array to the Redux store.
   */
  const handleInsert = () => {
    const newArray = [...array];

    if (isNaN(element) || isNaN(index)) {
      dispatch(setMessage("Element or Index must be a number"));
      setIsError(true);
      return;
    }

    // Check if index is valid
    if (index < 0 || index > newArray.length) {
      dispatch(
        setMessage("Index out of bounds: Cannot insert element at this index")
      );
      setIsError(true);
      return;
    }

    newArray.splice(index, 0, element);

    dispatch(setArray(newArray));
    dispatch(setMessage(`Inserted ${element} at index ${index}`));
    setIsError(false);
  };

  /**
   * Deletes the element at the specified index in the array.
   *
   * Takes the current array from the state, filters out the element at the given index, and dispatches the updated array to the Redux store.
   */
  const handleDelete = () => {
    const newArray = [...array];

    if (isNaN(element) || isNaN(index)) {
      dispatch(setMessage("Element or Index must be a number"));
      setIsError(true);
      return;
    }
    newArray.splice(index, 1);

    if (newArray.length === 0) {
      dispatch(setMessage("Array is empty, cannot delete from an empty array"));
      dispatch(setArray([]));
      return;
    }
    if (index < 0 || index > newArray.length - 1) {
      dispatch(
        setMessage("Index out of bounds: Cannot delete element at this index")
      );
      setIsError(true);
      return;
    }

    dispatch(setArray(newArray));
    dispatch(setMessage(`Deleted element at index ${index}`));
    setIsError(false);
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
    const newArray = [...array];

    if (isNaN(element) || isNaN(index)) {
      dispatch(setMessage("Element or Index must be a number"));
      setIsError(true);
      return;
    }

    if (newArray.length === 0) {
      dispatch(setMessage("Array is empty, cannot update an empty array"));
      return;
    }
    if (index < 0 || index > newArray.length - 1) {
      dispatch(
        setMessage("Index out of bounds: Cannot update element at this index")
      );
      setIsError(true);
      return;
    }

    newArray[index] = element;
    dispatch(setArray(newArray));
    dispatch(setMessage(`Updated element at index ${index} to ${element}`));
    setIsError(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-end justify-center gap-4">
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
          value={index?.toString()}
          onChange={(e) => dispatch(setIndex(parseInt(e.target.value)))}
          id="insertIndex"
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
        <ControlsAlert message={message} isError={isError} />
      )}
    </div>
  );
};

export default ArrayControls;
