import { Link } from 'react-router-dom';
import './AttractionCard.css';

/**
 * AttractionCard - Displays an attraction in a card format for the grid.
 *
 * @param {Object} props
 * @param {Object} props.attraction - The attraction data object
 * @param {boolean} props.isFavorite - Whether this attraction is favorited
 * @param {Function} props.onToggleFavorite - Callback when favorite is toggled
 */
export default function AttractionCard({ attraction, isFavorite, onToggleFavorite }) {
  const categoryColors = {
    hotels: { bg: '#E3F2FD', text: '#1565C0', label: 'Hotel' },
    nature: { bg: '#E8F5E9', text: '#2E7D32', label: 'Nature' },
    historical: { bg: '#FFF3E0', text: '#E65100', label: 'Historical' },
  };

  const cat = categoryColors[attraction.category] || categoryColors.nature;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(attraction);
  };

  return (
    <Link
      to={`/place/${attraction.id}`}
      className="attraction-card animate-fade-in-up"
      aria-label={`View details for ${attraction.name}`}
    >
      <div className="card-image-wrapper">
        {attraction.image ? (
          <img
            className="card-image"
            src={attraction.image}
            alt={attraction.name}
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        )}

        <div className="card-image-overlay" />

        <button
          className={`card-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isFavorite ? '#EF5350' : 'rgba(255,255,255,0.8)'}
              stroke={isFavorite ? '#EF5350' : 'rgba(0,0,0,0.2)'}
              strokeWidth="0.5"
            />
          </svg>
        </button>

        <span
          className="card-category-badge"
          style={{ background: cat.bg, color: cat.text }}
        >
          {cat.label}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{attraction.name}</h3>
        {attraction.address && (
          <p className="card-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-text-secondary)">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{attraction.address}</span>
          </p>
        )}
        {attraction.rating > 0 && (
          <div className="card-rating">
            {Array.from({ length: 3 }).map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={i < attraction.rating ? '#FFC107' : '#E0E0E0'}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
