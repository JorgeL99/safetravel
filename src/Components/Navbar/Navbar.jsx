import React, {useState} from 'react'
import './navbar.css'
import { SiYourtraveldottv } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from 'react-router-dom'
const Navbar = () => {

  const[active,setActive] = useState('navBar')
  const showNav =() =>{
    setActive('navBar activeNavbar') 
  }

  const removeNav =() =>{
    setActive('navBar') 
  }

  const [transparent,setTransparent]= useState('header')
  const addBg = ()=>{
    if(window.scrollY >= 10){
      setTransparent('header activeHeader')
    }
    else{
      setTransparent('header')
    }
  }
  window.addEventListener('scroll',addBg)

  return (
    <section className='navBarSection'>
      <div className={transparent}>
        
        <div className="logoDiv">
          <Link to="/" className="logo">
            <h1 className='flex'>
            <SiYourtraveldottv className="icon"/>SafeTravel
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className='navLists flex'>

            <li className="navItem">
              <Link to="/" className='navLink'>Home</Link>
              
            </li>

            <li className="navItem">
              <a href='#' className='navLink'>Products</a>
            </li>

            <li className="navItem">
              <a href='#' className='navLink'>Resources</a>
            </li>

            <li className="navItem">
              <a href='#' className='navLink'>Contacts</a>
            </li>

            <li className="navItem">
              <a href='#' className='navLink'>Blog</a>
            </li>

            <div className="headerBtns flex">
              <button className='btn loginBtn'>
                <a href='#'>Login</a>
              </button>

              <button className='btn'>
                <a href='#'>Sign Up</a>
              </button>

            </div>
          
          </ul>

          <div onClick={removeNav}className="closeNavbar">
          <AiFillCloseCircle className="icon" />
          </div>

        </div>

        <div onClick={showNav} className="toggleNavbar">
        <TbGridDots className="icon"/>
        </div>      
      </div>
    </section>
  )
}

export default Navbar;