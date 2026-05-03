const STORAGE_KEY = "ppeis_exposure_history";

export const addExposureEntry = (data) => {
  const existing = getExposureHistory();

  const newEntry = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  const updated = [...existing, newEntry];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getExposureHistory = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getLatestExposure = () => {
  const history = getExposureHistory();
  return history.length ? history[history.length - 1] : null;
};