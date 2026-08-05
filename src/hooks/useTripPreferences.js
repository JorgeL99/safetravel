import { useEffect, useState } from 'react';

const STORAGE_KEY = 'safetravel-trip-preferences';
const defaults = { startDate: '', travelers: 1, notes: '' };

export function useTripPreferences() {
  const [preferences, setPreferences] = useState(() => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; }
    catch { return defaults; }
  });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)), [preferences]);

  const updatePreference = ({ target: { name, value } }) => {
    setPreferences((current) => ({ ...current, [name]: name === 'travelers' ? Number(value) : value }));
  };

  return { preferences, updatePreference };
}
