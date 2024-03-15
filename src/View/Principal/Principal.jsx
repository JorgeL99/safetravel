import React from 'react';
import './principal.css'
import Navbar from '../../Components/Navbar/Navbar';
import Home from '../../Components/Home/Home';
import Popular from '../../Components/Popular/Popular';
import Offers from '../../Components/Offers/Offers';
import About from '../../Components/About/About';
import Footer from '../../Components/Footer/Footer';
import Blog from '../../Components/Blog/Blog';
import LocationCard from '../../Components/Popular/LocationCard';

const Principal = () => {
  return (
        <>
        <Navbar/>
        <Home/>
        <Popular/>
        <Offers/>
        <About/>
        <Blog/>
        <Footer/>
        <LocationCard></LocationCard>
        </>
  )
}

export default Principal;