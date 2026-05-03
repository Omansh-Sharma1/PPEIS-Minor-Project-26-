import React, { useState, useEffect } from "react";
import { useEnvironmentalData } from "../hooks/useEnvironmentalData";
import { calculateExposure, calculateExposureML } from "../processors/exposureProcessor";
import { getRiskLevel } from "../processors/riskProcessor";
import { addExposureEntry, getExposureHistory } from "../store/exposureStore";
import { getRecommendations } from "../processors/recommendationProcessor";
import { getExposureTrend } from "../processors/trendProcessor";
import { getPredictionConfidence } from "../processors/confidenceProcessor";

const TOTAL_HOURS = 24;

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

  const confidence =
    exposureML && exposureFormula
      ? getPredictionConfidence(exposureML, exposureFormula)
      : null;

  const insight =
    data?.pm25 && exposureML !== null && risk
      ? `Exposure is ${risk.toLowerCase()} due to ${
          data.pm25 > 60 ? "high pollution" : "moderate pollution"
        } and ${
          outdoor > 4 ? "long outdoor duration" : "controlled exposure"
        }.`
      : null;

  const history = getExposureHistory();
  const trend = getExposureTrend(history);

  useEffect(() => {
    if (data && exposureML && risk) {
      addExposureEntry({ exposure: exposureML, risk, pm25: data.pm25 });
    }
  }, [data, exposureML, risk]);

  return (
    <div
      className="relative min-h-screen max-w-4xl mx-auto px-6 py-12 text-white overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Purple glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -120, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 space-y-10">

        {/* PAGE HEADER */}
        <div className="space-y-1">
          <p className="text-xs text-slate-600 uppercase tracking-widest"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            Analysis Module
          </p>
          <h1
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Exposure Analysis
          </h1>
        </div>

        {/* CITY SEARCH */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
              style={{ fontFamily: "'Space Mono', monospace" }}>
              ⌖
            </span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-8 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-sm text-slate-300 placeholder-slate-600 transition-all"
              placeholder="Enter city..."
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5"
          >
            Search →
          </button>
        </div>

        {/* USER INPUTS PANEL */}
        <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 space-y-7 overflow-hidden">
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)" }} />

          <p className="text-xs text-slate-600 uppercase tracking-widest -mb-2"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            Input Parameters
          </p>

          {/* Outdoor Time */}
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-sm text-slate-400">Outdoor Time</label>
              <span className="text-cyan-400 text-sm font-semibold"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                {outdoor} hrs
              </span>
            </div>
            <input
              type="range" min="0" max="24" value={outdoor}
              onChange={(e) => {
                const newOutdoor = Number(e.target.value);
                setOutdoor(newOutdoor);
                setIndoor(TOTAL_HOURS - newOutdoor);
              }}
              className="w-full accent-cyan-400"
            />
            <div className="flex justify-between mt-1 text-xs text-slate-700">
              <span>0h</span><span>12h</span><span>24h</span>
            </div>
          </div>

          {/* Indoor Time */}
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-sm text-slate-400">Indoor Time</label>
              <span className="text-purple-400 text-sm font-semibold"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                {indoor} hrs
              </span>
            </div>
            <input
              type="range" min="0" max="24" value={indoor}
              onChange={(e) => {
                const newIndoor = Number(e.target.value);
                setIndoor(newIndoor);
                setOutdoor(TOTAL_HOURS - newIndoor);
              }}
              className="w-full accent-purple-400"
            />
            <div className="flex justify-between mt-1 text-xs text-slate-700">
              <span>0h</span><span>12h</span><span>24h</span>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="text-sm text-slate-400 block mb-3">Activity Level</label>
            <div className="flex gap-3">
              {["rest", "walking", "running"].map((a) => (
                <button
                  key={a}
                  onClick={() => setActivity(a)}
                  className={`flex-1 py-2 rounded-lg text-sm capitalize font-medium transition-all ${
                    activity === a
                      ? "bg-cyan-400 text-gray-900"
                      : "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:border-cyan-400/30 hover:text-slate-200"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center gap-3 text-cyan-400 text-sm"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Fetching environmental data...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-3 bg-red-400/[0.06] border border-red-400/20 rounded-xl px-5 py-4">
            <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* RESULTS */}
        {data && exposureML !== null && (
          <div className="space-y-5">

            {/* 3 metric cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "PM2.5 Level",
                  value: `${data.pm25} µg/m³`,
                  color: "text-orange-400",
                  bar: "from-orange-400 to-red-400",
                  barW: `${Math.min((data.pm25 / 150) * 100, 100)}%`,
                },
                {
                  label: "Exposure (ML-Based)",
                  value: Math.round(exposureML),
                  color: "text-cyan-400",
                  bar: "from-cyan-400 to-purple-400",
                  barW: `${Math.min((exposureML / 1000) * 100, 100)}%`,
                  sub: "Predicted via regression model",
                },
                {
                  label: "Risk Category",
                  value: risk,
                  color: risk === "High" ? "text-red-400" : "text-green-400",
                  bar: risk === "High" ? "from-red-400 to-red-500" : "from-green-400 to-teal-400",
                  barW: risk === "High" ? "88%" : "35%",
                },
              ].map((card, i) => (
                <div key={i}
                  className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 overflow-hidden transition-all hover:border-cyan-400/25 hover:-translate-y-0.5">
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.25), transparent)" }} />
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-3"
                    style={{ fontFamily: "'Space Mono', monospace" }}>
                    {card.label}
                  </p>
                  <p className={`text-2xl font-bold mb-1 ${card.color}`}
                    style={{ fontFamily: "'Space Mono', monospace" }}>
                    {card.value}
                  </p>
                  {card.sub && <p className="text-xs text-slate-600 mb-2">{card.sub}</p>}
                  <div className="h-0.5 bg-white/[0.05] rounded-full overflow-hidden mt-3">
                    <div className={`h-full bg-gradient-to-r ${card.bar} rounded-full`}
                      style={{ width: card.barW, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* ML vs Formula comparison */}
            <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)" }} />
              <div className="flex flex-wrap gap-8 text-sm">
                <p>
                  <span className="text-slate-500 mr-2"
                    style={{ fontFamily: "'Space Mono', monospace" }}>ML Prediction</span>
                  <span className="text-cyan-400 font-semibold">{Math.round(exposureML)}</span>
                </p>
                <p>
                  <span className="text-slate-500 mr-2"
                    style={{ fontFamily: "'Space Mono', monospace" }}>Formula Estimate</span>
                  <span className="text-purple-400 font-semibold">{Math.round(exposureFormula)}</span>
                </p>
              </div>
            </div>

            {/* Confidence */}
            {confidence && (
              <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-4 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }} />
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  Prediction Confidence
                </p>
                <p className="text-sm text-slate-300">{confidence}</p>
              </div>
            )}

            {/* Trend */}
            {trend && (
              <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-4 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)" }} />
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  Exposure Trend
                </p>
                <p className="text-sm text-slate-300">{trend}</p>
              </div>
            )}

            {/* Insight */}
            {insight && (
              <div className="flex items-start gap-4 bg-cyan-400/[0.05] border border-cyan-400/20 rounded-xl px-5 py-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0 animate-pulse" />
                <p className="text-sm text-cyan-100/80 leading-relaxed">{insight}</p>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.25), transparent)" }} />
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-4"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  Recommendations
                </p>
                <ul className="space-y-3">
                  {recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="text-cyan-400 mt-0.5 flex-shrink-0">→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}