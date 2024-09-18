// src/algorithms/sorting/QuickSort.jsx

import React, { useState, useEffect, useRef } from "react";
import { useSortableArray } from "../../../hooks/useSortableArray";

const QuickSort = ({ array, setArray, originalArray }) => {
  const [timeElapsed, setTimeElapsed] = useState(null);
  const { barWidth, barMargin } = useSortableArray();
  const animationTimeoutsRef = useRef([]);

  // Function to shuffle the array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Choose a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at positions i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleQuickSort = () => {
    // Clear existing animations
    animationTimeoutsRef.current.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    animationTimeoutsRef.current = [];

    // Reset array to a shuffled version of the original array
    const shuffledArray = shuffleArray(originalArray.slice());
    setArray(shuffledArray);

    setTimeElapsed(null);

    // Use the shuffled array to generate animations
    const animations = quickSort(shuffledArray.slice());
    animateQuickSort(animations);
  };

  const animateQuickSort = (animations) => {
    const startTime = performance.now();
    let totalDuration = 0;
    const ANIMATION_SPEED_MS = 10;

    animations.forEach((animation) => {
      const timeoutId = setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");
        const { type, indices } = animation;

        if (type === "compare") {
          const [barOneIdx, barTwoIdx] = indices;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";

          setTimeout(() => {
            barOneStyle.backgroundColor = "turquoise";
            barTwoStyle.backgroundColor = "turquoise";
          }, ANIMATION_SPEED_MS);
        } else if (type === "swap") {
          const [barOneIdx, barTwoIdx] = indices;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }
      }, totalDuration);
      animationTimeoutsRef.current.push(timeoutId);
      totalDuration += ANIMATION_SPEED_MS;
    });

    // Set a timeout for when the animations are complete
    const completionTimeoutId = setTimeout(() => {
      const endTime = performance.now();
      setTimeElapsed((endTime - startTime).toFixed(2));
    }, totalDuration);
    animationTimeoutsRef.current.push(completionTimeoutId);
  };

  useEffect(() => {
    return () => {
      // Clear timeouts on unmount
      animationTimeoutsRef.current.forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
      animationTimeoutsRef.current = [];
      setTimeElapsed(null);
      setArray(originalArray.slice());
    };
  }, [originalArray, setArray]);

  // Quick Sort Algorithm
  const quickSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  };

  const quickSortHelper = (array, startIdx, endIdx, animations) => {
    if (startIdx < endIdx) {
      const pivotIdx = partition(array, startIdx, endIdx, animations);
      quickSortHelper(array, startIdx, pivotIdx - 1, animations);
      quickSortHelper(array, pivotIdx + 1, endIdx, animations);
    }
  };

  const partition = (array, startIdx, endIdx, animations) => {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
      animations.push({ type: "compare", indices: [i, endIdx] });
      if (array[i] < pivotValue) {
        animations.push({ type: "swap", indices: [i, pivotIdx] });
        [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
        pivotIdx++;
      }
    }
    animations.push({ type: "swap", indices: [pivotIdx, endIdx] });
    [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
    return pivotIdx;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        <button
          onClick={handleQuickSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Quick Sort
        </button>
      </div>
      {timeElapsed && (
        <div className="mb-4">
          <span className="font-medium">Time: </span>
          {timeElapsed} ms
        </div>
      )}
      <div className="flex items-end w-full" style={{ minHeight: "320px" }}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              width: `${barWidth}px`,
              backgroundColor: "turquoise",
              margin: `0 ${barMargin / 2}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default QuickSort;
