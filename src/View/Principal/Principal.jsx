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

const initialFilters = { query: '', province: 'Todos', budget: '200' };

const Principal = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const { favorites, toggleFavorite } = useFavorites();

  const filteredDestinations = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase('es');
    return destinations.filter((destination) => {
      const searchable = `${destination.name} ${destination.province} ${destination.category} ${destination.summary}`.toLocaleLowerCase('es');
      return (!query || searchable.includes(query))
        && (filters.province === 'Todos' || destination.province === filters.province)
        && destination.price <= Number(filters.budget)
        && (activeCategory === 'Todos' || destination.category === activeCategory);
    });
  }, [filters, activeCategory]);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    document.querySelector('#destinos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar favoriteCount={favorites.length} />
      <main>
        <Home filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />
        <Popular
          destinations={filteredDestinations}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          favorites={favorites}
          onFavorite={toggleFavorite}
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
