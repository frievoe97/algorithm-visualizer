import React, { useContext } from "react";
import { GridContext } from "../contexts/GridContext";

const Node = ({
  node,
  isMousePressed,
  setIsMousePressed,
  currentAction, // currentAction wird übergeben
}) => {
  const { grid, setGrid, startNode, setStartNode, endNode, setEndNode } =
    useContext(GridContext);

  const { row, col, isStart, isEnd, isWall } = node;

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsMousePressed(true);

    if (currentAction === "end") {
      // Endknoten setzen
      if (endNode) {
        endNode.isEnd = false;
      }
      node.isEnd = true;
      setEndNode(node);
      setGrid([...grid]);
    } else if (currentAction === "wall") {
      // Wand setzen
      node.isWall = !node.isWall;
      setGrid([...grid]);
    } else {
      // Startknoten setzen (Standard)
      if (startNode) {
        startNode.isStart = false;
      }
      node.isStart = true;
      setStartNode(node);
      setGrid([...grid]);
    }
  };

  const handleMouseEnter = (event) => {
    if (!isMousePressed) return;

    if (currentAction === "wall") {
      node.isWall = true;
      setGrid([...grid]);
    }
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const extraClassName = isStart
    ? "bg-green-500"
    : isEnd
    ? "bg-red-500"
    : isWall
    ? "bg-black"
    : "bg-white";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`w-6 h-6 border border-gray-200 grid-node ${extraClassName}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()} // Kontextmenü verhindern
    ></div>
  );
};

export default Node;
