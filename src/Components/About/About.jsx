import React, {useEffect} from 'react'
import './about.css'


import img from '../../Assets/seguridad.webp'
import img2 from '../../Assets/salud.webp'
import img3 from '../../Assets/organiza.webp'

import video from '../../Assets/gifvi.mp4'

import Aos from 'aos'
import 'aos/dist/aos.css'


const About = () => {
  
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])


  return (
    <section className='about section'>
      <div className="secContainer">
        <h1 className="title">
          ¡TIPS VIAJEROS!
        </h1>

        <div className="mainContent container grid">
          <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
            <img src={img2} alt="Image Name" />
            <h3>Cuidado de la salud</h3>
            <p>
            Una de las precauciones a tener en cuenta es el uso de bloqueador solar, gorros o sombrilla para las altas horas del día. <br></br>
            Dependiendo la temporada llevar repelente de mosquitos y zancudos, para evitar cualquier enfermedad.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-duration="2500" className="singleItem">
            <img src={img3} alt="Image Name" />
            <h3>Programa con anticipación</h3>
            <p>
            Es muy importante que te programes con anticipación ante cualquier viaje que puedas hacer. <br></br> Asegurarte de adquirir cualquier 
            servicio con una empresa registrada para asegurar una buena calidad de servicio.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
            <img src={img} alt="Image Name" />
            <h3>Seguridad personal</h3>
            <p>
            Si vas a llevar consigo pertenencias importantes como pasaportes, tarjetas de crédito y dinero en efectivo, se recomienda llevar lo necesario e indispensable como tambien evitar su exposición en lugares públicos y concurridos.
            </p>
          </div>


        </div>

        <div className="videoCard container">
          <div className="cardContent grid">

              <div data-aos="fade-right" data-aos-duration="2000" className="cardText">
                <h2>Sumérgete en una aventura sobre la arena!</h2>
                <p>
                Ven y disfruta de una maravillosa experiencia
                </p>
              </div>
              <div data-aos="fade-left" data-aos-duration="2000" className="cardVideo">
                <video src={video} autoPlay loop muted typeof="video/mp4"></video>
              </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About;