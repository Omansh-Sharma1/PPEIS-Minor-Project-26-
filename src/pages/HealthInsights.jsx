import React from "react";
import { getLatestExposure, getExposureHistory } from "../store/exposureStore";
import { getHealthInsights } from "../processors/healthProcessor";

export default function HealthInsights() {
  const exposureData = getLatestExposure();
  const history = getExposureHistory();

  let insights = [];

  if (!exposureData) {
    insights = [
      {
        title: "No Data",
        value: "Unavailable",
        description: "Go to Exposure page first.",
      },
    ];
  } else {
    const { risk, pm25 } = exposureData;
    insights = getHealthInsights(risk, pm25);
  }

  const explanation = exposureData
    ? exposureData.pm25 > 60
      ? "Air quality is currently unhealthy. Fine particles can penetrate deep into the lungs, increasing respiratory stress."
      : "Air quality is relatively controlled, but prolonged exposure can still have cumulative effects."
    : null;

  const severity = exposureData
    ? exposureData.risk === "High"
      ? 85
      : exposureData.risk === "Moderate"
      ? 55
      : 25
    : 0;

  const preventiveActions = exposureData
    ? [
        exposureData.pm25 > 60 && "Use N95 mask outdoors",
        exposureData.risk === "High" && "Limit outdoor duration",
        "Improve indoor ventilation",
        "Stay hydrated to reduce pollutant impact",
      ].filter(Boolean)
    : [];

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
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 space-y-10">

        {/* HEADER */}
        <div className="space-y-1">
          <p className="text-xs text-slate-600 uppercase tracking-widest">
            Diagnostics
          </p>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Health Insights
          </h1>
        </div>

        {/* INSIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5"
            >
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
                {item.title}
              </p>

              <p className="text-2xl font-bold text-cyan-400 mb-2">
                {item.value}
              </p>

              <p className="text-sm text-slate-500">
                {item.description}
              </p>

              <div className="h-0.5 bg-white/[0.05] rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  style={{
                    width: item.value === "Unavailable" ? "0%" : "60%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 🧠 INTERPRETATION */}
        {explanation && (
          <div className="bg-purple-900/10 border border-purple-500/20 p-5 rounded-xl">
            <h3 className="text-purple-400 font-semibold mb-2">
              Health Interpretation
            </h3>
            <p className="text-slate-300 text-sm">{explanation}</p>
          </div>
        )}

        {/* 📊 SEVERITY */}
        {exposureData && (
          <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl">
            <h3 className="text-cyan-400 font-semibold mb-3">
              Exposure Severity
            </h3>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                style={{ width: `${severity}%` }}
              />
            </div>
          </div>
        )}

        {/* 🛡️ PREVENTION */}
        {preventiveActions.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl">
            <h3 className="text-white font-semibold mb-3">
              Health Protection Strategy
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              {preventiveActions.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 🧠 HISTORY SECTION (NEW) */}
        {history && history.length > 0 && (
          <div className="bg-gray-900 border border-gray-700 p-5 rounded-xl space-y-3">
            <h3 className="text-cyan-300 font-semibold">
              Exposure History
            </h3>

            <div className="space-y-3">
              {history
                .slice()
                .reverse()
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-800 pb-2 text-sm"
                  >
                    <div className="flex justify-between text-gray-300">
                      <span>
                        PM2.5: {item.pm25} | Risk: {item.risk}
                      </span>
                      <span className="text-gray-500">
                        Score: {Math.round(item.exposure)}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleString()
                        : "No timestamp"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!exposureData && (
          <div className="flex items-center gap-4 bg-cyan-400/[0.05] border border-cyan-400/20 rounded-xl px-5 py-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-sm text-cyan-100/70">
              Run an exposure analysis first to populate your health insights.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}