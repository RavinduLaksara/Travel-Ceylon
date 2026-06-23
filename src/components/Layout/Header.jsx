import { useLocation } from 'react-router-dom';
import './Header.css';

const ROUTE_TITLES = {
  '/': 'Discover',
  '/favorites': 'My Favorites',
};

export default function Header() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/place/');

  if (isDetailPage) return null;

  const title = ROUTE_TITLES[location.pathname] || 'Travel Ceylon';

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-brand">
          <div className="header-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2E7D32"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>
          <div>
            <h1 className="header-title">Travel Ceylon</h1>
            <p className="header-subtitle">{title}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
