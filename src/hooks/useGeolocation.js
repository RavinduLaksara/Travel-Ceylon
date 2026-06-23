import { useState, useEffect } from 'react';

/**
 * Custom React hook for HTML5 Geolocation API.
 * Returns user's current latitude/longitude, loading state, and errors.
 *
 * @param {Object} options - Geolocation options
 * @returns {{ latitude: number|null, longitude: number|null, error: string|null, loading: boolean }}
 */
export function useGeolocation(options = {}) {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return;
    }

    const onSuccess = (pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const onError = (err) => {
      let errorMessage;
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'Location permission denied. Please enable location access.';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case err.TIMEOUT:
          errorMessage = 'Location request timed out.';
          break;
        default:
          errorMessage = 'An unknown error occurred.';
          break;
      }
      setPosition({
        latitude: null,
        longitude: null,
        error: errorMessage,
        loading: false,
      });
    };

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes cache
      ...options,
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(onSuccess, onError, defaultOptions);

    // Watch for changes
    const watchId = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      defaultOptions
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return position;
}
