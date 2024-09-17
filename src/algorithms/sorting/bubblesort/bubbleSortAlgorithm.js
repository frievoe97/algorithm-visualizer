// src/algorithms/sorting/bubblesort/bubbleSortAlgorithm.js

export function bubbleSort(array) {
  const animations = [];
  const n = array.length;
  const arr = array.slice();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Animation zum Vergleichen
      animations.push({ type: "compare", indices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        // Animation zum Tauschen
        animations.push({ type: "swap", indices: [j, j + 1] });
        swap(arr, j, j + 1);
      }
    }
  }
  return animations;
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
