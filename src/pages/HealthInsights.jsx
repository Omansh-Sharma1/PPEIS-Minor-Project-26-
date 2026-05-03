import React from "react";
import {getLatestExposure } from "../store/exposureStore";
import { getHealthInsights } from "../processors/healthProcessor";

export default function HealthInsights() {

  const exposureData = getLatestExposure();

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">

      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
        Health Insights
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800/70 border border-gray-700 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-100">
              {item.title}
            </h2>
            <p className="text-2xl font-bold text-cyan-400 mt-2">
              {item.value}
            </p>
            <p className="text-gray-400 mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}