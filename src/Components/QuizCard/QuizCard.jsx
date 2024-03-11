import React, { useState } from "react";
import "./quizcard.css";
const QuizCard = () => {
  const questions = [
    {
      question: "¿Qué tipo de actividad prefieres en tu tiempo libre?",
      options: [
        { answerText: "Leer un libro", personalityType: "Intelectual" },
        { answerText: "Salir con amigos", personalityType: "Sociable" },
        { answerText: "Practicar deportes", personalityType: "Activo" },
      ],
    },
    {
      question: "¿Cuál es tu comida favorita?",
      options: [
        { answerText: "Pizza", personalityType: "Sociable" },
        { answerText: "Sushi", personalityType: "Intelectual" },
        { answerText: "Ensalada", personalityType: "Activo" },
      ],
    },
    {
      question: "¿Qué tipo de película prefieres?",
      options: [
        { answerText: "Drama", personalityType: "Intelectual" },
        { answerText: "Comedia", personalityType: "Sociable" },
        { answerText: "Acción", personalityType: "Activo" },
      ],
    },
    {
      question: "¿Cuál es tu pasatiempo favorito?",
      options: [
        { answerText: "Leyendo", personalityType: "Intelectual" },
        { answerText: "Bailando", personalityType: "Sociable" },
        { answerText: "Haciendo ejercicio", personalityType: "Activo" },
      ],
    },
    {
      question: "¿Qué te gusta hacer en tus vacaciones?",
      options: [
        {
          answerText: "Visitar museos y sitios culturales",
          personalityType: "Intelectual",
        },
        { answerText: "Viajar con amigos", personalityType: "Sociable" },
        {
          answerText: "Ir de excursión o practicar deportes extremos",
          personalityType: "Activo",
        },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [personalityTypes, setPersonalityTypes] = useState({
    Intelectual: 0,
    Sociable: 0,
    Activo: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [personalityResult, setPersonalityResult] = useState("");

  const handleAnswerButtonClick = (personalityType) => {
    setPersonalityTypes({
      ...personalityTypes,
      [personalityType]: personalityTypes[personalityType] + 1,
    });
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      calculatePersonalityResult();
    }
  };

  const calculatePersonalityResult = () => {
    const maxPersonalityType = Object.keys(personalityTypes).reduce((a, b) =>
      personalityTypes[a] > personalityTypes[b] ? a : b
    );
    setPersonalityResult(maxPersonalityType);
  };

  return (
    <div className="card">
      {showResult ? (
        <div className="result">
          <h2>Tu tipo de personalidad es: {personalityResult}</h2>
          <p>¡Gracias por completar el quiz!</p>
        </div>
      ) : (
        <>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="ctn-button">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                className="btn-prueba"
                key={index}
                onClick={() => handleAnswerButtonClick(option.personalityType)}
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

// import React, {useState} from "react";
// import './quizcard.css'
// const QuizCard = () => {
//   return (
//     <div className="card">
//       <h1>Pregunta</h1>
//       <div className="ctn-button">
//         <button className="btn-prueba">QueOnda</button>

//       </div>
//     </div>
//   );
// };

// export default QuizCard;