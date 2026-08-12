import { useEffect } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const ScrollToSection = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <HashRouter>
    <ScrollToSection />
    <div className="App">
      <AppRoutes />
    </div>
  </HashRouter>
);

export default App
