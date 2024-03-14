import React, { useState, useEffect } from 'react';
import './popular.css';
import { BsArrowLeftShort, BsArrowRightShort, BsDot } from 'react-icons/bs';
import Aos from 'aos';
import 'aos/dist/aos.css';
import LocationCard from './LocationCard'; // Importa el componente LocationCard

import img2 from '../../Assets/huacachina.webp';
import img3 from '../../Assets/paracas.webp';
import img4 from '../../Assets/vuelo.webp';
import img5 from '../../Assets/hacienda.webp';

const Data = [
  {
    id: 1,
    imgSrc: img2,
    destTitle: 'Huacachina',
    location: 'Ica',
    grade: 'CULTURA RELAX',
  },
  {
    id: 2,
    imgSrc: img3,
    destTitle: 'Paracas',
    location: 'Pisco',
    grade: 'CULTURA RELAX',
  },
  {
    id: 3,
    imgSrc: img4,
    destTitle: 'Lineas de Nazca',
    location: 'Nazca',
    grade: 'CULTURA RELAX',
  },
  {
    id: 4,
    imgSrc: img5,
    destTitle: 'Hacienda San Jose',
    location: 'Chincha',
    grade: 'CULTURA RELAX',
  },
];

const Popular = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Data.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className='popular section container' style={{ paddingTop: '15rem' }}>
      <div className='secContainer'>
        <div className='secHeader flex'>
          <div data-aos='fade-right' data-aos-duration='2500' className='textDiv'>
            <h2 className='secTitle'>Destinos más visitados</h2>
            <p>
              Ven y atrévete a visitar los lugares favoritos de nuestros turistas. <br />
              ¡Anímate, hay un destino que espera por ti!.
            </p>
          </div>

          <div data-aos='fade-left' data-aos-duration='2500' className='iconsDiv flex'>
            <BsArrowLeftShort className='icon leftIcon' onClick={prevSlide} />
            <BsArrowRightShort className='icon' onClick={nextSlide} />
          </div>
        </div>

        <div className='mainContent grid'>
          {Data.map(({ id, imgSrc, destTitle, location, grade }) => (
            <LocationCard
              key={id}
              id={id}
              imgSrc={imgSrc}
              destTitle={destTitle}
              location={location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
