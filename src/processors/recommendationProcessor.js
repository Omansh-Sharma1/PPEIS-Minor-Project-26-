export const getRecommendations = (pm25, outdoor, activity) => {
  let recs = [];

  if (pm25 > 60) {
    recs.push("Wear a mask outdoors");
  }

  if (outdoor > 4) {
    recs.push("Reduce outdoor time");
  }

  if (activity === "running") {
    recs.push("Avoid intense outdoor activity");
  }

  if (recs.length === 0) {
    recs.push("No major precautions needed");
  }

  return recs;
};