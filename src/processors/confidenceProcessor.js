export const getPredictionConfidence = (ml, formula) => {
  if (!ml || !formula) return "Low";

  const diff = Math.abs(ml - formula);

  if (diff < 50) return "High";
  if (diff < 150) return "Medium";
  return "Low";
};