import React, { useState, useEffect } from "react";
import { useEnvironmentalData } from "../hooks/useEnvironmentalData";
import { calculateExposure, calculateExposureML } from "../processors/exposureProcessor";
import { getRiskLevel } from "../processors/riskProcessor";
import { addExposureEntry, getExposureHistory } from "../store/exposureStore";
import { getRecommendations } from "../processors/recommendationProcessor";
import { getExposureTrend } from "../processors/trendProcessor";
import { getPredictionConfidence } from "../processors/confidenceProcessor";

export default function Exposure() {
  const [city, setCity] = useState("Delhi");
  const [input, setInput] = useState("Delhi");
  const [outdoor, setOutdoor] = useState(2);
  const [indoor, setIndoor] = useState(6);
  const [activity, setActivity] = useState("rest");

  const { data, loading, error } = useEnvironmentalData(city);

  const handleSearch = () => {
    if (input.trim()) setCity(input.trim());
  };

  // 🔹 ML + Formula Calculations
  const exposureML = data?.pm25
    ? calculateExposureML(data.pm25, outdoor, indoor, activity)
    : null;

  const exposureFormula = data?.pm25
    ? calculateExposure(data.pm25, outdoor, indoor, activity)
    : null;

  const risk = exposureML !== null ? getRiskLevel(exposureML) : null;

  const recommendations = data?.pm25
    ? getRecommendations(data.pm25, outdoor, activity)
    : [];

  // 🔹 Prediction Confidence Calculation
  const confidence =
    exposureML && exposureFormula
      ? getPredictionConfidence(exposureML, exposureFormula)
      : null;

  // 🔹 Dynamic Insight Logic
  const insight =
    data?.pm25 && exposureML !== null && risk
      ? `Exposure is ${risk.toLowerCase()} due to ${
          data.pm25 > 60 ? "high pollution" : "moderate pollution"
        } and ${
          outdoor > 4 ? "long outdoor duration" : "controlled exposure"
        }.`
      : null;

  // 🔹 Trend Analysis
  const history = getExposureHistory();
  const trend = getExposureTrend(history);

  // 🔹 Store history
  useEffect(() => {
    if (data && exposureML && risk) {
      addExposureEntry({
        exposure: exposureML,
        risk,
        pm25: data.pm25,
      });
    }
  }, [data, exposureML, risk]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-white space-y-8">
      
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Exposure Analysis
      </h1>

      {/* 🔹 City Input */}
      <div className="flex gap-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter city..."
        />
        <button
          onClick={handleSearch}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {/* 🔹 User Inputs */}
      <div className="bg-gray-800 p-6 rounded-xl space-y-6">

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Outdoor Time</label>
            <span className="text-cyan-400">{outdoor} hrs</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            value={outdoor}
            onChange={(e) => setOutdoor(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Indoor Time</label>
            <span className="text-cyan-400">{indoor} hrs</span>
          </div>
          <input
            type="range"
            min="0"
            max="24"
            value={indoor}
            onChange={(e) => setIndoor(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div>
          <label className="text-gray-400">Activity Level</label>
          <div className="flex gap-3 mt-2">
            {["rest", "walking", "running"].map((a) => (
              <button
                key={a}
                onClick={() => setActivity(a)}
                className={`flex-1 px-4 py-2 rounded transition-all capitalize ${
                  activity === a ? "bg-cyan-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 🔹 Loading / Error */}
      {loading && <div className="text-cyan-400 animate-pulse">Fetching environmental data...</div>}
      {error && <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-400">{error}</div>}

      {/* 🔹 Results */}
      {data && exposureML !== null && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <p className="text-gray-500 text-sm">PM2.5 Level</p>
              <h2 className="text-2xl font-bold">{data.pm25} µg/m³</h2>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <p className="text-gray-500 text-sm">Exposure (ML-Based)</p>
              <h2 className="text-2xl font-bold text-cyan-400">
                {Math.round(exposureML)}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Predicted using trained regression model
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Model trained on synthetic exposure dataset
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <p className="text-gray-500 text-sm">Risk Category</p>
              <h2
                className={`text-2xl font-bold ${
                  risk === "High" ? "text-red-400" : "text-green-400"
                }`}
              >
                {risk}
              </h2>
            </div>

          </div>

          {/* 🔥 ML vs Formula Comparison */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex flex-wrap gap-8">
            <p><span className="text-gray-400">ML Prediction:</span> {Math.round(exposureML)}</p>
            <p><span className="text-gray-400">Formula Estimate:</span> {Math.round(exposureFormula)}</p>
          </div>

          {/* 🔹 Prediction Confidence */}
          {confidence && (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl">
              <strong>Prediction Confidence:</strong> {confidence}
            </div>
          )}

          {/* 🔹 Trend */}
          {trend && (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl">
              <strong>Trend:</strong> {trend}
            </div>
          )}

          {/* 🔹 Health Insight */}
          {insight && (
            <div className="bg-cyan-900/20 border border-cyan-500/30 p-4 rounded-xl text-cyan-100">
              {insight}
            </div>
          )}

          {/* 🔹 Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
              <h3 className="font-bold mb-4">Recommendations</h3>
              <ul className="space-y-2 text-gray-300">
                {recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}