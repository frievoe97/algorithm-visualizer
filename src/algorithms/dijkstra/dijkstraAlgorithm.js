export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // Überspringe Wände
    if (closestNode.isWall) continue;

    // Wenn die Distanz unendlich ist, gibt es keinen erreichbaren Pfad
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
      return visitedNodesInOrder;
    }

    updateUnvisitedNeighbors(closestNode, grid);
  }

  return visitedNodesInOrder;
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const { row: nRow, col: nCol } = neighbor;
    const { row, col } = node;

    // Berechne die Bewegungsdistanz
    const rowDiff = Math.abs(nRow - row);
    const colDiff = Math.abs(nCol - col);

    let distance = 0;
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      // Orthogonale Bewegung
      distance = 1;
    } else if (rowDiff === 1 && colDiff === 1) {
      // Diagonale Bewegung
      distance = Math.SQRT2;
    }

    const tentativeDistance = node.distance + distance;
    if (tentativeDistance < neighbor.distance) {
      neighbor.distance = tentativeDistance;
      neighbor.previousNode = node;
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
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

  return neighbors.filter((neighbor) => !neighbor.isVisited);
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
