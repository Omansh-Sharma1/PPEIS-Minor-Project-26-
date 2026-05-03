export const getExposureInsight = (pm25, outdoor, indoor, activity, exposure) => {
  let reasons = [];

  if (pm25 > 60) {
    reasons.push("high pollution levels");
  } else if (pm25 > 30) {
    reasons.push("moderate pollution levels");
  }

  if (outdoor > 4) {
    reasons.push("long outdoor duration");
  }

  if (indoor > outdoor) {
    reasons.push("indoor time helped reduce exposure");
  }

  if (activity === "running") {
    reasons.push("high activity intensity increased intake");
  }

  if (reasons.length === 0) {
    return "Exposure is within safe range due to balanced conditions.";
  }

  return `Exposure is ${exposure > 120 ? "high" : "moderate"} due to ${reasons.join(", ")}.`;
};