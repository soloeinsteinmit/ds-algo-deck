import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import "./ArrayVisualizer.css";
import {
  handleInsert,
  handleDelete,
  handleUpdate,
  handleSearch,
  handleSort,
  handleReverse,
  handleShuffle,
  handleClear,
  randomizeArray,
} from "../../../../utils/data_structure/arrays/basic_array_operations";
import ControlsAlert from "../../../playground/ControlsAlert";
import {
  setIndex,
  setElement,
} from "../../../../features/visualizer/arrays/arrayVisualizerSlice";

const ArrayControls = () => {
  const [isError, setIsError] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const dispatch = useDispatch();
  const { array, index, element, message } = useSelector(
    (state) => state.arrayVisualizer
  );
  const [lastArrayIndex, setLastArrayIndex] = useState(array?.length - 1);

  useEffect(() => {
    setLastArrayIndex(array?.length - 1);
  }, [array]);

  return (
    <div className="p-4 space-y-4 ">
      <div className="flex items-end justify-center gap-4 transition-all">
        <Input
          type="number"
          label="Element"
          placeholder="Element"
          value={element?.toString() || ""}
          className="w-24"
          onChange={(e) => dispatch(setElement(parseInt(e.target.value)))}
        />
        <Input
          type="number"
          label="Index"
          placeholder="Index"
          max={lastArrayIndex}
          min={0}
          value={index?.toString()}
          onChange={(e) => dispatch(setIndex(parseInt(e.target.value)))}
          className="w-24"
        />
        <Button
          onClick={() =>
            handleInsert({
              array,
              index,
              element,
              dispatch,
              setAlertVisible,
              setIsError,
            })
          }
          color="success"
        >
          Insert
        </Button>
        <Button
          onClick={() =>
            handleDelete({
              array,
              index,
              dispatch,
              setAlertVisible,
              setIsError,
            })
          }
          color="danger"
        >
          Delete
        </Button>
        <Button
          onClick={() =>
            handleUpdate({
              array,
              index,
              element,
              dispatch,
              setAlertVisible,
              setIsError,
            })
          }
          color="warning"
        >
          Update
        </Button>
        <Button
          onClick={() => handleClear(dispatch, setAlertVisible)}
          color="danger"
        >
          Clear
        </Button>
        <Input
          type="number"
          label="Search"
          placeholder="Search value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-24"
        />
        <Button
          onClick={() =>
            handleSearch({
              array,
              searchValue,
              dispatch,
              setAlertVisible,
              setIsError,
            })
          }
        >
          Search
        </Button>
        <Button
          onClick={() =>
            handleSort({ array, sortOrder, dispatch, setAlertVisible })
          }
        >
          Sort {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
        <Button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Toggle Sort Order
        </Button>
        <Button
          onClick={() => randomizeArray(dispatch, setAlertVisible)}
          color="secondary"
        >
          Randomize
        </Button>
        <Button
          onClick={() =>
            handleReverse(array, dispatch, setAlertVisible, setIsError)
          }
          variant="bordered"
        >
          Reverse
        </Button>
        <Button
          onClick={() =>
            handleShuffle(array, dispatch, setAlertVisible, setIsError)
          }
          variant="bordered"
        >
          Shuffle
        </Button>
      </div>
      <ControlsAlert
        message={message}
        isError={isError}
        isVisible={alertVisible}
        onHide={() => setAlertVisible(false)}
      />
    </div>
  );
};

export default ArrayControls;
