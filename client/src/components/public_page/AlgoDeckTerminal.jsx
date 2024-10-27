import React, { useState } from "react";

const AlgoDeckTerminal = () => {
  const [leftVisible, setLeftVisible] = useState(true);
  const [rightVisible, setRightVisible] = useState(true);

  // Added implementation status to each item
  const categories = {
    dataStructures: {
      title: "Data Structures",
      items: {
        Arrays: {
          topics: [
            { name: "Basic Operations", implemented: true },
            { name: "Dynamic Arrays", implemented: false },
            { name: "Multi-dimensional Arrays", implemented: false },
          ],
        },
        "Linked Lists": {
          topics: [
            { name: "Singly Linked List", implemented: true },
            { name: "Doubly Linked List", implemented: false },
            { name: "Circular Linked List", implemented: false },
          ],
        },
        Stacks: {
          topics: [
            { name: "Basic Stack Operations", implemented: false },
            {
              name: "Applications (Balancing Parentheses)",
              implemented: false,
            },
          ],
        },
        Queues: {
          topics: [
            { name: "Basic Queue", implemented: false },
            { name: "Circular Queue", implemented: false },
            { name: "Priority Queue", implemented: false },
            { name: "Deque (Double-Ended Queue)", implemented: false },
          ],
        },
        Trees: {
          topics: [
            { name: "Binary Tree", implemented: false },
            { name: "Binary Search Tree (BST)", implemented: false },
            { name: "AVL Tree (Self-Balancing BST)", implemented: false },
            { name: "Red-Black Tree", implemented: false },
            { name: "Segment Tree", implemented: false },
            { name: "Trie", implemented: false },
            { name: "B-Tree and B+ Tree", implemented: false },
          ],
        },
        Heaps: {
          topics: [
            { name: "Min Heap", implemented: false },
            { name: "Max Heap", implemented: false },
            { name: "Fibonacci Heap", implemented: false },
          ],
        },
        Graphs: {
          topics: [
            { name: "Directed/Undirected Graphs", implemented: false },
            { name: "Weighted/Unweighted Graphs", implemented: false },
            { name: "Adjacency Matrix", implemented: false },
            { name: "Adjacency List", implemented: false },
            { name: "Edge List", implemented: false },
          ],
        },
        Hashing: {
          topics: [
            { name: "Hash Tables", implemented: false },
            { name: "Hash Maps", implemented: false },
            { name: "Open Addressing", implemented: false },
            { name: "Open Addressing / Separate Chaining", implemented: false },
          ],
        },
      },
    },
    algorithms: {
      title: "Algorithms",
      items: {
        "Sorting (Easy)": {
          topics: [
            { name: "Bubble Sort", implemented: true },
            { name: "Selection Sort", implemented: false },
            { name: "Insertion Sort", implemented: false },
          ],
        },
        "Sorting (Intermediate)": {
          topics: [
            { name: "Merge Sort", implemented: false },
            { name: "Quick Sort", implemented: false },
          ],
        },
        "Sorting (Advanced)": {
          topics: [
            { name: "Heap Sort", implemented: false },
            { name: "Counting Sort", implemented: false },
            { name: "Radix Sort", implemented: false },
            { name: "Bucket Sort", implemented: false },
          ],
        },
        Searching: {
          topics: [
            { name: "Linear Search", implemented: true },
            { name: "Binary Search", implemented: false },
            { name: "Jump Search", implemented: false },
            { name: "Exponential Search", implemented: false },
          ],
        },
        "Graph Algorithms": {
          topics: [
            { name: "Breadth-First Search (BFS)", implemented: false },
            { name: "Depth-First Search (DFS)", implemented: false },
            { name: "Dijkstra's", implemented: false },
            { name: "Floyd-Warshall", implemented: false },
            { name: "Bellman-Ford", implemented: false },
            { name: "Prim's MST", implemented: false },
            { name: "Kruskal's MST", implemented: false },
            { name: "A* Search", implemented: false },
          ],
        },
        "Dynamic Programming": {
          topics: [
            { name: "Fibonacci", implemented: false },
            { name: "Coin Change (Minimum Coins)", implemented: false },
            { name: "Longest Common Subsequence (LCS)", implemented: false },
            { name: "Knapsack Problem", implemented: false },
            { name: "Matrix Chain Multiplication", implemented: false },
          ],
        },
        Backtracking: {
          topics: [
            { name: "Rat in a Maze", implemented: false },
            { name: "N-Queens Problem", implemented: false },
            { name: "Knight's Tour", implemented: false },
            { name: "Sudoku Solver", implemented: false },
          ],
        },
        "Greedy Algorithms": {
          topics: [
            { name: "Activity Selection", implemented: false },
            { name: "Fractional Knapsack", implemented: false },
            { name: "Huffman Coding", implemented: false },
            { name: "Job Sequencing", implemented: false },
          ],
        },
        "Miscellaneous Algorithms": {
          topics: [
            {
              name: "Sieve of Eratosthenes (for Prime Nums)",
              implemented: false,
            },
            { name: "Euclidean Algorithm (for GCD)", implemented: false },
            {
              name: "KPM (Knuth-Morris-Pratt) Pattern Matching",
              implemented: false,
            },
            { name: "Rabin-Karp Algorithm", implemented: false },
            { name: "Bit Manipulation", implemented: false },
            {
              name: "Randomized Algorithms (eg. QuickSelect)",
              implemented: false,
            },
          ],
        },
      },
    },
  };

  const CategorySection = ({ category, visible, setVisible, title }) => (
    <div className="w-full">
      <div
        className="text-yellow-400 text-lg font-semibold mb-4 cursor-pointer hover:text-yellow-300 flex items-center"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "▼" : "▶"} {title}
      </div>

      {visible && (
        <div className="ml-4">
          {Object.entries(category.items).map(([topic, { topics }]) => (
            <div key={topic} className="mb-4">
              <div className="text-green-400 hover:text-green-300 cursor-pointer">
                └─ {topic}
              </div>
              <div className="ml-6">
                {topics.map((item, index) => (
                  <div
                    key={index}
                    className={`group flex items-center justify-between text-white hover:text-cyan-300 cursor-pointer transition-colors duration-200 ${
                      item.implemented ? "text-emerald-400" : ""
                    }`}
                  >
                    <span>
                      {index === topics.length - 1 ? "└─" : "├─"} {item.name}
                    </span>
                    <span
                      className="ml-2"
                      title={
                        item.implemented
                          ? "Implementation Complete"
                          : "Pending Implementation"
                      }
                    >
                      {item.implemented ? "✓" : "○"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="bg-black/95 text-white p-6 rounded-lg w-full max-w-6xl font-mono">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm">algodeck@terminal</p>
      </div>

      <div className="text-cyan-300 text-2xl font-bold mb-6 text-center">
        AlgoDeck Implementation Roadmap 🚀
      </div>

      <div className="flex gap-8">
        <div className="flex-1 border-r border-gray-700 pr-8">
          <CategorySection
            category={categories.dataStructures}
            visible={leftVisible}
            setVisible={setLeftVisible}
            title="Data Structures"
          />
        </div>

        <div className="flex-1">
          <CategorySection
            category={categories.algorithms}
            visible={rightVisible}
            setVisible={setRightVisible}
            title="Algorithms"
          />
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-400 flex items-center gap-4">
        <span>Status:</span>
        <span className="flex items-center gap-1">
          <span className="text-emerald-400">✓</span> Implemented
        </span>
        <span className="flex items-center gap-1">
          <span>○</span> In Development
        </span>
      </div>
      <p className="text-green-400 mt-4">$ _</p>
    </aside>
  );
};

export default AlgoDeckTerminal;
