import { useEffect } from 'react';
import { FiBriefcase, FiCalendar, FiHeart, FiMap, FiShield, FiSun } from 'react-icons/fi';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './about.css';
import video from '../../assets/gifvi.mp4';

const tips = [
  { icon: FiSun, title: 'Protección según el destino', text: 'Lleva bloqueador, sombrero y lentes con protección UV. En selva, agrega repelente y ropa ligera de manga larga.', source: 'https://www.gob.pe/institucion/minsa/noticias/14010-minsa-recomienda-a-viajeros-llevar-un-kit-basico-de-proteccion-para-la-salud' },
  { icon: FiCalendar, title: 'Programa con anticipación', text: 'Confirma accesos, temporadas, horarios y operadores antes de pagar. Algunos destinos requieren reservas previas.', source: 'https://www.peru.travel/' },
  { icon: FiShield, title: 'Servicios formales', text: 'Comprueba qué incluye la actividad, conserva comprobantes y sigue las indicaciones de guardaparques y guías autorizados.', source: 'https://visitaareasnaturales.sernanp.gob.pe/' },
  { icon: FiHeart, title: 'Aclimatación en la Sierra', text: 'Sobre los 2 500 metros, hidrátate, come ligero y evita esfuerzo intenso durante las primeras horas.', source: 'https://www.gob.pe/institucion/minsa/noticias/1374711-minsa-recomendaciones-para-prevenir-el-mal-de-altura-durante-los-viajes-por-semana-santa' },
  { icon: FiBriefcase, title: 'Botiquín viajero', text: 'Adapta el botiquín a tu destino, revisa vencimientos y lleva suficiente medicación personal para todo el viaje.', source: 'https://www.gob.pe/institucion/minsa/noticias/1050600-conoce-que-debe-incluir-tu-botiquin-viajero-para-el-feriado-largo' },
  { icon: FiMap, title: 'Ruta y contactos', text: 'Comparte tu itinerario, descarga mapas útiles y conserva teléfonos de emergencia y del alojamiento.', source: 'https://www.gob.pe/8736-covid-19-recomendaciones-para-viajeros' },
];

const About = () => {
  useEffect(() => { Aos.init({ duration: 700, once: true }); }, []);
  return (
    <section className="about section" id="consejos">
      <div className="secContainer container">
        <div className="secIntro"><span className="eyebrow dark">Antes de partir</span><h2 className="title">Consejos para viajar mejor</h2><p>Recomendaciones prácticas respaldadas por instituciones públicas. Adáptalas a tu salud y destino.</p></div>
        <div className="tipsGrid">
          {tips.map(({ icon: Icon, title, text, source }) => <article data-aos="fade-up" className="singleItem" key={title}><span className="tipIcon"><Icon /></span><h3>{title}</h3><p>{text}</p><a href={source} target="_blank" rel="noreferrer">Consultar fuente</a></article>)}
        </div>
        <div className="videoCard">
          <div className="cardContent">
            <div className="cardText"><span>Viaja con criterio</span><h2>La aventura se disfruta más cuando está bien planificada.</h2><p>Consulta condiciones reales, respeta el entorno y elige experiencias adecuadas para tu preparación.</p></div>
            <div className="cardVideo"><video src={video} autoPlay loop muted playsInline aria-label="Experiencia en las dunas de Ica" /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
