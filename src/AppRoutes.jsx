import { Route, Routes } from "react-router-dom";
import Principal from './View/Principal/Principal';
import Encuenta from './View/Encuenta/Encuenta';
import SinglePage from './View/singlePage/singlePage';
import DestinationPage from './View/Destination/DestinationPage';

const AppRoutes = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Principal/>} />
      <Route path='/quiz' element={<Encuenta/>} />
      <Route path='/page' element={<SinglePage/>} />
      <Route path='/destinos/:slug' element={<DestinationPage/>} />
      <Route path='*' element={<Principal/>} />
      
    </Routes>
    </>
  )
}

export default AppRoutes;
