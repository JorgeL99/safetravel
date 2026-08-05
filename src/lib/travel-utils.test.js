import { describe, expect, it } from 'vitest';
import { addScheduleDates, analyzeItinerary, buildItinerarySchedule, calculateDetailedTripBudget, calculateDistanceKm, calculateQuizResult, calculateTripBudget, filterDestinations, getAvailableTripDays, moveId, optimizeItineraryRoute, toggleId } from './travel-utils';

const catalog = [
  { id: 1, name: 'Huacachina', province: 'Ica', category: 'Aventura', summary: 'Dunas', price: 45 },
  { id: 2, name: 'Paracas', province: 'Pisco', category: 'Naturaleza', summary: 'Reserva marina', price: 65 },
  { id: 3, name: 'Ballestas', province: 'Pisco', category: 'Naturaleza', summary: 'Fauna marina', price: 80 },
];

describe('filterDestinations', () => {
  it('combina texto, provincia, presupuesto y categoría', () => {
    const result = filterDestinations(catalog, { query: 'marina', province: 'Pisco', budget: '70' }, 'Naturaleza');
    expect(result.map(({ id }) => id)).toEqual([2]);
  });
  it('devuelve todo cuando no hay filtros restrictivos', () => {
    expect(filterDestinations(catalog, { query: '', province: 'Todos', budget: '200' })).toHaveLength(3);
  });
  it('combina región, duración, actividad y orden', () => {
    const national = [
      { id: 1, name: 'Cusco', province: 'Cusco', category: 'Historia', summary: '', price: 180, rating: 4.9, duration: '4 días', naturalRegion: 'Sierra', activityLevel: 'Baja' },
      { id: 2, name: 'Huaraz', province: 'Huaraz', category: 'Aventura', summary: '', price: 100, rating: 4.8, duration: '4 días', naturalRegion: 'Sierra', activityLevel: 'Alta' },
    ];
    expect(filterDestinations(national, { query: '', province: 'Todos', budget: '200', region: 'Sierra', duration: 'Larga', activity: 'Alta', sort: 'priceAsc' }).map(({ id }) => id)).toEqual([2]);
  });
});

describe('itinerary intelligence', () => {
  it('distribuye experiencias según su duración', () => {
    expect(buildItinerarySchedule([{ id: 1, duration: '3 días' }, { id: 2, duration: 'Medio día' }]).map(({ startDay, endDay }) => [startDay, endDay])).toEqual([[1, 3], [4, 4]]);
  });
  it('advierte sobre distancias, altura y conexiones amazónicas', () => {
    const analysis = analyzeItinerary([{ province: 'Cusco', department: 'Cusco', naturalRegion: 'Sierra' }, { province: 'Maynas', department: 'Loreto', naturalRegion: 'Selva' }]);
    expect(analysis.warnings.map(({ type }) => type)).toEqual(['distance', 'altitude', 'connection']);
  });
  it('calcula conexiones y reserva un día entre regiones lejanas', () => {
    const route = buildItinerarySchedule([
      { id: 1, duration: '1 día', coordinates: [-12.04, -77.03], department: 'Lima' },
      { id: 2, duration: '2 días', coordinates: [-13.53, -71.97], department: 'Cusco' },
    ]);
    expect(calculateDistanceKm(route[0], route[1])).toBeGreaterThan(500);
    expect(route[1]).toMatchObject({ startDay: 3, endDay: 4, transfer: { transferDays: 1 } });
  });
  it('sugiere el vecino más cercano sin cambiar el punto de partida', () => {
    const route = optimizeItineraryRoute([
      { id: 1, coordinates: [0, 0] }, { id: 2, coordinates: [0, 10] }, { id: 3, coordinates: [0, 1] },
    ]);
    expect(route.map(({ id }) => id)).toEqual([1, 3, 2]);
  });
  it('asigna fechas de calendario sin depender de la zona horaria', () => {
    const dated = addScheduleDates([{ id: 1, startDay: 1, endDay: 2 }], '2026-08-05');
    expect(dated[0].startDateLabel).toMatch(/^5 ago/);
    expect(dated[0].endDateLabel).toMatch(/^6 ago/);
    expect(getAvailableTripDays('2026-08-05', '2026-08-08')).toBe(4);
  });
});

describe('calculateQuizResult', () => {
  it('calcula destino, segunda opción y compatibilidad', () => {
    expect(calculateQuizResult({ Ica: 1, Nazca: 3, Pisco: 2, Chincha: 0 }, 5)).toEqual({ destination: 'Nazca', secondChoice: 'Pisco', compatibility: 60 });
  });
});

describe('collections and planning', () => {
  it('agrega y elimina identificadores', () => {
    expect(toggleId([1], 2)).toEqual([1, 2]);
    expect(toggleId([1, 2], 1)).toEqual([2]);
  });
  it('reordena sin salir de los límites', () => {
    expect(moveId([1, 2, 3], 1, -1)).toEqual([2, 1, 3]);
    expect(moveId([1, 2], 0, -1)).toEqual([1, 2]);
  });
  it('calcula subtotal y total por viajeros', () => {
    expect(calculateTripBudget(catalog, [1, 2], 3)).toEqual({ subtotal: 110, total: 330 });
  });
  it('desglosa actividades, alojamiento y traslados', () => {
    expect(calculateDetailedTripBudget(catalog, [1, 2], { travelers: 2, lodgingPerNight: 120, transportPerPerson: 80 }, 3)).toEqual({
      activitiesPerPerson: 110, activities: 220, nights: 2, lodging: 240, transport: 160, total: 620,
    });
  });
});
