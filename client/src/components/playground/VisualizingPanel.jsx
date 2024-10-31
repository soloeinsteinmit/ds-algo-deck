import { useSelector } from "react-redux";
import VisualizerLoader from "../../utils/VisualizerLoader";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
} from "@nextui-org/react";
import { memo } from "react";
import { PiInfo } from "react-icons/pi";

const ComplexityGraph = ({ complexity }) => {
  // Graph dimensions
  const width = 150;
  const height = 100;
  const padding = 20;

  // Generate points based on complexity
  const getPoints = () => {
    const points = [];
    const numPoints = 10;

    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * (width - 2 * padding) + padding;
      let y = height - padding;

      switch (complexity) {
        case "O(n²)":
          y =
            height -
            padding -
            ((i * i) / ((numPoints - 1) * (numPoints - 1))) *
              (height - 2 * padding);
          break;
        case "O(n)":
          y = height - padding - (i / (numPoints - 1)) * (height - 2 * padding);
          break;
        case "O(log n)":
          y =
            height -
            padding -
            (Math.log(i + 1) / Math.log(numPoints)) * (height - 2 * padding);
          break;
        default:
          y = height - padding - (i / (numPoints - 1)) * (height - 2 * padding);
      }
      points.push({ x, y });
    }
    return points;
  };

  const points = getPoints();
  const pathD = `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`;

  return (
    <div className="mt-4 mb-6">
      <h5 className="font-medium mb-2">Time Complexity Graph:</h5>
      <div className="bg-content2/50 rounded-lg p-2">
        <svg
          width={width}
          height={height}
          className="overflow-visible text-white"
        >
          {/* X and Y axes */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={padding}
            y2={padding}
            stroke="currentColor"
            strokeWidth="1"
          />

          {/* Complexity curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Axis labels */}
          <text
            x={width / 2}
            y={height - 5}
            textAnchor="middle"
            className="text-[10px]"
          >
            n (input size)
          </text>
          <text
            x={10}
            y={height / 2}
            transform={`rotate(-90, 10, ${height / 2})`}
            textAnchor="middle"
            className="text-[10px]"
          >
            time
          </text>
        </svg>
      </div>
    </div>
  );
};

const AlgorithmInfo = () => {
  const algorithmData = {
    bubbleSort: {
      title: "Bubble Sort",
      description:
        "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      complexity: "O(n²)",
      keyPoints: [
        "Time Complexity: O(n²)",
        "Space Complexity: O(1)",
        "Stable: Yes",
        "In-place: Yes",
      ],
      characteristics: [
        "Easy to understand and implement",
        "Poor performance on large lists",
        "Best case: O(n) when array is already sorted",
      ],
      readMoreLink: "/algorithms/bubble-sort",
    },
    // Add more algorithms here...
  };

  const data = algorithmData;
  // if (!data) return null;

  return (
    <div className="p-4 max-w-sm">
      <h4 className="text-lg font-semibold mb-3">{data.bubbleSort.title}</h4>
      <p className="text-sm text-default-600 mb-4">
        {data.bubbleSort.description}
      </p>

      <ComplexityGraph complexity={data.bubbleSort.complexity} />

      <div className="mb-4">
        <h5 className="font-medium mb-2">Complexity Analysis:</h5>
        <ul className="list-disc list-inside text-sm space-y-1">
          {data.bubbleSort.keyPoints.map((point, index) => (
            <li key={index} className="text-default-600">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h5 className="font-medium mb-2">Key Characteristics:</h5>
        <ul className="list-disc list-inside text-sm space-y-1">
          {data.bubbleSort.characteristics.map((char, index) => (
            <li key={index} className="text-default-600">
              {char}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={data.bubbleSort.readMoreLink}
        className="text-sm text-primary hover:underline"
      >
        Read more about {data.bubbleSort.title} →
      </Link>
    </div>
  );
};

function VisualizingPanel() {
  const { currentView } = useSelector((state) => state.visualizer);
  const { title, visualizer, controls } = VisualizerLoader({
    type: currentView,
  });

  console.log("Current View:", currentView);

  return (
    <Card className="w-full h-full flex flex-col bg-background/60 backdrop-blur-lg">
      {/* Header */}
      <CardHeader className="flex-none px-6 py-3 border-b border-divider bg-content2/50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-default-800">{title}</h3>
            <Popover>
              <PopoverTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <PiInfo className="text-xl" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <AlgorithmInfo />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>

      {/* Main Visualization Area */}
      <CardBody className="flex-1 flex items-center justify-center p-6">
        <div className="w-full h-full flex items-center justify-center relative">
          {visualizer}
        </div>
      </CardBody>

      {/* Controls Area */}
      <CardFooter className="flex-none border-t border-divider bg-content1/50">
        <div className="w-full h-32 max-h-36 overflow-y-auto p-4">
          {controls}
        </div>
      </CardFooter>
    </Card>
  );
}

export default memo(VisualizingPanel);

/**
 * LoadingState component displays a centered loading animation.
 *
 * This component is used by {@link VisualizingPanel} to display a loading state
 * while the visualizer and controls are loading.
 *
 * @returns A JSX element representing the loading state.
 */
const LoadingState = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * NothingState component displays a centered message when no visualizer is selected.
 *
 * This component is used by {@link VisualizingPanel} to display a message when
 * the user has not selected a visualizer.
 *
 * @returns A JSX element representing the nothing state.
 */
const NothingState = () => (
  <div className="w-full h-full flex items-center justify-center">
    <h4 className="text-xl font-medium">No Topic Selected</h4>
  </div>
);

/**
 * ErrorState component displays an error message in a centered layout.
 *
 * This component is used to inform the user of an error that occurred
 * while loading a visualizer. It displays a fixed title and a custom
 * error message passed through the `message` prop.
 *
 * Props:
 * - message (string): The error message to be displayed.
 *
 * The component uses Tailwind CSS classes for styling to ensure a
 * consistent and centered layout with red-colored text for error indication.
 */
const ErrorState = ({ message }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-danger text-center">
      <h4 className="text-lg font-medium">Error Loading Visualizer</h4>
      <p className="text-sm text-default-600">{message}</p>
    </div>
  </div>
);
