import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import { FiCamera, FiClock, FiCoffee, FiCompass, FiMapPin, FiShield, FiTruck, FiUsers, FiWifi } from 'react-icons/fi';
import { IoWineOutline } from 'react-icons/io5';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './offers.css';
import { destinations } from '../../data/destinations';

const iconByName = { camera: FiCamera, clock: FiClock, coffee: FiCoffee, compass: FiCompass, shield: FiShield, transport: FiTruck, users: FiUsers, wifi: FiWifi, wine: IoWineOutline };

const offerDefinitions = [
  { slug: 'ruta-del-pisco', label: 'Sabores de Ica', status: 'Experiencia cultural', amenities: [['wine', 'Cata responsable'], ['users', 'Guía local'], ['transport', 'Traslados']] },
  { slug: 'islas-ballestas', label: 'Fauna marina', status: 'Salida matutina', amenities: [['camera', 'Avistamiento'], ['shield', 'Chaleco salvavidas'], ['clock', '3 horas']] },
  { slug: 'lineas-de-nazca', label: 'Patrimonio', status: 'Reserva anticipada', amenities: [['camera', 'Vistas aéreas'], ['shield', 'Operador formal'], ['clock', '3 horas']] },
  { slug: 'cusco-machu-picchu', label: 'Ruta andina', status: 'Alta demanda', amenities: [['compass', 'Circuito cultural'], ['users', 'Guía'], ['transport', 'Conexiones']] },
  { slug: 'puno-lago-titicaca', label: 'Cultura viva', status: 'Navegación', amenities: [['users', 'Comunidades'], ['shield', 'Chaleco'], ['camera', 'Paisajes']] },
  { slug: 'iquitos-amazonia', label: 'Amazonía', status: 'Varios días', amenities: [['compass', 'Excursiones'], ['coffee', 'Alimentación'], ['users', 'Guía local']] },
];

const offers = offerDefinitions.map((definition) => ({
  ...definition,
  destination: destinations.find(({ slug }) => slug === definition.slug),
})).filter(({ destination }) => destination);

const Offers = () => {
  useEffect(() => { Aos.init({ duration: 700, once: true }); }, []);
  return (
    <section className="offer container section" id="experiencias">
      <div className="secContainer">
        <div className="secIntro" data-aos="fade-up">
          <span className="eyebrow dark">Experiencias seleccionadas</span>
          <h2 className="secTitle">Ofertas especiales para inspirar tu ruta</h2>
          <p>Opciones referenciales de Costa, Sierra y Selva. Confirma precios, disponibilidad y servicios incluidos directamente con operadores formales.</p>
        </div>
        <div className="offersNotice"><FiShield /> SafeTravel no vende paquetes ni confirma disponibilidad en esta versión.</div>
        <div className="mainContent offerGrid">
          {offers.map(({ destination, label, status, amenities }) => (
            <article key={destination.id} data-aos="fade-up" className="singleOffer">
              <div className="destImage">
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <span className="discount">{label}</span>
              </div>
              <div className="offerBody">
                <div className="offerHeading"><div><small>Desde, referencial</small><h3>S/ {destination.price}</h3></div><span className="status">{status}</span></div>
                <h4>{destination.name}</h4>
                <div className="amenities">
                  {amenities.map(([iconName, text]) => { const Icon = iconByName[iconName]; return <span className="singleAmenity" key={text}><Icon />{text}</span>; })}
                </div>
                <div className="location"><FiMapPin /><small>{destination.province}, {destination.department ?? 'Ica'}</small></div>
                <Link to={`/destinos/${destination.slug}`} className="btn offerAction">Revisar experiencia <BsArrowRightShort /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
