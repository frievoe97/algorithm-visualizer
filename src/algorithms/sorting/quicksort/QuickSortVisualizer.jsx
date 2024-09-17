// src/algorithms/sorting/quicksort/QuickSortVisualizer.jsx

import React, { useState, useEffect, useRef } from "react";
import { quickSort } from "./quickSortAlgorithm";
import { useSortableArray } from "../../../hooks/useSortableArray";

const QuickSortVisualizer = ({ array, setArray, originalArray }) => {
  const [timeElapsed, setTimeElapsed] = useState(null);
  const { barWidth, barMargin } = useSortableArray();
  const animationsRef = useRef([]);
  const animationTimeoutsRef = useRef([]);

  const handleQuickSort = () => {
    const animations = quickSort(array.slice());
    animationsRef.current = animations;
    const startTime = performance.now();
    animateQuickSort(animations, startTime);
  };

  const animateQuickSort = (animations, startTime) => {
    for (let i = 0; i <= animations.length; i++) {
      const timeoutId = setTimeout(() => {
        if (i === animations.length) {
          const endTime = performance.now();
          setTimeElapsed((endTime - startTime).toFixed(2));
        } else {
          const arrayBars = document.getElementsByClassName("array-bar");
          const { type, indices } = animations[i];
          if (type === "compare") {
            const [barOneIdx, barTwoIdx] = indices;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.backgroundColor = "red";
            barTwoStyle.backgroundColor = "red";

            setTimeout(() => {
              barOneStyle.backgroundColor = "turquoise";
              barTwoStyle.backgroundColor = "turquoise";
            }, 10);
          } else if (type === "swap") {
            const [barOneIdx, barTwoIdx] = indices;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
          }
        }
      }, i * 10);
      animationTimeoutsRef.current.push(timeoutId);
    }
  };

  // Clear timeouts when component unmounts or array changes
  useEffect(() => {
    return () => {
      animationTimeoutsRef.current.forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
      animationTimeoutsRef.current = [];
      setTimeElapsed(null);
      // Reset array to original
      setArray(originalArray.slice());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalArray]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        {/* Generate New Array button is moved to the controls in Sorting component */}
        <button
          onClick={handleQuickSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Quick Sort
        </button>
      </div>
      {/* Stopwatch display */}
      {timeElapsed && (
        <div className="mb-4">
          <span className="font-medium">Time: </span>
          {timeElapsed} ms
        </div>
      )}
      {/* Bar visualization */}
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

export default QuickSortVisualizer;
