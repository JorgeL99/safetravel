export function filterDestinations(catalog, filters, activeCategory = 'Todos') {
  const query = filters.query.trim().toLocaleLowerCase('es');
  return catalog.filter((destination) => {
    const searchable = `${destination.name} ${destination.province} ${destination.category} ${destination.summary}`.toLocaleLowerCase('es');
    return (!query || searchable.includes(query))
      && (filters.province === 'Todos' || destination.province === filters.province)
      && destination.price <= Number(filters.budget)
      && (activeCategory === 'Todos' || destination.category === activeCategory);
  });
}

export function calculateQuizResult(scores, questionCount) {
  const ranking = Object.entries(scores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);
  const [destination, topScore = 0] = ranking[0] ?? ['', 0];
  return {
    destination,
    secondChoice: ranking.find(([province]) => province !== destination)?.[0] ?? '',
    compatibility: questionCount ? Math.round((topScore / questionCount) * 100) : 0,
  };
}

export const toggleId = (items, id) => items.includes(id) ? items.filter((itemId) => itemId !== id) : [...items, id];

export function moveId(items, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const ordered = [...items];
  [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
  return ordered;
}

export function calculateTripBudget(catalog, itinerary, travelers = 1) {
  const subtotal = itinerary.reduce((sum, id) => sum + (catalog.find((item) => item.id === id)?.price ?? 0), 0);
  return { subtotal, total: subtotal * Math.max(1, Number(travelers) || 1) };
}

export function getDurationDays(duration = '') {
  const match = String(duration).match(/(\d+)\s*d[ií]a/i);
  return match ? Number(match[1]) : 1;
}

export function buildItinerarySchedule(destinations) {
  let nextDay = 1;
  return destinations.map((destination) => {
    const days = getDurationDays(destination.duration);
    const item = { ...destination, startDay: nextDay, endDay: nextDay + days - 1, days };
    nextDay += days;
    return item;
  });
}

export function analyzeItinerary(destinations) {
  const departments = [...new Set(destinations.map(({ department, province }) => department ?? (['Ica', 'Pisco', 'Nazca', 'Chincha'].includes(province) ? 'Ica' : province)))];
  const warnings = [];
  if (departments.length > 1) warnings.push({ type: 'distance', text: `Tu ruta combina ${departments.length} departamentos. Reserva días adicionales para los traslados entre regiones.` });
  if (destinations.some(({ naturalRegion, province }) => naturalRegion === 'Sierra' || ['Cusco', 'Arequipa', 'Puno', 'Huaraz'].includes(province))) warnings.push({ type: 'altitude', text: 'La ruta incluye destinos de altura. Considera aclimatación y evita actividades intensas al llegar.' });
  if (destinations.some(({ province }) => ['Maynas', 'Tambopata'].includes(province))) warnings.push({ type: 'connection', text: 'La Amazonía puede requerir conexiones aéreas, terrestres o fluviales y operadores autorizados.' });
  return { departments, warnings };
}
