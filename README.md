# SafeTravel Perú

Sistema experto web para orientar a viajeros en la elección de destinos turísticos del Perú y convertir la recomendación en un itinerario explicable.

> Proyecto académico. Las recomendaciones, presupuestos, horarios y distancias son referenciales; antes de viajar deben verificarse con entidades y operadores formales.

## 1. Problema y objetivo

La oferta turística peruana es extensa y el visitante puede desconocer qué destino se adapta a sus intereses, condición física, tolerancia a la altura, tiempo y presupuesto. SafeTravel transforma esas preferencias en hechos y aplica reglas ponderadas para producir una recomendación trazable, alternativas y precauciones.

El objetivo no es reemplazar a una agencia, autoridad turística o profesional de salud. El sistema funciona como apoyo inicial a la decisión.

## 2. Alcance actual

- Catálogo de 16 experiencias de Costa, Sierra y Selva.
- 13 destinos representados en la base de conocimiento experta.
- 7 preguntas que construyen la memoria de trabajo.
- 26 reglas ponderadas y explicables.
- Ranking, alternativas y factores de certeza interna.
- Filtros por texto, provincia, región, presupuesto, duración, actividad y categoría.
- Favoritos e itinerario persistentes en el navegador.
- Distancias geográficas, días de conexión y orden sugerido por cercanía.
- Fechas, detección de tiempo insuficiente y presupuesto desglosado.
- Fichas con mapa, recomendaciones prácticas, fuentes y créditos de imagen.
- Publicación local de experiencias con fotografía.

## 3. Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 | Componentes y estado de interfaz |
| React Router 6 | Navegación entre páginas |
| Vite 5 | Desarrollo y compilación |
| Leaflet / React Leaflet | Mapas de destinos |
| Vitest | Pruebas unitarias y de consistencia |
| Playwright | Pruebas de recorridos completos |
| ESLint | Análisis estático |
| localStorage / sessionStorage | Persistencia del prototipo |

## 4. Instalación

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev
```

Abrir la dirección indicada por Vite, normalmente `http://localhost:5173`.

El error `"vite" no se reconoce` aparece cuando no están instaladas las dependencias. Se corrige ejecutando `npm install` dentro de la carpeta del proyecto.

## 5. Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # compilación de producción
npm run preview      # vista previa de la compilación
npm run lint         # análisis estático
npm test             # pruebas unitarias
npm run test:e2e     # pruebas de interfaz en Chromium
```

La primera ejecución de Playwright puede requerir:

```bash
npx playwright install chromium
```

## 6. Arquitectura

```text
src/
├── Components/       componentes reutilizables
├── View/             páginas y rutas
├── data/
│   ├── destinations.js           catálogo canónico
│   ├── national-destinations.js  extensión nacional del catálogo
│   └── expert-knowledge.js       preguntas y reglas
├── hooks/            persistencia y estado reutilizable
├── lib/
│   ├── expert-system.js          motor de inferencia
│   └── travel-utils.js           filtros, rutas y presupuesto
└── assets/           recursos visuales locales
tests/e2e/            recorridos completos de interfaz
```

### Fuente única de información

`destinations` es el catálogo canónico. El sistema experto deriva de allí el nombre, región, resumen, atractivos y fuente de cada hipótesis mediante `expertId`. `expert-knowledge.js` conserva únicamente preguntas y reglas. Esta separación evita que la información turística se copie y termine siendo diferente entre catálogo, quiz e itinerario.

## 7. Funcionamiento del sistema experto

### Base de hechos

Las respuestas producen siete hechos:

```js
{
  region: 'selva',
  interest: 'naturaleza',
  climate: 'tropical',
  activity: 'alta',
  altitude: 'baja',
  duration: 'larga',
  budget: 'flexible'
}
```

### Reglas

Cada regla contiene:

- Identificador trazable (`R01`–`R26`).
- Destino asociado.
- Condiciones aceptadas.
- Peso entre 0 y 1.
- Explicación en lenguaje natural.

Una regla obtiene cobertura según la proporción de condiciones satisfechas:

```text
certeza de evidencia = peso de la regla × cobertura
```

Las evidencias de un destino se combinan incrementalmente:

```text
CF combinado = CF actual + CF nuevo × (1 − CF actual)
```

El resultado se limita naturalmente a 100 %. Los porcentajes expresan confianza interna del modelo, no probabilidad estadística, disponibilidad ni garantía de satisfacción.

### Trazabilidad

El resultado conserva reglas activadas, condiciones coincidentes, condiciones ausentes, cobertura y certeza. El panel `/sistema-experto` permite auditar el razonamiento.

## 8. Cobertura turística

La muestra cubre destinos de Ica, Cusco, Arequipa, Puno, Áncash, Loreto, Madre de Dios, Lima, La Libertad, Amazonas y San Martín. Se priorizaron fuentes como UNESCO, SERNANP, PROMPERÚ, Ministerio de Cultura y gobiernos regionales.

Cada ficha registra coordenadas, clima, temporada referencial, acceso, seguridad, accesibilidad, elementos recomendados, fuente turística y crédito visual. Los enlaces deben revisarse periódicamente porque horarios, tarifas y condiciones de acceso cambian.

## 9. Pruebas

### Unitarias y de conocimiento

- Construcción de hechos y recomendaciones esperadas.
- Ranking, explicaciones y evaluación de reglas.
- Identificadores y slugs únicos.
- Campos turísticos obligatorios.
- Correspondencia entre catálogo e hipótesis expertas.
- Dos reglas trazables por cada hipótesis.
- Filtros, distancias, orden de ruta, fechas y presupuesto.

### Interfaz

Playwright recorre escritorio y móvil para comprobar:

1. Filtro nacional por región.
2. Cuestionario completo y explicación del resultado.
3. Itinerario con conexiones y presupuesto.
4. Publicación local con fotografía.

## 10. Persistencia y privacidad

Favoritos, itinerario, preferencias y publicaciones se guardan localmente en el navegador. No existen cuentas ni servidor, por lo que los datos no se sincronizan entre dispositivos. Las fotografías tienen límite de tamaño para reducir el riesgo de agotar el almacenamiento.

No deben ingresarse documentos, teléfonos, datos bancarios ni información sensible.

## 11. Fuentes principales

- [UNESCO World Heritage Centre](https://whc.unesco.org/)
- [SERNANP – visita áreas naturales](https://visitaareasnaturales.sernanp.gob.pe/)
- [PROMPERÚ – Perú Travel](https://www.peru.travel/)
- [Plataforma del Estado Peruano](https://www.gob.pe/)
- [Wikimedia Commons](https://commons.wikimedia.org/) para imágenes con crédito y licencia indicados en cada ficha.

## 12. Limitaciones y trabajo futuro

- Validar los pesos con especialistas en turismo y documentar entrevistas.
- Incorporar un umbral formal de baja confianza.
- Verificar periódicamente fuentes y estados de acceso.
- Sustituir imágenes remotas por copias optimizadas locales cuando el servidor de imágenes lo permita.
- Incorporar rutas viales mediante un proveedor opcional, conservando el cálculo local como respaldo.
- Usar un backend si se requieren usuarios, sincronización y moderación comunitaria.
- Ampliar cobertura únicamente con información revisada y nuevas reglas comprobables.

## 13. Naturaleza académica

SafeTravel demuestra adquisición y representación de conocimiento, inferencia ponderada, explicación de decisiones, persistencia del prototipo, diseño centrado en el usuario y verificación automatizada. No constituye un sistema de reservas ni reemplaza información oficial actualizada.
