import { destinations } from './destinations';

export const expertQuestions = [
  { id: 'region', question: '¿Qué región natural del Perú te atrae más?', options: [
    { answerText: 'Costa: mar, desierto y valles', facts: { region: 'costa' } },
    { answerText: 'Sierra: Andes, historia y paisajes de altura', facts: { region: 'sierra' } },
    { answerText: 'Selva: Amazonía, ríos y biodiversidad', facts: { region: 'selva' } },
    { answerText: 'Estoy abierto a cualquier región', facts: { region: 'cualquiera' } },
  ] },
  { id: 'interest', question: '¿Cuál sería el interés principal de tu viaje?', options: [
    { answerText: 'Arqueología e historia', facts: { interest: 'historia' } },
    { answerText: 'Naturaleza y fauna', facts: { interest: 'naturaleza' } },
    { answerText: 'Aventura y paisajes', facts: { interest: 'aventura' } },
    { answerText: 'Gastronomía y cultura viva', facts: { interest: 'cultura' } },
  ] },
  { id: 'climate', question: '¿Qué clima prefieres durante el viaje?', options: [
    { answerText: 'Cálido y seco', facts: { climate: 'seco' } },
    { answerText: 'Templado o fresco', facts: { climate: 'templado' } },
    { answerText: 'Frío de montaña', facts: { climate: 'frio' } },
    { answerText: 'Cálido, húmedo y tropical', facts: { climate: 'tropical' } },
  ] },
  { id: 'activity', question: '¿Qué nivel de actividad física deseas?', options: [
    { answerText: 'Relajado y con poco esfuerzo', facts: { activity: 'baja' } },
    { answerText: 'Moderado, con caminatas cortas', facts: { activity: 'media' } },
    { answerText: 'Activo, con caminatas o excursiones largas', facts: { activity: 'alta' } },
  ] },
  { id: 'altitude', question: '¿Cómo te sientes respecto a viajar a gran altitud?', options: [
    { answerText: 'Prefiero evitar la altura', facts: { altitude: 'baja' } },
    { answerText: 'Acepto altura moderada con adaptación', facts: { altitude: 'media' } },
    { answerText: 'No me incomoda la altura', facts: { altitude: 'alta' } },
  ] },
  { id: 'duration', question: '¿Cuánto tiempo deseas dedicar al destino?', options: [
    { answerText: 'Uno o dos días', facts: { duration: 'corta' } },
    { answerText: 'Entre tres y cuatro días', facts: { duration: 'media' } },
    { answerText: 'Cinco días o más', facts: { duration: 'larga' } },
  ] },
  { id: 'budget', question: '¿Qué presupuesto estimas para las actividades?', options: [
    { answerText: 'Económico', facts: { budget: 'economico' } },
    { answerText: 'Moderado', facts: { budget: 'moderado' } },
    { answerText: 'Flexible para experiencias especiales', facts: { budget: 'flexible' } },
  ] },
];

// La base de conocimiento se deriva del catálogo: no replica nombres, atractivos ni fuentes.
export const expertDestinations = destinations
  .filter(({ expertId }) => expertId)
  .map(({ expertId, expertName, naturalRegion = 'Costa', department = 'Ica', province, summary, highlights, sourceName, sourceUrl }) => ({
    id: expertId, name: expertName, naturalRegion, department, catalogProvince: province,
    summary, attractions: highlights, sourceName, sourceUrl,
  }));

const rule = (id, destination, conditions, weight, explanation) => ({ id, destination, conditions, weight, explanation });

export const expertRules = [
  rule('R01', 'ica', { region: ['costa', 'cualquiera'], interest: ['aventura', 'cultura'], climate: ['seco'] }, .88, 'La costa desértica, las dunas y la tradición del pisco coinciden con tus preferencias.'),
  rule('R02', 'ica', { activity: ['media'], duration: ['corta', 'media'], budget: ['economico', 'moderado'] }, .72, 'Ica permite combinar actividades variadas en pocos días y con presupuesto controlado.'),
  rule('R03', 'paracas', { region: ['costa', 'cualquiera'], interest: ['naturaleza'], climate: ['seco', 'templado'] }, .92, 'Paracas destaca por naturaleza costera, fauna marina y clima desértico templado.'),
  rule('R04', 'paracas', { activity: ['baja', 'media'], altitude: ['baja'], duration: ['corta'] }, .82, 'Es apropiado si deseas baja altitud y recorridos accesibles en una estancia corta.'),
  rule('R05', 'nazca', { region: ['costa', 'cualquiera'], interest: ['historia', 'aventura'], climate: ['seco'] }, .93, 'Nazca reúne arqueología, geoglifos y paisajes desérticos.'),
  rule('R06', 'nazca', { altitude: ['baja'], duration: ['corta', 'media'], budget: ['moderado', 'flexible'] }, .77, 'El destino encaja con una visita corta y experiencias especializadas como el sobrevuelo.'),
  rule('R07', 'cusco', { region: ['sierra', 'cualquiera'], interest: ['historia', 'cultura'] }, .96, 'Cusco concentra patrimonio inca, cultura viva y el Santuario Histórico de Machu Picchu.'),
  rule('R08', 'cusco', { altitude: ['media', 'alta'], duration: ['media', 'larga'], budget: ['moderado', 'flexible'] }, .86, 'La adaptación a la altura y varios días disponibles favorecen una experiencia completa en Cusco.'),
  rule('R09', 'arequipa', { region: ['sierra', 'cualquiera'], interest: ['historia', 'naturaleza'], climate: ['seco', 'templado'] }, .88, 'Arequipa combina patrimonio urbano y paisajes andinos del Colca.'),
  rule('R10', 'arequipa', { activity: ['media'], altitude: ['media', 'alta'], duration: ['media'] }, .78, 'El viaje se ajusta a caminatas moderadas y una estancia de varios días.'),
  rule('R11', 'puno', { region: ['sierra', 'cualquiera'], interest: ['cultura', 'naturaleza'], climate: ['frio'] }, .91, 'Puno vincula cultura altiplánica, comunidades y paisajes del Titicaca.'),
  rule('R12', 'puno', { altitude: ['alta'], duration: ['media', 'larga'], activity: ['baja', 'media'] }, .82, 'Tu tolerancia a la altura permite disfrutar el altiplano con un ritmo moderado.'),
  rule('R13', 'ancash', { region: ['sierra', 'cualquiera'], interest: ['aventura', 'naturaleza'], climate: ['frio', 'templado'] }, .95, 'Áncash es idóneo para montaña, lagunas y naturaleza altoandina.'),
  rule('R14', 'ancash', { activity: ['alta'], altitude: ['alta'], duration: ['media', 'larga'] }, .91, 'La actividad intensa y tolerancia a la altura favorecen excursiones en la Cordillera Blanca.'),
  rule('R15', 'loreto', { region: ['selva', 'cualquiera'], interest: ['naturaleza', 'cultura'], climate: ['tropical'] }, .95, 'Loreto coincide con tu interés por la Amazonía, los ríos y la biodiversidad.'),
  rule('R16', 'loreto', { activity: ['baja', 'media'], duration: ['media', 'larga'], budget: ['moderado', 'flexible'] }, .79, 'Una estancia de varios días permite navegación y observación de fauna con operadores formales.'),
  rule('R17', 'tambopata', { region: ['selva', 'cualquiera'], interest: ['naturaleza', 'aventura'], climate: ['tropical'] }, .97, 'Tambopata ofrece una experiencia centrada en selva tropical y biodiversidad.'),
  rule('R18', 'tambopata', { activity: ['media', 'alta'], duration: ['media', 'larga'], budget: ['moderado', 'flexible'] }, .84, 'Tus preferencias permiten excursiones amazónicas y una permanencia suficiente en la reserva.'),
  rule('R19', 'lima', { region: ['costa', 'cualquiera'], interest: ['historia', 'cultura'], climate: ['templado'] }, .86, 'Lima y Pachacámac combinan patrimonio, museos y cultura costera sin exposición a gran altitud.'),
  rule('R20', 'lima', { altitude: ['baja'], duration: ['corta'], budget: ['economico', 'moderado'] }, .79, 'La visita se adapta a pocos días, baja altitud y un presupuesto controlado.'),
  rule('R21', 'lalibertad', { region: ['costa', 'cualquiera'], interest: ['historia', 'cultura'], climate: ['seco', 'templado'] }, .91, 'Chan Chan aporta arqueología, arquitectura de tierra y cultura de la costa norte.'),
  rule('R22', 'lalibertad', { activity: ['baja', 'media'], duration: ['corta', 'media'], budget: ['economico', 'moderado'] }, .76, 'Trujillo permite una experiencia cultural de ritmo moderado y duración flexible.'),
  rule('R23', 'amazonas', { region: ['sierra', 'cualquiera'], interest: ['historia', 'naturaleza'], climate: ['templado'] }, .93, 'Kuélap combina arqueología Chachapoyas, bosque montano y paisajes del Utcubamba.'),
  rule('R24', 'amazonas', { activity: ['media', 'alta'], altitude: ['media', 'alta'], duration: ['media', 'larga'] }, .84, 'La disponibilidad de varios días y un ritmo activo favorecen el corredor de Amazonas.'),
  rule('R25', 'sanmartin', { region: ['selva', 'cualquiera'], interest: ['naturaleza', 'aventura'], climate: ['tropical'] }, .94, 'Tarapoto coincide con la preferencia por cataratas, bosque tropical y clima amazónico.'),
  rule('R26', 'sanmartin', { activity: ['media', 'alta'], duration: ['media'], budget: ['economico', 'moderado'] }, .81, 'San Martín ofrece excursiones de actividad moderada en una estancia de varios días.'),
];
