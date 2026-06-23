import { useGeolocation } from '../../hooks/useGeolocation';
import { calculateDistance, formatDistance } from '../../utils/distance';
import './DistanceDisplay.css';

export default function DistanceDisplay({ targetLat, targetLon }) {
  const { latitude, longitude, error, loading } = useGeolocation();

  if (loading) {
    return (
      <div className="distance-display distance-display--loading">
        <div className="distance-loader" />
        <span>Getting your location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="distance-display distance-display--error">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-text-secondary)">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span className="distance-error-text">{error}</span>
      </div>
    );
  }

  if (latitude && longitude && targetLat && targetLon) {
    const distance = calculateDistance(latitude, longitude, targetLat, targetLon);
    const formatted = formatDistance(distance);

    return (
      <div className="distance-display distance-display--success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span className="distance-value">{formatted}</span>
        <span className="distance-label">from your location</span>
      </div>
    );
  }

  return null;
}
