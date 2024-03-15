import React, {useEffect} from 'react'
import './home.css'
import { Link } from 'react-router-dom'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Home = () => {

  useEffect(()=>{
    Aos.init({duration:2000})
  },[])

  return (
    <section className='home'>
      <div className="secContainer container">
        
        <div className="homeText">

          <h1 data-aos="fade-up" className="title">
          Planifique su viaje con SafeTravel
          </h1>

          <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
          ¡Viaja a tu ciudad favorita de manera respetuosa con el medio ambiente!
          </p>
          <button data-aos="fade-up" data-aos-duration="3000" className='btn'>
            <Link to="/Quiz">Explora Ahora</Link>
          </button>
        </div>

        <div className="homeCard grid">

          <div data-aos="fade-right" data-aos-duration="2000" className="locationDiv">
            <label htmlFor="location">Destino</label>
            <input type="text" placeholder='¿Pa donde mi king?'/>
          </div>

          <div data-aos="fade-right" data-aos-duration="2500" className="distDiv">
            <label htmlFor="distance">Localidad Actual</label>
            <input type="text" placeholder='Ica'/>
          </div>

          <div  data-aos="fade-right" data-aos-duration="3000" className="priceDiv">
            <label htmlFor="price">Monto</label>
            <input type="text" placeholder='$120'/>
          </div>
          <button data-aos="fade-left" data-aos-duration="3000" className='btn'>
            Buscar
          </button>


        </div>
      </div>
    </section>
  )
}

export default Home;