import { Route, Routes } from "react-router-dom";
import Principal from './View/Principal/Principal';
import Encuenta from './View/Encuenta/Encuenta';
import SinglePage from './View/singlePage/singlePage';
import DestinationPage from './View/Destination/DestinationPage';
import FavoritesPage from './View/Favorites/FavoritesPage';
import PlannerPage from './View/Planner/PlannerPage';
import NotFoundPage from './View/NotFound/NotFoundPage';
import ExpertPanel from './View/ExpertPanel/ExpertPanel';

const AppRoutes = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Principal/>} />
      <Route path='/quiz' element={<Encuenta/>} />
      <Route path='/page' element={<SinglePage/>} />
      <Route path='/destinos/:slug' element={<DestinationPage/>} />
      <Route path='/favoritos' element={<FavoritesPage/>} />
      <Route path='/itinerario' element={<PlannerPage/>} />
      <Route path='/sistema-experto' element={<ExpertPanel/>} />
      <Route path='*' element={<NotFoundPage/>} />
      
    </Routes>
    </>
  )
}

export default AppRoutes;
