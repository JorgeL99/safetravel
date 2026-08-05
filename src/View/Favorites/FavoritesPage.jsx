import { FiHeart, FiMap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import LocationCard from '../../Components/Popular/LocationCard';
import { destinations } from '../../data/destinations';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlanner } from '../../hooks/usePlanner';
import '../Principal/principal.css';
import '../Principal/modern.css';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { itinerary, toggleItinerary } = usePlanner();
  const saved = destinations.filter(({ id }) => favorites.includes(id));

  return <>
    <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
    <main className="collectionPage container section">
      <span className="eyebrow dark">Tu selección personal</span>
      <h1>Mis favoritos</h1>
      <p>Conserva aquí las experiencias que quieres comparar o visitar después.</p>
      {saved.length ? <div className="destinationGrid collectionGrid">
        {saved.map((destination) => <div key={destination.id} className="collectionItem">
          <LocationCard destination={destination} isFavorite onFavorite={toggleFavorite} />
          <button type="button" className="planAction" onClick={() => toggleItinerary(destination.id)}>
            <FiMap /> {itinerary.includes(destination.id) ? 'Quitar del itinerario' : 'Agregar al itinerario'}
          </button>
        </div>)}
      </div> : <div className="emptyState large"><FiHeart /><h2>Aún no guardaste destinos</h2><p>Usa el corazón de las tarjetas para crear tu colección.</p><Link className="primaryAction" to="/#destinos">Explorar destinos</Link></div>}
    </main>
    <Footer />
  </>;
};

export default FavoritesPage;
