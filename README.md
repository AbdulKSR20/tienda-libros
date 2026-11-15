# 📚 Tienda de Libros - Integración Frontend React y API REST Mock (MSW)

> **Asignatura:** Desarrollo Frontend II (PFY2202)  
> **Evaluación:** Evaluación Formativa 3 — Semana 4  
> **Institución:** Duoc UC  

---

## 📋 Descripción del Proyecto

Aplicación web frontend desarrollada con **React 19**, **React Router** y **Tailwind CSS v4**, enfocada en la comunicación asíncrona entre un componente React y una **API REST Mock** mediante **MSW (Mock Service Worker)**. Permite explorar categorías literarias y filtrar el catálogo de libros en memoria con manejo completo de estados de carga, errores HTTP/red y cancelación segura de peticiones.

---

## ✨ Funcionalidades Principales

1. **API REST Mock con MSW (`src/mocks/`):**
   - Intercepta peticiones reales mediante Service Worker (`public/mockServiceWorker.js`) en desarrollo:
     - `GET /api/categorias` — Devuelve el listado de categorías literarias desde `src/data/categorias.json`.
     - `GET /api/libros` — Devuelve el catálogo de libros desde `src/data/libros.json` (soporta filtrado opcional por `?categoria=...`).
   - Simulación realista de latencia con `delay()` y soporte para simular respuestas `404` y `500` vía query param `?error=404` o `?error=500`.

2. **Manejo Robusto de Errores y Recuperación (`src/services/api.js`):**
   - Validación explícita de `respuesta.ok` para distinguir errores `404` (Recurso no encontrado) y `500` (Error del servidor), además de fallos de conectividad (`TypeError`).
   - Alerta accesible (`role="alert"`) con botón **Reintentar** y respaldo visual manteniendo los últimos datos válidos cargados.

3. **Control de Carga y Experiencia Fluida:**
   - Estado inicial `cargando = true` con indicador accesible (`role="status"`).
   - Deshabilitación preventiva de botones (`disabled={cargando}`) durante peticiones activas.

4. **Optimización de Consultas:**
   - Carga inicial única y en paralelo mediante `Promise.all` en el componente raíz [`src/App.jsx`](src/App.jsx), evitando peticiones redundantes al navegar entre rutas.
   - Limpieza segura con `AbortController` en `useEffect`.
   - Filtrado por categoría directamente en memoria en [`src/pages/Categorias.jsx`](src/pages/Categorias.jsx).

5. **Navegación SPA con React Router:**
   - `/` → Vista de bienvenida y resumen de categorías ([`Inicio.jsx`](src/pages/Inicio.jsx)).
   - `/categorias` → Explorador interactivo por categorías, catálogo de libros y pruebas de error ([`Categorias.jsx`](src/pages/Categorias.jsx)).
   - `*` → Vista 404 personalizada ([`PaginaNoEncontrada.jsx`](src/pages/PaginaNoEncontrada.jsx)).

---

## 🛠️ Tecnologías Utilizadas

- **React 19** (`useState`, `useEffect`, `useCallback`)
- **React Router** (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`)
- **MSW (Mock Service Worker)** (`setupWorker`, `http`, `HttpResponse`, `delay`)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Vite 8** y **Oxlint**

---

## 🚀 Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone <URL_DE_TU_REPOSITORIO>
cd tienda-libros

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo (activa MSW automáticamente)
npm run dev
```

Luego abre `http://localhost:5173` en tu navegador.

### Otros comandos útiles
- `npm run build` — Compila el proyecto para producción.
- `npm run lint` — Ejecuta el análisis estático con `oxlint`.

---

## 👨‍💻 Autor

- **Abdul** — Desarrollo Frontend II (PFY2202), Duoc UC.
