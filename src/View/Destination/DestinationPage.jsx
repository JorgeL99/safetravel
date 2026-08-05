import { Navigate, Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiClock, FiCompass, FiMapPin, FiShield, FiStar, FiSun, FiUsers } from 'react-icons/fi';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { findDestination } from '../../data/destinations';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlanner } from '../../hooks/usePlanner';
import DestinationMap from '../../Components/Map/DestinationMap';
import '../Principal/principal.css';
import '../Principal/modern.css';

const DestinationPage = () => {
  const { slug } = useParams();
  const destination = findDestination(slug);
  const { favorites, toggleFavorite } = useFavorites();
  const { itinerary, toggleItinerary } = usePlanner();
  if (!destination) return <Navigate to="/" replace />;

  return (
    <>
      <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
      <main className="detailPage">
        <div className="detailHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(4,24,31,.88), rgba(4,24,31,.18)), url(${destination.image})` }}>
          <div className="container detailHeroContent">
            <Link to="/#destinos" className="backLink"><FiArrowLeft /> Volver a destinos</Link>
            <span className="eyebrow">{destination.category}</span>
            <h1>{destination.name}</h1>
            <p>{destination.summary}</p>
            <div className="detailMeta"><span><FiMapPin /> {destination.province}</span><span><FiClock /> {destination.duration}</span><span><FiStar /> {destination.rating}</span></div>
          </div>
        </div>
        <section className="detailContent container section">
          <div>
            <span className="eyebrow dark">Una experiencia memorable</span>
            <h2>¿Por qué visitar {destination.name}?</h2>
            <p>{destination.summary} Esta experiencia combina acompañamiento local, información práctica y tiempo suficiente para disfrutar cada momento sin prisas.</p>
            <h3>Lo más destacado</h3>
            <ul className="highlightList">{destination.highlights.map((highlight) => <li key={highlight}><FiCheckCircle /> {highlight}</li>)}</ul>
          </div>
          <aside className="bookingCard">
            <span>Precio referencial desde</span><strong>S/ {destination.price}</strong>
            <p>Por persona · sujeto a disponibilidad</p>
            <Link to="/quiz" className="primaryAction">Ver si es para mí</Link>
            <button type="button" className="planAction" onClick={() => toggleFavorite(destination.id)}>{favorites.includes(destination.id) ? 'Quitar de favoritos' : 'Guardar en favoritos'}</button>
            <button type="button" className="planAction" onClick={() => toggleItinerary(destination.id)}>{itinerary.includes(destination.id) ? 'Quitar del itinerario' : 'Agregar al itinerario'}</button>
            <small>SafeTravel no procesa pagos en esta versión.</small>
          </aside>
        </section>
        <section className="practicalSection container section">
          <div className="sectionHeading"><div><span className="eyebrow dark">Información para planificar</span><h2>Antes de visitar</h2><p>Datos referenciales que te ayudarán a preparar una experiencia más segura.</p></div></div>
          <div className="practicalGrid">
            <article><FiSun /><h3>Clima y temporada</h3><p>{destination.climate}</p><strong>{destination.bestSeason}</strong></article>
            <article><FiClock /><h3>Horario recomendado</h3><p>{destination.schedule}</p></article>
            <article><FiCompass /><h3>Cómo llegar</h3><p>{destination.access}</p></article>
            <article><FiShield /><h3>Seguridad</h3><p>{destination.safety}</p></article>
            <article><FiUsers /><h3>Accesibilidad</h3><p>{destination.accessibility}</p></article>
          </div>
          <div className="packingCard"><h3>Qué llevar</h3><ul>{destination.whatToBring.map((item) => <li key={item}><FiCheckCircle /> {item}</li>)}</ul></div>
          <p className="sourceNote">Fuente de referencia: <a href={destination.sourceUrl} target="_blank" rel="noreferrer">{destination.sourceName}</a>. Verifica horarios y tarifas antes de viajar.</p>
        </section>
        <section className="mapSection container section">
          <div><span className="eyebrow dark">Ubicación referencial</span><h2>Encuentra {destination.name}</h2><p>Usa el mapa para reconocer la zona. Confirma siempre tu ruta con operadores locales formales.</p></div>
          <DestinationMap destination={destination} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DestinationPage;
