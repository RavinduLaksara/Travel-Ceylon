import './LoadingSkeleton.css';

export function CardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-image skeleton-pulse" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-line--title skeleton-pulse" />
        <div className="skeleton-line skeleton-line--text skeleton-pulse" />
        <div className="skeleton-line skeleton-line--short skeleton-pulse" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="attraction-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="detail-skeleton" aria-hidden="true">
      <div className="skeleton-hero skeleton-pulse" />
      <div className="skeleton-detail-body">
        <div className="skeleton-line skeleton-line--title skeleton-pulse" />
        <div className="skeleton-line skeleton-line--text skeleton-pulse" />
        <div className="skeleton-line skeleton-line--text skeleton-pulse" />
        <div className="skeleton-line skeleton-line--short skeleton-pulse" />
        <div style={{ height: '24px' }} />
        <div className="skeleton-weather-box skeleton-pulse" />
      </div>
    </div>
  );
}
