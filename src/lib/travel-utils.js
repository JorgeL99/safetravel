export function filterDestinations(catalog, filters, activeCategory = 'Todos') {
  const query = (filters.query ?? '').trim().toLocaleLowerCase('es');
  const activityLevel = (destination) => destination.activityLevel ?? ({ Aventura: 'Alta', Naturaleza: 'Media' }[destination.category] ?? 'Baja');
  const durationGroup = (destination) => {
    const days = getDurationDays(destination.duration);
    if (days >= 4) return 'Larga';
    if (days >= 2) return 'Media';
    return 'Corta';
  };
  const region = (destination) => destination.naturalRegion ?? 'Costa';
  const filtered = catalog.filter((destination) => {
    const searchable = `${destination.name} ${destination.province} ${destination.category} ${destination.summary}`.toLocaleLowerCase('es');
    return (!query || searchable.includes(query))
      && (!filters.province || filters.province === 'Todos' || destination.province === filters.province)
      && destination.price <= Number(filters.budget ?? Infinity)
      && (!filters.region || filters.region === 'Todos' || region(destination) === filters.region)
      && (!filters.duration || filters.duration === 'Todas' || durationGroup(destination) === filters.duration)
      && (!filters.activity || filters.activity === 'Todos' || activityLevel(destination) === filters.activity)
      && (activeCategory === 'Todos' || destination.category === activeCategory);
  });
  return filtered.sort((a, b) => {
    if (filters.sort === 'priceAsc') return a.price - b.price;
    if (filters.sort === 'ratingDesc') return b.rating - a.rating;
    if (filters.sort === 'durationAsc') return getDurationDays(a.duration) - getDurationDays(b.duration);
    return 0;
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

export function calculateDetailedTripBudget(catalog, itinerary, preferences, totalDays = 0) {
  const travelers = Math.max(1, Number(preferences.travelers) || 1);
  const activitiesPerPerson = itinerary.reduce((sum, id) => sum + (catalog.find((item) => item.id === id)?.price ?? 0), 0);
  const activities = activitiesPerPerson * travelers;
  const nights = Math.max(0, totalDays - 1);
  const lodging = nights * Math.max(0, Number(preferences.lodgingPerNight) || 0);
  const transport = travelers * Math.max(0, Number(preferences.transportPerPerson) || 0);
  return { activitiesPerPerson, activities, nights, lodging, transport, total: activities + lodging + transport };
}

export function getAvailableTripDays(startDate, endDate) {
  if (!startDate || !endDate) return null;
  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  const days = Math.floor((end - start) / 86400000) + 1;
  return Number.isFinite(days) ? days : null;
}

export function addScheduleDates(schedule, startDate) {
  if (!startDate) return schedule;
  const start = new Date(`${startDate}T12:00:00`);
  if (Number.isNaN(start.getTime())) return schedule;
  const format = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short' });
  const atDay = (day) => {
    const date = new Date(start);
    date.setDate(start.getDate() + day - 1);
    return format.format(date);
  };
  return schedule.map((item) => ({ ...item, startDateLabel: atDay(item.startDay), endDateLabel: atDay(item.endDay) }));
}

export function getDurationDays(duration = '') {
  const match = String(duration).match(/(\d+)\s*d[ií]a/i);
  return match ? Number(match[1]) : 1;
}

export function calculateDistanceKm(origin, destination) {
  if (!Array.isArray(origin?.coordinates) || !Array.isArray(destination?.coordinates)) return 0;
  const [lat1, lon1] = origin.coordinates.map(Number);
  const [lat2, lon2] = destination.coordinates.map(Number);
  if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return 0;
  const radians = (degrees) => degrees * (Math.PI / 180);
  const deltaLat = radians(lat2 - lat1);
  const deltaLon = radians(lon2 - lon1);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(deltaLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function getTransferEstimate(origin, destination) {
  if (!origin) return null;
  const distanceKm = calculateDistanceKm(origin, destination);
  const amazonConnection = [origin, destination].some(({ naturalRegion, province }) => naturalRegion === 'Selva' || ['Maynas', 'Tambopata'].includes(province));
  const sameDepartment = origin.department && destination.department && origin.department === destination.department;
  const transferDays = distanceKm > 80 || amazonConnection ? 1 : 0;
  const mode = amazonConnection
    ? 'Conexión aérea, terrestre o fluvial'
    : sameDepartment || distanceKm <= 80 ? 'Traslado local o terrestre' : 'Traslado interregional';
  return { distanceKm, transferDays, mode };
}

export function buildItinerarySchedule(destinations) {
  let nextDay = 1;
  return destinations.map((destination, index) => {
    const transfer = getTransferEstimate(destinations[index - 1], destination);
    nextDay += transfer?.transferDays ?? 0;
    const days = getDurationDays(destination.duration);
    const item = { ...destination, startDay: nextDay, endDay: nextDay + days - 1, days, transfer };
    nextDay += days;
    return item;
  });
}

export function optimizeItineraryRoute(destinations) {
  if (destinations.length < 3) return [...destinations];
  const remaining = destinations.slice(1);
  const ordered = [destinations[0]];
  while (remaining.length) {
    const current = ordered.at(-1);
    let nearestIndex = 0;
    remaining.forEach((candidate, index) => {
      if (calculateDistanceKm(current, candidate) < calculateDistanceKm(current, remaining[nearestIndex])) nearestIndex = index;
    });
    ordered.push(remaining.splice(nearestIndex, 1)[0]);
  }
  return ordered;
}

export function analyzeItinerary(destinations) {
  const departments = [...new Set(destinations.map(({ department, province }) => department ?? (['Ica', 'Pisco', 'Nazca', 'Chincha'].includes(province) ? 'Ica' : province)))];
  const warnings = [];
  if (departments.length > 1) warnings.push({ type: 'distance', text: `Tu ruta combina ${departments.length} departamentos. Reserva días adicionales para los traslados entre regiones.` });
  if (destinations.some(({ naturalRegion, province }) => naturalRegion === 'Sierra' || ['Cusco', 'Arequipa', 'Puno', 'Huaraz'].includes(province))) warnings.push({ type: 'altitude', text: 'La ruta incluye destinos de altura. Considera aclimatación y evita actividades intensas al llegar.' });
  if (destinations.some(({ province }) => ['Maynas', 'Tambopata'].includes(province))) warnings.push({ type: 'connection', text: 'La Amazonía puede requerir conexiones aéreas, terrestres o fluviales y operadores autorizados.' });
  return { departments, warnings };
}
