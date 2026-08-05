import { FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';
import { GiPlanetConquest } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => (
  <footer className="modernFooter">
    <div className="container footerGrid">
      <div className="footerBrand">
        <Link to="/" className="brand"><GiPlanetConquest /><span>Safe<strong>Travel</strong></span></Link>
        <p>Experiencias y recomendaciones explicables para descubrir la Costa, Sierra y Selva del Perú con mayor confianza.</p>
      </div>
      <div><h3>Explora</h3><a href="/#destinos">Destinos</a><Link to="/favoritos">Mis favoritos</Link><Link to="/itinerario">Mi itinerario</Link><Link to="/quiz">Recomendador</Link></div>
      <div><h3>Información</h3><a href="/#consejos">Consejos de viaje</a><a href="mailto:2021186@unica.edu.pe">Contacto</a><span>Proyecto universitario</span></div>
      <div><h3>Conversemos</h3><span><FiMapPin /> Perú</span><a href="mailto:2021186@unica.edu.pe"><FiMail /> 2021186@unica.edu.pe</a><span><FiInstagram /> @safetravel</span></div>
    </div>
    <div className="container footerBottom"><span>© 2026 SafeTravel</span><span>Diseñado para viajeros responsables</span></div>
  </footer>
);

export default Footer;
