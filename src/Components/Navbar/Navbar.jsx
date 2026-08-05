import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { GiPlanetConquest } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ favoriteCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <header className={`modernHeader ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="modernNav container" aria-label="Navegación principal">
        <Link to="/" className="brand"><GiPlanetConquest /><span>Safe<strong>Travel</strong></span></Link>
        <button type="button" className="menuToggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Abrir menú">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className={`navContent ${isOpen ? 'open' : ''}`}>
          <a href="/#inicio">Inicio</a>
          <a href="/#destinos">Destinos</a>
          <a href="/#experiencias">Experiencias</a>
          <a href="/#consejos">Consejos</a>
          <Link to="/quiz" className="quizLink">Recomendador</Link>
          <a href="/#destinos" className="favoritesLink" aria-label={`${favoriteCount} favoritos`}><FiHeart /><span>{favoriteCount}</span></a>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = { favoriteCount: PropTypes.number };

export default Navbar;
