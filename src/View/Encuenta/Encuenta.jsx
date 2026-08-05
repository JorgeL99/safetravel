import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!showConfetti) return undefined;
    const timer = window.setTimeout(() => setShowConfetti(false), 5500);
    return () => window.clearTimeout(timer);
  }, [showConfetti]);

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={180} recycle={false} gravity={0.16} />
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
