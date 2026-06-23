import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Fetch current weather data for a specific location.
 * Falls back to mock weather data if no API key.
 *
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Normalized weather data
 */
export async function fetchWeather(lat, lon) {
  if (!API_KEY || API_KEY === 'your_openweathermap_api_key_here') {
    return getMockWeather();
  }

  try {
    const response = await apiClient.get('/weather', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'en',
      },
    });

    return normalizeWeather(response.data);
  } catch (error) {
    console.error('OpenWeatherMap API error:', error.message);
    return getMockWeather();
  }
}

/**
 * Normalize API response into a clean weather object
 */
function normalizeWeather(data) {
  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    cityName: data.name,
    condition: data.weather[0].main,
  };
}

/**
 * Mock weather data for development / when no API key is provided
 */
function getMockWeather() {
  const conditions = [
    { temp: 29, feels: 33, desc: 'partly cloudy', icon: '02d', condition: 'Clouds', humidity: 74, wind: 3.5 },
    { temp: 31, feels: 35, desc: 'sunny', icon: '01d', condition: 'Clear', humidity: 65, wind: 2.8 },
    { temp: 27, feels: 30, desc: 'light rain', icon: '10d', condition: 'Rain', humidity: 85, wind: 4.2 },
    { temp: 28, feels: 32, desc: 'scattered clouds', icon: '03d', condition: 'Clouds', humidity: 70, wind: 3.1 },
  ];
  const weather = conditions[Math.floor(Math.random() * conditions.length)];

  return {
    temperature: weather.temp,
    feelsLike: weather.feels,
    description: weather.desc,
    icon: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
    humidity: weather.humidity,
    windSpeed: weather.wind,
    cityName: 'Sri Lanka',
    condition: weather.condition,
  };
}
