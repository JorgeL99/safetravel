import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiCheckCircle, FiCpu, FiInfo, FiXCircle } from "react-icons/fi";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { expertDestinations, expertQuestions, expertRules } from "../../data/expert-knowledge";
import { inferDestination } from "../../lib/expert-system";
import "./expert-panel.css";

const factLabels = Object.fromEntries(expertQuestions.map(({ id, question }) => [id, question]));
const statusLabels = { complete: "Completa", partial: "Parcial", discarded: "Descartada" };

const readStoredInference = () => {
  try {
    return JSON.parse(sessionStorage.getItem("safetravel-expert-result"));
  } catch {
    return null;
  }
};

const ExpertPanel = () => {
  const [filter, setFilter] = useState("all");
  const storedInference = useMemo(readStoredInference, []);
  const inference = storedInference ?? inferDestination({}, expertRules, expertDestinations);
  const evaluations = inference.ruleEvaluations ?? inferDestination(inference.facts ?? {}, expertRules, expertDestinations).ruleEvaluations;
  const visibleRules = filter === "all" ? evaluations : evaluations.filter(({ status }) => status === filter);
  const destinationById = Object.fromEntries(expertDestinations.map((destination) => [destination.id, destination]));

  return (
    <>
      <Navbar />
      <main className="expertPanelPage">
        <section className="expertPanelHero">
          <div className="container">
            <Link className="panelBack" to="/quiz"><FiArrowLeft /> Volver al recomendador</Link>
            <span className="panelEyebrow"><FiCpu /> Panel académico</span>
            <h1>Motor de inferencia de SafeTravel</h1>
            <p>Visualización transparente de la base de hechos, reglas de producción, factores de certeza y ranking generado por el sistema experto.</p>
          </div>
        </section>

        <div className="container expertPanelContent">
          {!storedInference && (
            <div className="panelNotice"><FiInfo /><div><strong>Aún no existe una consulta.</strong><p>Completa el quiz para observar reglas evaluadas con tus respuestas. Mientras tanto se muestra la base de conocimiento sin hechos.</p></div></div>
          )}

          <section className="panelSection">
            <div className="panelHeading"><div><span>01 · Memoria de trabajo</span><h2>Base de hechos</h2></div><small>{Object.keys(inference.facts ?? {}).length} hechos registrados</small></div>
            {Object.keys(inference.facts ?? {}).length ? (
              <dl className="factsGrid">{Object.entries(inference.facts).map(([key, value]) => <div key={key}><dt>{factLabels[key] ?? key}</dt><dd>{value}</dd></div>)}</dl>
            ) : <p className="panelEmpty">No hay hechos disponibles hasta completar una consulta.</p>}
          </section>

          <section className="panelSection">
            <div className="panelHeading"><div><span>02 · Resultado inferido</span><h2>Ranking de destinos</h2></div><small>{inference.ranking.length} hipótesis evaluadas</small></div>
            <div className="rankingList">{inference.ranking.map(({ destination, certainty }, index) => (
              <article key={destination.id} className={index === 0 && storedInference ? "rankingWinner" : ""}>
                <span className="rankNumber">{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{destination.name}</strong><small>{destination.naturalRegion} · {destination.department}</small></div>
                <div className="certaintyTrack" aria-label={`${certainty}% de certeza`}><span style={{ width: `${certainty}%` }} /></div>
                <b>{certainty}%</b>
              </article>
            ))}</div>
          </section>

          <section className="panelSection">
            <div className="panelHeading"><div><span>03 · Base de conocimiento</span><h2>Reglas de producción</h2></div><small>{expertRules.length} reglas documentadas</small></div>
            <div className="ruleFilters" aria-label="Filtrar reglas">
              {[['all', 'Todas'], ['complete', 'Completas'], ['partial', 'Parciales'], ['discarded', 'Descartadas']].map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}
            </div>
            <div className="rulesTableWrap"><table className="rulesTable">
              <thead><tr><th>Regla</th><th>Conclusión</th><th>Condiciones SI</th><th>Peso</th><th>Cobertura</th><th>Estado</th></tr></thead>
              <tbody>{visibleRules.map((rule) => <tr key={rule.id}>
                <td><strong>{rule.id}</strong></td><td>{destinationById[rule.destination]?.name}</td>
                <td>{Object.entries(rule.conditions).map(([key, values]) => <span className="condition" key={key}>{key}: {values.join("/")}</span>)}</td>
                <td>{rule.weight.toFixed(2)}</td><td>{Math.round(rule.coverage * 100)}%</td>
                <td><span className={`ruleStatus ${rule.status}`}>{rule.status === "discarded" ? <FiXCircle /> : <FiCheckCircle />}{statusLabels[rule.status]}</span></td>
              </tr>)}</tbody>
            </table></div>
          </section>

          <section className="panelSection formulaSection">
            <FiBookOpen />
            <div><span>04 · Método de cálculo</span><h2>Factor de certeza</h2>
              <p>Cada regla calcula <code>FC regla = peso × condiciones coincidentes / condiciones totales</code>. Cuando varias reglas respaldan un destino se combinan mediante <code>FC combinado = FC anterior + FC nuevo × (1 − FC anterior)</code>.</p>
              <p>Este método evita superar el 100% y conserva la contribución incremental de cada evidencia. Los porcentajes representan confianza interna del modelo, no una probabilidad estadística ni una garantía de viaje.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExpertPanel;
