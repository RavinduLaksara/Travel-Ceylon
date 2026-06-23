import { useState, useEffect } from 'react';
import { fetchWeather } from '../../api/openWeatherMap';
import './WeatherWidget.css';

export default function WeatherWidget({ lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeather(lat, lon);
        if (!cancelled) {
          setWeather(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (lat && lon) {
      loadWeather();
    }

    return () => { cancelled = true; };
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="weather-widget weather-widget--loading">
        <div className="weather-skeleton-pulse" />
      </div>
    );
  }

  if (error || !weather) {
    return null;
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <svg className="weather-section-icon" width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
        <span className="weather-section-title">Current Weather</span>
      </div>
      <div className="weather-content">
        <div className="weather-main">
          <img
            className="weather-icon"
            src={weather.icon}
            alt={weather.description}
            width="64"
            height="64"
          />
          <div className="weather-temp-group">
            <span className="weather-temp">{weather.temperature}°C</span>
            <span className="weather-desc">{weather.description}</span>
          </div>
        </div>
        <div className="weather-details">
          <div className="weather-detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-text-secondary)">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
            </svg>
            <span>{weather.humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-text-secondary)">
              <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-1.19.7-2.22 1.71-2.71L10.5 3h1l.29 11.29c1.01.49 1.71 1.52 1.71 2.71z"/>
            </svg>
            <span>Feels {weather.feelsLike}°C</span>
          </div>
          <div className="weather-detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-text-secondary)">
              <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3c0-1.19.7-2.22 1.71-2.71L10.5 3h1l.29 11.29c1.01.49 1.71 1.52 1.71 2.71z"/>
            </svg>
            <span>{weather.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
