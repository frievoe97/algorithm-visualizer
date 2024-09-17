// src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa"; // Importiere das GitHub-Logo aus react-icons

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Funktion zum Umschalten des mobilen Menüs
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header id="header" className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Algorithmus Visualizer
          </Link>
          {/* Desktop Menü */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/pathfinding"
              className="text-gray-600 hover:text-gray-800 transition duration-200"
            >
              Pathfinding
            </Link>
            <Link
              to="/sorting"
              className="text-gray-600 hover:text-gray-800 transition duration-200"
            >
              Sorting
            </Link>
          </nav>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Mobile Menü */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-md mt-2">
            <ul className="flex flex-col space-y-2 px-4 pb-4">
              <li>
                <Link
                  to="/pathfinding"
                  onClick={toggleMobileMenu}
                  className="text-gray-600 hover:text-gray-800 transition duration-200"
                >
                  Pathfinding
                </Link>
              </li>
              <li>
                <Link
                  to="/sorting"
                  onClick={toggleMobileMenu}
                  className="text-gray-600 hover:text-gray-800 transition duration-200"
                >
                  Sorting
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hauptinhalt */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-white shadow-inner">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-600 text-sm">
          <p className="text-center">
            © {new Date().getFullYear()} Algorithmus Visualizer by{" "}
            <a
              href="https://friedrichvoelkers.de"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black" }}
            >
              Friedrich Völkers
            </a>
          </p>
          <a
            href="https://github.com/frievoe97"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1"
            style={{ color: "black" }}
          >
            <FaGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
