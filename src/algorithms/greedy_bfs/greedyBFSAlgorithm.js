// src/algorithms/greedy_bfs/greedyBFSAlgorithm.js

export function greedyBFS(grid, startNode, endNode) {
  const openSet = [];
  const closedSet = new Set();
  resetNodes(grid);
  startNode.h = heuristic(startNode, endNode);
  openSet.push(startNode);

  const visitedNodesInOrder = [];

  while (openSet.length > 0) {
    // Sortiere openSet nach niedrigstem h-Wert
    openSet.sort((a, b) => a.h - b.h);
    const currentNode = openSet.shift();
    closedSet.add(`${currentNode.row}-${currentNode.col}`);
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      return visitedNodesInOrder;
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (closedSet.has(neighborKey) || neighbor.isWall) continue;

      neighbor.previousNode = currentNode;
      neighbor.h = heuristic(neighbor, endNode);
      openSet.push(neighbor);
      closedSet.add(neighborKey);
    }
  }

  // Kein Pfad gefunden
  return visitedNodesInOrder;
}

function heuristic(nodeA, nodeB) {
  const dx = Math.abs(nodeA.col - nodeB.col);
  const dy = Math.abs(nodeA.row - nodeB.row);
  const F = Math.SQRT2 - 1;
  return dx < dy ? F * dx + dy : F * dy + dx;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Orthogonale Nachbarn
  if (row > 0) neighbors.push(grid[row - 1][col]); // oben
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]); // unten
  if (col > 0) neighbors.push(grid[row][col - 1]); // links
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]); // rechts

  // Diagonale Nachbarn
  if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]); // oben links
  if (row > 0 && col < numCols - 1) neighbors.push(grid[row - 1][col + 1]); // oben rechts
  if (row < numRows - 1 && col > 0) neighbors.push(grid[row + 1][col - 1]); // unten links
  if (row < numRows - 1 && col < numCols - 1)
    neighbors.push(grid[row + 1][col + 1]); // unten rechts

  return neighbors;
}

function resetNodes(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.previousNode = null;
      node.h = Infinity;
    }
  }
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
