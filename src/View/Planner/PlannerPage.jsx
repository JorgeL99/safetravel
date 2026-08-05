import { FiAlertTriangle, FiArrowDown, FiArrowUp, FiCalendar, FiClock, FiDollarSign, FiMap, FiNavigation, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { destinations } from '../../data/destinations';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlanner } from '../../hooks/usePlanner';
import { useTripPreferences } from '../../hooks/useTripPreferences';
import { addScheduleDates, analyzeItinerary, buildItinerarySchedule, calculateDetailedTripBudget, getAvailableTripDays, optimizeItineraryRoute } from '../../lib/travel-utils';
import '../Principal/principal.css';
import '../Principal/modern.css';

const PlannerPage = () => {
  const { favorites } = useFavorites();
  const { itinerary, toggleItinerary, moveItem, clearItinerary, replaceItinerary } = usePlanner();
  const { preferences, updatePreference } = useTripPreferences();
  const planned = itinerary.map((id) => destinations.find((item) => item.id === id)).filter(Boolean);
  const baseSchedule = buildItinerarySchedule(planned);
  const schedule = addScheduleDates(baseSchedule, preferences.startDate);
  const totalDays = schedule.at(-1)?.endDay ?? 0;
  const availableDays = getAvailableTripDays(preferences.startDate, preferences.endDate);
  const dayDifference = availableDays === null ? null : availableDays - totalDays;
  const suggestedRoute = optimizeItineraryRoute(planned);
  const routeChanged = suggestedRoute.some(({ id }, index) => id !== planned[index]?.id);
  const transferDays = schedule.reduce((sum, item) => sum + (item.transfer?.transferDays ?? 0), 0);
  const { warnings } = analyzeItinerary(planned);
  const budget = calculateDetailedTripBudget(destinations, itinerary, preferences, totalDays);

  return <>
    <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
    <main className="collectionPage container section">
      <span className="eyebrow dark">Organiza tu experiencia</span>
      <h1>Mi itinerario</h1>
      <p>Construye una referencia de fechas, conexiones y presupuesto antes de confirmar con operadores formales.</p>
      {planned.length ? <div className="plannerLayout">
        <div>
          <section className="tripPreferences" aria-label="Datos del viaje">
            <label>Fecha de inicio<input type="date" name="startDate" value={preferences.startDate} onChange={updatePreference} /></label>
            <label>Fecha de regreso<input type="date" name="endDate" min={preferences.startDate || undefined} value={preferences.endDate} onChange={updatePreference} /></label>
            <label>Viajeros<input type="number" name="travelers" min="1" max="20" value={preferences.travelers} onChange={updatePreference} /></label>
            <label>Alojamiento por noche<input type="number" name="lodgingPerNight" min="0" step="10" value={preferences.lodgingPerNight} onChange={updatePreference} aria-describedby="lodging-help" /><small id="lodging-help">S/ por habitación o grupo</small></label>
            <label>Traslados por viajero<input type="number" name="transportPerPerson" min="0" step="10" value={preferences.transportPerPerson} onChange={updatePreference} /><small>Estimación editable en soles</small></label>
            <label className="notesField">Notas<textarea name="notes" rows="3" maxLength="300" value={preferences.notes} onChange={updatePreference} placeholder="Horarios, necesidades o recordatorios…" /></label>
          </section>

          {dayDifference !== null && <section className={`dateFeasibility ${dayDifference < 0 ? 'isConflict' : 'isFeasible'}`} aria-live="polite">
            <FiCalendar /><div><strong>{dayDifference < 0 ? `Faltan ${Math.abs(dayDifference)} días para completar la ruta` : dayDifference === 0 ? 'Las fechas coinciden con la duración estimada' : `Tienes ${dayDifference} días libres en el viaje`}</strong><p>{dayDifference < 0 ? 'Amplía las fechas o retira experiencias antes de reservar.' : 'Puedes usarlos como descanso, aclimatación o margen ante cambios.'}</p></div>
          </section>}

          {planned.length > 2 && <section className="routeOptimizer">
            <div><FiNavigation /><span><strong>Orden inteligente</strong><small>Reduce saltos innecesarios usando la cercanía geográfica.</small></span></div>
            <button type="button" disabled={!routeChanged} onClick={() => replaceItinerary(suggestedRoute.map(({ id }) => id))}>{routeChanged ? 'Aplicar ruta sugerida' : 'La ruta ya está optimizada'}</button>
          </section>}
          {warnings.length > 0 && <section className="routeWarnings" aria-label="Advertencias de la ruta"><h2><FiAlertTriangle /> Antes de confirmar la ruta</h2>{warnings.map(({ type, text }) => <p key={type}>{text}</p>)}</section>}

          <ol className="plannerList">{schedule.map((destination, index) => <li key={destination.id}>
            <span className="dayNumber">{destination.startDay === destination.endDay ? destination.startDay : `${destination.startDay}–${destination.endDay}`}</span><img src={destination.image} alt="" />
            <div>{destination.transfer && <span className="transferDetail"><FiNavigation /> {destination.transfer.distanceKm} km aprox. · {destination.transfer.mode}{destination.transfer.transferDays ? ' · 1 día reservado' : ''}</span>}<small>{destination.startDateLabel && <>{destination.startDateLabel}{destination.startDateLabel !== destination.endDateLabel ? `–${destination.endDateLabel}` : ''} · </>}{destination.province} · {destination.duration}</small><h2>{destination.name}</h2><strong>S/ {destination.price} por persona</strong></div>
            <div className="plannerControls">
              <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} aria-label="Mover arriba"><FiArrowUp /></button>
              <button type="button" onClick={() => moveItem(index, 1)} disabled={index === planned.length - 1} aria-label="Mover abajo"><FiArrowDown /></button>
              <button type="button" onClick={() => toggleItinerary(destination.id)} aria-label="Eliminar del itinerario"><FiTrash2 /></button>
            </div>
          </li>)}</ol>
          <div className="scheduleSummary"><FiClock /><span>Duración total estimada</span><strong>{totalDays} días</strong><small>Incluye {transferDays} {transferDays === 1 ? 'día' : 'días'} de traslado. Las distancias son lineales y deben confirmarse con el operador.</small></div>
        </div>

        <aside className="budgetCard">
          <span>Presupuesto estimado</span><strong>S/ {budget.total}</strong><p>{planned.length} {planned.length === 1 ? 'experiencia' : 'experiencias'} · {preferences.travelers} {preferences.travelers === 1 ? 'viajero' : 'viajeros'}</p>
          <dl className="budgetBreakdown">
            <div><dt>Experiencias</dt><dd>S/ {budget.activities}</dd></div>
            <div><dt>Alojamiento · {budget.nights} noches</dt><dd>S/ {budget.lodging}</dd></div>
            <div><dt>Traslados estimados</dt><dd>S/ {budget.transport}</dd></div>
          </dl>
          <small><FiDollarSign /> Valores referenciales; no incluyen alimentación ni comisiones.</small>
          {preferences.startDate && <small>Inicio: {preferences.startDate}</small>}
          <button type="button" onClick={() => window.print()} className="primaryAction">Imprimir itinerario</button><button type="button" className="clearButton" onClick={clearItinerary}>Vaciar itinerario</button>
        </aside>
      </div> : <div className="emptyState large"><FiMap /><h2>Tu itinerario está vacío</h2><p>Agrega experiencias desde favoritos o desde la ficha de un destino.</p><Link className="primaryAction" to="/#destinos">Descubrir experiencias</Link></div>}
    </main>
    <Footer />
  </>;
};

export default PlannerPage;
