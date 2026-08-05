import { expect, test } from '@playwright/test';
import path from 'node:path';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
});

test('filtra el catálogo nacional por región', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('SafeTravel Perú | Sistema experto de viajes');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/safetravel-icon.svg');
  await expect(page.getByText('16 experiencias encontradas')).toBeVisible();
  await page.getByLabel('Región natural').selectOption('Selva');
  await expect(page.getByText('3 experiencias encontradas')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tarapoto y Ahuashiyacu' })).toBeVisible();
  await expect(page.locator('#destinos').getByRole('heading', { name: 'Cusco y Machu Picchu' })).toHaveCount(0);
});

test('completa el sistema experto y muestra una explicación', async ({ page }) => {
  await page.goto('/quiz');
  await page.getByRole('button', { name: 'Iniciar' }).click();
  const answers = [
    'Costa: mar, desierto y valles', 'Arqueología e historia', 'Cálido y seco',
    'Relajado y con poco esfuerzo', 'Prefiero evitar la altura', 'Uno o dos días', 'Económico',
  ];
  for (const [index, answer] of answers.entries()) {
    await page.getByRole('radio', { name: answer }).click();
    await page.getByRole('button', { name: index === answers.length - 1 ? 'Ver resultado' : 'Continuar' }).click();
  }
  await expect(page.getByRole('heading', { name: /(Tu destino recomendado es|Mejor coincidencia provisional):/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: '¿Cómo llegó a esta conclusión?' })).toBeVisible();
  await expect(page.getByText('Qué significa el resultado')).toBeVisible();
  await page.getByRole('link', { name: 'Ver análisis técnico' }).click();
  await expect(page.getByRole('heading', { name: 'Matriz de cobertura del conocimiento' })).toBeVisible();
});

test('calcula conexiones y presupuesto del itinerario', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('safetravel-itinerary', JSON.stringify([7, 8, 11])));
  await page.goto('/itinerario');
  await expect(page.getByText('Orden inteligente')).toBeVisible();
  await expect(page.getByText(/km aprox\./).first()).toBeVisible();
  await page.getByLabel('Alojamiento por noche').fill('120');
  await page.getByLabel(/Traslados por viajero/).fill('80');
  await expect(page.getByText('Alojamiento · 12 noches')).toBeVisible();
  await expect(page.getByText('Valores referenciales; no incluyen alimentación ni comisiones.')).toBeVisible();
});

test('publica una experiencia con fotografía en el dispositivo', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Nombre').fill('Visitante de prueba');
  await page.getByLabel('Destino').fill('Paracas');
  await page.getByLabel('Título').fill('Una visita responsable');
  await page.getByLabel('Comentario').fill('La señalización y el recorrido guiado hicieron la experiencia muy clara.');
  await page.locator('input[type="file"]').setInputFiles(path.resolve('src/assets/huacachina.webp'));
  await page.getByRole('button', { name: 'Publicar experiencia' }).click();
  await expect(page.getByRole('status')).toContainText('se publicó correctamente');
});
