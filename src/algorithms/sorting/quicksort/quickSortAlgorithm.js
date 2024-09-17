// src/algorithms/sorting/quicksort/quickSortAlgorithm.js

export function quickSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function quickSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(
      mainArray,
      startIdx,
      endIdx,
      auxiliaryArray,
      animations
    );
    quickSortHelper(
      mainArray,
      startIdx,
      pivotIdx - 1,
      auxiliaryArray,
      animations
    );
    quickSortHelper(
      mainArray,
      pivotIdx + 1,
      endIdx,
      auxiliaryArray,
      animations
    );
  }
}

function partition(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  const pivotValue = mainArray[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    // Animation zum Vergleichen
    animations.push({ type: "compare", indices: [i, endIdx] });
    if (mainArray[i] < pivotValue) {
      // Animation zum Tauschen
      animations.push({ type: "swap", indices: [i, pivotIdx] });
      swap(mainArray, i, pivotIdx);
      pivotIdx++;
    }
  }
  // Letzter Tausch
  animations.push({ type: "swap", indices: [pivotIdx, endIdx] });
  swap(mainArray, pivotIdx, endIdx);
  return pivotIdx;
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
