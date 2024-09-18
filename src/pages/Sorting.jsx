// src/pages/Sorting.jsx

import React, { useState, useEffect } from "react";
import AlgorithmPageLayout from "../layouts/AlgorithmPageLayout";
import QuickSort from "../algorithms/sorting/quicksort/QuickSort";
import MergeSort from "../algorithms/sorting/mergesort/MergeSort";
import BubbleSort from "../algorithms/sorting/bubblesort/BubbleSort";

import SelectionSort from "../algorithms/sorting/selectionsort/SelectionSort";
import InsertionSort from "../algorithms/sorting/insertionsort/InsertionSort";
import HeapSort from "../algorithms/sorting/heapsort/HeapSort";
import ShellSort from "../algorithms/sorting/shellsort/ShellSort";
import RandomSort from "../algorithms/sorting/bogosort/RandomSort";

import { useSortableArray } from "../hooks/useSortableArray";

const algorithmOptions = [
  { value: "quicksort", label: "Quick Sort" },
  { value: "mergesort", label: "Merge Sort" },
  { value: "bubblesort", label: "Bubble Sort" },
  { value: "selectionsort", label: "Selection Sort" },
  { value: "insertionsort", label: "Insertion Sort" },
  { value: "heapsort", label: "Heap Sort" },
  { value: "shellsort", label: "Shell Sort" },
  { value: "randomsort", label: "Random Sort" },
];

const algorithmDescriptions = {
  quicksort:
    "QuickSort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot.",
  mergesort:
    "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges the sorted halves.",
  bubblesort:
    "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
  selectionsort:
    "Selection Sort selects the smallest element from an unsorted list in each iteration and places that element at the beginning of the unsorted list.",
  insertionsort:
    "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms.",
  heapsort:
    "Heap Sort is a comparison-based sorting technique based on Binary Heap data structure.",
  shellsort:
    "Shell Sort is a generalization of insertion sort that allows the exchange of items that are far apart.",
  randomsort:
    "Random Sort (Bogosort) repeatedly shuffles the array until it is sorted. Highly inefficient but fun!",
};

const Sorting = () => {
  const [algorithm, setAlgorithm] = useState("quicksort");
  const [seed, setSeed] = useState("");
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const { generateArray } = useSortableArray();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resetArray = () => {
    const newArray = generateArray(Math.random().toString());
    setArray(newArray);
    setOriginalArray(newArray.slice());
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== windowWidth) {
        setWindowWidth(newWidth);
        resetArray();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    resetArray();
    handleAlgorithmChange({ target: { value: "mergesort" } });
  }, []);

  const handleSeedChange = (e) => {
    setSeed(e.target.value);
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
    resetArray();
  };

  const controls = (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label className="font-medium mb-2 sm:mb-0 sm:mr-2">Random Seed:</label>
        <input
          type="text"
          value={seed}
          onChange={handleSeedChange}
          className="px-4 py-2 border rounded w-full sm:w-auto"
          placeholder="Enter seed"
        />
      </div>
      <button
        onClick={() => resetArray()}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded w-full sm:w-auto"
      >
        Generate New Array
      </button>
    </div>
  );

  const description = algorithmDescriptions[algorithm];

  const algorithmProps = {
    array,
    setArray,
    originalArray,
  };

  return (
    <AlgorithmPageLayout
      title="Sorting Algorithms"
      algorithmOptions={algorithmOptions}
      selectedAlgorithm={algorithm}
      onAlgorithmChange={handleAlgorithmChange}
      controls={controls}
    >
      <div className="mb-4">
        <p>{description}</p>
      </div>
      <div className="flex justify-center">
        {algorithm === "quicksort" && <QuickSort {...algorithmProps} />}
        {algorithm === "mergesort" && <MergeSort {...algorithmProps} />}
        {algorithm === "bubblesort" && <BubbleSort {...algorithmProps} />}
        {algorithm === "selectionsort" && <SelectionSort {...algorithmProps} />}
        {algorithm === "insertionsort" && <InsertionSort {...algorithmProps} />}
        {algorithm === "heapsort" && <HeapSort {...algorithmProps} />}
        {algorithm === "shellsort" && <ShellSort {...algorithmProps} />}
        {algorithm === "randomsort" && <RandomSort {...algorithmProps} />}
      </div>
    </AlgorithmPageLayout>
  );
};

export default Sorting;
