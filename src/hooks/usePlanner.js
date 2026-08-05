import { useEffect, useState } from 'react';

const STORAGE_KEY = 'safetravel-itinerary';

export function usePlanner() {
  const [itinerary, setItinerary] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []; }
    catch { return []; }
  });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary)), [itinerary]);

  const toggleItinerary = (id) => setItinerary((current) => current.includes(id)
    ? current.filter((itemId) => itemId !== id)
    : [...current, id]);

  const moveItem = (index, direction) => setItinerary((current) => {
    const target = index + direction;
    if (target < 0 || target >= current.length) return current;
    const ordered = [...current];
    [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
    return ordered;
  });

  const clearItinerary = () => setItinerary([]);

  return { itinerary, toggleItinerary, moveItem, clearItinerary };
}
