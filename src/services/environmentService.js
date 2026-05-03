const API_KEY = import.meta.env.VITE_WEATHER_KEY;

export const fetchEnvironmentalData = async (city) => {
  if (!API_KEY) {
    throw new Error("API key missing. Check .env file.");
  }

  // 1️⃣ Get coordinates
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );

  if (!geoRes.ok) throw new Error("Failed to fetch location");

  const geoData = await geoRes.json();
  if (!geoData.length) throw new Error("City not found");

  const { lat, lon } = geoData[0];

  // 2️⃣ Fetch all data
  const [pollutionRes, weatherRes, forecastRes] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  ]);

  if (!pollutionRes.ok || !weatherRes.ok || !forecastRes.ok) {
    throw new Error("API request failed");
  }

  const pollutionData = await pollutionRes.json();
  const weatherData = await weatherRes.json();
  const forecastData = await forecastRes.json();

  return {
    aqi: pollutionData.list[0].main.aqi,
    pm25: pollutionData.list[0].components.pm2_5,
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    wind: weatherData.wind.speed,
    nextTemp: forecastData.list[0].main.temp,
  };
};