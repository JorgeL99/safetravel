import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./quizcard.css";
import LocationCard from "../Popular/LocationCard.jsx";
import { destinations as destinationCatalog } from "../../data/destinations";
import { useFavorites } from "../../hooks/useFavorites";
import { usePlanner } from "../../hooks/usePlanner";
import { expertDestinations, expertQuestions, expertRules } from "../../data/expert-knowledge";
import { buildFacts, inferDestination } from "../../lib/expert-system";
import { Link } from "react-router-dom";

const QuizCard = ({ onShowConfetti }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(expertQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [inference, setInference] = useState(null);
  const questionHeadingRef = useRef(null);
  const { favorites, toggleFavorite } = useFavorites();
  const { itinerary, toggleItinerary } = usePlanner();

  const selectedAnswer = answers[currentQuestion];
  const expertResult = inference?.recommendation;
  const destinationResult = expertResult?.destination;
  const confidenceAssessment = inference?.assessment;
  const recommendedDestination = destinationCatalog.find(({ province }) => province === destinationResult?.catalogProvince);
  const confidenceGap = expertResult && inference?.alternatives?.[0] ? expertResult.certainty - inference.alternatives[0].certainty : 0;
  const factLabels = { region: 'Región', interest: 'Interés', climate: 'Clima', activity: 'Ritmo', altitude: 'Altitud', duration: 'Duración', budget: 'Presupuesto' };
  const travelNotice = destinationResult?.naturalRegion === 'Sierra'
    ? 'La altura puede exigir aclimatación; reserva un inicio tranquilo y consulta a un profesional si tienes una condición médica.'
    : destinationResult?.naturalRegion === 'Selva'
      ? 'Verifica clima, accesos, repelente y orientación sanitaria antes de contratar excursiones amazónicas.'
      : 'Confirma tiempos terrestres, protección solar y condiciones del operador antes de reservar.';

  useEffect(() => {
    if (quizStarted && !showResult) questionHeadingRef.current?.focus();
  }, [currentQuestion, quizStarted, showResult]);

  const selectAnswer = (option) => {
    setAnswers((current) => current.map((answer, index) => (
      index === currentQuestion ? option : answer
    )));
  };

  const showQuizResult = () => {
    const result = inferDestination(buildFacts(answers), expertRules, expertDestinations);
    setInference(result);
    sessionStorage.setItem("safetravel-expert-result", JSON.stringify(result));
    setShowResult(true);
    onShowConfetti(true);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;
    if (currentQuestion < expertQuestions.length - 1) setCurrentQuestion((current) => current + 1);
    else showQuizResult();
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((current) => current - 1);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers(Array(expertQuestions.length).fill(null));
    setShowResult(false);
    setInference(null);
    onShowConfetti(false);
  };

  return (
    <section className={`card ${showResult ? "resultCard" : ""}`} aria-label="Recomendador de destinos">
      {quizStarted && !showResult && (
        <div className="progressSection">
          <p className="questionCounter">Pregunta {currentQuestion + 1} de {expertQuestions.length}</p>
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="Progreso del cuestionario"
            aria-valuemin="1"
            aria-valuemax={expertQuestions.length}
            aria-valuenow={currentQuestion + 1}
          >
            <div className="progress" style={{ width: `${((currentQuestion + 1) / expertQuestions.length) * 100}%` }} />
          </div>
        </div>
      )}

      {!quizStarted ? (
        <>
          <div className="result">
            <h1>Bienvenido al Quiz de Destino Turístico en Perú</h1>
            <p>Responde cinco preguntas y descubre el destino que mejor encaja contigo.</p>
          </div>
          <div className="ctn-inicio">
            <button className="btn-prueba" onClick={() => setQuizStarted(true)}>Iniciar</button>
          </div>
        </>
      ) : showResult ? (
        <>
          <div className="result" aria-live="polite">
            <span className={`expertBadge ${confidenceAssessment?.status === 'insufficient' ? 'isUncertain' : ''}`}>Sistema experto · {destinationResult.naturalRegion}</span>
            <h1>{confidenceAssessment?.isSufficient ? `Tu destino recomendado es: ${destinationResult.name}` : `Mejor coincidencia provisional: ${destinationResult.name}`}</h1>
            <p className="compatibility"><strong>{expertResult.certainty}% de compatibilidad interna</strong></p>
            {confidenceAssessment?.status === 'insufficient' && <div className="insufficientEvidence" role="status"><strong>No existe evidencia suficiente para una recomendación única.</strong><ul>{confidenceAssessment.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><p>Compara las alternativas y revisa el análisis antes de decidir.</p></div>}
            <p>{destinationResult.summary}</p>
            <div className="expertProfile" aria-label="Perfil de viaje detectado">
              <h2>Tu perfil detectado</h2>
              <dl>{Object.entries(inference.facts).map(([key, value]) => <div key={key}><dt>{factLabels[key] ?? key}</dt><dd>{value}</dd></div>)}</dl>
            </div>
            <div className="expertExplanation">
              <h2>¿Cómo llegó a esta conclusión?</h2>
              <ul>
                {expertResult.activations.slice(0, 3).map((activation) => (
                  <li key={activation.ruleId}><strong>{activation.ruleId}</strong> {activation.explanation}</li>
                ))}
              </ul>
            </div>
            <div className="expertAttractions">
              <h2>Lugares destacados</h2>
              <ul>{destinationResult.attractions.map((attraction) => <li key={attraction}>{attraction}</li>)}</ul>
            </div>
            <p className="expertAlternatives"><strong>También podrías considerar:</strong> {inference.alternatives.map(({ destination }) => destination.name).join(" y ")}.</p>
            <div className="expertDecisionNote"><strong>Qué significa el resultado</strong><p>La primera opción supera a la siguiente por {confidenceGap} puntos. El mínimo definido es {confidenceAssessment?.thresholds.minimumGap ?? 4}; esta cifra expresa compatibilidad con las reglas, no una garantía estadística.</p></div>
            <div className="expertTravelNotice"><strong>Antes de decidir</strong><p>{travelNotice}</p></div>
          </div>
          <div className="resultRecommendationLayout">
            {recommendedDestination && (
              <LocationCard
                destination={recommendedDestination}
                isFavorite={favorites.includes(recommendedDestination.id)}
                onFavorite={toggleFavorite}
                isPlanned={itinerary.includes(recommendedDestination.id)}
                onPlan={toggleItinerary}
              />
            )}
            <div className="resultActions" aria-label="Acciones del resultado">
              <Link className="expertPanelLink" to="/sistema-experto">Ver análisis técnico</Link>
              <button className="restartResultButton" onClick={handleRestartQuiz}>Reiniciar quiz</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="textin">
            <h1 ref={questionHeadingRef} tabIndex="-1">{expertQuestions[currentQuestion].question}</h1>
            <p className="selectionHint">Selecciona una alternativa y continúa.</p>
          </div>
          <div className="ctn-button" role="radiogroup" aria-label={expertQuestions[currentQuestion].question}>
            {expertQuestions[currentQuestion].options.map((option) => {
              const isSelected = selectedAnswer?.answerText === option.answerText;
              return (
                <button
                  className={`btn-prueba ${isSelected ? "is-selected" : ""}`}
                  key={option.answerText}
                  onClick={() => selectAnswer(option)}
                  role="radio"
                  aria-checked={isSelected}
                >
                  {option.answerText}
                </button>
              );
            })}
          </div>
          <div className="quizNavigation">
            <button className="navButton navButtonSecondary" onClick={handlePrevious} disabled={currentQuestion === 0}>Atrás</button>
            <button className="navButton navButtonPrimary" onClick={handleNext} disabled={!selectedAnswer}>
              {currentQuestion === expertQuestions.length - 1 ? "Ver resultado" : "Continuar"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

QuizCard.propTypes = { onShowConfetti: PropTypes.func.isRequired };

export default QuizCard;
