// src/algorithms/sorting/HeapSort.jsx

import React, { useState, useEffect, useRef } from "react";
import { useSortableArray } from "../../../hooks/useSortableArray";

const HeapSort = ({ array, setArray, originalArray }) => {
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

  const handleHeapSort = () => {
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
    const animations = heapSort(shuffledArray.slice());
    animateHeapSort(animations);
  };

  const animateHeapSort = (animations) => {
    const startTime = performance.now();
    let totalDuration = 0;
    const ANIMATION_SPEED_MS = 10; // Standardized speed

    animations.forEach((animation) => {
      const timeoutId = setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");
        const { type, indices } = animation;
        if (type === "swap") {
          const [barOneIdx, barTwoIdx] = indices;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";
          setTimeout(() => {
            barOneStyle.backgroundColor = "turquoise";
            barTwoStyle.backgroundColor = "turquoise";
          }, ANIMATION_SPEED_MS);
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

  // Heap Sort Algorithm
  const heapSort = (array) => {
    const animations = [];
    let n = array.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }

    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
      animations.push({ type: "swap", indices: [0, i] });
      [array[0], array[i]] = [array[i], array[0]];
      heapify(array, i, 0, animations);
    }

    return animations;
  };

  const heapify = (array, n, i, animations) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && array[l] > array[largest]) largest = l;

    if (r < n && array[r] > array[largest]) largest = r;

    if (largest !== i) {
      animations.push({ type: "swap", indices: [i, largest] });
      [array[i], array[largest]] = [array[largest], array[i]];
      heapify(array, n, largest, animations);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        <button
          onClick={handleHeapSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Heap Sort
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

export default HeapSort;
