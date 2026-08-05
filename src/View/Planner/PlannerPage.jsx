import { FiAlertTriangle, FiArrowDown, FiArrowUp, FiClock, FiMap, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { destinations } from '../../data/destinations';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlanner } from '../../hooks/usePlanner';
import { useTripPreferences } from '../../hooks/useTripPreferences';
import { analyzeItinerary, buildItinerarySchedule, calculateTripBudget } from '../../lib/travel-utils';
import '../Principal/principal.css';
import '../Principal/modern.css';

const PlannerPage = () => {
  const { favorites } = useFavorites();
  const { itinerary, toggleItinerary, moveItem, clearItinerary } = usePlanner();
  const { preferences, updatePreference } = useTripPreferences();
  const planned = itinerary.map((id) => destinations.find((item) => item.id === id)).filter(Boolean);
  const schedule = buildItinerarySchedule(planned);
  const { warnings } = analyzeItinerary(planned);
  const { subtotal, total } = calculateTripBudget(destinations, itinerary, preferences.travelers);

  return <>
    <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
    <main className="collectionPage container section">
      <span className="eyebrow dark">Organiza tu experiencia</span>
      <h1>Mi itinerario</h1>
      <p>Ordena tus actividades y obtén una referencia inmediata de presupuesto.</p>
      {planned.length ? <div className="plannerLayout">
        <div><section className="tripPreferences" aria-label="Datos del viaje">
          <label>Fecha de inicio<input type="date" name="startDate" value={preferences.startDate} onChange={updatePreference} /></label>
          <label>Viajeros<input type="number" name="travelers" min="1" max="20" value={preferences.travelers} onChange={updatePreference} /></label>
          <label className="notesField">Notas<textarea name="notes" rows="3" maxLength="300" value={preferences.notes} onChange={updatePreference} placeholder="Horarios, necesidades o recordatorios…" /></label>
        </section>{warnings.length > 0 && <section className="routeWarnings" aria-label="Advertencias de la ruta"><h2><FiAlertTriangle /> Antes de confirmar la ruta</h2>{warnings.map(({ type, text }) => <p key={type}>{text}</p>)}</section>}<ol className="plannerList">{schedule.map((destination, index) => <li key={destination.id}>
          <span className="dayNumber">{destination.startDay === destination.endDay ? destination.startDay : `${destination.startDay}–${destination.endDay}`}</span><img src={destination.image} alt="" />
          <div><small>{destination.province} · {destination.duration}</small><h2>{destination.name}</h2><strong>S/ {destination.price}</strong></div>
          <div className="plannerControls">
            <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label="Mover arriba"><FiArrowUp /></button>
            <button type="button" onClick={() => moveItem(index, 1)} disabled={index === planned.length - 1} aria-label="Mover abajo"><FiArrowDown /></button>
            <button type="button" onClick={() => toggleItinerary(destination.id)} aria-label="Eliminar del itinerario"><FiTrash2 /></button>
          </div>
        </li>)}</ol><div className="scheduleSummary"><FiClock /><span>Duración estimada de experiencias</span><strong>{schedule.at(-1)?.endDay ?? 0} días</strong><small>No incluye días extra de traslado ni aclimatación.</small></div></div>
        <aside className="budgetCard"><span>Presupuesto estimado</span><strong>S/ {total}</strong><p>{planned.length} {planned.length === 1 ? 'experiencia' : 'experiencias'} · {preferences.travelers} {preferences.travelers === 1 ? 'viajero' : 'viajeros'}</p><small>Subtotal por persona: S/ {subtotal}</small>{preferences.startDate && <small>Inicio: {preferences.startDate}</small>}<button type="button" onClick={() => window.print()} className="primaryAction">Imprimir itinerario</button><button type="button" className="clearButton" onClick={clearItinerary}>Vaciar itinerario</button></aside>
      </div> : <div className="emptyState large"><FiMap /><h2>Tu itinerario está vacío</h2><p>Agrega experiencias desde favoritos o desde la ficha de un destino.</p><Link className="primaryAction" to="/#destinos">Descubrir experiencias</Link></div>}
    </main>
    <Footer />
  </>;
};

export default PlannerPage;
