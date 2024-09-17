// src/algorithms/sorting/bubblesort/BubbleSortVisualizer.jsx

import React, { useState, useEffect, useRef } from "react";
import { bubbleSort } from "./bubbleSortAlgorithm";
import { useSortableArray } from "../../../hooks/useSortableArray";

const BubbleSortVisualizer = ({ array, setArray, originalArray }) => {
  const [timeElapsed, setTimeElapsed] = useState(null);
  const { barWidth, barMargin } = useSortableArray();
  const animationTimeoutsRef = useRef([]);

  const handleBubbleSort = () => {
    const animations = bubbleSort(array.slice());
    const startTime = performance.now();
    animateBubbleSort(animations, startTime);
  };

  const animateBubbleSort = (animations, startTime) => {
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

  // Animationen stoppen und Array zurücksetzen, wenn die Komponente unmontiert wird
  useEffect(() => {
    return () => {
      animationTimeoutsRef.current.forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
      animationTimeoutsRef.current = [];
      setTimeElapsed(null);
      // Array auf den ursprünglichen Zustand zurücksetzen
      setArray(originalArray.slice());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalArray]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-4">
        {/* "Neues Array generieren" Button wurde zum übergeordneten `controls` verschoben */}
        <button
          onClick={handleBubbleSort}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Start Bubble Sort
        </button>
      </div>
      {/* Stoppuhr anzeigen */}
      {timeElapsed && (
        <div className="mb-4">
          <span className="font-medium">Zeit: </span>
          {timeElapsed} ms
        </div>
      )}
      {/* Balken-Visualisierung */}
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

export default BubbleSortVisualizer;
