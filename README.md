# CORMA — Plataforma de Control de Plagas

Implementación de los diseños del handoff (`design_handoff_corma_app`) para CORMA
(corma.mx, Gómez Palacio, Dgo.): panel interno de operaciones + app del técnico +
app pública de cliente, con identidad visual compartida y separación estricta de
permisos (el cliente nunca ve técnicos/rutas/costos; el técnico sólo ve sus paradas).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4**
- Tipografía **Barlow / Barlow Condensed** autoalojada vía `next/font`
- Exportación **estática** (`output: "export"`) → `next build` genera `out/` listo
  para Netlify, igual que los demás proyectos

## Rutas

| Ruta | Qué es |
| --- | --- |
| `/operaciones` | Panel de escritorio (mín. 1280px con scroll horizontal): Programación del día (timeline por técnico, KPIs derivados, bandeja "Por asignar", panel de detalle con reasignación en vivo y actividad GPS del técnico), Rutas y mapa (con posición en vivo por técnico), Bitácora diaria por unidad (km, tiempos por parada, combustible), Inventario del día (salida vs. sobrantes vs. físico), Flota y Reportes |
| `/tecnico` | App móvil del técnico: Mi día → Orden de trabajo completa (a quién visita, alcance, equipo de aplicación, EPP, unidad y placas) → flujo llegada GPS → iniciar servicio → puntos de control, producto, evidencia antes/después, firma → Certificado con tiempos reales. Tabs: Ruta (resumen del día de su unidad) e Inventario (conciliación de producto con captura de físico) |
| `/cliente` | App pública: registro por celular, código OTP, inicio, guía de plagas por zona/temporada, agendado en 5 pasos (bottom sheet), historial y cuenta |

Las apps móviles se muestran dentro de un bezel de teléfono en escritorio y a
pantalla completa (100%) en móvil real, como pide el handoff.

## Correr en local

```bash
./dev.sh            # dev server en http://localhost:3210
```

(Requiere el Node local en `~/.local/node`; el script lo agrega al PATH solo.)

Build de producción:

```bash
export PATH="$HOME/.local/node/bin:$PATH" && npx next build   # genera ./out
```

Para desplegar: subir `out/` a Netlify (drag & drop o `netlify deploy --dir=out`).

## Estructura

- `lib/data.ts` — todos los datos de demostración (técnicos, servicios del día,
  flota, catálogo, plagas, zonas) y helpers (`fmt`, `proj`, `checksFor`).
  **En producción esto se sustituye por la API** (roles `admin`/`coordinador`/
  `tecnico`/`cliente`, ver README del handoff).
- `app/globals.css` — design tokens del handoff como tema de Tailwind
  (colores de marca, semánticos, neutros) + keyframes (`dash`, `pulseRing`, `slideUp`).
- `components/ui.tsx` — `Avatar`, `Pill`, `StatusPill`, `AppSwitcher`, `PhoneFrame`.
- `components/ops/` — vistas del panel (Agenda, Rutas, Flota, Reportes).

## Pendientes (confirmar con CORMA, del handoff)

1. Ciclos reales por línea de negocio y reglas de recordatorio (residencial 60 d,
   comercial 45, industrial semanal — por confirmar).
2. Lista de precios "desde" (los actuales son ficticios).
3. Catálogo real de productos/dosis y normativa del certificado (NOM-256-SSA1, SENASICA).
4. Datos reales de incidencia por zona/temporada (hoy: regla de prototipo, fuera
   de verano baja un nivel).
5. Padrón real de técnicos, unidades, placas y zonas.
6. Integraciones: WhatsApp Business API, GPS en check-in, certificado PDF,
   mapa real (Mapbox/Google/Leaflet en lugar del SVG con proyección fija).
