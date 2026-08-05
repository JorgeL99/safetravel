import { FiArrowDown, FiArrowUp, FiMap, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { destinations } from '../../data/destinations';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlanner } from '../../hooks/usePlanner';
import '../Principal/principal.css';
import '../Principal/modern.css';

const PlannerPage = () => {
  const { favorites } = useFavorites();
  const { itinerary, toggleItinerary, moveItem, clearItinerary } = usePlanner();
  const planned = itinerary.map((id) => destinations.find((item) => item.id === id)).filter(Boolean);
  const total = planned.reduce((sum, item) => sum + item.price, 0);

  return <>
    <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
    <main className="collectionPage container section">
      <span className="eyebrow dark">Organiza tu experiencia</span>
      <h1>Mi itinerario</h1>
      <p>Ordena tus actividades y obtén una referencia inmediata de presupuesto.</p>
      {planned.length ? <div className="plannerLayout">
        <ol className="plannerList">{planned.map((destination, index) => <li key={destination.id}>
          <span className="dayNumber">{index + 1}</span><img src={destination.image} alt="" />
          <div><small>{destination.province} · {destination.duration}</small><h2>{destination.name}</h2><strong>S/ {destination.price}</strong></div>
          <div className="plannerControls">
            <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label="Mover arriba"><FiArrowUp /></button>
            <button type="button" onClick={() => moveItem(index, 1)} disabled={index === planned.length - 1} aria-label="Mover abajo"><FiArrowDown /></button>
            <button type="button" onClick={() => toggleItinerary(destination.id)} aria-label="Eliminar del itinerario"><FiTrash2 /></button>
          </div>
        </li>)}</ol>
        <aside className="budgetCard"><span>Presupuesto estimado</span><strong>S/ {total}</strong><p>{planned.length} {planned.length === 1 ? 'experiencia' : 'experiencias'} · precio por persona</p><button type="button" onClick={() => window.print()} className="primaryAction">Imprimir itinerario</button><button type="button" className="clearButton" onClick={clearItinerary}>Vaciar itinerario</button></aside>
      </div> : <div className="emptyState large"><FiMap /><h2>Tu itinerario está vacío</h2><p>Agrega experiencias desde favoritos o desde la ficha de un destino.</p><Link className="primaryAction" to="/#destinos">Descubrir experiencias</Link></div>}
    </main>
    <Footer />
  </>;
};

export default PlannerPage;
