import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Pathfinding from "./pages/Pathfinding";
import Sorting from "./pages/Sorting";
import { GridProvider } from "./contexts/GridContext";
import routes from "./routes"; // Importiere die Route-Liste

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {routes.map(({ path }) => (
            <Route
              key={path}
              path={path}
              element={
                path === "/pathfinding" ? (
                  <GridProvider>
                    <Pathfinding />
                  </GridProvider>
                ) : path === "/sorting" ? (
                  <Sorting />
                ) : (
                  <Home />
                )
              }
            />
          ))}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
