import React from 'react';
import { BsArrowRightShort } from "react-icons/bs";
import { BsDot } from "react-icons/bs";

const LocationCard = ({ id, imgSrc, destTitle, location }) => {
  return (
    <div className="singleDestination" data-aos="fade-up">
      <div className="destImage">
        <img src={imgSrc} alt="Image title" />
        <div className="overlayInfo">
          <h3>{destTitle}</h3>
          <p>{location}</p>
          <BsArrowRightShort className="icon" />
        </div>
      </div>
      <div className="destFooter">
        <div className="number">0{id}</div>
        <div className="destText flex">
          <h6>{location}</h6>
          <span className='flex'>
            <span className="dot">
              <BsDot className="icon" />
            </span>
            SafeTravel
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
