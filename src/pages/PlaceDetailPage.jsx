import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAttractionDetails } from "../api/dataApi";
import { useFavorites } from "../hooks/useFavorites";
import WeatherWidget from "../components/Weather/WeatherWidget";
import DistanceDisplay from "../components/Distance/DistanceDisplay";
import { DetailSkeleton } from "../components/UI/LoadingSkeleton";
import ErrorState from "../components/UI/ErrorState";
import { getGoogleMapsUrl, getGeoUri } from "../utils/mapLinks";
import "./PlaceDetailPage.css";

/**
 * PlaceDetailPage — Rich media detailed view for a selected attraction.
 * Shows weather data, user distance, map links, and favorite toggle.
 */
export default function PlaceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;

    async function loadPlace() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAttractionDetails(id);
        if (!cancelled) {
          if (!data) {
            setError("Attraction not found");
          } else {
            setPlace(data);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load attraction details");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPlace();
    // Scroll to top when entering detail page
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !place) {
    return (
      <div className="detail-page page-content">
        <button
          className="detail-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <ErrorState
          message={error || "Attraction not found"}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const favorite = isFavorite(place.id);
  const googleMapsUrl = getGoogleMapsUrl(place.lat, place.lon, place.name);
  const geoUri = getGeoUri(place.lat, place.lon, place.name);

  const categoryLabels = {
    hotels: { label: "Hotel", emoji: "🏨" },
    nature: { label: "Nature", emoji: "🌿" },
    historical: { label: "Historical", emoji: "🏛️" },
  };
  const cat = categoryLabels[place.category] || categoryLabels.nature;

  return (
    <div className="detail-page">
      {/* Hero Image */}
      <section className="detail-hero">
        {place.image ? (
          <img
            className="detail-hero-image"
            src={place.image}
            alt={place.name}
          />
        ) : (
          <div className="detail-hero-placeholder">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.4)"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
        <div className="detail-hero-overlay" />

        {/* Back Button */}
        <button
          className="detail-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>

        {/* Favorite Button */}
        <button
          className={`detail-fav-btn ${favorite ? "active" : ""}`}
          onClick={() => toggleFavorite(place)}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={favorite ? "#EF5350" : "rgba(255,255,255,0.9)"}
              stroke={favorite ? "#EF5350" : "rgba(0,0,0,0.1)"}
              strokeWidth="0.5"
            />
          </svg>
        </button>
      </section>

      {/* Content Body */}
      <section className="detail-body">
        {/* Title & Category */}
        <div className="detail-title-section animate-fade-in-up">
          <span className="detail-category">
            {cat.emoji} {cat.label}
          </span>
          <h1 className="detail-name">{place.name}</h1>
          {place.address && (
            <p className="detail-address">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="var(--color-primary)"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {place.address}
            </p>
          )}
        </div>

        {/* Distance Display */}
        <div
          className="detail-section animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <DistanceDisplay targetLat={place.lat} targetLon={place.lon} />
        </div>

        {/* Description */}
        <div
          className="detail-section animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          <h2 className="detail-section-title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="var(--color-primary)"
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            About
          </h2>
          <p className="detail-description">{place.description}</p>
        </div>

        {/* Weather Widget */}
        <div
          className="detail-section animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <WeatherWidget lat={place.lat} lon={place.lon} />
        </div>

        {/* Map Actions */}
        <div
          className="detail-section detail-actions animate-fade-in-up"
          style={{ animationDelay: "250ms" }}
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-action-btn detail-action-btn--primary"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Open in Google Maps
          </a>

          {/* <a
            href={geoUri}
            className="detail-action-btn detail-action-btn--secondary"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
            </svg>
            Open in Maps App
          </a> */}
        </div>

        {/* Favorite Toggle */}
        <div
          className="detail-section animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <button
            className={`detail-favorite-btn ${favorite ? "active" : ""}`}
            onClick={() => toggleFavorite(place)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={favorite ? "#EF5350" : "none"}
                stroke={favorite ? "#EF5350" : "var(--color-text-secondary)"}
                strokeWidth="2"
              />
            </svg>
            {favorite ? "Saved to Favorites" : "Add to Favorites"}
          </button>
        </div>
      </section>
    </div>
  );
}
