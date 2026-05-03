import model from "../assets/model.json";

export const predictExposure = (pm25, outdoor, indoor, activity) => {
  const { intercept, coefficients } = model;

  return (
    intercept +
    coefficients[0] * pm25 +
    coefficients[1] * outdoor +
    coefficients[2] * indoor +
    coefficients[3] * activity
  );
};