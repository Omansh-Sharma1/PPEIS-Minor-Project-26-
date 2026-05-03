// Alerts.jsx
import React from "react";
import { getExposureHistory } from "../store/exposureStore";

export default function Alerts() {
  const history = getExposureHistory();
  const latest = history[history.length - 1];

  const dynamicAlerts = [];

  if (latest?.pm25 > 60) {
    dynamicAlerts.push({
      title: "High Pollution Detected",
      description: "PM2.5 exceeds safe limits. Avoid outdoor exposure.",
      icon: "⚠️",
      color: "bg-red-700/70",
    });
  }

  if (latest?.exposure > 800) {
    dynamicAlerts.push({
      title: "High Personal Exposure",
      description: "Your exposure level is significantly high.",
      icon: "🚨",
      color: "bg-orange-700/70",
    });
  }

  const staticAlerts = [
    {
      title: "What is PM2.5?",
      description: "Fine particles that enter lungs and bloodstream.",
      icon: "ℹ️",
      color: "bg-blue-700/70",
    },
    {
      title: "Indoor Advantage",
      description: "Indoor exposure is ~40% lower than outdoor.",
      icon: "🏠",
      color: "bg-green-700/70",
    },
  ];

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

      <div className="relative z-10 space-y-12">

        {/* PAGE HEADER */}
        <div className="space-y-1">
          <p className="text-xs text-slate-600 uppercase tracking-widest"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            Monitoring
          </p>
          <h1
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Smart Alerts
          </h1>
        </div>

        {/* PERSONAL ALERTS */}
        <div className="space-y-4">
          <p className="text-xs text-slate-600 uppercase tracking-widest"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            Your Alerts
          </p>

          {dynamicAlerts.length > 0 ? (
            <div className="space-y-3">
              {dynamicAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="relative flex items-start gap-4 bg-red-400/[0.06] border border-red-400/20 rounded-xl px-5 py-4 overflow-hidden transition-all hover:border-red-400/35"
                >
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(248,113,113,0.3), transparent)" }} />
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-300 mb-0.5">{alert.title}</p>
                    <p className="text-sm text-slate-400">{alert.description}</p>
                  </div>
                  <span className="text-lg flex-shrink-0">{alert.icon}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <p className="text-sm text-slate-500">No critical alerts detected.</p>
            </div>
          )}
        </div>

        {/* ENVIRONMENTAL INSIGHTS */}
        <div className="space-y-4">
          <p className="text-xs text-slate-600 uppercase tracking-widest"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            Environmental Insights
          </p>

          <div className="space-y-3">
            {staticAlerts.map((alert, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-4 overflow-hidden transition-all hover:border-purple-400/25 hover:-translate-y-0.5"
              >
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent)" }} />
                <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 mt-1.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-200 mb-0.5">{alert.title}</p>
                  <p className="text-sm text-slate-500">{alert.description}</p>
                </div>
                <span className="text-lg flex-shrink-0">{alert.icon}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}