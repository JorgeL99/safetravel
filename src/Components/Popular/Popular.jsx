import PropTypes from 'prop-types';
import { FiRotateCcw, FiSliders } from 'react-icons/fi';
import LocationCard from './LocationCard';
import './popular.css';

const Popular = ({ destinations, categories, activeCategory, onCategoryChange, filters, onFilterChange, onResetFilters, favorites, onFavorite, itinerary, onPlan }) => {
  const advancedCount = ['region', 'duration', 'activity'].filter((key) => filters[key] && !['Todos', 'Todas'].includes(filters[key])).length;
  return <section className="destinationsSection section container" id="destinos">
    <div className="sectionHeading">
      <div>
        <span className="eyebrow dark">Experiencias seleccionadas</span>
        <h2>Descubre el Perú a tu manera</h2>
        <p>Compara experiencias de Costa, Sierra y Selva para encontrar la que encaje contigo.</p>
      </div>
      <div className="categoryFilters" aria-label="Filtrar por categoría">
        {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'active' : ''} onClick={() => onCategoryChange(category)}>{category}</button>)}
      </div>
    </div>

    <section className="advancedFilters" aria-label="Filtros nacionales avanzados">
      <div className="advancedFilterTitle"><FiSliders /><span><strong>Afina tu búsqueda</strong><small>{advancedCount ? `${advancedCount} filtros activos` : 'Explora todo el catálogo nacional'}</small></span></div>
      <label>Región natural<select name="region" value={filters.region} onChange={onFilterChange}><option>Todos</option><option>Costa</option><option>Sierra</option><option>Selva</option></select></label>
      <label>Duración<select name="duration" value={filters.duration} onChange={onFilterChange}><option value="Todas">Todas</option><option value="Corta">Hasta 1 día</option><option value="Media">2–3 días</option><option value="Larga">4 días o más</option></select></label>
      <label>Actividad<select name="activity" value={filters.activity} onChange={onFilterChange}><option>Todos</option><option>Baja</option><option>Media</option><option>Alta</option></select></label>
      <label>Ordenar<select name="sort" value={filters.sort} onChange={onFilterChange}><option value="recommended">Recomendados</option><option value="priceAsc">Menor precio</option><option value="ratingDesc">Mejor valoración</option><option value="durationAsc">Menor duración</option></select></label>
      <button type="button" className="resetFilters" onClick={onResetFilters}><FiRotateCcw /> Limpiar</button>
    </section>

    {destinations.length > 0 ? <><p className="resultsCount" aria-live="polite">{destinations.length} {destinations.length === 1 ? 'experiencia encontrada' : 'experiencias encontradas'}</p><div className="destinationGrid">{destinations.map((destination) => <LocationCard key={destination.id} destination={destination} isFavorite={favorites.includes(destination.id)} onFavorite={onFavorite} isPlanned={itinerary.includes(destination.id)} onPlan={onPlan} />)}</div></> : <div className="emptyState"><h3>No encontramos experiencias</h3><p>Prueba una región, duración, actividad o presupuesto diferente.</p><button type="button" onClick={onResetFilters}>Restablecer filtros</button></div>}
  </section>;
};

Popular.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.object).isRequired, categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired, onCategoryChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired, onFilterChange: PropTypes.func.isRequired, onResetFilters: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired, onFavorite: PropTypes.func.isRequired,
  itinerary: PropTypes.arrayOf(PropTypes.number).isRequired, onPlan: PropTypes.func.isRequired,
};

export default Popular;
