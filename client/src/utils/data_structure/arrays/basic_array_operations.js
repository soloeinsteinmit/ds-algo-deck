import {
  setArray,
  setIndex,
  setMessage,
  setIsInserting,
  setIsDeleting,
  setIsUpdating,
} from "../../../features/visualizer/arrays/arrayVisualizerSlice";

/**
 * Inserts the element at the specified index in the array.
 *
 * Takes the current array from the state, creates a copy, and inserts
 * the element at the given index. Dispatches the updated array to the Redux store.
 *
 * @param {number} element - The new value to insert at the specified index.
 * @param {number} index - The index at which to insert the element.
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} setAlertVisible - Function to set alert visible state.
 * @param {function} setIsError - Function to set the error state.
 */
export const handleInsert = ({
  array,
  index,
  element,
  dispatch,
  setAlertVisible,
  setIsError,
}) => {
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

  dispatch(setIsInserting(true));
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
  setTimeout(() => {
    dispatch(setIsInserting(false));
  }, 1000);
};

/**
 * Deletes the element at the specified index from the array.
 *
 * Validates the index and checks if the array is not empty. If the index is valid,
 * it sets the deleting state, removes the element at the given index from a copy
 * of the array, and dispatches the updated array to the Redux store.
 * Also dispatches relevant messages and manages alert visibility and error states.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Array} params.array - The current array from the state.
 * @param {number} params.index - The index at which to delete the element.
 * @param {function} params.dispatch - The Redux dispatch function.
 * @param {function} params.setAlertVisible - Function to set alert visible state.
 * @param {function} params.setIsError - Function to set the error state.
 */
export const handleDelete = ({
  array,
  index,
  dispatch,
  setAlertVisible,
  setIsError,
}) => {
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

  dispatch(setIsDeleting(true));
  setTimeout(() => {
    const newArray = [...array];
    newArray.splice(index, 1);
    dispatch(setArray(newArray));
    dispatch(setMessage(`Deleted element at index ${index}`));
  }, 1000);
  setAlertVisible(true);
  setTimeout(() => {
    dispatch(setIsDeleting(false));
  }, 1000);
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
export const handleUpdate = ({
  array,
  index,
  element,
  dispatch,
  setAlertVisible,
  setIsError,
}) => {
  if (isNaN(element) || isNaN(index)) {
    dispatch(setMessage("Element or Index must be a number"));
    setIsError(true);
    return;
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

  dispatch(setIsUpdating(true));
  const newArray = [...array];
  newArray[index] = element;
  dispatch(setArray(newArray));
  dispatch(setMessage(`Updated element at index ${index} to ${element}`));
  setAlertVisible(true);
  setTimeout(() => {
    dispatch(setIsUpdating(false));
  }, 1000);
};

/**
 * Searches for the element in the array.
 *
 * Checks if the array is not empty. If not, it uses the Array.prototype.indexOf()
 * method to search for the element in the array. If the element is found, it
 * dispatches a message with the index of the element, else it dispatches a message
 * saying that the element is not found. Sets the alert visible state.
 *
 * @param {Array} array - The array to search in.
 * @param {string} searchValue - The value of the element to search for.
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} setAlertVisible - Function to set alert visible state.
 * @param {function} setIsError - Function to set the error state.
 */
export const handleSearch = ({
  array,
  searchValue,
  dispatch,
  setAlertVisible,
  setIsError,
}) => {
  if (array.length === 0) {
    dispatch(setMessage("Array is empty, cannot search"));
    setIsError(true);
    return;
  }
  const foundIndex = array.indexOf(parseInt(searchValue));
  if (foundIndex === -1) {
    dispatch(setMessage(`Element ${searchValue} not found in array`));
  } else {
    dispatch(setMessage(`Element ${searchValue} found at index ${foundIndex}`));
  }
  setAlertVisible(true);
};

/**
 * Sorts the array in the specified order.
 *
 * Checks if the array is not empty. If not, it creates a copy of
 * the array and sorts it based on the given sortOrder. If sortOrder
 * is "asc", it sorts in ascending order; otherwise, it sorts in
 * descending order. Dispatches the sorted array to the Redux store
 * and sets an alert message indicating the sort order.
 *
 * @param {Array} array - The array to sort.
 * @param {string} sortOrder - The order to sort the array, either "asc" or "desc".
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} setAlertVisible - Function to set alert visible state.
 */
export const handleSort = ({ array, sortOrder, dispatch, setAlertVisible }) => {
  if (array.length === 0) {
    dispatch(setMessage("Array is empty, cannot sort"));
    return;
  }
  const newArray = [...array];
  newArray.sort((a, b) => (sortOrder === "asc" ? a - b : b - a));

  dispatch(setArray(newArray));
  dispatch(setMessage(`Array sorted in ${sortOrder}ending order`));
  setAlertVisible(true);
};

/**
 * Reverses the array in place.
 *
 * Checks if the array is not empty. If not, it creates a reversed
 * copy of the array, dispatches it to the Redux store, and sets an
 * alert message indicating the array has been reversed.
 *
 * @param {Array} array - The array to reverse.
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} setAlertVisible - Function to set alert visible state.
 * @param {function} setIsError - Function to set the error state.
 */
export const handleReverse = (array, dispatch, setAlertVisible, setIsError) => {
  if (array.length === 0) {
    dispatch(setMessage("Array is empty, cannot reverse"));
    setIsError(true);
    return;
  }

  const newArray = [...array].reverse();
  dispatch(setArray(newArray));
  dispatch(setMessage("Array reversed"));
  setAlertVisible(true);
};

/**
 * Shuffles the array randomly in place.
 *
 * Checks if the array is not empty. If not, it creates a shuffled copy
 * of the array using the Fisher-Yates shuffle algorithm. Dispatches
 * the shuffled array to the Redux store and sets an alert message
 * indicating the array has been shuffled.
 *
 * @param {Array} array - The array to shuffle.
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} setAlertVisible - Function to set alert visible state.
 * @param {function} setIsError - Function to set the error state.
 */
export const handleShuffle = (array, dispatch, setAlertVisible, setIsError) => {
  if (array.length === 0) {
    dispatch(setMessage("Array is empty, cannot shuffle"));
    setIsError(true);
    return;
  }

  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  dispatch(setArray(newArray));
  dispatch(setMessage("Array shuffled randomly"));
  setAlertVisible(true);
};

/**
 * Clears the array by dispatching an empty array to the Redux store.
 * Also dispatches a message indicating the array has been cleared and
 * resets the index to 0.
 *
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} setAlertVisible - Function to set alert visible state.
 */
export const handleClear = (dispatch, setAlertVisible) => {
  dispatch(setArray([]));
  dispatch(setMessage("Array cleared"));
  setAlertVisible(true);
  dispatch(setIndex(0));
};

/**
 * Randomizes the array with 10 elements from 0 to 99.
 *
 * Generates an array of 10 random numbers from 0 to 99 and dispatches it to the
 * Redux store. Also dispatches a message indicating the array has been randomized.
 *
 * @param {function} dispatch - The Redux dispatch function.
 * @param {function} setAlertVisible - Function to set alert visible state.
 */
export const randomizeArray = (dispatch, setAlertVisible) => {
  const newArray = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 100)
  );
  dispatch(setArray(newArray));
  dispatch(setMessage("Array randomized"));
  setAlertVisible(true);
};
