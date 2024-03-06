import React from 'react'
import './about.css'


import img from '../../Assets/customer.png'
import img2 from '../../Assets/mountain.png'
import img3 from '../../Assets/climbing.png'

import video from '../../Assets/video.mp4'



const About = () => {
  return (
    <section className='about section'>
      <div className="secContainer">
        <h2 className="title">
          why hikings?
        </h2>

        <div className="mainContent container grid">
          <div className="singleItem">
            <img src={img2} alt="Image Name" />
            <h3>100+ Mountains</h3>
            <p>
            Research shows that a chance to break away from the normal rhythms of daily life reduces stress and improves health and well -being.
            </p>
          </div>
          <div className="singleItem">
            <img src={img3} alt="Image Name" />
            <h3>1000+ Hikings</h3>
            <p>
            Research shows that a chance to break away from the normal rhythms of daily life reduces stress and improves health and well -being.
            </p>
          </div>
          <div className="singleItem">
            <img src={img} alt="Image Name" />
            <h3>200+ Customer </h3>
            <p>
            Research shows that a chance to break away from the normal rhythms of daily life reduces stress and improves health and well -being.
            </p>
          </div>


        </div>

        <div className="videoCard container">
          <div className="cardContent grid">

              <div className="cardText">
                <h2>Wonderful house experience in there!</h2>
                <p>
                  The adventure subraming is beased on an equally weighted average of scores from five country.
                </p>
              </div>
              <div className="cardVideo">
                <video src={video} autoPlay loop muted typeof="video/mp4"></video>
              </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About;