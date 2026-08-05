import { useState } from "react";
import "./encuenta.css";
import Navbar from "../../Components/Navbar/Navbar";
import QuizCard from "../../Components/QuizCard/QuizCard";
import Confetti from "react-confetti";
import { useFavorites } from "../../hooks/useFavorites";
import { usePlanner } from "../../hooks/usePlanner";

const Encuenta = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { favorites } = useFavorites();
  const { itinerary } = usePlanner();

  const handleShowConfetti = (show) => {
    setShowConfetti(show);
  };

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
      <ul className="fondillo">
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
