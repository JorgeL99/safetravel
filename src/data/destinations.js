import huacachina from '../assets/huacachina.webp';
import paracas from '../assets/paracas.webp';
import nazca from '../assets/vuelo.webp';
import chincha from '../assets/hacienda.webp';
import cityIca from '../assets/cityica.webp';
import cityParacas from '../assets/cityparacas.webp';

export const destinations = [
  {
    id: 1,
    slug: 'huacachina',
    name: 'Huacachina',
    province: 'Ica',
    category: 'Aventura',
    price: 45,
    duration: 'Medio día',
    rating: 4.9,
    image: huacachina,
    summary: 'Dunas, sandboard y atardeceres alrededor del oasis más famoso del Perú.',
    highlights: ['Sandboard', 'Paseo en tubulares', 'Atardecer en las dunas'],
  },
  {
    id: 2,
    slug: 'paracas',
    name: 'Reserva de Paracas',
    province: 'Pisco',
    category: 'Naturaleza',
    price: 65,
    duration: 'Día completo',
    rating: 4.8,
    image: paracas,
    summary: 'Paisajes costeros, fauna marina y una de las reservas naturales más valiosas del país.',
    highlights: ['Reserva Nacional', 'Playa Roja', 'Miradores costeros'],
  },
  {
    id: 3,
    slug: 'lineas-de-nazca',
    name: 'Líneas de Nazca',
    province: 'Nazca',
    category: 'Cultura',
    price: 120,
    duration: '3 horas',
    rating: 4.7,
    image: nazca,
    summary: 'Descubre desde el aire los geoglifos que continúan fascinando al mundo.',
    highlights: ['Sobrevuelo', 'Centro arqueológico', 'Historia preincaica'],
  },
  {
    id: 4,
    slug: 'hacienda-san-jose',
    name: 'Hacienda San José',
    province: 'Chincha',
    category: 'Historia',
    price: 35,
    duration: '2 horas',
    rating: 4.6,
    image: chincha,
    summary: 'Arquitectura colonial, memoria afroperuana y pasadizos llenos de historia.',
    highlights: ['Casa hacienda', 'Túneles históricos', 'Cultura afroperuana'],
  },
  {
    id: 5,
    slug: 'ruta-del-pisco',
    name: 'Ruta del Pisco',
    province: 'Ica',
    category: 'Gastronomía',
    price: 55,
    duration: '4 horas',
    rating: 4.8,
    image: cityIca,
    summary: 'Bodegas tradicionales, catas guiadas y sabores que cuentan la historia de Ica.',
    highlights: ['Bodegas', 'Cata responsable', 'Gastronomía local'],
  },
  {
    id: 6,
    slug: 'islas-ballestas',
    name: 'Islas Ballestas',
    province: 'Pisco',
    category: 'Naturaleza',
    price: 80,
    duration: '3 horas',
    rating: 4.9,
    image: cityParacas,
    summary: 'Navega entre lobos marinos, pingüinos de Humboldt y miles de aves guaneras.',
    highlights: ['Paseo en bote', 'Fauna marina', 'El Candelabro'],
  },
];

export const categories = ['Todos', ...new Set(destinations.map(({ category }) => category))];

export const findDestination = (slug) => destinations.find((destination) => destination.slug === slug);
