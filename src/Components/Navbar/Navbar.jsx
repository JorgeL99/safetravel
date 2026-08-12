import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FiHeart, FiMap, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ favoriteCount = 0, plannerCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const needsSolidHeader = location.pathname !== '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <header className={`modernHeader ${isScrolled || needsSolidHeader ? 'scrolled' : ''}`}>
      <nav className="modernNav container" aria-label="Navegación principal">
        <Link to="/#inicio" className="brand"><img src={`${import.meta.env.BASE_URL}safetravel-icon.svg`} alt="" /><span>Safe<strong>Travel</strong></span></Link>
        <button type="button" className="menuToggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Abrir menú">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className={`navContent ${isOpen ? 'open' : ''}`}>
          <Link to="/#inicio">Inicio</Link>
          <Link to="/#destinos">Destinos</Link>
          <Link to="/#experiencias">Experiencias</Link>
          <Link to="/#consejos">Consejos</Link>
          <Link to="/quiz" className="quizLink">Recomendador</Link>
          <Link to="/favoritos" className="favoritesLink" aria-label={`${favoriteCount} favoritos`}><FiHeart /><span>{favoriteCount}</span></Link>
          <Link to="/itinerario" className="favoritesLink" aria-label={`${plannerCount} actividades en el itinerario`}><FiMap /><span>{plannerCount}</span></Link>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = { favoriteCount: PropTypes.number, plannerCount: PropTypes.number };

export default Navbar;
