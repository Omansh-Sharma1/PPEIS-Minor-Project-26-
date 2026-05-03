export const getExposureTrend = (history) => {
  if (history.length < 2) return "No trend";

  const last = history[history.length - 1].exposure;
  const prev = history[history.length - 2].exposure;

  if (last > prev) return "Increasing 📈";
  if (last < prev) return "Decreasing 📉";
  return "Stable ➖";
};