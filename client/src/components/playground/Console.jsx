import { Terminal, XCircle, Maximize2, Minimize2, Trash } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/**
 * A component that displays a console output.
 *
 * @param {{ height?: string }} props - The component props.
 * @param {string} [props.height="200px"] - The height of the console output.
 *
 * @returns {React.ReactElement} The console component.
 *
 * @example
 * import { Console } from "@components/playground/Console";
 *
 * <Console height="300px" />
 */
const Console = ({ height = "200px" }) => {
  const [logs, setLogs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const consoleEndRef = useRef(null);

  // Scroll to bottom when new logs are added
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Override console.log and console.error
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    if (!originalLog || !originalError) {
      return;
    }

    /**
     * A custom implementation of console.log that logs messages to the
     * internal state of the component, in addition to printing them to the
     * console. The logged messages are stored in an array with the following
     * structure:
     * [
     *   { type: "log", content: [...args], timestamp: Date },
     *   { type: "log", content: [...args], timestamp: Date },
     *   ...
     * ]
     */
    console.log = (...args) => {
      setLogs((prev) => [
        ...prev,
        { type: "log", content: args, timestamp: new Date() },
      ]);
      originalLog.apply(console, args);
    };

    /**
     * A custom implementation of console.error that logs messages to the
     * internal state of the component, in addition to printing them to the
     * console. The logged messages are stored in an array with the following
     * structure:
     * [
     *   { type: "error", content: [...args], timestamp: Date },
     *   { type: "error", content: [...args], timestamp: Date },
     *   ...
     * ]
     */
    console.error = (...args) => {
      setLogs((prev) => [
        ...prev,
        { type: "error", content: args, timestamp: new Date() },
      ]);
      originalError.apply(console, args);
    };

    // Cleanup
    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  /**
   * Clears the console output.
   *
   * @function
   * @returns {void}
   */
  const clearConsole = () => {
    setLogs([]);
  };

  /**
   * Takes an array of log content and formats it into a single string
   * for display in the console.
   *
   * @param {Array<*>} content - An array of log content, which may contain
   *   any type of values.
   * @returns {string} A string representation of the log content. If the
   *   content contains objects, they will be stringified with 2 spaces of
   *   indentation.
   */
  const formatLogContent = (content) => {
    return content
      .map((item) => {
        if (typeof item === "object") {
          return JSON.stringify(item, null, 2);
        }
        return String(item);
      })
      .join(" ");
  };

  /**
   * Formats a timestamp into a string for display in the console.
   *
   * The timestamp is formatted in 24-hour time format, with hours, minutes,
   * and seconds. The resulting string is in the format "HH:mm:ss".
   *
   * @param {Date} timestamp - The timestamp to format.
   * @returns {string} A string representation of the timestamp in 24-hour time format.
   */
  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour12: false });
  };

  return (
    <div
      className={`bg-gray-100 dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-[#2d2d2d] ${
        isExpanded ? "fixed bottom-0 left-0 right-0 z-50" : ""
      }`}
      style={{ height: isExpanded ? "50vh" : height }}
    >
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#252526] border-b border-gray-200 dark:border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="dark:text-[#cccccc]" />
          <span className="font-medium dark:text-[#cccccc]">Console</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearConsole}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded"
            title="Clear console"
          >
            <Trash size={16} className="dark:text-[#cccccc]" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded"
            title={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? (
              <Minimize2 size={16} className="dark:text-[#cccccc]" />
            ) : (
              <Maximize2 size={16} className="dark:text-[#cccccc]" />
            )}
          </button>
        </div>
      </div>

      {/* Console Output */}
      <div className="overflow-auto h-[calc(100%-40px)] font-mono text-sm">
        {logs.length === 0 ? (
          <div className="p-4 text-gray-500 dark:text-[#858585]">
            No output to display
          </div>
        ) : (
          <div className="p-2">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`py-1 px-2 rounded ${
                  log.type === "error"
                    ? "bg-red-50 dark:bg-[#5a1d1d] text-red-600 dark:text-[#f48771]"
                    : "text-gray-800 dark:text-[#cccccc]"
                }`}
              >
                <span className="text-gray-500 dark:text-[#858585] mr-2">
                  [{formatTimestamp(log.timestamp)}]
                </span>
                {log.type === "error" && (
                  <XCircle size={14} className="inline mr-2 text-[#f48771]" />
                )}
                <span className="whitespace-pre-wrap font-mono">
                  {formatLogContent(log.content)}
                </span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Console;
