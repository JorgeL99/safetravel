import "./singlePage.css";
import Slider from "../../Components/slider/Slider";
import { singlePostData, userData } from "../../lib/dummydata";
import Navbar from "../../Components/Navbar/Navbar";


import pinImage from "../../assets/pin.png";
import utilityImage from "../../assets/utility.png";
import petImage from "../../assets/pet.png";
import feeImage from "../../assets/fee.png";
import sizeImage from "../../assets/size.png";
import bedImage from "../../assets/bed.png";
import bathImage from "../../assets/bath.png";
import schoolImage from "../../assets/school.png";
import busImage from "../../assets/bus.png";
import restaurantImage from "../../assets/restaurant.png";
import chatImage from "../../assets/chat.png";
import saveImage from "../../assets/save.png";

function SinglePage() {
  return (
    <>
    <Navbar/>
    <br></br><br></br><br></br>
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src={pinImage} alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src={utilityImage} alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src={petImage} alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src={feeImage} alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src={sizeImage} alt="" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src={bedImage} alt="" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src={bathImage} alt="" />
              <span>1 bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src={schoolImage} alt="" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src={busImage} alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src={restaurantImage} alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <p>Ubicación referencial: {singlePostData.city}</p>
          </div>
          <div className="buttons">
            <button>
              <img src={chatImage} alt="" />
              Send a Message
            </button>
            <button>
              <img src={saveImage} alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default SinglePage;
