// src/pages/Sorting.jsx
import React, { useState, useEffect } from "react";
import AlgorithmPageLayout from "../layouts/AlgorithmPageLayout";
import QuickSortVisualizer from "../algorithms/sorting/quicksort/QuickSortVisualizer";
import MergeSortVisualizer from "../algorithms/sorting/mergesort/MergeSortVisualizer";
import BubbleSortVisualizer from "../algorithms/sorting/bubblesort/BubbleSortVisualizer";
import { useSortableArray } from "../hooks/useSortableArray";

const algorithmOptions = [
  { value: "quicksort", label: "Quick Sort" },
  { value: "mergesort", label: "Merge Sort" },
  { value: "bubblesort", label: "Bubble Sort" },
  // Weitere Algorithmen
];

const algorithmDescriptions = {
  quicksort:
    "QuickSort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot.",
  mergesort:
    "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges the sorted halves.",
  bubblesort:
    "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
  // Weitere Beschreibungen
};

const Sorting = () => {
  const [algorithm, setAlgorithm] = useState("quicksort");
  const [seed, setSeed] = useState(""); // Seed kann leer oder ein Wert sein
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const { generateArray } = useSortableArray();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Funktion zum Generieren und Setzen des Arrays
  // const resetArray = (useSeed = true) => {
  //   console.log("Resetting array...");
  //   console.log("Seed:", seed);
  //   const newArray = generateArray(useSeed ? seed : Math.random()); // Falls Seed leer, wird ein zufälliges Array generiert
  //   setArray(newArray);
  //   setOriginalArray(newArray.slice());
  // };

  const resetArray = () => {
    console.log("Resetting array without seed...");
    const newArray = generateArray(Math.random().toString()); // Zufälliges Array ohne Seed
    setArray(newArray);
    setOriginalArray(newArray.slice());
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== windowWidth) {
        setWindowWidth(newWidth); // Aktualisiere die Breite
        resetArray(true); // Array neu erstellen, wenn sich die Breite ändert
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Event-Listener bereinigen
    };
  }, [windowWidth]); // Abhängigkeit von windowWidth

  useEffect(() => {
    resetArray(true); // Initial zufälliges Array ohne Seed
    handleAlgorithmChange({ target: { value: "mergesort" } }); // Algorithmuswechsel auslösen
  }, []);

  // Seed ändern und sofort das Array generieren
  const handleSeedChange = (e) => {
    setSeed(e.target.value);
  };

  // Array neu generieren, wenn der Algorithmus geändert wird
  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
    resetArray(true);
  };

  // Seed-Eingabefeld für das Layout
  // Updated controls element for better mobile display

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

  // Beschreibung für den ausgewählten Algorithmus erhalten
  const description = algorithmDescriptions[algorithm];

  return (
    <AlgorithmPageLayout
      title="Sorting Algorithms"
      algorithmOptions={algorithmOptions}
      selectedAlgorithm={algorithm}
      onAlgorithmChange={handleAlgorithmChange}
      controls={controls}
    >
      {/* Algorithmusbeschreibung */}
      <div className="mb-4">
        <p>{description}</p>
      </div>
      {/* Algorithmus-spezifische Visualisierungen */}
      <div className="flex justify-center">
        {algorithm === "quicksort" && (
          <QuickSortVisualizer
            array={array}
            setArray={setArray}
            originalArray={originalArray}
          />
        )}
        {algorithm === "mergesort" && (
          <MergeSortVisualizer
            array={array}
            setArray={setArray}
            originalArray={originalArray}
          />
        )}
        {algorithm === "bubblesort" && (
          <BubbleSortVisualizer
            array={array}
            setArray={setArray}
            originalArray={originalArray}
          />
        )}
      </div>
    </AlgorithmPageLayout>
  );
};

export default Sorting;
