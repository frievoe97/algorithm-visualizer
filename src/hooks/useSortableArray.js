// src/hooks/useSortableArray.js
export function useSortableArray(barWidth = 8, barMargin = 2) {
  const generateArray = (seed) => {
    const arraySize = parseInt(window.innerWidth / 10); // Feste Array-Größe

    const newArray = [];
    let randomFunc;
    if (seed) {
      const numericSeed = hashStringToNumber(seed);
      console.log("Seed:", numericSeed);
      randomFunc = seedRandom(numericSeed);
      console.log("Random function:", randomFunc);
    } else {
      randomFunc = Math.random;
    }

    for (let i = 0; i < arraySize; i++) {
      newArray.push(getRandomInt(5, 300, randomFunc));
    }
    console.log("Array:", newArray[0]);
    console.log("Array:", newArray[1]);
    return newArray;
  };

  // Seed-fähiger Zufallszahlengenerator
  function seedRandom(seed) {
    let _seed = seed % 2147483647;
    if (_seed <= 0) _seed += 2147483646;

    return function () {
      _seed = (_seed * 16807) % 2147483647;
      return (_seed - 1) / 2147483646;
    };
  }

  // Funktion, um einen String in eine Zahl zu hashen
  function hashStringToNumber(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // In 32-Bit-Ganzzahl konvertieren
    }
    return Math.abs(hash);
  }

  const getRandomInt = (min, max, randomFunc) => {
    return Math.floor(randomFunc() * (max - min + 1) + min);
  };

  return {
    generateArray,
    barWidth,
    barMargin,
  };
}
