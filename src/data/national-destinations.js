import cusco from '../assets/cusco-machu-picchu.jpg';
import arequipa from '../assets/arequipa-plaza.jpg';
import puno from '../assets/puno-titicaca.jpg';
import ancash from '../assets/ancash-huascaran.jpg';
import loreto from '../assets/loreto-amazonas.jpg';
import tambopata from '../assets/tambopata-rio.jpg';

export const nationalDestinations = [
  {
    id: 7, slug: 'cusco-machu-picchu', name: 'Cusco y Machu Picchu', province: 'Cusco', department: 'Cusco', naturalRegion: 'Sierra', category: 'Historia', price: 180, duration: '4 días', rating: 4.9, image: cusco,
    summary: 'Patrimonio inca, cultura andina y paisajes históricos en el corazón de los Andes.', highlights: ['Santuario Histórico de Machu Picchu', 'Ciudad del Cusco', 'Valle Sagrado de los Incas'],
    coordinates: [-13.1631, -72.545], climate: 'Templado de montaña, con noches frías y lluvias estacionales.', bestSeason: 'La temporada menos lluviosa suele extenderse de mayo a octubre.', schedule: 'Reserva los circuitos y horarios oficiales de Machu Picchu con anticipación.', access: 'Cusco recibe vuelos y transporte terrestre; Machu Picchu requiere conexión por tren o rutas autorizadas.',
    whatToBring: ['Abrigo por capas', 'Protección solar', 'Agua', 'Calzado de caminata'], safety: 'Aclimátate gradualmente y contrata servicios formales. Verifica las reglas vigentes de ingreso.', accessibility: 'El terreno arqueológico presenta desniveles y escaleras; consulta asistencia antes de reservar.',
    sourceName: 'UNESCO · Santuario Histórico de Machu Picchu', sourceUrl: 'https://whc.unesco.org/en/list/274', imageCredit: 'Brian Jeffery Beggerly · CC BY 2.0', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_of_Machu_Picchu.jpg',
  },
  {
    id: 8, slug: 'arequipa-colca', name: 'Arequipa y Valle del Colca', province: 'Arequipa', department: 'Arequipa', naturalRegion: 'Sierra', category: 'Cultura', price: 90, duration: '3 días', rating: 4.8, image: arequipa,
    summary: 'Arquitectura de sillar, gastronomía regional y paisajes andinos del valle del Colca.', highlights: ['Centro histórico de Arequipa', 'Valle del Colca', 'Mirador de la Cruz del Cóndor'],
    coordinates: [-16.3988, -71.5369], climate: 'Seco y soleado durante el día, con noches frescas o frías.', bestSeason: 'De abril a noviembre suele haber menos lluvias en los Andes del sur.', schedule: 'Dedica un día al centro histórico y al menos dos al circuito del Colca.', access: 'Arequipa cuenta con aeropuerto y terminal terrestre; el Colca se visita por carretera.',
    whatToBring: ['Sombrero', 'Abrigo', 'Protección solar', 'Calzado cómodo'], safety: 'Considera la altitud del Colca y utiliza transporte turístico autorizado.', accessibility: 'El centro posee sectores transitables; varios miradores y senderos del Colca tienen desniveles.',
    sourceName: 'UNESCO · Centro histórico de Arequipa', sourceUrl: 'https://whc.unesco.org/en/list/1016', imageCredit: 'Fatima Flores · CC BY-SA 4.0', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Plaza_de_Armas_de_Arequipa.jpg',
  },
  {
    id: 9, slug: 'puno-lago-titicaca', name: 'Puno y Lago Titicaca', province: 'Puno', department: 'Puno', naturalRegion: 'Sierra', category: 'Cultura', price: 75, duration: '3 días', rating: 4.8, image: puno,
    summary: 'Navegación, cultura viva y paisajes del altiplano alrededor del Lago Titicaca.', highlights: ['Reserva Nacional del Titicaca', 'Islas de los Uros', 'Complejo arqueológico de Sillustani'],
    coordinates: [-15.8402, -70.0219], climate: 'Frío y seco, con radiación solar intensa y noches muy frías.', bestSeason: 'De mayo a octubre suele presentarse menor precipitación.', schedule: 'Las excursiones lacustres suelen comenzar temprano y dependen del clima.', access: 'Se accede por carretera desde Juliaca o mediante conexiones terrestres desde Cusco y Arequipa.',
    whatToBring: ['Abrigo térmico', 'Protección solar', 'Agua', 'Gorro'], safety: 'Aclimátate antes de realizar excursiones y usa embarcaciones formales con chaleco salvavidas.', accessibility: 'El embarque y las islas pueden requerir asistencia; coordina previamente con el operador.',
    sourceName: 'SERNANP · Reserva Nacional del Titicaca', sourceUrl: 'https://visitaareasnaturales.sernanp.gob.pe/anps/reserva-nacional-del-titicaca/', imageCredit: 'Wikimedia Commons · licencia indicada en la fuente', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Lake_titicaca.jpg',
  },
  {
    id: 10, slug: 'ancash-cordillera-blanca', name: 'Áncash y Cordillera Blanca', province: 'Huaraz', department: 'Áncash', naturalRegion: 'Sierra', category: 'Aventura', price: 100, duration: '4 días', rating: 4.9, image: ancash,
    summary: 'Montañas, lagunas glaciares y patrimonio arqueológico en los Andes centrales.', highlights: ['Parque Nacional Huascarán', 'Laguna 69', 'Sitio arqueológico de Chavín'],
    coordinates: [-9.414, -77.577], climate: 'Clima de alta montaña, con cambios rápidos y temperaturas bajas.', bestSeason: 'La estación menos lluviosa suele ser de mayo a septiembre.', schedule: 'Inicia las caminatas temprano y consulta las condiciones de cada ruta.', access: 'Huaraz se conecta por carretera con Lima; las lagunas requieren transporte local y caminata.',
    whatToBring: ['Ropa térmica', 'Impermeable', 'Agua', 'Calzado de trekking'], safety: 'Aclimátate, registra rutas exigentes y considera guía especializado para alta montaña.', accessibility: 'Muchos atractivos requieren caminatas en altura; existen miradores accesibles por vehículo.',
    sourceName: 'UNESCO · Parque Nacional Huascarán', sourceUrl: 'https://whc.unesco.org/en/list/333', imageCredit: 'CorraleH · CC BY-SA 4.0', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Huascar%C3%A1n_National_Park_-_Peru_05.jpg',
  },
  {
    id: 11, slug: 'iquitos-amazonia', name: 'Iquitos y Amazonía', province: 'Maynas', department: 'Loreto', naturalRegion: 'Selva', category: 'Naturaleza', price: 150, duration: '4 días', rating: 4.8, image: loreto,
    summary: 'Ríos, bosques inundables y biodiversidad amazónica desde la ciudad de Iquitos.', highlights: ['Río Amazonas', 'Reserva Nacional Pacaya Samiria', 'Bosques y fauna amazónica'],
    coordinates: [-3.7437, -73.2516], climate: 'Cálido, húmedo y lluvioso durante todo el año.', bestSeason: 'La experiencia cambia con el nivel de los ríos; consulta condiciones antes del viaje.', schedule: 'Planifica excursiones diurnas y nocturnas únicamente con operadores autorizados.', access: 'Iquitos se conecta principalmente por vía aérea o fluvial; no tiene conexión vial directa con Lima.',
    whatToBring: ['Repelente', 'Impermeable ligero', 'Ropa fresca de manga larga', 'Bolsa impermeable'], safety: 'Usa operadores formales, hidratación segura y orientación sanitaria previa al viaje.', accessibility: 'La navegación y los senderos varían según el nivel del río; consulta asistencia con anticipación.',
    sourceName: 'PROMPERÚ · Destino Iquitos', sourceUrl: 'https://meetings.peru.travel/es/destinos/iquitos', imageCredit: 'Wikimedia Commons · licencia indicada en la fuente', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%ADo_Amazonas_cerca_a_Iquitos.JPG',
  },
  {
    id: 12, slug: 'reserva-tambopata', name: 'Reserva Nacional Tambopata', province: 'Tambopata', department: 'Madre de Dios', naturalRegion: 'Selva', category: 'Naturaleza', price: 180, duration: '4 días', rating: 4.9, image: tambopata,
    summary: 'Bosque tropical, lagos amazónicos y extraordinaria biodiversidad en Madre de Dios.', highlights: ['Reserva Nacional Tambopata', 'Lago Sandoval', 'Collpas y senderos amazónicos'],
    coordinates: [-12.8375, -69.2933], climate: 'Tropical, cálido y húmedo, con lluvias frecuentes.', bestSeason: 'Puede visitarse todo el año; las condiciones de lluvia y río modifican los recorridos.', schedule: 'Los programas suelen combinar salidas al amanecer, navegación y caminatas guiadas.', access: 'Puerto Maldonado es la puerta de entrada; el acceso a la reserva combina carretera y navegación.',
    whatToBring: ['Repelente', 'Poncho impermeable', 'Botella reutilizable', 'Binoculares'], safety: 'Ingresa con operadores autorizados, respeta al guía y no alimentes ni manipules fauna.', accessibility: 'Los embarques y senderos naturales pueden ser exigentes; consulta opciones adaptadas.',
    sourceName: 'SERNANP · Reserva Nacional Tambopata', sourceUrl: 'https://visitaareasnaturales.sernanp.gob.pe/anps/reserva-nacional-tambopata/', imageCredit: 'ggallice · Creative Commons vía Wikimedia Commons', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Flickr_-_ggallice_-_Rio_Tambopata_(1).jpg',
  },
];
