// src/algorithms/sorting/MergeSort.jsx

import React, { useState, useEffect, useRef } from "react";
import { useSortableArray } from "../../../hooks/useSortableArray";

const MergeSort = ({ array, setArray, originalArray }) => {
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

  const handleMergeSort = () => {
    // Clear existing animations
    animationTimeoutsRef.current.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
    animationTimeoutsRef.current = [];

    // Reset array to a shuffled version of the original array
    setArray(shuffleArray(originalArray.slice()));

    setTimeElapsed(null);

    const animations = mergeSort(array.slice());
    animateMergeSort(animations);
  };

  const animateMergeSort = (animations) => {
    const startTime = performance.now();
    let totalDuration = 0;
    const ANIMATION_SPEED_MS = 10;

    animations.forEach((animation, i) => {
      const timeoutId = setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");
        const { type } = animation;

        if (type === "compare") {
          const [barOneIdx, barTwoIdx] = animation.indices;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";

          setTimeout(() => {
            barOneStyle.backgroundColor = "turquoise";
            barTwoStyle.backgroundColor = "turquoise";
          }, ANIMATION_SPEED_MS);
        } else if (type === "overwrite") {
          const { index, newHeight } = animation;
          const barStyle = arrayBars[index].style;
          barStyle.height = `${newHeight}px`;
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

  // Merge Sort Algorithm
  const mergeSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  };

  const mergeSortHelper = (
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
  ) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(
      auxiliaryArray,
      middleIdx + 1,
      endIdx,
      mainArray,
      animations
    );
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  };

  const doMerge = (
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
  ) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push({ type: "compare", indices: [i, j] });
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push({
          type: "overwrite",
          index: k,
          newHeight: auxiliaryArray[i],
        });
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push({
          type: "overwrite",
          index: k,
          newHeight: auxiliaryArray[j],
        });
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push({ type: "compare", indices: [i, i] });
      animations.push({
        type: "overwrite",
        index: k,
        newHeight: auxiliaryArray[i],
      });
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push({ type: "compare", indices: [j, j] });
      animations.push({
        type: "overwrite",
        index: k,
        newHeight: auxiliaryArray[j],
      });
      mainArray[k++] = auxiliaryArray[j++];
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        <button
          onClick={handleMergeSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Merge Sort
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

export default MergeSort;
