import { useState, useEffect, useCallback } from 'react';
import { fetchAttractions } from '../api/dataApi';
import { useFavorites } from '../hooks/useFavorites';
import CategoryFilter from '../components/Filters/CategoryFilter';
import AttractionCard from '../components/Cards/AttractionCard';
import { CardGridSkeleton } from '../components/UI/LoadingSkeleton';
import ErrorState from '../components/UI/ErrorState';
import './HomePage.css';

/**
 * HomePage — Discover Screen
 * Displays a filterable grid of Sri Lankan attractions.
 * Fetches data from OpenTripMap API with mock data fallback.
 */
export default function HomePage() {
  const [attractions, setAttractions] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const loadAttractions = useCallback(async (cat) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAttractions(cat);
      setAttractions(data);
    } catch (err) {
      setError(err.message || 'Failed to load attractions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAttractions(category);
  }, [category, loadAttractions]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="home-page page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-greeting">Explore Sri Lanka</h2>
          <p className="hero-subtitle">
            Discover ancient ruins, pristine beaches, and lush rainforests across the Pearl of the Indian Ocean
          </p>
        </div>
        <div className="hero-decoration">
          <div className="hero-circle hero-circle--1" />
          <div className="hero-circle hero-circle--2" />
          <div className="hero-circle hero-circle--3" />
        </div>
      </section>

      {/* Category Filters */}
      <CategoryFilter
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Results Count */}
      {!loading && !error && (
        <div className="results-info">
          <span className="results-count">
            {attractions.length} {attractions.length === 1 ? 'place' : 'places'} found
          </span>
        </div>
      )}

      {/* Content Area */}
      <section className="attractions-section" aria-label="Attractions list">
        {loading ? (
          <CardGridSkeleton count={6} />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => loadAttractions(category)}
          />
        ) : attractions.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--color-text-light)">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <h3>No places found</h3>
            <p>Try selecting a different category</p>
          </div>
        ) : (
          <div className="attraction-grid">
            {attractions.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                isFavorite={isFavorite(attraction.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
