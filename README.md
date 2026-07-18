# Calculadora multifuncional

Este proyecto es una calculadora multifuncional creada con Vue 3. Además de
las operaciones básicas, tiene un conversor de divisas y muestra el tiempo de
Asturias.

La aplicación está desarrollada siguiendo el diseño mobile first y todas sus
funcionalidades aparecen en una sola vista.

## Enlaces

- [Aplicación en GitHub Pages](https://zookatt.github.io/calculator/)
- [Repositorio en GitHub](https://github.com/zookatt/calculator)

## Funcionalidades

### Calculadora

- Suma, resta, multiplicación y división.
- Números decimales.
- Botón `CE` para borrar la operación.
- Control de errores, como la división entre cero.
- Botones de memoria `M+`, `MR` y `MC` usando Pinia.

### Conversor de divisas

- Conversión entre euros (`EUR`), dólares (`USD`) y yenes (`JPY`).
- Datos obtenidos desde la
  [API de CurrencyFreaks](https://currencyfreaks.com/).
- Botón para intercambiar las divisas.
- Mensajes de carga y de error.

### El tiempo

- Muestra el tiempo de Asturias usando la
  [API de El Tiempo](https://www.el-tiempo.net/api).
- Muestra las temperaturas mínima y máxima.
- Cambia la imagen dependiendo del valor `stateSky` de la API.
- Incluye mensajes de carga y de error.

## Tecnologías utilizadas

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Bootstrap y CSS
- Vitest y Vue Test Utils
- Playwright
- GitHub Actions y GitHub Pages

## Cómo instalar el proyecto

Para ejecutar el proyecto en local necesitas tener instalados Node.js y npm.

Primero, clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/zookatt/calculator.git
cd calculator
npm install
```

Después, crea el archivo `.env` usando `.env.example` como ejemplo:

```bash
cp .env.example .env
```

Añade tu API key de CurrencyFreaks:

```env
VITE_CURRENCY_FREAKS_API_KEY=your_api_key
```

El archivo `.env` no se debe subir al repositorio porque contiene la API key.

Para iniciar el proyecto:

```bash
npm run dev
```

## Comandos disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Crea la versión de producción.

```bash
npm run preview
```

Permite revisar la versión de producción en local.

```bash
npm run test:unit
```

Ejecuta los tests unitarios y de componentes con Vitest.

```bash
npm run test:e2e
```

Ejecuta los tests end-to-end con Playwright.

```bash
npm run test:coverage
```

Genera el informe de cobertura de los tests unitarios.

## Tests

El proyecto tiene tests para comprobar:

- Las operaciones de la calculadora.
- Los errores, como dividir entre cero.
- La memoria de la calculadora.
- La conversión de divisas.
- Las llamadas a las APIs y sus mappers.
- Los componentes principales.
- Los flujos completos de calculadora, divisas y tiempo con Playwright.

Para ejecutar todos los tests principales:

```bash
npm run test:unit
npm run test:e2e
```

## Estructura del proyecto

```text
src/
├── components/       # Componentes de la aplicación
├── core/
│   ├── apis/         # Servicios para llamar a las APIs
│   ├── calculate/    # Lógica de cálculo
│   ├── composables/  # Estado y funciones reutilizables de Vue
│   ├── mappers/      # Transformación de las respuestas de las APIs
│   └── models/       # Constantes y datos compartidos
├── router/           # Configuración de Vue Router
├── stores/           # Store de Pinia
├── tests/            # Tests unitarios y de componentes
└── views/            # Vista principal

e2e/                  # Tests de Playwright
```

## Despliegue

La aplicación está desplegada en GitHub Pages. Cuando se hace un push a la
rama `main`, GitHub Actions construye y publica automáticamente la nueva
versión.

Para que el conversor funcione en la aplicación desplegada, el repositorio
necesita un secret de GitHub Actions llamado:

```text
VITE_CURRENCY_FREAKS_API_KEY
```

## Autora

Proyecto realizado por [zookatt](https://github.com/zookatt).
