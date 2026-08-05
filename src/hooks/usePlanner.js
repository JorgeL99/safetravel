import { useEffect, useState } from 'react';
import { moveId, toggleId } from '../lib/travel-utils';

const STORAGE_KEY = 'safetravel-itinerary';

export function usePlanner() {
  const [itinerary, setItinerary] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []; }
    catch { return []; }
  });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary)), [itinerary]);

  const toggleItinerary = (id) => setItinerary((current) => toggleId(current, id));

  const moveItem = (index, direction) => setItinerary((current) => moveId(current, index, direction));

  const clearItinerary = () => setItinerary([]);

  return { itinerary, toggleItinerary, moveItem, clearItinerary };
}
