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
