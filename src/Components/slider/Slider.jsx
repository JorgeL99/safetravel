import { useState } from "react";
import PropTypes from "prop-types";
import "./slider.css";
import arrowImage from "../../assets/arrow.png";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length-1)
      } 
      else {
        setImageIndex(imageIndex-1)
      }
    } else {
      if (imageIndex === images.length-1) {
        setImageIndex(0)
      } else {
        setImageIndex(imageIndex+1);
      }
    }
  }
  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <button type="button" className="arrow" onClick={() => changeSlide("left")} aria-label="Imagen anterior">
            <img src={arrowImage} alt="" />
          </button>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <button type="button" className="arrow" onClick={() => changeSlide("right")} aria-label="Imagen siguiente">
            <img src={arrowImage} className="right" alt="" />
          </button>
          <button type="button" className="close" onClick={() => setImageIndex(null)} aria-label="Cerrar galería">
            X
          </button>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="Vista principal del destino" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Slider;
