import { useMemo, useState } from 'react';
import './principal.css';
import './modern.css';
import Navbar from '../../Components/Navbar/Navbar';
import Home from '../../Components/Home/Home';
import Popular from '../../Components/Popular/Popular';
import Offers from '../../Components/Offers/Offers';
import About from '../../Components/About/About';
import Footer from '../../Components/Footer/Footer';
import Blog from '../../Components/Blog/Blog';
import { categories, destinations } from '../../data/destinations';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlanner } from '../../hooks/usePlanner';
import { filterDestinations } from '../../lib/travel-utils';

const initialFilters = { query: '', province: 'Todos', budget: '200' };

const Principal = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const { favorites, toggleFavorite } = useFavorites();
  const { itinerary, toggleItinerary } = usePlanner();

  const filteredDestinations = useMemo(() => filterDestinations(destinations, filters, activeCategory), [filters, activeCategory]);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    document.querySelector('#destinos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar favoriteCount={favorites.length} plannerCount={itinerary.length} />
      <main>
        <Home filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />
        <Popular
          destinations={filteredDestinations}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          favorites={favorites}
          onFavorite={toggleFavorite}
          itinerary={itinerary}
          onPlan={toggleItinerary}
        />
        <Offers />
        <About />
        <Blog />
      </main>
      <Footer />
    </>
  );
};

export default Principal;
