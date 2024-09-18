// src/algorithms/sorting/BubbleSort.jsx

import React, { useState, useEffect, useRef } from "react";
import { useSortableArray } from "../../../hooks/useSortableArray";

const BubbleSort = ({ array, setArray, originalArray }) => {
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

  const handleBubbleSort = () => {
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
    const animations = bubbleSort(shuffledArray.slice());
    animateBubbleSort(animations);
  };

  const animateBubbleSort = (animations) => {
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

  // Clean up timeouts and reset array on unmount
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

  // Bubble Sort Algorithm
  const bubbleSort = (array) => {
    const animations = [];
    const n = array.length;
    const arr = array.slice();
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push({ type: "compare", indices: [j, j + 1] });
        if (arr[j] > arr[j + 1]) {
          animations.push({ type: "swap", indices: [j, j + 1] });
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return animations;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        <button
          onClick={handleBubbleSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Bubble Sort
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

export default BubbleSort;
