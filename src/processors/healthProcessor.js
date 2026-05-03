export const getHealthInsights = (risk, pm25) => {
  let insights = [];

  if (risk === "High") {
    insights.push({
      title: "Respiratory Risk",
      value: "High",
      description: "Increased chance of breathing discomfort.",
    });
  } else if (risk === "Moderate") {
    insights.push({
      title: "Respiratory Risk",
      value: "Moderate",
      description: "Sensitive individuals may feel discomfort.",
    });
  } else {
    insights.push({
      title: "Respiratory Risk",
      value: "Low",
      description: "Air is relatively safe.",
    });
  }

  if (pm25 > 60) {
    insights.push({
      title: "Protection",
      value: "Mask Recommended",
      description: "PM2.5 is high, consider protection.",
    });
  } else {
    insights.push({
      title: "Protection",
      value: "Optional",
      description: "No strict protection needed.",
    });
  }

  insights.push({
    title: "Outdoor Advice",
    value:
      risk === "High"
        ? "Avoid prolonged exposure"
        : "Safe with precautions",
    description: "Based on your current exposure level.",
  });

  return insights;
};