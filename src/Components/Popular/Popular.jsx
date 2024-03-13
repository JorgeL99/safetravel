import React, {useEffect} from 'react'
import './popular.css'

import { BsArrowLeftShort } from 'react-icons/bs'
import { BsArrowRightShort } from 'react-icons/bs'
import { BsDot } from "react-icons/bs";


import img2 from '../../Assets/huacachina.webp'
import img3 from '../../Assets/paracas.webp'
import img4 from '../../Assets/vuelo.webp'
import img5 from '../../Assets/hacienda.webp'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Data = [
  {
    id:1,
    imgSrc: img2,
    destTitle:'Huacachina',
    location:'Ica',
    grade:'CULTURA RELAX',

  },
  {
    id:2,
    imgSrc: img3,
    destTitle:'Paracas',
    location:'Pisco',
    grade:'CULTURA RELAX',

  },
  {
    id:3,
    imgSrc: img4,
    destTitle:'Lineas de Nazca',
    location:'Nazca',
    grade:'CULTURA RELAX',

  },
  {
    id:4,
    imgSrc: img5,
    destTitle:'Hacienda San Jose',
    location:'Chincha',
    grade:'CULTURA RELAX',

  },
]

const Popular = () => {

  useEffect(()=>{
    Aos.init({duration:1000})
  },[])


  return (
    <section className='popular section container' style={ {paddingTop: "15rem"}}>
      <div className="secContainer">

        <div className="secHeader flex">
            <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
              <h2 className="secTitle">
                Destinos más visitados</h2>
              <p>Ven y atrévete a visitar los lugares favoritos de nuestros turistas. <br></br>
                ¡Anímate, hay un destino que espera por ti!.</p>
            </div>
        
            <div data-aos="fade-left" data-aos-duration="2500"className="iconsDiv flex">
                <BsArrowLeftShort className="icon leftIcon"/>
                <BsArrowRightShort className="icon"/>
            </div>
        </div>

        <div className="mainContent grid">
              {
                Data.map(({id,imgSrc,destTitle,location,grade})=>{
                  return(
                  <div data-aos="fade-up" className="singleDestination">
                    <div className="destImage">
    
                      <img src={imgSrc} alt="Image title" />
                      
                      <div className="overlayInfo">
                        <h3>{destTitle}</h3>
                        <p>
                          {location}
                        </p>
    
                        <BsArrowRightShort  className='icon'/>
                      </div>
    
                    </div>



                    <div className="destFooter">
                      <div className="number">
                        0{id}
                      </div>
                      <div className="destText flex">
                          <h6>
                            {location}
                          </h6>
                          <span className='flex'>
                            <span className="dot">
                              <BsDot className="icon" />
                            </span>
                            SafeTravel
                          </span>
                      </div>
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

export default Popular;