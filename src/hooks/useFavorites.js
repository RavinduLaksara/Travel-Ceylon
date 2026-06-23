import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing favorite attractions.
 * Built on top of useLocalStorage for session persistence.
 *
 * @returns {{ favorites: Array, addFavorite: Function, removeFavorite: Function, isFavorite: Function, toggleFavorite: Function }}
 */
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('travel-ceylon-favorites', []);

  const addFavorite = useCallback(
    (attraction) => {
      setFavorites((prev) => {
        if (prev.some((fav) => fav.id === attraction.id)) {
          return prev;
        }
        return [...prev, { ...attraction, savedAt: Date.now() }];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (attractionId) => {
      setFavorites((prev) => prev.filter((fav) => fav.id !== attractionId));
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (attractionId) => {
      return favorites.some((fav) => fav.id === attractionId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (attraction) => {
      if (isFavorite(attraction.id)) {
        removeFavorite(attraction.id);
      } else {
        addFavorite(attraction);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  const sortedFavorites = useMemo(
    () => [...favorites].sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0)),
    [favorites]
  );

  return {
    favorites: sortedFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
