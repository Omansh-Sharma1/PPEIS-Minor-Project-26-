import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gray-900/70 backdrop-blur-md border-b border-gray-700 shadow-lg px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          PPEIS Prototype
        </h1>

        <div className="space-x-6 text-gray-300 text-lg">
          <Link
            to="/"
            className="hover:text-cyan-400 transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            to="/exposure"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Exposure
          </Link>

          <Link
            to="/health"
            className="hover:text-cyan-400 transition-colors duration-300"
          >
            Health
          </Link>

          <Link
            to="/alerts"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Alerts
          </Link>
        </div>
      </div>
    </nav>
  );
}