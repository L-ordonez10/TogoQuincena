<!-- Instrucciones breves para agentes AI que editan este repositorio -->
# Copilot / Agentes — Instrucciones específicas del repositorio

Propósito: ayudar a un agente a ser productivo rápidamente en este proyecto Next.js.

- **Stack & Entradas clave**: Next.js (app dir, v14), TypeScript, TailwindCSS, PostCSS. Ver `package.json` para scripts (`dev`, `build`, `start`).
- **Inicio rápido**: `npm run dev` inicia el servidor en `http://localhost:3000`.

- **Estructura importante**:
  - Raíz de la app: `app/` (rutinas enrutadas con subcarpetas como `cotizador/`, `solicita-adelanto/`).
  - Layout global: [app/layout.tsx](app/layout.tsx) — fuente global, `Header` y `Footer`.
  - Estilos globales: [app/globals.css](app/globals.css).
  - Sistema de componentes/primitive: [app/components/ui/](app/components/ui/) — reusar estos componentes para mantener consistencia.
  - Componentes de página/feature: p. ej. [app/cotizador/components/SalaryInputCard.tsx](app/cotizador/components/SalaryInputCard.tsx), [app/solicita-adelanto/components/form/FormContext.tsx](app/solicita-adelanto/components/form/FormContext.tsx).

- **Convenciones observadas**:
  - TypeScript + `.tsx` para componentes. Mantener tipos explícitos cuando sea simple (prop types/`Metadata`).
  - Reusar primitives de `app/components/ui/*` (botones, inputs, layouts). Evitar crear variantes iguales fuera de esa carpeta.
  - Gestión de formularios multi-step usa `FormContext` en `app/solicita-adelanto/components/form/` — centraliza estado y validaciones.
  - Utilities por feature: p. ej. `app/cotizador/components/utils.tsx` para lógica de cálculo; coloca lógica compartida en `/lib` si se vuelve transversal.

- **Integraciones y dependencias externas**:
  - UI libs: `@radix-ui/*`, `lucide-react`, `react-player` (reproducción de video), `embla-carousel-react`.
  - Imágenes estáticas y assets: `public/imagenes/ICONOS/` — referencia a rutas públicas con `/imagenes/...`.
  - No hay tests detectados; no modificar scripts `dev/build/start` sin avisar.

- **Qué revisar antes de cambiar comportamiento**:
  - Si tocas estilos, verifica `app/globals.css` y la clase global de fuente en [app/layout.tsx](app/layout.tsx).
  - Para cambios de UI, primero intenta componer usando un componente en `app/components/ui/`.
  - Si añades lógica de negocio reutilizable, agrégala en `lib/` y exporta desde allí.

- **Ejemplos concretos**:
  - Añadir un nuevo input estilizado: crea o extiende `app/components/ui/input.tsx` y úsalo en la página, en lugar de duplicar `className`.
  - Formularios de subida: `FileUploader.tsx` ya existe en `app/components/` — reusarlo para mantener UX coherente.

- **Comportamiento esperado del agente**:
  - No cambiar versiones en `package.json` ni `next.config.mjs` salvo petición explícita.
  - Hacer PRs pequeños y enfocados: 1 feature / 1 bugfix por PR.
  - Documentar en el PR dónde se actualizaron componentes primitives.

Si algo en estas notas está incompleto o necesitas ejemplos adicionales (p. ej. una guía para crear un nuevo primitive), indícame y lo ajusto.
