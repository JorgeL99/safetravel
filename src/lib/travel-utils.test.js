import { describe, expect, it } from 'vitest';
import { calculateQuizResult, calculateTripBudget, filterDestinations, moveId, toggleId } from './travel-utils';

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
});
