import './CategoryFilter.css';

const CATEGORIES = [
  { id: 'all', label: 'All Places', icon: '✦' },
  { id: 'hotels', label: 'Hotels', icon: '🏨' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'historical', label: 'Historical', icon: '🏛️' },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={activeCategory === cat.id}
          className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          <span className="filter-chip-icon" aria-hidden="true">{cat.icon}</span>
          <span className="filter-chip-label">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
