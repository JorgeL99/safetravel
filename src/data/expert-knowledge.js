export const expertQuestions = [
  {
    id: "region",
    question: "¿Qué región natural del Perú te atrae más?",
    options: [
      { answerText: "Costa: mar, desierto y valles", facts: { region: "costa" } },
      { answerText: "Sierra: Andes, historia y paisajes de altura", facts: { region: "sierra" } },
      { answerText: "Selva: Amazonía, ríos y biodiversidad", facts: { region: "selva" } },
      { answerText: "Estoy abierto a cualquier región", facts: { region: "cualquiera" } },
    ],
  },
  {
    id: "interest",
    question: "¿Cuál sería el interés principal de tu viaje?",
    options: [
      { answerText: "Arqueología e historia", facts: { interest: "historia" } },
      { answerText: "Naturaleza y fauna", facts: { interest: "naturaleza" } },
      { answerText: "Aventura y paisajes", facts: { interest: "aventura" } },
      { answerText: "Gastronomía y cultura viva", facts: { interest: "cultura" } },
    ],
  },
  {
    id: "climate",
    question: "¿Qué clima prefieres durante el viaje?",
    options: [
      { answerText: "Cálido y seco", facts: { climate: "seco" } },
      { answerText: "Templado o fresco", facts: { climate: "templado" } },
      { answerText: "Frío de montaña", facts: { climate: "frio" } },
      { answerText: "Cálido, húmedo y tropical", facts: { climate: "tropical" } },
    ],
  },
  {
    id: "activity",
    question: "¿Qué nivel de actividad física deseas?",
    options: [
      { answerText: "Relajado y con poco esfuerzo", facts: { activity: "baja" } },
      { answerText: "Moderado, con caminatas cortas", facts: { activity: "media" } },
      { answerText: "Activo, con caminatas o excursiones largas", facts: { activity: "alta" } },
    ],
  },
  {
    id: "altitude",
    question: "¿Cómo te sientes respecto a viajar a gran altitud?",
    options: [
      { answerText: "Prefiero evitar la altura", facts: { altitude: "baja" } },
      { answerText: "Acepto altura moderada con adaptación", facts: { altitude: "media" } },
      { answerText: "No me incomoda la altura", facts: { altitude: "alta" } },
    ],
  },
  {
    id: "duration",
    question: "¿Cuánto tiempo deseas dedicar al destino?",
    options: [
      { answerText: "Uno o dos días", facts: { duration: "corta" } },
      { answerText: "Entre tres y cuatro días", facts: { duration: "media" } },
      { answerText: "Cinco días o más", facts: { duration: "larga" } },
    ],
  },
  {
    id: "budget",
    question: "¿Qué presupuesto estimas para las actividades?",
    options: [
      { answerText: "Económico", facts: { budget: "economico" } },
      { answerText: "Moderado", facts: { budget: "moderado" } },
      { answerText: "Flexible para experiencias especiales", facts: { budget: "flexible" } },
    ],
  },
];

export const expertDestinations = [
  {
    id: "ica", name: "Ica y Huacachina", naturalRegion: "Costa", department: "Ica", catalogProvince: "Ica",
    summary: "Oasis, dunas, aventura y tradición vitivinícola en el desierto costero.",
    attractions: ["Oasis de Huacachina", "Dunas de Ica", "Ruta del Pisco y bodegas tradicionales"],
    sourceName: "PROMPERÚ · Destino Ica", sourceUrl: "https://meetings.peru.travel/es/destinos/ica",
  },
  {
    id: "paracas", name: "Paracas", naturalRegion: "Costa", department: "Ica", catalogProvince: "Pisco",
    summary: "Reserva costera, paisajes desérticos y observación responsable de fauna marina.",
    attractions: ["Reserva Nacional de Paracas", "Islas Ballestas", "Playa Roja y miradores costeros"],
    sourceName: "SERNANP · Reserva Nacional de Paracas", sourceUrl: "https://visitaareasnaturales.sernanp.gob.pe/anps/reserva-nacional-de-paracas/",
  },
  {
    id: "nazca", name: "Nazca", naturalRegion: "Costa", department: "Ica", catalogProvince: "Nazca",
    summary: "Patrimonio arqueológico y geoglifos prehispánicos en un paisaje desértico.",
    attractions: ["Líneas y Geoglifos de Nasca y Palpa", "Mirador de las Líneas", "Acueductos de Cantalloc"],
    sourceName: "UNESCO · Líneas y Geoglifos de Nasca y Palpa", sourceUrl: "https://whc.unesco.org/en/list/700",
  },
  {
    id: "cusco", name: "Cusco y Machu Picchu", naturalRegion: "Sierra", department: "Cusco", catalogProvince: "Cusco",
    summary: "Historia andina, arquitectura inca y uno de los paisajes culturales más reconocidos del Perú.",
    attractions: ["Santuario Histórico de Machu Picchu", "Ciudad del Cusco", "Valle Sagrado de los Incas"],
    sourceName: "UNESCO · Santuario Histórico de Machu Picchu", sourceUrl: "https://whc.unesco.org/en/list/274",
  },
  {
    id: "arequipa", name: "Arequipa y Valle del Colca", naturalRegion: "Sierra", department: "Arequipa", catalogProvince: "Arequipa",
    summary: "Arquitectura de sillar, cultura regional y profundos paisajes andinos.",
    attractions: ["Centro histórico de Arequipa", "Valle y cañón del Colca", "Miradores del cóndor"],
    sourceName: "UNESCO · Centro histórico de Arequipa", sourceUrl: "https://whc.unesco.org/en/list/1016",
  },
  {
    id: "puno", name: "Puno y Lago Titicaca", naturalRegion: "Sierra", department: "Puno", catalogProvince: "Puno",
    summary: "Cultura viva del altiplano, navegación y comunidades vinculadas al lago navegable más alto del mundo.",
    attractions: ["Reserva Nacional del Titicaca", "Islas de los Uros", "Complejo arqueológico de Sillustani"],
    sourceName: "SERNANP · Reserva Nacional del Titicaca", sourceUrl: "https://visitaareasnaturales.sernanp.gob.pe/anps/reserva-nacional-del-titicaca/",
  },
  {
    id: "ancash", name: "Áncash y Cordillera Blanca", naturalRegion: "Sierra", department: "Áncash", catalogProvince: "Huaraz",
    summary: "Lagunas altoandinas, montañas y patrimonio arqueológico para viajeros activos.",
    attractions: ["Parque Nacional Huascarán", "Laguna 69", "Sitio arqueológico de Chavín"],
    sourceName: "UNESCO · Parque Nacional Huascarán", sourceUrl: "https://whc.unesco.org/en/list/333",
  },
  {
    id: "loreto", name: "Iquitos y Pacaya Samiria", naturalRegion: "Selva", department: "Loreto", catalogProvince: "Maynas",
    summary: "Ríos amazónicos, bosques inundables y observación de biodiversidad con operadores autorizados.",
    attractions: ["Río Amazonas", "Reserva Nacional Pacaya Samiria", "Bosques y fauna amazónica"],
    sourceName: "PROMPERÚ · Destino Iquitos", sourceUrl: "https://meetings.peru.travel/es/destinos/iquitos",
  },
  {
    id: "tambopata", name: "Tambopata", naturalRegion: "Selva", department: "Madre de Dios", catalogProvince: "Tambopata",
    summary: "Selva tropical y biodiversidad amazónica en áreas naturales protegidas.",
    attractions: ["Reserva Nacional Tambopata", "Lago Sandoval", "Collpas y senderos amazónicos"],
    sourceName: "SERNANP · Reserva Nacional Tambopata", sourceUrl: "https://visitaareasnaturales.sernanp.gob.pe/anps/reserva-nacional-tambopata/",
  },
];

const rule = (id, destination, conditions, weight, explanation) => ({ id, destination, conditions, weight, explanation });

export const expertRules = [
  rule("R01", "ica", { region: ["costa", "cualquiera"], interest: ["aventura", "cultura"], climate: ["seco"] }, .88, "La costa desértica, las dunas y la tradición del pisco coinciden con tus preferencias."),
  rule("R02", "ica", { activity: ["media"], duration: ["corta", "media"], budget: ["economico", "moderado"] }, .72, "Ica permite combinar actividades variadas en pocos días y con presupuesto controlado."),
  rule("R03", "paracas", { region: ["costa", "cualquiera"], interest: ["naturaleza"], climate: ["seco", "templado"] }, .92, "Paracas destaca por naturaleza costera, fauna marina y clima desértico templado."),
  rule("R04", "paracas", { activity: ["baja", "media"], altitude: ["baja"], duration: ["corta"] }, .82, "Es apropiado si deseas baja altitud y recorridos accesibles en una estancia corta."),
  rule("R05", "nazca", { region: ["costa", "cualquiera"], interest: ["historia", "aventura"], climate: ["seco"] }, .93, "Nazca reúne arqueología, geoglifos y paisajes desérticos."),
  rule("R06", "nazca", { altitude: ["baja"], duration: ["corta", "media"], budget: ["moderado", "flexible"] }, .77, "El destino encaja con una visita de corta duración y experiencias especializadas como el sobrevuelo."),
  rule("R07", "cusco", { region: ["sierra", "cualquiera"], interest: ["historia", "cultura"] }, .96, "Cusco concentra patrimonio inca, cultura viva y el Santuario Histórico de Machu Picchu."),
  rule("R08", "cusco", { altitude: ["media", "alta"], duration: ["media", "larga"], budget: ["moderado", "flexible"] }, .86, "La adaptación a la altura y varios días disponibles favorecen una experiencia completa en Cusco."),
  rule("R09", "arequipa", { region: ["sierra", "cualquiera"], interest: ["historia", "naturaleza"], climate: ["seco", "templado"] }, .88, "Arequipa combina patrimonio urbano y paisajes andinos del Colca."),
  rule("R10", "arequipa", { activity: ["media"], altitude: ["media", "alta"], duration: ["media"] }, .78, "El viaje se ajusta a caminatas moderadas y una estancia de varios días."),
  rule("R11", "puno", { region: ["sierra", "cualquiera"], interest: ["cultura", "naturaleza"], climate: ["frio"] }, .91, "Puno vincula cultura altiplánica, comunidades y paisajes del Titicaca."),
  rule("R12", "puno", { altitude: ["alta"], duration: ["media", "larga"], activity: ["baja", "media"] }, .82, "Tu tolerancia a la altura permite disfrutar el altiplano con un ritmo moderado."),
  rule("R13", "ancash", { region: ["sierra", "cualquiera"], interest: ["aventura", "naturaleza"], climate: ["frio", "templado"] }, .95, "Áncash es idóneo para montaña, lagunas y naturaleza altoandina."),
  rule("R14", "ancash", { activity: ["alta"], altitude: ["alta"], duration: ["media", "larga"] }, .91, "La actividad intensa y tolerancia a la altura favorecen excursiones en la Cordillera Blanca."),
  rule("R15", "loreto", { region: ["selva", "cualquiera"], interest: ["naturaleza", "cultura"], climate: ["tropical"] }, .95, "Loreto coincide con tu interés por la Amazonía, los ríos y la biodiversidad."),
  rule("R16", "loreto", { activity: ["baja", "media"], duration: ["media", "larga"], budget: ["moderado", "flexible"] }, .79, "Una estancia de varios días permite realizar navegación y observación de fauna con operadores formales."),
  rule("R17", "tambopata", { region: ["selva", "cualquiera"], interest: ["naturaleza", "aventura"], climate: ["tropical"] }, .97, "Tambopata ofrece una experiencia centrada en selva tropical y biodiversidad."),
  rule("R18", "tambopata", { activity: ["media", "alta"], duration: ["media", "larga"], budget: ["moderado", "flexible"] }, .84, "Tus preferencias permiten excursiones amazónicas y una permanencia suficiente en la reserva."),
];
