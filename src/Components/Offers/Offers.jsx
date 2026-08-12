import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import { FiCamera, FiChevronLeft, FiChevronRight, FiClock, FiCoffee, FiCompass, FiMapPin, FiShield, FiTruck, FiUsers, FiWifi } from 'react-icons/fi';
import { IoWineOutline } from 'react-icons/io5';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './offers.css';
import { destinations } from '../../data/destinations';

const iconByName = { camera: FiCamera, clock: FiClock, coffee: FiCoffee, compass: FiCompass, shield: FiShield, transport: FiTruck, users: FiUsers, wifi: FiWifi, wine: IoWineOutline };

const offerDefinitions = [
  { slug: 'ruta-del-pisco', label: 'Sabores de Ica', discount: 15, status: 'Experiencia cultural', amenities: [['wine', 'Cata responsable'], ['users', 'Guía local'], ['transport', 'Traslados']] },
  { slug: 'islas-ballestas', label: 'Fauna marina', discount: 12, status: 'Salida matutina', amenities: [['camera', 'Avistamiento'], ['shield', 'Chaleco salvavidas'], ['clock', '3 horas']] },
  { slug: 'lineas-de-nazca', label: 'Patrimonio', discount: 10, status: 'Reserva anticipada', amenities: [['camera', 'Vistas aéreas'], ['shield', 'Operador formal'], ['clock', '3 horas']] },
  { slug: 'cusco-machu-picchu', label: 'Ruta andina', discount: 18, status: 'Alta demanda', amenities: [['compass', 'Circuito cultural'], ['users', 'Guía'], ['transport', 'Conexiones']] },
  { slug: 'puno-lago-titicaca', label: 'Cultura viva', discount: 14, status: 'Navegación', amenities: [['users', 'Comunidades'], ['shield', 'Chaleco'], ['camera', 'Paisajes']] },
  { slug: 'iquitos-amazonia', label: 'Amazonía', discount: 20, status: 'Varios días', amenities: [['compass', 'Excursiones'], ['coffee', 'Alimentación'], ['users', 'Guía local']] },
];

const offers = offerDefinitions.map((definition) => ({
  ...definition,
  destination: destinations.find(({ slug }) => slug === definition.slug),
})).filter(({ destination }) => destination);

const Offers = () => {
  const carouselRef = useRef(null);
  useEffect(() => { Aos.init({ duration: 700, once: true }); }, []);
  const moveCarousel = (direction) => carouselRef.current?.scrollBy({ left: direction * Math.min(380, carouselRef.current.clientWidth * .85), behavior: 'smooth' });
  return (
    <section className="offer container section" id="ofertas">
      <div className="secContainer">
        <div className="secIntro" data-aos="fade-up">
          <span className="eyebrow dark">Experiencias seleccionadas</span>
          <h2 className="secTitle">Ofertas especiales para inspirar tu ruta</h2>
          <p>Opciones referenciales de Costa, Sierra y Selva. Confirma precios, disponibilidad y servicios incluidos directamente con operadores formales.</p>
        </div>
        <div className="offerToolbar"><div className="offersNotice"><FiShield /> Promociones demostrativas: confirma precio y vigencia con el operador.</div><div className="carouselControls"><button onClick={() => moveCarousel(-1)} aria-label="Oferta anterior"><FiChevronLeft /></button><button onClick={() => moveCarousel(1)} aria-label="Oferta siguiente"><FiChevronRight /></button></div></div>
        <div className="mainContent offerGrid" ref={carouselRef} aria-label="Carrusel de ofertas">
          {offers.map(({ destination, label, discount, status, amenities }) => (
            <article key={destination.id} data-aos="fade-up" className="singleOffer">
              <div className="destImage">
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <span className="discount">-{discount}% · {label}</span>
              </div>
              <div className="offerBody">
                <div className="offerHeading"><div><small>Oferta referencial</small><span className="oldPrice">S/ {Math.round(destination.price / (1 - discount / 100))}</span><h3>S/ {destination.price}</h3></div><span className="status">{status}</span></div>
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
