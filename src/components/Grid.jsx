import React, { useContext, useEffect, useState } from "react";
import Node from "./Node";
import { GridContext } from "../contexts/GridContext";

const Grid = ({ onButtonClick }) => {
  const { grid, setGrid, setStartNode, setEndNode, resetGridVisuals } =
    useContext(GridContext);

  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [currentAction, setCurrentAction] = useState("start"); // default: start node

  useEffect(() => {
    const handleResize = () => {
      const nodeSize = 25;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const getElementHeightWithMargin = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
          const computedStyle = window.getComputedStyle(element);
          const marginTop = parseFloat(computedStyle.marginTop);
          const marginBottom = parseFloat(computedStyle.marginBottom);
          return element.offsetHeight + marginTop + marginBottom;
        }
        return 0;
      };

      // Verwende diese Methode, um die Höhe mit Margin zu berechnen
      const headerHeight = getElementHeightWithMargin("header");
      const footerHeight = getElementHeightWithMargin("footer");
      const algorithmPageHeadingHeight = getElementHeightWithMargin(
        "algorithmPageHeading"
      );
      const algorithmSelectorHeight =
        getElementHeightWithMargin("algorithmSelector");
      const algorithmDescriptionHeight = getElementHeightWithMargin(
        "algorithmDescription"
      );
      const startVizAlgorithmHeight =
        getElementHeightWithMargin("startVizAlgorithm");
      const clearGridHeight = getElementHeightWithMargin("clearGrid");
      const startEndWallButtons = getElementHeightWithMargin(
        "startEndWallButtons"
      );

      console.log(
        "headerHeight: ",
        headerHeight,
        "footerHeight: ",
        footerHeight,
        "algorithmPageHeadingHeight: ",
        algorithmPageHeadingHeight,
        "algorithmSelectorHeight: ",
        algorithmSelectorHeight,
        "algorithmDescriptionHeight: ",
        algorithmDescriptionHeight,
        "startVizAlgorithmHeight: ",
        startVizAlgorithmHeight,
        "clearGridHeight: ",
        clearGridHeight,
        "startEndWallButtons: ",
        startEndWallButtons
      );

      const additionalHeight = 4 * 16;

      const occupiedHeight =
        headerHeight +
        footerHeight +
        algorithmPageHeadingHeight +
        algorithmSelectorHeight +
        algorithmDescriptionHeight +
        clearGridHeight +
        startEndWallButtons +
        additionalHeight;

      const availableHeight = viewportHeight - occupiedHeight;

      const cols = Math.floor(viewportWidth / nodeSize);
      const rows = Math.floor(availableHeight / nodeSize);

      const adjustedRows = Math.max(rows, 0);
      const adjustedCols = Math.max(cols, 0);

      setDimensions({ rows: adjustedRows, cols: adjustedCols });

      const newGrid = [];
      for (let row = 0; row < adjustedRows; row++) {
        const currentRow = [];
        for (let col = 0; col < adjustedCols; col++) {
          currentRow.push({
            row,
            col,
            isStart: false,
            isEnd: false,
            isWall: false,
            isVisited: false,
            previousNode: null,
            distance: Infinity,
            g: Infinity,
            h: Infinity,
            f: Infinity,
          });
        }
        newGrid.push(currentRow);
      }
      setGrid(newGrid);
      setStartNode(null);
      setEndNode(null);

      // clearGrid();
      // resetGridVisuals();
    };

    setTimeout(handleResize, 0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setGrid, setStartNode, setEndNode]);

  useEffect(() => {
    const handleResize2 = () => {
      grid.map((row) =>
        row.map((node) => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          if (element) {
            element.style.backgroundColor = "";
            if (!node.isStart && !node.isEnd && !node.isWall) {
              element.className =
                "w-6 h-6 border border-gray-200 bg-white grid-node";
            }
          }
          return node;
        })
      );
    };

    window.addEventListener("resize", handleResize2);

    return () => window.removeEventListener("resize", handleResize2);
  }, []);

  // Funktion zum Zurücksetzen des Grids
  const clearGrid = () => {
    const newGrid = grid.map((row) =>
      row.map((node) => {
        return {
          ...node,
          isStart: false,
          isEnd: false,
          isWall: false,
        };
      })
    );
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);

    for (const row of newGrid) {
      for (const node of row) {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "w-6 h-6 border border-gray-200 bg-white";
          element.style.backgroundColor = "";
        }
      }
    }
  };

  // Menü zum Auswählen der Aktion (Start, Ziel, Mauer)
  const mobileMenu = (
    <div
      id="startEndWallButtons"
      className="flex justify-center mb-2 space-x-1" // Reduzierter Abstand
    >
      <button
        onClick={() => setCurrentAction("start")}
        className={`px-2 py-1 rounded-md text-sm ${
          currentAction === "start"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        Start
      </button>
      <button
        onClick={() => setCurrentAction("end")}
        className={`px-2 py-1 rounded-md text-sm ${
          currentAction === "end"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        Ziel
      </button>
      <button
        onClick={() => setCurrentAction("wall")}
        className={`px-2 py-1 rounded-md text-sm ${
          currentAction === "wall"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        Mauer
      </button>
    </div>
  );

  return (
    <div>
      {/* Menü für Aktion (Start, Ziel, Mauer) */}
      <div
        id="startEndWallButtons"
        className="flex justify-center my-2 space-x-1"
      >
        <button
          onClick={() => setCurrentAction("start")}
          className={`px-2 py-1 rounded-md  ${
            currentAction === "start"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Start
        </button>
        <button
          onClick={() => setCurrentAction("end")}
          className={`px-2 py-1 rounded-md  ${
            currentAction === "end"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          End
        </button>
        <button
          onClick={() => setCurrentAction("wall")}
          className={`px-2 py-1 rounded-md  ${
            currentAction === "wall"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Wall
        </button>
      </div>

      {/* Buttons für Grid und Visualisierung */}
      <div className="flex justify-center my-2 space-x-2">
        <button
          id="clearGrid"
          onClick={clearGrid}
          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
        >
          Reset Grid
        </button>
        <button
          onClick={onButtonClick}
          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded text-sm"
        >
          Start Visualisation
        </button>
      </div>

      {/* Grid anzeigen */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${dimensions.cols}, 25px)`,
          gridTemplateRows: `repeat(${dimensions.rows}, 25px)`,
        }}
      >
        {grid.flat().map((node, index) => (
          <Node
            key={index}
            node={node}
            isMousePressed={isMousePressed}
            setIsMousePressed={setIsMousePressed}
            currentAction={currentAction}
            setCurrentAction={setCurrentAction}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
