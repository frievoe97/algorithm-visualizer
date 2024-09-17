// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Pathfinding from "./pages/Pathfinding";
import Sorting from "./pages/Sorting";
import { GridProvider } from "./contexts/GridContext"; // Importieren Sie GridProvider

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pathfinding"
            element={
              <GridProvider>
                <Pathfinding />
              </GridProvider>
            }
          />
          <Route path="/sorting" element={<Sorting />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
