import React, { useState, useContext, useRef } from "react";
import AlgorithmPageLayout from "../layouts/AlgorithmPageLayout";
import DijkstraVisualizer from "../algorithms/dijkstra/DijkstraVisualizer";
import GreedyBFSVisualizer from "../algorithms/greedy_bfs/GreedyBFSVisualizer";
import AStarVisualizer from "../algorithms/a_star/AStarVisualizer";
import Grid from "../components/Grid";
import { GridContext } from "../contexts/GridContext"; // Importieren Sie nur GridContext

const algorithmOptions = [
  { value: "dijkstra", label: "Dijkstra" },
  { value: "greedy_bfs", label: "Greedy Best-First Search" },
  { value: "a_star", label: "A* Search" },
  // Weitere Algorithmen
];

const algorithmDescriptions = {
  dijkstra:
    "Dijkstra's algorithm finds the shortest path between nodes in a graph.",
  greedy_bfs: "Greedy Best-First Search explores nodes closest to the goal.",
  a_star:
    "A* Search combines heuristics and path cost to find the shortest path.",
  // Weitere Beschreibungen
};

const Pathfinding = () => {
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const { resetGridVisuals } = useContext(GridContext); // Zugriff auf resetGridVisuals aus dem Kontext

  const visualizerRef = useRef();

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
    // Grid-Visualisierung zurücksetzen
    resetGridVisuals();
  };

  const handleButtonClick = () => {
    if (visualizerRef.current) {
      // Den entsprechenden Algorithmus visualisieren, basierend auf der Auswahl
      if (algorithm === "dijkstra") {
        visualizerRef.current.visualizeDijkstra();
      } else if (algorithm === "a_star") {
        visualizerRef.current.visualizeAStar();
      } else if (algorithm === "greedy_bfs") {
        visualizerRef.current.visualizeGreedyBFS();
      }
    }
  };

  // Beschreibung für den ausgewählten Algorithmus erhalten
  const description = algorithmDescriptions[algorithm];

  return (
    <AlgorithmPageLayout
      title="Pathfinding Algorithms"
      algorithmOptions={algorithmOptions}
      selectedAlgorithm={algorithm}
      onAlgorithmChange={handleAlgorithmChange}
    >
      {/* Algorithmusbeschreibung */}
      <div id="algorithmDescription" className="mb-4">
        <p>{description}</p>
      </div>
      {/* Steuerungen und Visualisierer */}
      <div className="flex flex-col items-center">
        {/* Buttons der Algorithmen */}
        {algorithm === "dijkstra" && <DijkstraVisualizer ref={visualizerRef} />}
        {algorithm === "a_star" && <AStarVisualizer ref={visualizerRef} />}
        {algorithm === "greedy_bfs" && (
          <GreedyBFSVisualizer ref={visualizerRef} />
        )}

        <Grid onButtonClick={handleButtonClick} />
      </div>
    </AlgorithmPageLayout>
  );
};

export default Pathfinding;
