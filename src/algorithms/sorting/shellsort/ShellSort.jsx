// src/algorithms/sorting/ShellSort.jsx

import React, { useState, useEffect, useRef } from "react";
import { useSortableArray } from "../../../hooks/useSortableArray";

const ShellSort = ({ array, setArray, originalArray }) => {
  const [timeElapsed, setTimeElapsed] = useState(null);
  const { barWidth, barMargin } = useSortableArray();
  const animationTimeoutsRef = useRef([]);

  const handleShellSort = () => {
    // Clear existing animations
    animationTimeoutsRef.current.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    animationTimeoutsRef.current = [];

    // Reset array to original unsorted state
    setArray(originalArray.slice());

    setTimeElapsed(null);

    const animations = shellSort(array.slice());
    animateShellSort(animations);
  };

  const animateShellSort = (animations) => {
    const startTime = performance.now();
    let totalDuration = 0;
    const ANIMATION_SPEED_MS = 10; // Standardized speed

    animations.forEach((animation, i) => {
      const timeoutId = setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");
        const { type, indices, height } = animation;
        if (type === "overwrite") {
          const [barIdx] = indices;
          arrayBars[barIdx].style.height = `${height}px`;
          arrayBars[barIdx].style.backgroundColor = "red";
          setTimeout(() => {
            arrayBars[barIdx].style.backgroundColor = "turquoise";
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

  // Shell Sort Algorithm
  const shellSort = (array) => {
    const animations = [];
    let n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = array[i];
        let j;
        animations.push({
          type: "overwrite",
          indices: [i],
          height: temp,
        });
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          animations.push({
            type: "overwrite",
            indices: [j],
            height: array[j - gap],
          });
          array[j] = array[j - gap];
        }
        animations.push({ type: "overwrite", indices: [j], height: temp });
        array[j] = temp;
      }
    }
    return animations;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        <button
          onClick={handleShellSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Shell Sort
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

export default ShellSort;
