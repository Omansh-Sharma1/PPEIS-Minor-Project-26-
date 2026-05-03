// 🔹 Original Formula-Based Calculation
export const calculateExposure = (pm25, outdoor, indoor, activity) => {
  const activityMap = {
    rest: 1.0,
    walking: 1.5,
    running: 2.5,
  };

  const A = activityMap[activity];

  const exposure =
    pm25 * ((outdoor * A) + (indoor * A * 0.6));

  return +exposure.toFixed(2);
};

// 🔹 ML-Based Calculation (Learned Model)
export const calculateExposureML = (pm25, outdoor, indoor, activity) => {
  const activityMap = {
    rest: 1.0,
    walking: 1.5,
    running: 2.5,
  };

  const A = activityMap[activity];

  // coefficients from trained model
  const b0 = -2217.56;
  const b1 = 14.6793;
  const b2 = 127.7645;
  const b3 = 76.0513;
  const b4 = 661.4222;

  const exposure =
    b0 +
    b1 * pm25 +
    b2 * outdoor +
    b3 * indoor +
    b4 * A;

  return Math.max(0, +exposure.toFixed(2));
};