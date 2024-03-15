
import React, { useState } from "react";
import "./quizcard.css";
import LocationCard from "../Popular/LocationCard";

const QuizCard = ({ onShowConfetti }) => {
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
        { answerText: "Soleado y Baja Humedad", destination: "Ica" },
        { answerText: "Tropical con influencia costera", destination: "Chincha" },
      ],
    },
    {
      question: "¿Qué tipo de actividades culturales te interesan más?",
      options: [
        { answerText: "Sobrevolar en Avioneta", destination: "Nazca" },
        { answerText: "Explorar sitios arqueológicos antiguos", destination: "Nazca" }, /**/
        { answerText: "Visitar bodegas y degustar vinos", destination: "Ica" },
        { answerText: "Disfrutar de música y bailes afroperuanos", destination: "Chincha" },
        { answerText: "Visitar una reserva nacional", destination: "Pisco" },
      ],
    },
    {
      question: "¿Cuál es tu presupuesto aproximado para actividades turísticas?", /*SUSTITUTA*/
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
        { answerText: "Vistas Aereas o Miradores", destination: "Nazca" },
        { answerText: "Bodega Tabernero", destination: "Chincha" },/*-P-*/
        { answerText: "Fundos y viñedos", destination: "Ica" },
        { answerText: "Haciendas y casonas históricas", destination: "Pisco" },
      ],
    },
  ];

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [destinations, setDestinations] = useState({
    Ica: 0,
    Nazca: 0,
    Pisco: 0,
    Chincha: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [destinationResult, setDestinationResult] = useState("");

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerButtonClick = (destination) => {
    setDestinations({
      ...destinations,
      [destination]: destinations[destination] + 1,
    });
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      calculateDestinationResult();
    }
  };

  const calculateDestinationResult = () => {
    const maxDestination = Object.keys(destinations).reduce((a, b) =>
      destinations[a] > destinations[b] ? a : b
    );
    setDestinationResult(maxDestination);
    onShowConfetti(true);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setDestinations({ Ica: 0, Nazca: 0, Pisco: 0, Chincha: 0 });
    setShowResult(false);
    setDestinationResult("");
    onShowConfetti(false); // Detener el confeti al reiniciar el quiz
  };

  return (
    <div className="card">
      {quizStarted && !showResult && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
        </div>
      )}
      {!quizStarted ? (
        <>
          <div className="result">
            <h2>Bienvenido al Quiz de Destino Turístico en Perú</h2>
          </div>
          <div className="ctn-inicio">
            <button className="btn-prueba" onClick={handleStartQuiz}>Iniciar</button>
          </div>
        </>
      ) : showResult ? (
        <>
          <div className="result">
            <h2>Tu destino turístico ideal en Perú es: {destinationResult}</h2>
            <p>¡Gracias por completar el quiz!</p>
          </div>
          <div className="ctn-inicio">
            <button className="btn-prueba" onClick={handleRestartQuiz}>Reiniciar</button>
          </div>
          <div>
           
            {destinationResult && <LocationCard location={destinationResult} />}
            </div>
        </>
      ) : (
        <>
          <div className="textin">
            <h2>{questions[currentQuestion].question}</h2>
          </div>
          <div className="ctn-button">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                className="btn-prueba"
                key={index}
                onClick={() => handleAnswerButtonClick(option.destination)}
              >
                {option.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizCard;
