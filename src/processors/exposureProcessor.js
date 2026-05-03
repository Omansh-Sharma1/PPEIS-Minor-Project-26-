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

/**
export const calculateExposureML = (pm25, outdoor, indoor, activity) => {
  const activityMap = {
    rest: 1.0,
    walking: 1.5,
    running: 2.5,
  };

  const A = activityMap[activity];

  const b0 = -2217.56;
  const b1 = 14.6793;
  const b2 = 127.7645;
  const b3 = 76.0513;
  const b4 = 661.4222;

  const rawExposure =
    b0 +
    b1 * pm25 +
    b2 * outdoor +
    b3 * indoor +
    b4 * A;

  // 🔥 Stable softplus
  const safeExposure =
    rawExposure > 50
      ? rawExposure
      : Math.log(1 + Math.exp(rawExposure));

  const time = outdoor + indoor;

  const adjustedExposure =
    Math.log(1 + safeExposure) *
    (1 - Math.exp(-0.1 * time)) *
    100;

  return +adjustedExposure.toFixed(2);
};

**/

import { predictExposure } from "../services/mlService";

export const calculateExposureML = (pm25, outdoor, indoor, activity) => {
  const activityMap = {
    rest: 1.0,
    walking: 1.5,
    running: 2.5,
  };

  const A = activityMap[activity];

  const result = predictExposure(pm25, outdoor, indoor, A);

  return Math.max(0, result.toFixed(2));
};