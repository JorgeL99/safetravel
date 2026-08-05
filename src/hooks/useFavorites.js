import { useEffect, useState } from 'react';
import { toggleId } from '../lib/travel-utils';

const STORAGE_KEY = 'safetravel-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => setFavorites((current) => toggleId(current, id));

  return { favorites, toggleFavorite };
}
