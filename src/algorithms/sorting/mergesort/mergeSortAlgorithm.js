// src/algorithms/sorting/mergesort/mergeSortAlgorithm.js

export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // Animation zum Vergleichen
    animations.push({ type: "compare", indices: [i, j] });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Animation zum Überschreiben
      animations.push({
        type: "overwrite",
        index: k,
        newHeight: auxiliaryArray[i],
      });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Animation zum Überschreiben
      animations.push({
        type: "overwrite",
        index: k,
        newHeight: auxiliaryArray[j],
      });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // Animation zum Vergleichen
    animations.push({ type: "compare", indices: [i, i] });
    // Animation zum Überschreiben
    animations.push({
      type: "overwrite",
      index: k,
      newHeight: auxiliaryArray[i],
    });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // Animation zum Vergleichen
    animations.push({ type: "compare", indices: [j, j] });
    // Animation zum Überschreiben
    animations.push({
      type: "overwrite",
      index: k,
      newHeight: auxiliaryArray[j],
    });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
