import React, {useEffect} from 'react'
import './blog.css'

import { BsArrowRightShort } from "react-icons/bs";

import img from '../../Assets/gringos.webp'
import img2 from '../../Assets/embarcacion.webp'
import img3 from '../../Assets/catador.webp'
import img4 from '../../Assets/casahaci.webp'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Posts=[
  {
    id:1,
    postImage:img,
    title: '¡Increíble experiencia!',
    desc: 'Ver los antiguos acueductos de Nazca fue como retroceder en el tiempo. La habilidad de los antiguos nazcas para construir estas estructuras aún me deja asombrado.',
  },
  {
    id:2,
    postImage:img3,
    title: '¡Una experiencia deliciosa!',
    desc: 'La visita a la Bodega Catador en Ica fue una experiencia sensorial completa. Degustar los diferentes vinos y piscos fue una delicia para el paladar.',
  },
  {
    id:3,
    postImage:img2,
    title: 'Las Islas Ballestas en Paracas son un paraíso natural!',
    desc: 'Ver leones marinos, pingüinos y aves exóticas en su hábitat natural fue simplemente impresionante.',
  },
  {
    id:4,
    postImage:img4,
    title: 'La Casa Hacienda San José en Chincha es un verdadero tesoro histórico!.',
    desc: 'Explorar los pasillos y jardines de esta antigua hacienda fue como viajar en el tiempo.',
  },

]

const Blog = () => {

  useEffect(()=>{
    Aos.init({duration:2000})
  },[])


  return (
    <section className='blog container section' >
      <div className="secContainer">

        <div className="secIntro">
          <h2 data-aos="fade-up" data-aos-duration="2000" className='secTitle'>
          ¡Comparte tu experiencia y déjanos tu huella!
          </h2>
          <p data-aos="fade-up" data-aos-duration="2500" >
            Únete a esta pequeña comunidad y ayuda a mas viajeros!
          </p>
        </div>

        <div className="mainContainer grid">
          
          {
                Posts.map(({id,postImage,title,desc})=>{
                  return(
                  <div data-aos="fade-up" data-aos-duration="2000" className="singlePost grid">
                  <div className="imgDiv">
                    <img src={postImage} alt={title} />
                  </div>

                  <div className="postDetails">
                    <h3 data-aos="fade-up" data-aos-duration="3000" >
                     {title}
                    </h3>
                    <p data-aos="fade-up" data-aos-duration="4000" >{desc}</p>
                  </div>
                  <a href="#" className="flex" data-aos="fade-up" data-aos-duration="4500">
                    Read More
                    <BsArrowRightShort className="icon"/>
                  </a>
              </div>
                 )
            })
          }


        </div>
      </div>
    </section>
  )
}

export default Blog;