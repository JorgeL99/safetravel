import PropTypes from 'prop-types';
import { FiMapPin, FiSearch, FiSliders } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './home.css';
import { provinces } from '../../data/destinations';

const Home = ({ filters, onFilterChange, onSearch }) => (
  <section className="home" id="inicio">
    <div className="homeOverlay" />
    <div className="heroContent container">
      <span className="eyebrow">Explora Costa, Sierra y Selva</span>
      <h1>Tu próxima historia empieza en el Perú.</h1>
      <p>Descubre experiencias seguras y auténticas recomendadas según tu forma de viajar.</p>
      <div className="heroActions">
        <Link to="/quiz" className="primaryAction">Encontrar mi destino</Link>
        <a href="#destinos" className="secondaryAction">Ver experiencias</a>
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
  </section>
);

Home.propTypes = {
  filters: PropTypes.shape({ query: PropTypes.string, province: PropTypes.string, budget: PropTypes.string }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Home;
