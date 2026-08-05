import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./quizcard.css";
import LocationCard from "../Popular/LocationCard.jsx";
import { destinations as destinationCatalog } from "../../data/destinations";
import { useFavorites } from "../../hooks/useFavorites";
import { usePlanner } from "../../hooks/usePlanner";
import { calculateQuizResult } from "../../lib/travel-utils";

const questions = [
  {
    question: "¿Qué tipo de comida prefieres?",
    options: [
      { answerText: "Ceviche fresco y mariscos", destination: "Pisco" },
      { answerText: "Deliciosos platos típicos peruanos como el cuy al horno", destination: "Nazca" },
      { answerText: "Vino y comida gourmet en viñedos", destination: "Ica" },
      { answerText: "Comida criolla con influencias afroperuanas", destination: "Chincha" },
    ],
  },
  {
    question: "¿Qué clima te resulta más atractivo?",
    options: [
      { answerText: "Cálido y desértico", destination: "Nazca" },
      { answerText: "Cálido con brisa fresca del mar", destination: "Pisco" },
      { answerText: "Soleado y baja humedad", destination: "Ica" },
      { answerText: "Tropical con influencia costera", destination: "Chincha" },
    ],
  },
  {
    question: "¿Qué tipo de actividades culturales te interesan más?",
    options: [
      { answerText: "Sobrevolar en avioneta", destination: "Nazca" },
      { answerText: "Explorar sitios arqueológicos antiguos", destination: "Nazca" },
      { answerText: "Visitar bodegas y degustar vinos", destination: "Ica" },
      { answerText: "Disfrutar de música y bailes afroperuanos", destination: "Chincha" },
      { answerText: "Visitar una reserva nacional", destination: "Pisco" },
    ],
  },
  {
    question: "¿Cuál es tu presupuesto aproximado para actividades turísticas?",
    options: [
      { answerText: "Económico", destination: "Chincha" },
      { answerText: "Moderado", destination: "Ica" },
      { answerText: "Flexible", destination: "Pisco" },
      { answerText: "Prefiero opciones económicas pero auténticas", destination: "Nazca" },
    ],
  },
  {
    question: "¿Qué tipo de lugares turísticos te gustaría visitar?",
    options: [
      { answerText: "Vistas aéreas o miradores", destination: "Nazca" },
      { answerText: "Bodega Tabernero", destination: "Chincha" },
      { answerText: "Fundos y viñedos", destination: "Ica" },
      { answerText: "Haciendas y casonas históricas", destination: "Pisco" },
    ],
  },
];

const emptyScores = { Ica: 0, Nazca: 0, Pisco: 0, Chincha: 0 };

const QuizCard = ({ onShowConfetti }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [destinationResult, setDestinationResult] = useState("");
  const questionHeadingRef = useRef(null);
  const { favorites, toggleFavorite } = useFavorites();
  const { itinerary, toggleItinerary } = usePlanner();

  const selectedAnswer = answers[currentQuestion];
  const scores = answers.reduce(
    (totals, answer) => answer
      ? { ...totals, [answer.destination]: totals[answer.destination] + 1 }
      : totals,
    emptyScores,
  );
  const recommendedDestination = destinationCatalog.find(({ province }) => province === destinationResult);
  const { compatibility, secondChoice } = calculateQuizResult(scores, questions.length);

  useEffect(() => {
    if (quizStarted && !showResult) questionHeadingRef.current?.focus();
  }, [currentQuestion, quizStarted, showResult]);

  const selectAnswer = (option) => {
    setAnswers((current) => current.map((answer, index) => (
      index === currentQuestion ? option : answer
    )));
  };

  const showQuizResult = () => {
    const result = calculateQuizResult(scores, questions.length);
    setDestinationResult(result.destination);
    setShowResult(true);
    onShowConfetti(true);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;
    if (currentQuestion < questions.length - 1) setCurrentQuestion((current) => current + 1);
    else showQuizResult();
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((current) => current - 1);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
    setDestinationResult("");
    onShowConfetti(false);
  };

  return (
    <section className={`card ${showResult ? "resultCard" : ""}`} aria-label="Recomendador de destinos">
      {quizStarted && !showResult && (
        <div className="progressSection">
          <p className="questionCounter">Pregunta {currentQuestion + 1} de {questions.length}</p>
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="Progreso del cuestionario"
            aria-valuemin="1"
            aria-valuemax={questions.length}
            aria-valuenow={currentQuestion + 1}
          >
            <div className="progress" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
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
            <h1>Tu destino turístico ideal en Perú es: {destinationResult}</h1>
            <p className="compatibility"><strong>{compatibility}% de compatibilidad</strong></p>
            <p>Te lo recomendamos porque tus respuestas muestran afinidad con las experiencias, presupuesto y estilo de viaje de {destinationResult}.</p>
            {secondChoice && <small>Tu segunda alternativa sugerida es {secondChoice}.</small>}
          </div>
          <div className="ctn-inicio">
            <button className="btn-prueba btn-secondary" onClick={handleRestartQuiz}>Reiniciar</button>
          </div>
          {recommendedDestination && (
            <LocationCard
              destination={recommendedDestination}
              isFavorite={favorites.includes(recommendedDestination.id)}
              onFavorite={toggleFavorite}
              isPlanned={itinerary.includes(recommendedDestination.id)}
              onPlan={toggleItinerary}
            />
          )}
        </>
      ) : (
        <>
          <div className="textin">
            <h1 ref={questionHeadingRef} tabIndex="-1">{questions[currentQuestion].question}</h1>
            <p className="selectionHint">Selecciona una alternativa y continúa.</p>
          </div>
          <div className="ctn-button" role="radiogroup" aria-label={questions[currentQuestion].question}>
            {questions[currentQuestion].options.map((option) => {
              const isSelected = selectedAnswer?.answerText === option.answerText;
              return (
                <button
                  className={`btn-prueba ${isSelected ? "is-selected" : ""}`}
                  key={`${option.destination}-${option.answerText}`}
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
              {currentQuestion === questions.length - 1 ? "Ver resultado" : "Continuar"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

QuizCard.propTypes = { onShowConfetti: PropTypes.func.isRequired };

export default QuizCard;
