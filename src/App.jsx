import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Exposure from "./pages/Exposure";
import HealthInsights from "./pages/HealthInsights";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <Router>
      <div className="bg-gray-950 min-h-screen pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exposure" element={<Exposure />} />
          <Route path="/health" element={<HealthInsights />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;