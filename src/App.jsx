import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AppRoutes from './AppRoutes';
const App = () => {

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App