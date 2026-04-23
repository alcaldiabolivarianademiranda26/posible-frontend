# Sistema Integral de Gestión de Reportes Ciudadanos y Control de Bienes Institucionales

Aplicación SPA administrativa para gestión centralizada de reportes de servicios públicos y control de inventario de bienes, basada en las especificaciones DERT v3.0 y el diseño UX de referencia.

## Diseño de Referencia

![Diseño UX de referencia](file:///c:/Users/josber/Desktop/nuevo/Diseño_ux.png)

Se adaptará el layout del diseño (sidebar oscuro, KPI cards, gráficos, tablas) al contexto de gestión ciudadana usando la paleta de colores institucional.

---

## Stack Tecnológico

| Tecnología | Propósito |
|---|---|
| **Vite** | Bundler y dev server |
| **React 18 + TypeScript** | Framework UI |
| **Tailwind CSS v3** | Estilos utilitarios |
| **Shadcn/ui** | Componentes UI (con Radix UI) |
| **React Router v6** | Enrutamiento SPA |
| **Zustand** | Gestión de estado global |
| **TanStack Table** | Tablas avanzadas con filtros |
| **Recharts** | Gráficos y visualizaciones |
| **Lucide React** | Iconografía |
| **Sonner** | Notificaciones Toast |
| **pnpm** | Gestor de paquetes |

## Paleta de Colores Institucional

| Nombre | Hex | Uso |
|---|---|---|
| French Blue | `#003f92` | Primario (sidebar, headers, CTAs) |
| Bright Snow | `#f8fafb` | Fondo principal |
| Dark Emerald | `#095e28` | Acentos positivos (resuelto, funcional) |
| Blue Spruce | `#087a6f` | Acentos secundarios (proceso, info) |
| Steel Blue | `#4878b1` | Elementos complementarios |

---

## Arquitectura de la Aplicación (Clean Architecture)

```
src/
├── domain/                    # Capa de Dominio
│   ├── entities/              # Interfaces/Types (Reporte, Bien, Usuario)
│   └── usecases/              # Lógica de negocio pura
├── data/                      # Capa de Datos
│   ├── repositories/          # Implementaciones de repositorios
│   ├── mappers/               # Transformación de datos
│   └── mocks/                 # Datos simulados (mock)
├── presentation/              # Capa de Presentación
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/                # Shadcn/ui components
│   │   ├── layout/            # Layout, Sidebar, TopBar
│   │   ├── dashboard/         # Widgets del dashboard
│   │   ├── reports/           # Componentes de reportes
│   │   └── assets/            # Componentes de bienes
│   ├── pages/                 # Páginas/Vistas
│   ├── hooks/                 # Custom hooks
│   └── stores/                # Zustand stores
├── lib/                       # Utilidades compartidas
└── App.tsx                    # Punto de entrada + Router
```

---

## Proposed Changes

### Fase 1: Scaffolding del Proyecto

#### [NEW] Proyecto Vite + React + TypeScript
- Inicializar con `pnpm create vite@latest ./ --template react-ts`
- Instalar dependencias: tailwindcss, react-router-dom, zustand, recharts, lucide-react, sonner, @tanstack/react-table
- Configurar Tailwind con la paleta de colores institucional
- Configurar Shadcn/ui

#### [NEW] `tailwind.config.js`
- Extender colores con la paleta institucional
- Configurar fuentes (Inter como principal)

#### [NEW] `src/index.css`
- Estilos base, variables CSS, utilidades globales

---

### Fase 2: Capa de Dominio

#### [NEW] `src/domain/entities/Reporte.ts`
- Interface `Reporte` con todos los campos especificados
- Types para categorías, estados, prioridades
- Interface para transiciones de workflow (RF-13)

#### [NEW] `src/domain/entities/Bien.ts`
- Interface `Bien` con: id, nombre, tipo (mueble/inmueble), valor estimado, ubicación, estado físico (Dañado/Requiere Mantenimiento/Funcional), historial de cambios
- Interface `HistorialCambio` para trazabilidad (RF-11)

#### [NEW] `src/domain/entities/Usuario.ts`
- Interface `Usuario` con credenciales admin

#### [NEW] `src/domain/usecases/`
- `reporteUseCases.ts` — Crear, leer, actualizar estado (workflow), filtrar, exportar
- `bienUseCases.ts` — CRUD completo, trazabilidad, clasificación

---

### Fase 3: Capa de Datos (Mocks)

#### [NEW] `src/data/mocks/`
- `reportesMock.ts` — ~50 reportes distribuidos entre las 6 categorías con diferentes estados y prioridades
- `bienesMock.ts` — ~30 bienes muebles e inmuebles con historial
- `usuariosMock.ts` — Credenciales admin de prueba

#### [NEW] `src/data/repositories/`
- `reporteRepository.ts` — CRUD con datos mock, simulando latencia
- `bienRepository.ts` — CRUD con trazabilidad

---

### Fase 4: Layout y Navegación

#### [NEW] `src/presentation/components/layout/Sidebar.tsx`
- Logo institucional en la parte superior
- Navegación principal con iconos:
  - Dashboard (Overview)
  - **Servicios Públicos** (expandible):
    - Aguas, Vialidad, Aseo Urbano, Seguridad, Alumbrado, Transporte
  - **Gestión de Bienes**
  - Configuración
- Indicador activo, animación hover
- Botón de cerrar sesión en la parte inferior
- Estilo: fondo `#003f92` (French Blue) con texto blanco

#### [NEW] `src/presentation/components/layout/TopBar.tsx`
- Barra de búsqueda global
- Perfil del usuario con dropdown
- Breadcrumbs de navegación

#### [NEW] `src/presentation/components/layout/Layout.tsx`
- Layout principal que envuelve sidebar + topbar + contenido
- Responsive con sidebar colapsable

---

### Fase 5: Dashboard Principal

#### [NEW] `src/presentation/pages/Dashboard.tsx`
- **KPI Cards** (4 tarjetas superiores como en el diseño):
  - Total Reportes Activos
  - Reportes Resueltos (mes actual)
  - Tasa de Resolución (%)
  - Bienes Registrados
- **Gráfico de Tendencias** (bar chart) — Reportes por mes
- **Gráfico de Distribución** (donut chart) — Reportes por categoría
- **Lista de Reportes Recientes** — Últimas transacciones/cambios
- **Tickets Abiertos** — Lista de reportes pendientes con filtros rápidos

#### [NEW] `src/presentation/components/dashboard/`
- `KpiCard.tsx` — Tarjeta con valor, label, icono y tendencia
- `TrendChart.tsx` — Gráfico de barras (Recharts)
- `DistributionChart.tsx` — Gráfico de dona (Recharts)
- `RecentReports.tsx` — Tabla resumida
- `OpenTickets.tsx` — Lista filtrable

---

### Fase 6: Módulos de Servicios Públicos (RF-04 a RF-09)

#### [NEW] `src/presentation/pages/servicios/AguasPage.tsx`
#### [NEW] `src/presentation/pages/servicios/VialidadPage.tsx`
#### [NEW] `src/presentation/pages/servicios/AseoPage.tsx`
#### [NEW] `src/presentation/pages/servicios/SeguridadPage.tsx`
#### [NEW] `src/presentation/pages/servicios/AlumbradoPage.tsx`
#### [NEW] `src/presentation/pages/servicios/TransportePage.tsx`

Cada módulo incluye:
- Header con título y botón "Nuevo Reporte"
- **Filtros avanzados** (RF-14): categoría, fecha, estado, prioridad
- **Tabla de reportes** con TanStack Table:
  - Columnas: ID, Título, Ubicación, Estado (badge coloreado), Prioridad, Fecha
  - Paginación y ordenamiento
- **Modal/Drawer** para crear/editar reporte
- **Panel de detalle** con workflow de estados (RF-13)
- **Exportación** (RF-15): botones CSV, PDF, imprimir

#### [NEW] `src/presentation/components/reports/`
- `ReportTable.tsx` — Tabla genérica reutilizable
- `ReportFilters.tsx` — Barra de filtros
- `ReportForm.tsx` — Formulario crear/editar
- `ReportDetail.tsx` — Vista detalle con workflow
- `StatusBadge.tsx` — Badge de estado con colores
- `PriorityBadge.tsx` — Badge de prioridad
- `WorkflowStepper.tsx` — Visualización de transiciones
- `ExportButtons.tsx` — Botones de exportación

---

### Fase 7: Módulo de Gestión de Bienes (RF-10 a RF-12)

#### [NEW] `src/presentation/pages/BienesPage.tsx`
- Vista principal con tabla de bienes
- Filtros por tipo, estado, ubicación
- CRUD completo (crear, editar, eliminar con confirmación)
- Vista detalle con historial de cambios (trazabilidad)

#### [NEW] `src/presentation/components/assets/`
- `AssetTable.tsx` — Tabla con clasificación
- `AssetForm.tsx` — Formulario CRUD
- `AssetDetail.tsx` — Detalle con trazabilidad
- `AssetHistory.tsx` — Timeline de cambios
- `AssetStatusBadge.tsx` — Estado: Funcional/Requiere Mantenimiento/Dañado

---

### Fase 8: Autenticación (RF-01, RF-02)

#### [NEW] `src/presentation/pages/LoginPage.tsx`
- Formulario de login con validación
- Diseño a pantalla completa (sin layout)
- Logo institucional prominente

#### [NEW] `src/presentation/stores/authStore.ts`
- Zustand store: usuario actual, token, login, logout
- Persistencia en localStorage

#### [NEW] `src/presentation/components/auth/ProtectedRoute.tsx`
- Guard de ruta que redirige al login si no hay token (RF-03, protección de rutas)

---

### Fase 9: Estado Global y Hooks

#### [NEW] `src/presentation/stores/`
- `reporteStore.ts` — Estado de reportes, filtros activos
- `bienStore.ts` — Estado de bienes, filtros

#### [NEW] `src/presentation/hooks/`
- `useReportes.ts` — Hook para operaciones de reportes
- `useBienes.ts` — Hook para operaciones de bienes
- `useExport.ts` — Hook para exportación CSV/PDF
- `useFilters.ts` — Hook para filtros avanzados

---

### Fase 10: Routing y App

#### [NEW] `src/App.tsx`
```
/login                    → LoginPage
/                         → Dashboard (redirect)
/dashboard                → Dashboard
/servicios/aguas          → AguasPage
/servicios/vialidad       → VialidadPage
/servicios/aseo           → AseoPage
/servicios/seguridad      → SeguridadPage
/servicios/alumbrado      → AlumbradoPage
/servicios/transporte     → TransportePage
/bienes                   → BienesPage
/configuracion            → ConfiguracionPage
```

---

## Open Questions

> [!IMPORTANT]
> **¿Deseas que incluya un módulo de Configuración/Ajustes?** La especificación no lo menciona explícitamente pero el diseño de referencia muestra "Settings" en el sidebar.

> [!NOTE]
> **Datos de prueba:** Se generarán ~50 reportes mock y ~30 bienes mock con datos realistas en español para demostrar todas las funcionalidades sin backend.

> [!NOTE]
> **Exportación PDF:** Se usará la librería `jspdf` + `jspdf-autotable` para generar PDFs directamente desde el cliente. Para WORD se usará `docx`.

---

## Verification Plan

### Automated
- `pnpm run build` — Verificar que compile sin errores de TypeScript
- `pnpm run dev` — Verificar que el servidor de desarrollo funcione

### Manual (Browser Testing)
1. **Login:** Verificar acceso con credenciales mock y protección de rutas
2. **Dashboard:** Verificar KPIs, gráficos y listas
3. **Cada módulo de servicio:** Crear reporte, cambiar estado (workflow), filtrar, exportar
4. **Bienes:** CRUD completo, verificar historial de trazabilidad
5. **Responsive:** Verificar sidebar colapsable y adaptación
6. **Toast notifications:** Verificar feedback en operaciones CRUD
7. **Exportación:** Descargar CSV y PDF
