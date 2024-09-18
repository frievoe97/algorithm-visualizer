// src/algorithms/sorting/InsertionSort.jsx

import React, { useState, useEffect, useRef } from "react";
import { useSortableArray } from "../../../hooks/useSortableArray";

const InsertionSort = ({ array, setArray, originalArray }) => {
  const [timeElapsed, setTimeElapsed] = useState(null);
  const { barWidth, barMargin } = useSortableArray();
  const animationTimeoutsRef = useRef([]);

  const handleInsertionSort = () => {
    // Clear existing animations
    animationTimeoutsRef.current.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    animationTimeoutsRef.current = [];

    // Reset array to original unsorted state

    setArray(shuffleArray(originalArray.slice()));

    setTimeElapsed(null);

    const animations = insertionSort(array.slice());
    animateInsertionSort(animations);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Wähle einen zufälligen Index zwischen 0 und i
      const j = Math.floor(Math.random() * (i + 1));
      // Tausche Elemente an Position i und j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const animateInsertionSort = (animations) => {
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

  // Insertion Sort Algorithm
  const insertionSort = (array) => {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      animations.push({
        type: "overwrite",
        indices: [i],
        height: key,
      });
      while (j >= 0 && array[j] > key) {
        animations.push({
          type: "overwrite",
          indices: [j + 1],
          height: array[j],
        });
        array[j + 1] = array[j];
        j = j - 1;
      }
      animations.push({
        type: "overwrite",
        indices: [j + 1],
        height: key,
      });
      array[j + 1] = key;
    }
    return animations;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        <button
          onClick={handleInsertionSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Insertion Sort
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

export default InsertionSort;
