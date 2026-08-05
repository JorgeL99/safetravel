import { describe, expect, it } from 'vitest';
import { destinations } from '../data/destinations';
import { expertDestinations, expertRules } from '../data/expert-knowledge';

describe('unified tourism knowledge base', () => {
  it('mantiene identificadores y rutas únicas', () => {
    expect(new Set(destinations.map(({ id }) => id)).size).toBe(destinations.length);
    expect(new Set(destinations.map(({ slug }) => slug)).size).toBe(destinations.length);
  });

  it('incluye los campos turísticos necesarios y una fuente', () => {
    destinations.forEach((destination) => {
      expect(destination).toEqual(expect.objectContaining({
        name: expect.any(String), province: expect.any(String), category: expect.any(String),
        coordinates: expect.any(Array), highlights: expect.any(Array), sourceUrl: expect.stringMatching(/^https:\/\//),
      }));
    });
  });

  it('deriva todas las hipótesis expertas del catálogo', () => {
    expect(expertDestinations).toHaveLength(destinations.filter(({ expertId }) => expertId).length);
    expertDestinations.forEach((hypothesis) => {
      const catalogDestination = destinations.find(({ expertId }) => expertId === hypothesis.id);
      expect(hypothesis.summary).toBe(catalogDestination.summary);
      expect(hypothesis.attractions).toBe(catalogDestination.highlights);
      expect(hypothesis.sourceUrl).toBe(catalogDestination.sourceUrl);
    });
  });

  it('mantiene dos reglas trazables por cada hipótesis', () => {
    expertDestinations.forEach(({ id }) => {
      expect(expertRules.filter(({ destination }) => destination === id)).toHaveLength(2);
    });
    expertRules.forEach(({ destination }) => expect(expertDestinations.some(({ id }) => id === destination)).toBe(true));
  });
});
