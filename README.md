# Algorithm Visualizer

A modern, minimalist web application built with React and Tailwind CSS to visually represent various algorithms. The project is structured to be easily extendable, allowing you to add new algorithm categories and algorithms with minimal effort.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Adding New Algorithms](#adding-new-algorithms)
  - [1. Create the Algorithm Files](#1-create-the-algorithm-files)
  - [2. Implement the Algorithm Logic](#2-implement-the-algorithm-logic)
  - [3. Create the Visualizer Component](#3-create-the-visualizer-component)
  - [4. Update the Algorithm Selection](#4-update-the-algorithm-selection)
- [Adding New Algorithm Categories](#adding-new-algorithm-categories)
  - [1. Create a New Category Page](#1-create-a-new-category-page)
  - [2. Update Routing](#2-update-routing)
  - [3. Update the Home Page](#3-update-the-home-page)
- [Considerations](#considerations)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project provides interactive visualizations of various algorithms to help users understand their inner workings. Currently, it includes the "Pathfinding" category with the Dijkstra algorithm. Users can interact with the grid to set start and end points, place obstacles, and visualize the algorithm finding the shortest path.

## Project Structure

```plaintext
src/
├── algorithms/
│ ├── dijkstra/
│ │ ├── DijkstraVisualizer.jsx
│ │ └── dijkstraAlgorithm.js
│ └── [newAlgorithm]/
│ ├── [NewAlgorithm]Visualizer.jsx
│ └── [newAlgorithm]Algorithm.js
├── components/
│ ├── Grid.jsx
│ └── Node.jsx
├── contexts/
│ └── GridContext.jsx
├── pages/
│ ├── Home.jsx
│ ├── Pathfinding.jsx
│ └── [NewCategory].jsx
├── App.jsx
└── index.jsx
```

- **algorithms/**: Contains algorithm logic and visualizer components.
- **components/**: Reusable components like Grid and Node.
- **contexts/**: Context API for state management.
- **pages/**: Different pages of the application.
- **App.jsx**: Main application component with routing.
- **index.jsx**: Entry point of the application.

## Getting Started

### Prerequisites

- Node.js and npm installed.

### Installation

```bash
git clone [repository_url]
cd algorithm-visualizer
npm install
```

### Running the Application

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

## Adding New Algorithms

### 1. Create the Algorithm Files

Create a new folder for your algorithm inside the `algorithms/` directory.

```plaintext
src/
└── algorithms/
└──── [yourAlgorithm]/
├────── [YourAlgorithm]Visualizer.jsx
└────── [yourAlgorithm]Algorithm.js
```

### 2. Implement the Algorithm Logic

In `[yourAlgorithm]Algorithm.js`, implement your algorithm's logic.

Example:

```javascript
// src/algorithms/yourAlgorithm/yourAlgorithmAlgorithm.js

export function yourAlgorithm(grid, startNode, endNode) {
  // Implement your algorithm logic here
  // Return an array of visited nodes in order
}

export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
```

### 3. Create the Visualizer Component

In `[YourAlgorithm]Visualizer.jsx`, create a component to handle visualization.

```javascript
// src/algorithms/yourAlgorithm/YourAlgorithmVisualizer.jsx

import React, { useContext } from "react";
import { GridContext } from "../../contexts/GridContext";
import {
  yourAlgorithm,
  getNodesInShortestPathOrder,
} from "./yourAlgorithmAlgorithm";

const YourAlgorithmVisualizer = () => {
  const { grid, startNode, endNode } = useContext(GridContext);

  const visualizeAlgorithm = () => {
    const visitedNodesInOrder = yourAlgorithm(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateAlgorithm = (nodesInOrder, shortestPathNodes) => {
    // Animation logic for visited nodes and shortest path
  };

  return (
    <button
      onClick={visualizeAlgorithm}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Visualize Your Algorithm
    </button>
  );
};

export default YourAlgorithmVisualizer;
```

### 4. Update the Algorithm Selection

In `Pathfinding.jsx`, import your visualizer and update the selection dropdown.

```javascript
// src/pages/Pathfinding.jsx

import React, { useState } from "react";
import DijkstraVisualizer from "../algorithms/dijkstra/DijkstraVisualizer";
import YourAlgorithmVisualizer from "../algorithms/yourAlgorithm/YourAlgorithmVisualizer";

const Pathfinding = () => {
  const [algorithm, setAlgorithm] = useState("dijkstra");

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl text-center my-4">Pathfinding Algorithms</h1>
      <div className="flex justify-center mb-4">
        <select
          value={algorithm}
          onChange={handleAlgorithmChange}
          className="px-4 py-2 border rounded"
        >
          <option value="dijkstra">Dijkstra's Algorithm</option>
          <option value="yourAlgorithm">Your Algorithm</option>
        </select>
      </div>
      <div className="flex justify-center mb-4">
        {algorithm === "dijkstra" && <DijkstraVisualizer />}
        {algorithm === "yourAlgorithm" && <YourAlgorithmVisualizer />}
      </div>
      <div className="flex justify-center">
        <Grid />
      </div>
    </div>
  );
};

export default Pathfinding;
```

## Adding New Algorithm Categories

### 1. Create a New Category Page

Create a new page component in the `pages/` directory.

```javascript
// src/pages/Sorting.jsx

import React from "react";
import SortingVisualizer from "../algorithms/sorting/SortingVisualizer";

const Sorting = () => {
  return (
    <div>
      <h1 className="text-2xl text-center my-4">Sorting Algorithms</h1>
      <div className="flex justify-center">
        <SortingVisualizer />
      </div>
    </div>
  );
};

export default Sorting;
```

### 2. Update Routing

In `App.jsx`, add a route for the new category.

```javascript
// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pathfinding from "./pages/Pathfinding";
import Sorting from "./pages/Sorting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pathfinding" element={<Pathfinding />} />
        <Route path="/sorting" element={<Sorting />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 3. Update the Home Page

In `Home.jsx`, add a link to the new category.

```javascript
// src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">Algorithm Visualizer</h1>
      <Link to="/pathfinding">
        <button className="px-4 py-2 bg-green-500 text-white rounded mb-4">
          Pathfinding Algorithms
        </button>
      </Link>
      <Link to="/sorting">
        <button className="px-4 py-2 bg-purple-500 text-white rounded">
          Sorting Algorithms
        </button>
      </Link>
    </div>
  );
};

export default Home;
```

## Considerations

- **State Management**: Use the Context API for shared state.
- **Interactivity**: Ensure users can interact with visualizations (e.g., setting start/end points).
- **Responsiveness**: Components should adapt to different screen sizes.
- **Performance**: Optimize rendering for large data sets.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.
