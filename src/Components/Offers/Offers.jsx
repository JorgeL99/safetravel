import React, {useEffect}  from 'react'
import './offers.css'

// import { MdKingBed } from "react-icons/md";
// import { MdBathtub } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdAirportShuttle } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";

import { GiPathDistance } from "react-icons/gi";
import { IoWine } from "react-icons/io5";

import img from '../../Assets/citynazca.webp'
import img1 from '../../Assets/cityparacas.webp'
import img2 from '../../Assets/citynazca.webp'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Offer=[
  {
    id:1,
    imgSrc: img,
    destTitle: 'City Tours Ica',
    location: 'Ica',
    price: 's/28.00',
  },
  {
    id:2,
    imgSrc: img1,
    destTitle: 'Islas ballestas + Reserva Nacional',
    location: 'Paracas',
    price: 's/112.00',
  },
  {
    id:3,
    imgSrc: img2,
    destTitle: 'City Tours Nazca',
    location: 'Nazca',
    price: 's/126.00',
  },
  
]

const Offers = () => {

  useEffect(()=>{
    Aos.init({duration:1000})
  },[])


  return (
    <section className='offer container section' >
      <div className="secContainer">
        
        <div data-aos="fade-up" data-aos-duration="1000" className="secIntro">
          <h2 className="secTitle">
            Ofertas Especiales
          </h2>
          <p>
          Desde ciudades históricas hasta espectáculos naturales, ¡ven a ver lo mejor de la Región Ica!
          </p>
        </div>

        <div className="mainContent grid">
          {
            Offer.map(({id,imgSrc,destTitle,location,price})=>{
              return(
                <div data-aos="fade-up" data-aos-duration="1500" className="singleOffer">
                <div className="destImage">
                  <img src={imgSrc} alt={destTitle} />
                  <span className="discount">
                    30% Off
                  </span>
                </div>
    
                <div className="offerBody">
                  <div className="price flex">
                    <h4>
                      {price}
                    </h4>
                    <span className="status">
                      vence: 30/02
                    </span>
                  </div>
    
                  <div className="amenities flex">
                    <div className="singleAmenity flex">
                      <GiPathDistance className="icon"/>
                      <small>Location</small>
                    </div>
                    <div className="singleAmenity flex">
                      <IoWine className="icon"/>
                      <small> Cata de vino </small>
                    </div>
                    <div className="singleAmenity flex">
                      <FaWifi  className="icon"/>
                      <small>Wi-Fi</small>
                    </div>
                    <div className="singleAmenity flex">
                      <MdAirportShuttle  className="icon"/>
                      <small>Transporte</small>
                    </div>
                  </div>
    
                  <div className="location flex">
                    <MdLocationOn className="icon" />
                    <small>Ica, {location} </small>
                  </div>
    
                  <button className='btn flex'>
                    Mas información
                    <BsArrowRightShort className="icon"/>
                  </button>
                </div>
              </div>
              )
            })
          }


        </div>
      </div>
    </section>
  )
}

export default Offers;