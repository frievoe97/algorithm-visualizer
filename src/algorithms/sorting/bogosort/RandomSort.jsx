// src/algorithms/sorting/RandomSort.jsx

import React, { useState, useEffect, useRef } from "react";
import { useSortableArray } from "../../../hooks/useSortableArray";

const RandomSort = ({ array, setArray, originalArray }) => {
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const { barWidth, barMargin } = useSortableArray();
  const intervalRef = useRef(null);

  const handleRandomSort = () => {
    // Clear existing interval
    clearInterval(intervalRef.current);

    // Reset array to original unsorted state
    setArray(originalArray.slice());

    setTimeElapsed(null);
    setIsSorted(false);

    const startTime = performance.now();
    animateRandomSort(startTime);
  };

  const animateRandomSort = (startTime) => {
    intervalRef.current = setInterval(() => {
      const shuffledArray = array.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      setArray(shuffledArray);

      if (isArraySorted(shuffledArray)) {
        clearInterval(intervalRef.current);
        const endTime = performance.now();
        setTimeElapsed((endTime - startTime).toFixed(2));
        setIsSorted(true);
      }
    }, 100); // Adjust the interval as needed
  };

  const isArraySorted = (array) => {
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      setTimeElapsed(null);
      setArray(originalArray.slice());
    };
  }, [originalArray, setArray]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        <button
          onClick={handleRandomSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Random Sort
        </button>
      </div>
      {timeElapsed && isSorted && (
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
              backgroundColor: isSorted ? "green" : "turquoise",
              margin: `0 ${barMargin / 2}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RandomSort;
