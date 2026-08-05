import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Principal from './View/Principal/Principal';

const Encuenta = lazy(() => import('./View/Encuenta/Encuenta'));
const SinglePage = lazy(() => import('./View/singlePage/singlePage'));
const DestinationPage = lazy(() => import('./View/Destination/DestinationPage'));
const FavoritesPage = lazy(() => import('./View/Favorites/FavoritesPage'));
const PlannerPage = lazy(() => import('./View/Planner/PlannerPage'));
const NotFoundPage = lazy(() => import('./View/NotFound/NotFoundPage'));
const ExpertPanel = lazy(() => import('./View/ExpertPanel/ExpertPanel'));

const PageLoader = () => <div className="pageLoader" role="status"><span />Cargando experiencia…</div>;

const AppRoutes = () => <Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Principal />} />
    <Route path="/quiz" element={<Encuenta />} />
    <Route path="/page" element={<SinglePage />} />
    <Route path="/destinos/:slug" element={<DestinationPage />} />
    <Route path="/favoritos" element={<FavoritesPage />} />
    <Route path="/itinerario" element={<PlannerPage />} />
    <Route path="/sistema-experto" element={<ExpertPanel />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</Suspense>;

export default AppRoutes;
