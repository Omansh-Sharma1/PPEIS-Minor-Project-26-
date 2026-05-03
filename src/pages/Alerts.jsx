import React from "react";
import AlertCard from "../components/alerts/AlertCard";
import { getLatestExposure } from "../store/exposureStore";

export default function Alerts() {

  const exposureData = getLatestExposure();

  let alerts = [];

  if (!exposureData) {
    alerts = [
      {
        title: "No Data Available",
        description: "Go to Exposure page first to generate data.",
        icon: "ℹ️",
        color: "bg-gray-700",
      },
    ];
  } else {
    const { risk, pm25 } = exposureData;

    if (risk === "High") {
      alerts.push({
        title: "High Exposure Risk",
        description: "Reduce outdoor activity immediately.",
        icon: "⚠️",
        color: "bg-red-700/70",
      });
    }

    if (pm25 > 60) {
      alerts.push({
        title: "High Pollution Levels",
        description: "Wear a mask outdoors.",
        icon: "😷",
        color: "bg-orange-700/70",
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        title: "All Good",
        description: "No major risks detected.",
        icon: "✅",
        color: "bg-green-700/70",
      });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">

      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Alerts
      </h1>

      <div className="space-y-4">
        {alerts.map((alert, idx) => (
          <AlertCard key={idx} alert={alert} />
        ))}
      </div>

    </div>
  );
}