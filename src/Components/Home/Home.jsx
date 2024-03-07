import React, {useEffect} from 'react'
import './home.css'

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

          <p className="subTitle">
          ¡Viaja a tu ciudad favorita de manera respetuosa con el medio ambiente!
          </p>
          <button className='btn'>
            <a href="#">Explora Ahora</a>
          </button>
        </div>

        <div className="homeCard grid">

          <div className="locationDiv">
            <label htmlFor="location">Destino</label>
            <input type="text" placeholder='DreamDestination'/>
          </div>

          <div className="distDiv">
            <label htmlFor="distance">Localidad Actual</label>
            <input type="text" placeholder='11/Meters'/>
          </div>

          <div className="priceDiv">
            <label htmlFor="price">Monto</label>
            <input type="text" placeholder='$1400 la hora xd'/>
          </div>
          <button className='btn'>
            Buscar
          </button>


        </div>
      </div>
    </section>
  )
}

export default Home;