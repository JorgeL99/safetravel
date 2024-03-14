import React, { useState } from "react";
import "./encuenta.css";
import Navbar from "../../Components/Navbar/Navbar";
import QuizCard from "../../Components/QuizCard/QuizCard";
import Confetti from "react-confetti";

const Encuenta = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleShowConfetti = (show) => {
    setShowConfetti(show);
  };

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Navbar />
      <ul class="fondillo">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <QuizCard onShowConfetti={handleShowConfetti} />
      </ul>
    </>
  );
};
export default Encuenta;
