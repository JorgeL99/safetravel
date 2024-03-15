import React from 'react'
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Principal from './View/Principal/Principal';
import Encuenta from './View/Encuenta/Encuenta';
import SinglePage from './View/singlePage/singlePage';

const AppRoutes = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Principal/>} />
      <Route path='/quiz' element={<Encuenta/>} />
      <Route path='/page' element={<SinglePage/>} />
      
    </Routes>
    </>
  )
}

export default AppRoutes;