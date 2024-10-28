import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "../../utils/algorithmsData";
import { useDispatch, useSelector } from "react-redux";

const LeftSideBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({
    dataStructures: true,
    algorithms: true,
  });
  const [expandedItems, setExpandedItems] = useState({});
  const dispatch = useDispatch();
  const { setCurrentView, setCode } = useSelector((state) => state.visualizer);

  // In LeftSideBar.tsx
  const handleTopicClick = (topic) => {
    useDispatch(setCurrentView(topic));
    // You can also dispatch the corresponding code here
    dispatch(setCode(getCodeForTopic(topic)));
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Toggle item expansion
  const toggleItem = (category, item) => {
    const key = `${category}-${item}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter items based on search
  const filterItems = (items, query) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();

    // Check if category name matches
    if (items.title.toLowerCase().includes(lowerQuery)) return true;

    // Check if any sub-items match
    return Object.entries(items.items).some(([itemName, itemData]) => {
      if (itemName.toLowerCase().includes(lowerQuery)) return true;
      return itemData.topics.some((topic) =>
        topic.name.toLowerCase().includes(lowerQuery)
      );
    });
  };

  return (
    <div className="w-[300px] overflow-auto shadow-medium rounded-medium p-4 overflow-y-auto">
      {/* Search Bar */}
      <div className="mb-4 relative">
        {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" /> */}
        <Input
          type="text"
          placeholder="Search algorithms..."
          startContent={<Search className=" text-default-600" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {Object.entries(categories).map(([categoryKey, categoryData]) => {
          // Skip if doesn't match search
          if (!filterItems(categoryData, searchQuery)) return null;

          return (
            <div key={categoryKey} className="select-none">
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(categoryKey)}
                className="flex items-center p-2 cursor-pointer hover:bg-content2 rounded-md transition-colors duration-200"
              >
                {expandedCategories[categoryKey] ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                <span className="font-medium">{categoryData.title}</span>
              </div>

              {/* Category Items */}
              {expandedCategories[categoryKey] && (
                <div className="ml-4 space-y-1">
                  {Object.entries(categoryData.items).map(
                    ([itemName, itemData]) => {
                      // Skip if doesn't match search
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
                        <div key={itemName}>
                          {/* Item Header */}
                          <div
                            onClick={() => toggleItem(categoryKey, itemName)}
                            className="flex items-center p-2 cursor-pointer hover:bg-content2 rounded-md transition-colors duration-200"
                          >
                            {expandedItems[`${categoryKey}-${itemName}`] ? (
                              <ChevronDown className="h-3 w-3 mr-2" />
                            ) : (
                              <ChevronRight className="h-3 w-3 mr-2" />
                            )}
                            <span className="text-sm">{itemName}</span>
                          </div>

                          {/* Topics */}
                          {expandedItems[`${categoryKey}-${itemName}`] && (
                            <div className="ml-5 space-y-1">
                              {itemData.topics.map((topic) => (
                                <div
                                  key={topic.name}
                                  onClick={() => handleTopicClick(topic)}
                                  className="flex items-center p-2 cursor-pointer hover:bg-content2 rounded-md transition-all duration-200 text-sm group active:scale-95"
                                >
                                  <span className="ml-2">{topic.name}</span>
                                  {!topic.implemented && (
                                    <span className="ml-2 text-xs px-1.5 py-0.5 bg-content2 text-gray-600 rounded group-hover:bg-content3">
                                      🔜
                                    </span>
                                  )}
                                </div>
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
