import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import './FavoritesPage.css';

/**
 * FavoritesPage — Displays user's bookmarked attractions.
 * Data persists across browser sessions via localStorage.
 */
export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites-page page-content">
      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <div className="favorites-empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                stroke="var(--color-text-light)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className="favorites-empty-title">No favorites yet</h2>
          <p className="favorites-empty-text">
            Start exploring and save your favorite places to access them quickly later.
          </p>
          <Link to="/" className="favorites-discover-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Discover Places
          </Link>
        </div>
      ) : (
        <>
          <div className="favorites-header">
            <p className="favorites-count">{favorites.length} saved {favorites.length === 1 ? 'place' : 'places'}</p>
          </div>
          <div className="favorites-list">
            {favorites.map((place, index) => (
              <div
                className="favorite-item animate-fade-in-up"
                key={place.id}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Link to={`/place/${place.id}`} className="favorite-item-link">
                  <div className="favorite-item-image-wrapper">
                    {place.image ? (
                      <img
                        className="favorite-item-image"
                        src={place.image}
                        alt={place.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="favorite-item-image-placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="favorite-item-info">
                    <h3 className="favorite-item-name">{place.name}</h3>
                    <span className="favorite-item-category">
                      {place.category === 'hotels' ? '🏨' : place.category === 'historical' ? '🏛️' : '🌿'}{' '}
                      {place.category ? place.category.charAt(0).toUpperCase() + place.category.slice(1) : 'Nature'}
                    </span>
                    {place.address && (
                      <p className="favorite-item-address">{place.address}</p>
                    )}
                  </div>
                </Link>
                <button
                  className="favorite-remove-btn"
                  onClick={() => removeFavorite(place.id)}
                  aria-label={`Remove ${place.name} from favorites`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-text-secondary)">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
