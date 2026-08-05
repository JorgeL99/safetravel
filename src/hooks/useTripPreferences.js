import { useEffect, useState } from 'react';

const STORAGE_KEY = 'safetravel-trip-preferences';
const defaults = { startDate: '', endDate: '', travelers: 1, lodgingPerNight: 0, transportPerPerson: 0, notes: '' };

export function useTripPreferences() {
  const [preferences, setPreferences] = useState(() => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; }
    catch { return defaults; }
  });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)), [preferences]);

  const updatePreference = ({ target: { name, value } }) => {
    const numericFields = ['travelers', 'lodgingPerNight', 'transportPerPerson'];
    setPreferences((current) => ({ ...current, [name]: numericFields.includes(name) ? Number(value) : value }));
  };

  return { preferences, updatePreference };
}
