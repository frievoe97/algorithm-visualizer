// src/algorithms/a_star/aStarAlgorithm.js

export function aStar(grid, startNode, endNode) {
  const openSet = [];
  const closedSet = new Set();
  resetNodes(grid);
  startNode.g = 0;
  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.g + startNode.h;
  openSet.push(startNode);

  const visitedNodesInOrder = [];

  while (openSet.length > 0) {
    // Sortiere openSet nach niedrigstem f-Wert
    openSet.sort((a, b) => a.f - b.f);
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

      const tentativeGScore =
        currentNode.g + getDistance(currentNode, neighbor);

      const openNeighbor = openSet.find(
        (node) => node.row === neighbor.row && node.col === neighbor.col
      );

      if (!openNeighbor) {
        neighbor.previousNode = currentNode;
        neighbor.g = tentativeGScore;
        neighbor.h = heuristic(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;
        openSet.push(neighbor);
      } else if (tentativeGScore < neighbor.g) {
        neighbor.previousNode = currentNode;
        neighbor.g = tentativeGScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  // Kein Pfad gefunden
  return visitedNodesInOrder;
}

function resetNodes(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.g = Infinity;
      node.h = Infinity;
      node.f = Infinity;
      node.isVisited = false;
      node.previousNode = null;
    }
  }
}

function heuristic(nodeA, nodeB) {
  const dx = Math.abs(nodeA.col - nodeB.col);
  const dy = Math.abs(nodeA.row - nodeB.row);
  // Octile-Distanz
  return dx + dy + (Math.SQRT2 - 2) * Math.min(dx, dy);
}

function getDistance(nodeA, nodeB) {
  const dx = Math.abs(nodeA.col - nodeB.col);
  const dy = Math.abs(nodeA.row - nodeB.row);

  if (dx === 1 && dy === 1) {
    // Diagonale Bewegung
    return Math.SQRT2;
  } else if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
    // Orthogonale Bewegung
    return 1;
  } else {
    // Sollte nicht vorkommen
    return Infinity;
  }
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

export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
