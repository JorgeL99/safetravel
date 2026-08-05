import { FiArrowLeft, FiCompass } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import '../Principal/principal.css';
import '../Principal/modern.css';

const NotFoundPage = () => <>
  <Navbar />
  <main className="notFoundPage container">
    <FiCompass aria-hidden="true" />
    <span className="eyebrow dark">Error 404</span>
    <h1>Esta ruta no estaba en el itinerario.</h1>
    <p>La página que buscas no existe, cambió de dirección o todavía no forma parte de SafeTravel.</p>
    <Link className="primaryAction" to="/"><FiArrowLeft /> Volver al inicio</Link>
  </main>
  <Footer />
</>;

export default NotFoundPage;
