import PropTypes from 'prop-types';
import LocationCard from './LocationCard';
import './popular.css';

const Popular = ({ destinations, categories, activeCategory, onCategoryChange, favorites, onFavorite }) => (
  <section className="destinationsSection section container" id="destinos">
    <div className="sectionHeading">
      <div>
        <span className="eyebrow dark">Experiencias seleccionadas</span>
        <h2>Descubre Ica a tu manera</h2>
        <p>Compara actividades y encuentra una experiencia que encaje contigo.</p>
      </div>
      <div className="categoryFilters" aria-label="Filtrar por categoría">
        {categories.map((category) => (
          <button type="button" key={category} className={activeCategory === category ? 'active' : ''} onClick={() => onCategoryChange(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>

    {destinations.length > 0 ? (
      <div className="destinationGrid">
        {destinations.map((destination) => (
          <LocationCard key={destination.id} destination={destination} isFavorite={favorites.includes(destination.id)} onFavorite={onFavorite} />
        ))}
      </div>
    ) : (
      <div className="emptyState"><h3>No encontramos experiencias</h3><p>Prueba con otra provincia, categoría o presupuesto.</p></div>
    )}
  </section>
);

Popular.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default Popular;
