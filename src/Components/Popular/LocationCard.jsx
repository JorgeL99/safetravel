import PropTypes from 'prop-types';
import { FiArrowUpRight, FiClock, FiHeart, FiMap, FiMapPin, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './locationcard.css';

const LocationCard = ({ destination, isFavorite, onFavorite, isPlanned = false, onPlan }) => (
  <article className="destinationCard">
    <div className="destinationImage">
      <img src={destination.image} alt={destination.name} loading="lazy" />
      <span className="categoryBadge">{destination.category}</span>
      <button
        type="button"
        className={`favoriteButton ${isFavorite ? 'isFavorite' : ''}`}
        onClick={() => onFavorite(destination.id)}
        aria-label={isFavorite ? `Quitar ${destination.name} de favoritos` : `Guardar ${destination.name} en favoritos`}
      >
        <FiHeart aria-hidden="true" />
      </button>
    </div>
    <div className="destinationBody">
      <div className="cardLocation"><FiMapPin /> {destination.province}</div>
      <h3>{destination.name}</h3>
      <p>{destination.summary}</p>
      <div className="cardMeta">
        <span><FiClock /> {destination.duration}</span>
        <span><FiStar /> {destination.rating}</span>
      </div>
      <div className="cardFooter">
        <div><small>Desde</small><strong>S/ {destination.price}</strong></div>
        <Link to={`/destinos/${destination.slug}`}>Ver detalle <FiArrowUpRight /></Link>
      </div>
      {onPlan && <button type="button" className={`inlinePlan ${isPlanned ? 'active' : ''}`} onClick={() => onPlan(destination.id)}><FiMap /> {isPlanned ? 'En mi itinerario' : 'Agregar al itinerario'}</button>}
    </div>
  </article>
);

LocationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.number, slug: PropTypes.string, name: PropTypes.string, province: PropTypes.string,
    category: PropTypes.string, price: PropTypes.number, duration: PropTypes.string,
    rating: PropTypes.number, image: PropTypes.string, summary: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavorite: PropTypes.func.isRequired,
  isPlanned: PropTypes.bool,
  onPlan: PropTypes.func,
};

export default LocationCard;
