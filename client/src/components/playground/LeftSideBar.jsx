import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "../../utils/algorithmsData";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentView,
  setCode,
} from "../../features/visualizer/visualizerSlice";

/**
 * A button that displays a category title and an arrow icon that rotates 90
 * degrees when the category is expanded.
 *
 * @param {boolean} expanded Whether the category is currently expanded
 * @param {string} title The title of the category
 * @param {function} onClick A function to call when the user clicks the button
 */
const CategoryHeader = ({ expanded, title, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center p-2.5 cursor-pointer hover:bg-content2 rounded-lg transition-colors duration-200 group"
  >
    {expanded ? (
      <ChevronDown className="h-4 w-4 mr-2.5 text-default-600" />
    ) : (
      <ChevronRight className="h-4 w-4 mr-2.5 text-default-600" />
    )}
    <span className="font-medium text-default-700 group-hover:text-default-900">
      {title}
    </span>
  </div>
);

/**
 * A button that displays an item title and an arrow icon that rotates 90
 * degrees when the item is expanded.
 *
 * @param {boolean} expanded Whether the item is currently expanded
 * @param {string} title The title of the item
 * @param {function} onClick A function to call when the user clicks the button
 */
const ItemHeader = ({ expanded, title, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center p-2 cursor-pointer hover:bg-content2 rounded-md transition-colors duration-200 group"
  >
    {expanded ? (
      <ChevronDown className="h-3 w-3 mr-2 text-default-500" />
    ) : (
      <ChevronRight className="h-3 w-3 mr-2 text-default-500" />
    )}
    <span className="text-sm text-default-600 group-hover:text-default-800">
      {title}
    </span>
  </div>
);

/**
 * A single item in the left sidebar that represents a topic.
 *
 * @param {object} topic The topic object, containing `name` and `implemented`
 * @param {function} onClick A function to call when the user clicks the item
 */
const TopicItem = ({ topic, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center p-2 cursor-pointer hover:bg-content2 rounded-md 
               transition-all duration-200 text-sm group active:scale-95"
  >
    <span className="ml-2 text-default-600 group-hover:text-default-800">
      {topic.name}
    </span>
    {!topic.implemented && (
      <span
        className="ml-2 text-xs px-2 py-0.5 bg-content2 text-default-500 
                      rounded-full group-hover:bg-content3"
      >
        🔜
      </span>
    )}
  </div>
);

/**
 * The left sidebar component, which displays a list of categories and topics.
 *
 * @returns A JSX element representing the left sidebar component.
 *
 * The component renders a list of categories, each with a title and a list of
 * items. Each item has a title and a list of topics. The component also renders a
 * search input at the top of the sidebar.
 *
 * The component uses the `useState` hook to keep track of the expanded state of
 * each category and item. It also uses the `useDispatch` and `useSelector` hooks
 * to dispatch actions and select data from the Redux store.
 *
 * The component uses a recursive function to render the list of categories and
 * items. The function takes an object with the category and item data as its
 * argument, and returns a JSX element representing the list of categories and
 * items.
 *
 * The component also uses the `filterItems` function to filter the list of
 * categories and items based on the search query. The function takes two
 * arguments: an object with the category and item data, and the search query.
 * It returns a boolean indicating whether the category or item should be
 * rendered.
 *
 * The component renders a `CategoryHeader` component for each category, a
 * `ItemHeader` component for each item, and a `TopicItem` component for each
 * topic. The `CategoryHeader` component renders the category title and an arrow
 * icon that rotates 90 degrees when the category is expanded. The `ItemHeader`
 * component renders the item title and an arrow icon that rotates 90 degrees
 * when the item is expanded. The `TopicItem` component renders the topic title
 * and an arrow icon that rotates 90 degrees when the topic is expanded.
 */
const LeftSideBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({
    dataStructures: true,
    algorithms: true,
  });
  const [expandedItems, setExpandedItems] = useState({});
  const dispatch = useDispatch();
  // const { setCurrentView, setCode } = useSelector((state) => state.visualizer);

  /**
   * Handles a topic being clicked in the left sidebar.
   *
   * @param {Topic} topic The topic that was clicked.
   *
   * Dispatches the `setCurrentView` action with the topic as an argument, and
   * the `setCode` action with the code for the topic as an argument.
   */
  const handleTopicClick = (topic) => {
    dispatch(setCurrentView(topic.name));
    console.log(topic);
    // dispatch(setCode(getCodeForTopic(topic)));
  };

  /**
   * Toggles the expanded state of a category in the left sidebar.
   *
   * @param {string} category The category to toggle.
   *
   * If the category is already expanded, this function collapses it. If the
   * category is already collapsed, this function expands it.
   */
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  /**
   * Handles an item being clicked in the left sidebar.
   *
   * @param {string} category The category of the item that was clicked.
   * @param {string} item The item that was clicked.
   *
   * Toggles the expanded state of the item. If the item is already expanded,
   * this function collapses it. If the item is already collapsed, this
   * function expands it.
   */

  /**
   * Toggles the expanded state of an item in the left sidebar.
   *
   * @param {string} category The category of the item to toggle.
   * @param {string} item The item to toggle.
   *
   * If the item is already expanded, this function collapses it. If the item is
   * already collapsed, this function expands it.
   */
  const toggleItem = (category, item) => {
    const key = `${category}-${item}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * Filters a list of items based on a search query.
   *
   * @param {object} items - The items object containing categories and their topics.
   * @param {string} query - The search query to filter items by.
   * @returns {boolean} - Returns true if the item's title or any of its sub-items
   * or topics include the search query; otherwise, false.
   */
  const filterItems = (items, query) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();

    if (items.title.toLowerCase().includes(lowerQuery)) return true;

    return Object.entries(items.items).some(
      ([itemName, itemData]) =>
        itemName.toLowerCase().includes(lowerQuery) ||
        itemData.topics.some((topic) =>
          topic.name.toLowerCase().includes(lowerQuery)
        )
    );
  };

  return (
    <div className="h-full flex flex-col bg-background/60 backdrop-blur-lg border-r border-divider">
      {/* Search Section */}
      <div className="flex-none p-3 border-b border-divider">
        <Input
          type="text"
          placeholder="Search algorithms..."
          startContent={<Search className="text-default-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
          size="sm"
          variant="bordered"
        />
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {Object.entries(categories).map(([categoryKey, categoryData]) => {
          if (!filterItems(categoryData, searchQuery)) return null;

          return (
            <div key={categoryKey} className="select-none">
              <CategoryHeader
                expanded={expandedCategories[categoryKey]}
                title={categoryData.title}
                onClick={() => toggleCategory(categoryKey)}
              />

              {expandedCategories[categoryKey] && (
                <div className="ml-4 space-y-1 mt-1">
                  {Object.entries(categoryData.items).map(
                    ([itemName, itemData]) => {
                      if (
                        searchQuery &&
                        !itemData.topics.some((topic) =>
                          topic.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                      )
                        return null;

                      return (
                        <div key={itemName} className="space-y-1">
                          <ItemHeader
                            expanded={
                              expandedItems[`${categoryKey}-${itemName}`]
                            }
                            title={itemName}
                            onClick={() => toggleItem(categoryKey, itemName)}
                          />

                          {expandedItems[`${categoryKey}-${itemName}`] && (
                            <div className="ml-5 space-y-0.5">
                              {itemData.topics.map((topic) => (
                                <TopicItem
                                  key={topic.name}
                                  topic={topic}
                                  onClick={() => handleTopicClick(topic)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSideBar;
