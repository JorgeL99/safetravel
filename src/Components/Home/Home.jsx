import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FiMapPin, FiSearch, FiSliders } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './home.css';
import { provinces } from '../../data/destinations';
import portadaCosta from '../../assets/portada1.webp';
import portadaCultura from '../../assets/portada4.webp';
import portadaAventura from '../../assets/imageee.webp';
import portadaPuno from '../../assets/hero/hero-puno-uros.webp';
import portadaAncash from '../../assets/hero/hero-ancash-nevado.webp';
import portadaCusco from '../../assets/hero/hero-cusco-machu-picchu.webp';
import portadaLima from '../../assets/hero/hero-lima-cathedral.webp';
import portadaSelva from '../../assets/hero/hero-selva-alta.webp';

const heroSlides = [
  { src: portadaCosta, alt: 'Costa peruana', position: 'center 52%' },
  { src: portadaCusco, alt: 'Machu Picchu y una llama en Cusco', position: 'center 55%' },
  { src: portadaAncash, alt: 'Nevado de los Andes en Áncash', position: 'center 48%' },
  { src: portadaPuno, alt: 'Artesanía tradicional de los Uros en Puno', position: '38% 58%' },
  { src: portadaLima, alt: 'Catedral de Lima', position: 'center 58%' },
  { src: portadaSelva, alt: 'Valle verde de la selva alta peruana', position: 'center 55%' },
  { src: portadaCultura, alt: 'Experiencia cultural en el Perú', position: 'center 52%' },
  { src: portadaAventura, alt: 'Aventura turística en el Perú', position: 'center 55%' },
];

const Home = ({ filters, onFilterChange, onSearch }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(interval);
  }, []);

  return <section className="home" id="inicio">
    <div className="heroSlides" aria-hidden="true">
      {heroSlides.map(({ src, alt, position }, index) => <img
        key={src}
        src={src}
        alt={alt}
        className={index === activeSlide ? 'active' : ''}
        style={{ objectPosition: position }}
        loading={index === 0 ? 'eager' : 'lazy'}
      />)}
    </div>
    <div className="homeOverlay" />
    <div className="heroContent container">
      <span className="eyebrow">Explora Costa, Sierra y Selva</span>
      <h1>Tu próxima historia empieza en el Perú.</h1>
      <p>Descubre experiencias seguras y auténticas recomendadas según tu forma de viajar.</p>
      <div className="heroActions">
        <Link to="/quiz" className="primaryAction">Encontrar mi destino</Link>
        <Link to="/#experiencias" className="secondaryAction">Ver experiencias</Link>
      </div>
    </div>

    <form className="travelSearch container" onSubmit={onSearch}>
      <div className="searchField">
        <FiSearch aria-hidden="true" />
        <label htmlFor="query">¿Qué deseas conocer?</label>
        <input id="query" name="query" value={filters.query} onChange={onFilterChange} placeholder="Ej. naturaleza o Huacachina" />
      </div>
      <div className="searchField">
        <FiMapPin aria-hidden="true" />
        <label htmlFor="province">Provincia</label>
        <select id="province" name="province" value={filters.province} onChange={onFilterChange}>
          {provinces.map((province) => <option key={province} value={province}>{province === 'Todos' ? 'Todas' : province}</option>)}
        </select>
      </div>
      <div className="searchField">
        <FiSliders aria-hidden="true" />
        <label htmlFor="budget">Presupuesto máximo</label>
        <select id="budget" name="budget" value={filters.budget} onChange={onFilterChange}>
          <option value="200">Hasta S/ 200</option>
          <option value="100">Hasta S/ 100</option>
          <option value="60">Hasta S/ 60</option>
          <option value="40">Hasta S/ 40</option>
        </select>
      </div>
      <button type="submit" className="searchButton">Buscar experiencias</button>
    </form>
  </section>;
};

Home.propTypes = {
  filters: PropTypes.shape({ query: PropTypes.string, province: PropTypes.string, budget: PropTypes.string }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Home;
