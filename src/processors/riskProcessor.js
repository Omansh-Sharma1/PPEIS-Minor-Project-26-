export const getRiskLevel = (E) => {
  if (E < 50) return "Low";
  if (E < 120) return "Moderate";
  return "High";
};