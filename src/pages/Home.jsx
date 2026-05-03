/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Section from "../components/common/Section";

const metrics = [
  {
    label: "PM2.5 Concentration",
    value: "62 µg/m³",
    colorClass: "text-orange-400",
    barColor: "from-orange-400 to-red-400",
    barWidth: "62%",
    trend: "↑ 14% from yesterday",
  },
  {
    label: "Exposure Score",
    value: "845",
    colorClass: "text-cyan-400",
    barColor: "from-cyan-400 to-purple-400",
    barWidth: "84.5%",
    trend: "Daily limit: 1000",
  },
  {
    label: "Risk Level",
    value: "High",
    colorClass: "text-red-400",
    barColor: "from-red-400 to-red-500",
    barWidth: "88%",
    trend: "Outdoor caution advised",
  },
];

const steps = [
  { num: "01", title: "Input Data", desc: "Location, time, and activity type" },
  { num: "02", title: "Processing", desc: "Real-time sensor fusion & normalization" },
  { num: "03", title: "Exposure Model", desc: "Dose–response curve applied" },
  { num: "04", title: "Health Insight", desc: "Personalized risk score & guidance" },
];

export default function Home() {
  const barsRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      barsRef.current.forEach((bar) => {
        if (bar) bar.style.width = bar.dataset.width;
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen px-6 py-12 max-w-4xl mx-auto text-white overflow-hidden"
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
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 space-y-14">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5"
        >
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/8 text-cyan-300 text-xs tracking-widest"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Live monitoring active
          </div>

          <h1
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "-0.02em" }}
          >
            PPEIS
          </h1>

          <p
            className="text-xs tracking-widest text-slate-500 uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Personal Pollution Exposure Intelligence System
          </p>

          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            Estimate your real pollution exposure based on time spent, physical activity,
            and local environment — down to the hour.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5">
              Start Analysis →
            </button>
          </div>
        </motion.div>

        {/* METRIC CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 text-center overflow-hidden transition-all hover:border-cyan-400/25 hover:-translate-y-0.5"
            >
              {/* Top shimmer line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)" }}
              />
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                {m.label}
              </p>
              <p className={`text-2xl font-bold mb-1 ${m.colorClass}`}
                style={{ fontFamily: "'Space Mono', monospace" }}>
                {m.value}
              </p>
              {/* Animated bar */}
              <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden mt-3">
                <div
                  ref={(el) => (barsRef.current[i] = el)}
                  data-width={m.barWidth}
                  className={`h-full bg-gradient-to-r ${m.barColor} rounded-full transition-all duration-1000`}
                  style={{ width: "0%" }}
                />
              </div>
              <p className="text-xs text-slate-600 mt-2">{m.trend}</p>
            </div>
          ))}
        </motion.div>

        {/* HOW IT WORKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs text-slate-600 uppercase tracking-widest mb-6"
            style={{ fontFamily: "'Space Mono', monospace" }}>
            How it works
          </p>
          <div className="relative grid grid-cols-4 gap-0">
            {/* Connector line */}
            <div
              className="absolute top-[22px] h-px z-0"
              style={{
                left: "calc(12.5% + 8px)",
                right: "calc(12.5% + 8px)",
                background: "linear-gradient(90deg, rgba(34,211,238,0.3), rgba(167,139,250,0.3))",
              }}
            />
            {steps.map((s, i) => (
              <div key={i} className="text-center px-2 relative z-10 group cursor-default">
                <div className="w-11 h-11 rounded-full border border-cyan-400/30 bg-gray-900 flex items-center justify-center mx-auto mb-3 text-cyan-400 text-xs font-bold transition-all group-hover:bg-cyan-400/10 group-hover:border-cyan-400"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  {s.num}
                </div>
                <p className="text-sm font-medium text-slate-300 mb-1">{s.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ALERT BAND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center gap-4 bg-red-400/[0.06] border border-red-400/15 rounded-xl px-5 py-4"
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
          <p className="text-sm text-red-200/80 flex-1">
            <span className="text-red-400 font-semibold">High pollution event</span>{" "}
            detected in your area. PM2.5 levels exceed WHO daily guidelines by 2.5×.
          </p>
          <button className="text-xs text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap">
            Learn more →
          </button>
        </motion.div>

      </div>
    </div>
  );
}