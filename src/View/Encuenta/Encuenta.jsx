import { useEffect, useState } from "react";
import "./encuenta.css";
import Navbar from "../../Components/Navbar/Navbar";
import QuizCard from "../../Components/QuizCard/QuizCard";
import Confetti from "react-confetti";
import { useFavorites } from "../../hooks/useFavorites";
import { usePlanner } from "../../hooks/usePlanner";

const Encuenta = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [reduceMotion, setReduceMotion] = useState(false);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("resize", updateViewport);
    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return (
    <>
      {showConfetti && !reduceMotion && (
        <Confetti width={viewport.width} height={viewport.height} numberOfPieces={180} recycle={false} gravity={0.16} style={{ pointerEvents: "none" }} />
      )}

      <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
      <main className="fondillo">
        <div className="quiz-background" aria-hidden="true">
          {Array.from({ length: 23 }, (_, index) => <span key={index} />)}
        </div>
        <QuizCard onShowConfetti={handleShowConfetti} />
      </main>
    </>
  );
};
export default Encuenta;
