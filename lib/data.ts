// Datos de demostración — en producción vienen de la API (ver README del handoff).

export type ServiceStatus =
  | "Completado"
  | "En proceso"
  | "En camino"
  | "Programado"
  | "Sin asignar";

export type ServiceType =
  | "Comercial"
  | "Residencial"
  | "Industrial"
  | "Jardín"
  | "Agropecuario"
  | "Desinfección";

export interface Tech {
  id: string;
  name: string;
  initials: string;
  color: string;
  unit: string;
  zone: string;
}

export interface Service {
  id: string;
  tech: string | null;
  start: number;
  dur: number;
  client: string;
  type: ServiceType;
  folio: string;
  addr: string;
  lat: number;
  lon: number;
  rec: string;
  status: ServiceStatus;
  sug?: string;
}

export const techs: Tech[] = [
  { id: "t1", name: "Marco Ríos", initials: "MR", color: "#cb2027", unit: "Unidad 04", zone: "Torreón Norte" },
  { id: "t2", name: "Luis Herrera", initials: "LH", color: "#3a4e8c", unit: "Unidad 07", zone: "Torreón Sur" },
  { id: "t3", name: "Ana Delgado", initials: "AD", color: "#1f7a72", unit: "Unidad 02", zone: "Gómez Palacio" },
  { id: "t4", name: "Jorge Sifuentes", initials: "JS", color: "#c88a17", unit: "Unidad 09", zone: "Lerdo" },
  { id: "t5", name: "Diana Márquez", initials: "DM", color: "#7a3b6b", unit: "Unidad 05", zone: "Industrial" },
  { id: "t6", name: "Raúl Ávila", initials: "RA", color: "#5e7a2e", unit: "Unidad 11", zone: "Agropecuario" },
];

export const services: Service[] = [
  { id: "s1", tech: "t3", start: 7.5, dur: 1.5, client: "Hotel Posada del Río", type: "Comercial", folio: "OS-4412", addr: "Blvd. Miguel Alemán 1204, Gómez Palacio", lat: 25.5665, lon: -103.4931, rec: "Mensual", status: "Completado" },
  { id: "s2", tech: "t3", start: 9.5, dur: 1, client: "Farmacias Delicias", type: "Comercial", folio: "OS-4418", addr: "Av. Victoria 88, Centro, Gómez Palacio", lat: 25.5702, lon: -103.4995, rec: "Quincenal", status: "Completado" },
  { id: "s3", tech: "t3", start: 11.5, dur: 1.5, client: "Abarrotera del Nazas", type: "Comercial", folio: "OS-4423", addr: "Calz. Lázaro Cárdenas 730, Gómez Palacio", lat: 25.5541, lon: -103.4842, rec: "Mensual", status: "En camino" },
  { id: "s4", tech: "t3", start: 14, dur: 1, client: "Residencia Fam. Nava", type: "Residencial", folio: "OS-4431", addr: "Fracc. Las Rosas 14, Gómez Palacio", lat: 25.548, lon: -103.501, rec: "Eventual", status: "Programado" },
  { id: "s5", tech: "t1", start: 8, dur: 2, client: "Plaza Cuatro Caminos", type: "Comercial", folio: "OS-4405", addr: "Blvd. Independencia 2400, Torreón", lat: 25.5498, lon: -103.4132, rec: "Mensual", status: "Completado" },
  { id: "s6", tech: "t1", start: 10.5, dur: 1, client: "Clínica Santa Fe", type: "Comercial", folio: "OS-4415", addr: "Av. Juárez 1710, Torreón", lat: 25.5388, lon: -103.4295, rec: "Quincenal", status: "En proceso" },
  { id: "s7", tech: "t1", start: 12.5, dur: 1.5, client: "Depto. Colón 45", type: "Residencial", folio: "OS-4429", addr: "Col. Torreón Jardín, Torreón", lat: 25.524, lon: -103.42, rec: "Eventual", status: "Programado" },
  { id: "s8", tech: "t2", start: 9, dur: 1.5, client: "Escuela Ignacio Allende", type: "Comercial", folio: "OS-4410", addr: "Col. Ana, Torreón", lat: 25.517, lon: -103.446, rec: "Mensual", status: "Completado" },
  { id: "s9", tech: "t2", start: 11.5, dur: 2, client: "Restaurante El Fogón", type: "Comercial", folio: "OS-4421", addr: "Paseo Colón 330, Torreón", lat: 25.5352, lon: -103.4402, rec: "Quincenal", status: "En proceso" },
  { id: "s10", tech: "t4", start: 8.5, dur: 2, client: "Vivero Los Álamos", type: "Jardín", folio: "OS-4408", addr: "Carr. Lerdo–Cuencamé km 3, Lerdo", lat: 25.5352, lon: -103.5341, rec: "Mensual", status: "Completado" },
  { id: "s11", tech: "t4", start: 12, dur: 1.5, client: "Jardín Quinta El Álamo", type: "Jardín", folio: "OS-4425", addr: "Cd. Jardín, Lerdo", lat: 25.5442, lon: -103.5192, rec: "Eventual", status: "Programado" },
  { id: "s12", tech: "t5", start: 7.5, dur: 3, client: "Empaque Tomatero SA", type: "Industrial", folio: "OS-4402", addr: "P.I. Carlos A. Herrera, Gómez Palacio", lat: 25.5758, lon: -103.4788, rec: "Semanal", status: "Completado" },
  { id: "s13", tech: "t5", start: 12, dur: 2.5, client: "Bodega Lala Norte", type: "Industrial", folio: "OS-4419", addr: "P.I. Lagunero, Gómez Palacio", lat: 25.5862, lon: -103.463, rec: "Semanal", status: "En proceso" },
  { id: "s14", tech: "t6", start: 8, dur: 3.5, client: "Establo San Rafael", type: "Agropecuario", folio: "OS-4401", addr: "Ejido La Concha, Matamoros", lat: 25.529, lon: -103.24, rec: "Mensual", status: "Completado" },
  { id: "s15", tech: "t6", start: 13, dur: 2, client: "Nogalera El Vergel", type: "Agropecuario", folio: "OS-4427", addr: "Ejido Santa Fe, Matamoros", lat: 25.51, lon: -103.27, rec: "Mensual", status: "Programado" },
  { id: "p1", tech: null, start: 10, dur: 1, client: "Panadería La Espiga", type: "Comercial", folio: "OS-4436", addr: "Blvd. Ejército Mexicano 55, Torreón", lat: 25.5455, lon: -103.402, rec: "Eventual", status: "Sin asignar", sug: "t1" },
  { id: "p2", tech: null, start: 15, dur: 1.5, client: "Casa Fam. Escobedo", type: "Residencial", folio: "OS-4437", addr: "Fracc. San Ignacio, Lerdo", lat: 25.53, lon: -103.515, rec: "Eventual", status: "Sin asignar", sug: "t4" },
  { id: "p3", tech: null, start: 16, dur: 1, client: "Bodega Refaccionaria Sur", type: "Industrial", folio: "OS-4438", addr: "Cd. Industrial, Torreón", lat: 25.505, lon: -103.39, rec: "Eventual", status: "Sin asignar", sug: "t5" },
];

export const typeColor: Record<string, string> = {
  Comercial: "#3a4e8c",
  Residencial: "#cb2027",
  Industrial: "#7a3b6b",
  Jardín: "#5e7a2e",
  Agropecuario: "#c88a17",
  Desinfección: "#1f7a72",
};

export const statusColors: Record<ServiceStatus, [string, string]> = {
  Completado: ["#e8f5ee", "#1f7a4d"],
  "En proceso": ["#fff3e0", "#a2670a"],
  "En camino": ["#fdeced", "#cb2027"],
  Programado: ["#eef0f3", "#6d737c"],
  "Sin asignar": ["#f3ecfa", "#6b3f9e"],
};

export interface CheckItem {
  label: string;
  note: string;
}

export function checksFor(type: ServiceType): CheckItem[] {
  if (type === "Residencial")
    return [
      { label: "Cocina y alacena", note: "3 pts" },
      { label: "Baños y drenajes", note: "2 pts" },
      { label: "Patio y perímetro", note: "4 pts" },
      { label: "Áreas con mascotas — producto seguro", note: "verificado" },
    ];
  if (type === "Jardín")
    return [
      { label: "Follaje y arbolado", note: "5 pts" },
      { label: "Césped y raíz", note: "3 pts" },
      { label: "Zona de riego", note: "2 pts" },
      { label: "Resguardo de mascotas", note: "verificado" },
    ];
  if (type === "Agropecuario")
    return [
      { label: "Corrales y comederos", note: "9 pts" },
      { label: "Silos y forraje", note: "4 pts" },
      { label: "Perímetro de nave", note: "12 pts" },
      { label: "Registro sanitario SENASICA", note: "bitácora" },
    ];
  return [
    { label: "Perímetro exterior — estaciones 1–6", note: "6 pts" },
    { label: "Almacén / bodega", note: "4 pts" },
    { label: "Área de proceso", note: "8 pts" },
    { label: "Trampas de luz UV", note: "3 pts" },
    { label: "Registro de consumo de cebo", note: "bitácora" },
  ];
}

/** Proyección del prototipo — sustituir por Mapbox/Google/Leaflet en producción. */
export function proj(lat: number, lon: number) {
  return { x: ((lon + 103.56) / 0.26) * 900, y: ((25.63 - lat) / 0.16) * 520 };
}

export function fmt(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${hh}:${mm === 0 ? "00" : mm}`;
}

export const routeKm = [72, 58, 41, 63, 37, 141];

export const fleetData = techs.map((t, i) => ({
  tech: t,
  fuel: [72, 41, 88, 25, 60, 34][i],
  model: ["Nissan NP300 2022", "Toyota Hilux 2021", "Nissan NP300 2023", "Chevrolet Tornado 2020", "Nissan NP300 2022", "Ford Ranger 2019"][i],
  plate: ["DGA-24-31", "DGB-11-07", "DGA-88-12", "DGC-45-90", "DGA-52-18", "DGB-77-04"][i],
  km: ["84,210", "112,480", "39,905", "156,330", "67,140", "198,760"][i],
  maint: ["12 sep", "28 ago", "3 oct", "En taller", "19 sep", "5 sep"][i],
  status: i === 3 ? "Mantenimiento" : "En ruta",
}));

export const reportKpis = [
  { label: "Servicios del mes", value: "386", delta: "+12%", tone: "ok" },
  { label: "Cumplimiento en ventana", value: "94%", delta: "+3 pts", tone: "ok" },
  { label: "Km recorridos", value: "9,840", delta: "−6%", tone: "ok" },
  { label: "Reincidencias", value: "7", delta: "1.8% de órdenes", tone: "muted" },
] as const;

export const reportBars: [string, number][] = [
  ["Comercial", 148],
  ["Residencial", 96],
  ["Industrial", 71],
  ["Agropecuario", 38],
  ["Jardín", 21],
  ["Desinfección", 12],
];

export const compliance = techs.map((t, i) => ({
  tech: t,
  count: [68, 61, 74, 49, 66, 58][i],
  pct: [97, 92, 99, 88, 95, 91][i],
}));

// ——— App del técnico ———

export const techProducts = [
  { name: "Cipermetrina 10% EC", dose: "15 ml / L" },
  { name: "Gel cucarachicida", dose: "8 puntos" },
];

// ——— Orden de trabajo (qué, quién, con qué) ———

export interface WorkOrder {
  contact: string;
  contactRole: string;
  phone: string;
  scope: string[];
  equipment: string[];
  ppe: string[];
}

export function workOrderFor(s: Service): WorkOrder {
  const byType: Record<string, Omit<WorkOrder, "contact" | "contactRole" | "phone">> = {
    Comercial: {
      scope: [
        "Inspección de estaciones perimetrales y reposición de cebo",
        "Aplicación de gel en cocina y área de alimentos",
        "Revisión de trampas de luz UV y cambio de lámina",
        "Registro en bitácora NOM-256-SSA1",
      ],
      equipment: ["Aspersora manual 5 L", "Pistola de gel", "Lámpara UV de inspección"],
      ppe: ["Guantes de nitrilo", "Respirador media cara", "Lentes de seguridad", "Overol"],
    },
    Residencial: {
      scope: [
        "Aspersión perimetral interior y exterior",
        "Gel cucarachicida en puntos críticos de cocina",
        "Sellado de grietas menores en zona de ingreso",
      ],
      equipment: ["Aspersora manual 5 L", "Pistola de gel"],
      ppe: ["Guantes de nitrilo", "Respirador media cara", "Overol"],
    },
    Industrial: {
      scope: [
        "Recorrido de estaciones de cebo con registro por punto",
        "Nebulización ULV en nave y andenes",
        "Verificación de exclusión física en accesos",
        "Bitácora sanitaria y firma de supervisor de planta",
      ],
      equipment: ["Nebulizadora ULV", "Estaciones de cebo de repuesto", "Escalera 3 m"],
      ppe: ["Guantes de nitrilo", "Respirador cara completa", "Casco", "Botas dieléctricas", "Chaleco alta visibilidad"],
    },
    Jardín: {
      scope: [
        "Aspersión de follaje y arbolado",
        "Tratamiento de césped a nivel raíz",
        "Verificación de resguardo de mascotas",
      ],
      equipment: ["Aspersora de motor 25 L", "Extensión telescópica"],
      ppe: ["Guantes de nitrilo", "Respirador media cara", "Lentes de seguridad", "Overol"],
    },
    Agropecuario: {
      scope: [
        "Control de mosca de establo en corrales y comederos",
        "Estaciones rodenticidas en silos y bodega de forraje",
        "Registro sanitario SENASICA",
      ],
      equipment: ["Aspersora de motor 25 L", "Nebulizadora térmica", "Estaciones de cebo"],
      ppe: ["Guantes de nitrilo", "Respirador cara completa", "Botas de hule", "Overol"],
    },
  };
  const contacts: Record<string, [string, string, string]> = {
    s1: ["Gerardo Luna", "Gerente de mantenimiento", "871 204 1187"],
    s2: ["Q.F.B. Alicia Mena", "Responsable sanitario", "871 318 6620"],
    s3: ["Rocío Carrillo", "Encargada de tienda", "871 145 2093"],
    s4: ["Fam. Nava — Sra. Leticia", "Propietaria", "871 226 7741"],
  };
  const c = contacts[s.id] ?? ["Contacto en sitio", "Recepción", "871 000 0000"];
  return { contact: c[0], contactRole: c[1], phone: c[2], ...(byType[s.type] ?? byType.Comercial) };
}

// ——— Seguimiento en vivo (demo; en producción llega del GPS de la app) ———

export interface LiveStatus {
  techId: string;
  state: "En sitio" | "En tránsito" | "En base";
  detail: string;
  lat: number;
  lon: number;
  since: string;
  lastPing: string;
  speed: string;
}

export const liveTracking: LiveStatus[] = [
  { techId: "t1", state: "En sitio", detail: "Clínica Santa Fe", lat: 25.5388, lon: -103.4295, since: "10:34", lastPing: "hace 1 min", speed: "0 km/h" },
  { techId: "t2", state: "En sitio", detail: "Restaurante El Fogón", lat: 25.5352, lon: -103.4402, since: "11:26", lastPing: "hace 2 min", speed: "0 km/h" },
  { techId: "t3", state: "En tránsito", detail: "Rumbo a Abarrotera del Nazas", lat: 25.5622, lon: -103.4901, since: "11:12", lastPing: "hace 40 s", speed: "38 km/h" },
  { techId: "t4", state: "En tránsito", detail: "Rumbo a Jardín Quinta El Álamo", lat: 25.5401, lon: -103.5266, since: "11:20", lastPing: "hace 1 min", speed: "42 km/h" },
  { techId: "t5", state: "En sitio", detail: "Bodega Lala Norte", lat: 25.5862, lon: -103.463, since: "12:02", lastPing: "hace 3 min", speed: "0 km/h" },
  { techId: "t6", state: "En sitio", detail: "Establo San Rafael", lat: 25.529, lon: -103.24, since: "8:05", lastPing: "hace 2 min", speed: "0 km/h" },
];

/** Eventos GPS del servicio seleccionado, según su estado. */
export function serviceEvents(s: Service): { time: string; label: string; note: string }[] {
  const gps = `${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}`;
  if (s.status === "Completado")
    return [
      { time: fmt(s.start - 0.2), label: "Llegada (GPS)", note: gps },
      { time: fmt(s.start), label: "Inicio de servicio", note: "orden abierta" },
      { time: fmt(s.start + s.dur - 0.1), label: "Cierre y firma", note: "certificado emitido" },
      { time: fmt(s.start + s.dur), label: "Salida (GPS)", note: gps },
    ];
  if (s.status === "En proceso")
    return [
      { time: fmt(s.start - 0.15), label: "Llegada (GPS)", note: gps },
      { time: fmt(s.start), label: "Inicio de servicio", note: "orden abierta" },
      { time: "ahora", label: "Trabajo en curso", note: "checklist 60%" },
    ];
  if (s.status === "En camino")
    return [
      { time: "11:12", label: "Salida de parada anterior", note: "GPS activo" },
      { time: "ahora", label: "En tránsito", note: "ETA 18 min · 6.4 km" },
    ];
  return [{ time: "—", label: "Sin actividad", note: "programado" }];
}

// ——— Bitácora diaria por unidad ———

export interface DayLogStop {
  client: string;
  arrive: string;
  depart: string;
  onSiteMin: number;
  legKm: number;
  done: boolean;
}

export interface DayLog {
  techId: string;
  kmStart: number;
  kmNow: number;
  departBase: string;
  returnEta: string;
  fuelL: number;
  stops: DayLogStop[];
}

export const dayLogs: DayLog[] = [
  {
    techId: "t1", kmStart: 84210, kmNow: 84262, departBase: "7:20", returnEta: "15:30", fuelL: 6.8,
    stops: [
      { client: "Plaza Cuatro Caminos", arrive: "7:52", depart: "10:04", onSiteMin: 132, legKm: 24, done: true },
      { client: "Clínica Santa Fe", arrive: "10:34", depart: "—", onSiteMin: 56, legKm: 9, done: false },
      { client: "Depto. Colón 45", arrive: "est. 12:30", depart: "—", onSiteMin: 0, legKm: 11, done: false },
      { client: "Panadería La Espiga", arrive: "est. 14:10", depart: "—", onSiteMin: 0, legKm: 8, done: false },
    ],
  },
  {
    techId: "t2", kmStart: 112480, kmNow: 112519, departBase: "8:10", returnEta: "14:40", fuelL: 5.1,
    stops: [
      { client: "Escuela Ignacio Allende", arrive: "8:56", depart: "10:31", onSiteMin: 95, legKm: 22, done: true },
      { client: "Restaurante El Fogón", arrive: "11:26", depart: "—", onSiteMin: 4, legKm: 17, done: false },
    ],
  },
  {
    techId: "t3", kmStart: 39905, kmNow: 39931, departBase: "7:05", returnEta: "16:10", fuelL: 3.4,
    stops: [
      { client: "Hotel Posada del Río", arrive: "7:28", depart: "9:02", onSiteMin: 94, legKm: 8, done: true },
      { client: "Farmacias Delicias", arrive: "9:26", depart: "10:34", onSiteMin: 68, legKm: 5, done: true },
      { client: "Abarrotera del Nazas", arrive: "est. 11:30", depart: "—", onSiteMin: 0, legKm: 7, done: false },
      { client: "Residencia Fam. Nava", arrive: "est. 14:00", depart: "—", onSiteMin: 0, legKm: 6, done: false },
    ],
  },
  {
    techId: "t4", kmStart: 156330, kmNow: 156389, departBase: "7:40", returnEta: "15:00", fuelL: 7.9,
    stops: [
      { client: "Vivero Los Álamos", arrive: "8:24", depart: "10:36", onSiteMin: 132, legKm: 31, done: true },
      { client: "Jardín Quinta El Álamo", arrive: "est. 12:00", depart: "—", onSiteMin: 0, legKm: 12, done: false },
      { client: "Casa Fam. Escobedo", arrive: "est. 15:00", depart: "—", onSiteMin: 0, legKm: 9, done: false },
    ],
  },
  {
    techId: "t5", kmStart: 67140, kmNow: 67159, departBase: "7:00", returnEta: "15:20", fuelL: 2.8,
    stops: [
      { client: "Empaque Tomatero SA", arrive: "7:24", depart: "10:36", onSiteMin: 192, legKm: 11, done: true },
      { client: "Bodega Lala Norte", arrive: "12:02", depart: "—", onSiteMin: 24, legKm: 8, done: false },
      { client: "Bodega Refaccionaria Sur", arrive: "est. 16:00", depart: "—", onSiteMin: 0, legKm: 14, done: false },
    ],
  },
  {
    techId: "t6", kmStart: 198760, kmNow: 198871, departBase: "6:40", returnEta: "16:30", fuelL: 13.5,
    stops: [
      { client: "Establo San Rafael", arrive: "8:05", depart: "—", onSiteMin: 205, legKm: 68, done: false },
      { client: "Nogalera El Vergel", arrive: "est. 13:00", depart: "—", onSiteMin: 0, legKm: 12, done: false },
    ],
  },
];

// ——— Inventario: salida vs sobrantes vs físico ———

export interface InvItem {
  name: string;
  unit: string;
  out: number;
  used: number;
  physical: number | null; // conteo físico al regreso; null = pendiente
}

export interface UnitInventory {
  techId: string;
  items: InvItem[];
}

export const unitInventories: UnitInventory[] = [
  {
    techId: "t1",
    items: [
      { name: "Cipermetrina 10% EC", unit: "L", out: 2.0, used: 1.2, physical: 0.3 },
      { name: "Gel cucarachicida", unit: "pz", out: 6, used: 3, physical: 3 },
      { name: "Cebo rodenticida", unit: "kg", out: 4.0, used: 2.5, physical: 1.5 },
    ],
  },
  {
    techId: "t2",
    items: [
      { name: "Cipermetrina 10% EC", unit: "L", out: 1.5, used: 0.9, physical: 0.6 },
      { name: "Gel cucarachicida", unit: "pz", out: 4, used: 2, physical: 2 },
    ],
  },
  {
    techId: "t3",
    items: [
      { name: "Cipermetrina 10% EC", unit: "L", out: 2.0, used: 1.1, physical: null },
      { name: "Gel cucarachicida", unit: "pz", out: 6, used: 2, physical: null },
      { name: "Cebo rodenticida", unit: "kg", out: 3.0, used: 1.0, physical: null },
    ],
  },
  {
    techId: "t4",
    items: [
      { name: "Insecticida de follaje", unit: "L", out: 5.0, used: 3.5, physical: 1.5 },
      { name: "Fungicida sistémico", unit: "L", out: 2.0, used: 0.5, physical: 1.5 },
    ],
  },
  {
    techId: "t5",
    items: [
      { name: "Cipermetrina 10% EC", unit: "L", out: 4.0, used: 2.8, physical: null },
      { name: "Cebo rodenticida", unit: "kg", out: 6.0, used: 4.0, physical: null },
      { name: "Estaciones de cebo", unit: "pz", out: 12, used: 5, physical: null },
    ],
  },
  {
    techId: "t6",
    items: [
      { name: "Larvicida de establo", unit: "L", out: 8.0, used: 6.0, physical: 1.5 },
      { name: "Cebo rodenticida", unit: "kg", out: 8.0, used: 5.0, physical: 3.0 },
    ],
  },
];

/** Estado de conciliación de un renglón de inventario. */
export function invStatus(i: InvItem): { label: "Conciliado" | "Diferencia" | "Pendiente"; diff: number } {
  const expected = +(i.out - i.used).toFixed(2);
  if (i.physical === null) return { label: "Pendiente", diff: 0 };
  const diff = +(i.physical - expected).toFixed(2);
  return { label: Math.abs(diff) < 0.01 ? "Conciliado" : "Diferencia", diff };
}

// ——— App de cliente ———

export interface CatalogService {
  id: string;
  name: string;
  desc: string;
  glyph: string;
  price: string;
  color: string;
}

export const catalog: CatalogService[] = [
  { id: "res", name: "Residencial", desc: "Casa, depto, jardín interior", glyph: "⌂", price: "desde $690", color: "#cb2027" },
  { id: "com", name: "Comercial", desc: "Restaurante, local, oficina", glyph: "▤", price: "desde $1,150", color: "#3a4e8c" },
  { id: "ind", name: "Industrial", desc: "Bodega, planta, empaque", glyph: "▣", price: "cotización", color: "#7a3b6b" },
  { id: "agr", name: "Agropecuario", desc: "Establo, nogalera, silo", glyph: "❖", price: "cotización", color: "#c88a17" },
  { id: "jar", name: "Jardín", desc: "Follaje, césped, arbolado", glyph: "✿", price: "desde $850", color: "#5e7a2e" },
  { id: "des", name: "Desinfección", desc: "Ambiental y sanitización", glyph: "◍", price: "desde $980", color: "#1f7a72" },
];

export interface Pest {
  id: string;
  name: string;
  glyph: string;
  lvl: 1 | 2 | 3;
  where: string;
  tip: string;
}

export const pests: Pest[] = [
  { id: "mosca", name: "Moscas", glyph: "🜸", lvl: 3, where: "Patios, basura, drenajes", tip: "Pico de temporada por calor y lluvia. Barrera perimetral + trampas UV." },
  { id: "cuca", name: "Cucarachas", glyph: "☰", lvl: 3, where: "Cocina, drenajes, alacena", tip: "Gel en puntos críticos; sin desalojar la casa." },
  { id: "alacran", name: "Alacranes", glyph: "⌁", lvl: 2, where: "Muros, cocheras, jardines", tip: "Alta incidencia en La Laguna de mayo a septiembre." },
  { id: "mosco", name: "Mosquitos", glyph: "✳", lvl: 3, where: "Agua estancada, macetas", tip: "Nebulización y eliminación de criaderos cada 21 días." },
  { id: "roedor", name: "Roedores", glyph: "◠", lvl: 2, where: "Bodegas, techos, patios", tip: "Estaciones de cebo con registro por punto." },
  { id: "termita", name: "Termitas", glyph: "≡", lvl: 1, where: "Madera, marcos, muebles", tip: "Inspección anual; tratamiento localizado si hay galerías." },
  { id: "chinche", name: "Chinches de cama", glyph: "◆", lvl: 1, where: "Colchones, sillones", tip: "Tratamiento en dos visitas separadas 14 días." },
  { id: "aves", name: "Aves", glyph: "⌃", lvl: 1, where: "Azoteas, naves, ductos", tip: "Sistemas de exclusión física, sin daño al ave." },
];

export const zonesData = [
  { id: "gp", label: "Gómez Palacio", advice: "Zona con mayor reporte de alacrán y mosca doméstica este mes. Recomendamos ciclo de 60 días con refuerzo perimetral." },
  { id: "tor", label: "Torreón", advice: "Predominan cucarachas en cocina y mosquito por lluvias recientes. Ciclo de 45 días en giros de alimentos." },
  { id: "ler", label: "Lerdo", advice: "Jardines con pulgón y hormiga; alacrán en zonas al pie de la sierra. Tratamiento de follaje + perímetro." },
  { id: "mat", label: "Matamoros", advice: "Zona agropecuaria: mosca de establo y roedor en silos. Programa semanal con bitácora sanitaria." },
];

export const seasonsData: [string, string][] = [
  ["ver", "Verano · ago"],
  ["oto", "Otoño"],
  ["inv", "Invierno"],
  ["pri", "Primavera"],
];

export const levelMeta: Record<number, { bg: string; fg: string; label: string }> = {
  3: { bg: "#fdeced", fg: "#cb2027", label: "Alta" },
  2: { bg: "#fff3e0", fg: "#a2670a", label: "Media" },
  1: { bg: "#eef0f3", fg: "#6d737c", label: "Baja" },
};

export const addressList = [
  { name: "Casa", line: "Fracc. Las Rosas 14, Gómez Palacio, Dgo." },
  { name: "Casa de mamá", line: "Col. Los Ángeles 208, Torreón, Coah." },
];

export const dayList: [string, number][] = [
  ["Lun", 10],
  ["Mar", 11],
  ["Mié", 12],
  ["Jue", 13],
  ["Vie", 14],
  ["Sáb", 15],
];

export const slotList = [
  { label: "08:00 – 10:00", note: "Disponible" },
  { label: "10:00 – 12:00", note: "Recomendado · técnico en tu zona" },
  { label: "12:00 – 14:00", note: "Disponible" },
  { label: "16:00 – 18:00", note: "Últimos lugares" },
];

export const clientHistory = [
  { type: "Residencial", date: "12 jul 2026", title: "Control integral · cucaracha y alacrán", detail: "Cipermetrina 10% EC · 9 puntos · Téc. Ana Delgado" },
  { type: "Jardín", date: "3 may 2026", title: "Control en jardín · pulgón y hormiga", detail: "Producto pet-friendly · Téc. Jorge Sifuentes" },
  { type: "Residencial", date: "9 mar 2026", title: "Control integral · mosca doméstica", detail: "Nebulización + perímetro · Téc. Ana Delgado" },
];

// ——— Programación semanal (se genera sáb/dom; el lunes cada técnico llega con ruta) ———

export interface WeekCell {
  count: number;
  zone: string;
}

export const weekDays = ["Lun 17", "Mar 18", "Mié 19", "Jue 20", "Vie 21", "Sáb 22"];

export const weekPlan: { techId: string; days: WeekCell[] }[] = [
  { techId: "t1", days: [{ count: 4, zone: "Torreón Nte." }, { count: 3, zone: "Torreón Nte." }, { count: 4, zone: "Centro" }, { count: 3, zone: "Torreón Nte." }, { count: 4, zone: "Centro" }, { count: 2, zone: "Torreón Nte." }] },
  { techId: "t2", days: [{ count: 3, zone: "Torreón Sur" }, { count: 4, zone: "Torreón Sur" }, { count: 2, zone: "Torreón Sur" }, { count: 4, zone: "Centro" }, { count: 3, zone: "Torreón Sur" }, { count: 2, zone: "Centro" }] },
  { techId: "t3", days: [{ count: 4, zone: "Gómez Palacio" }, { count: 4, zone: "Gómez Palacio" }, { count: 3, zone: "Lerdo" }, { count: 4, zone: "Gómez Palacio" }, { count: 4, zone: "Gómez Palacio" }, { count: 2, zone: "Gómez Palacio" }] },
  { techId: "t4", days: [{ count: 3, zone: "Lerdo" }, { count: 2, zone: "Lerdo" }, { count: 3, zone: "Cd. Jardín" }, { count: 3, zone: "Lerdo" }, { count: 2, zone: "Lerdo" }, { count: 2, zone: "Lerdo" }] },
  { techId: "t5", days: [{ count: 2, zone: "P.I. Lagunero" }, { count: 3, zone: "P.I. Herrera" }, { count: 2, zone: "P.I. Lagunero" }, { count: 2, zone: "P.I. Herrera" }, { count: 3, zone: "P.I. Lagunero" }, { count: 1, zone: "P.I. Lagunero" }] },
  { techId: "t6", days: [{ count: 2, zone: "Matamoros" }, { count: 2, zone: "Viesca" }, { count: 2, zone: "Matamoros" }, { count: 2, zone: "Fco. I. Madero" }, { count: 2, zone: "Matamoros" }, { count: 1, zone: "Matamoros" }] },
];

// ——— Check-up de salida (antes de salir de base, para no regresarse) ———

export interface CheckupItem {
  label: string;
  note: string;
}

export const checkupSections: { title: string; items: CheckupItem[] }[] = [
  {
    title: "Herramienta y equipo (según tus órdenes de hoy)",
    items: [
      { label: "Aspersora manual 5 L", note: "OS-4412, OS-4423" },
      { label: "Pistola de gel", note: "OS-4418, OS-4423" },
      { label: "Lámpara UV de inspección", note: "OS-4412" },
      { label: "Estaciones de cebo de repuesto (6)", note: "OS-4423" },
    ],
  },
  {
    title: "Producto a cargar",
    items: [
      { label: "Cipermetrina 10% EC · 2 L", note: "salida registrada" },
      { label: "Gel cucarachicida · 6 pz", note: "salida registrada" },
      { label: "Cebo rodenticida · 3 kg", note: "salida registrada" },
    ],
  },
  {
    title: "Equipo de seguridad (EPP)",
    items: [
      { label: "Respirador media cara + cartuchos", note: "NOM-256" },
      { label: "Guantes de nitrilo y lentes", note: "NOM-256" },
      { label: "Overol limpio", note: "NOM-256" },
    ],
  },
  {
    title: "Documentos a bordo",
    items: [
      { label: "Copia de licencia sanitaria COFEPRIS", note: "vigente" },
      { label: "Constancia DC-3 del aplicador", note: "vigente" },
      { label: "Hojas de seguridad de productos (SDS)", note: "4 productos" },
    ],
  },
  {
    title: "Unidad 02",
    items: [
      { label: "Combustible ≥ 1/2 tanque", note: "88%" },
      { label: "Placas DGA-88-12 · verificación vigente", note: "ok" },
    ],
  },
];

// ——— Cuestionario post-servicio (opción múltiple → sugerencia por protocolo) ———

export interface SurveyOption {
  label: string;
  flag?: string; // dispara sugerencia
}

export interface SurveyQuestion {
  q: string;
  options: SurveyOption[];
}

export function surveyFor(type: ServiceType): SurveyQuestion[] {
  if (type === "Industrial" || type === "Agropecuario")
    return [
      {
        q: "¿Nivel de actividad de plaga encontrado?",
        options: [{ label: "Sin actividad" }, { label: "Baja" }, { label: "Media", flag: "refuerzo" }, { label: "Alta", flag: "refuerzo-urgente" }],
      },
      {
        q: "¿Todas las estaciones fueron accesibles y registradas en bitácora?",
        options: [{ label: "Sí, 100%" }, { label: "No, quedaron puntos pendientes", flag: "pendientes" }],
      },
      {
        q: "¿Se detectaron condiciones que comprometen la certificación (BPP / inocuidad)?",
        options: [{ label: "No" }, { label: "Sí, limpieza/orden deficiente", flag: "saneamiento" }, { label: "Sí, accesos o sellados dañados", flag: "exclusion" }],
      },
      {
        q: "¿La dosis aplicada correspondió a la etiqueta del producto registrado?",
        options: [{ label: "Sí, conforme a etiqueta" }, { label: "Se ajustó dosis (justificar en notas)", flag: "dosis" }],
      },
    ];
  return [
    {
      q: "¿Nivel de infestación encontrado?",
      options: [{ label: "Sin actividad" }, { label: "Leve" }, { label: "Moderada", flag: "refuerzo" }, { label: "Severa", flag: "refuerzo-urgente" }],
    },
    {
      q: "¿Tuviste acceso a todas las áreas?",
      options: [{ label: "Sí, completo" }, { label: "No, quedaron áreas sin tratar", flag: "pendientes" }],
    },
    {
      q: "¿Encontraste condiciones que favorecen la plaga?",
      options: [{ label: "No" }, { label: "Humedad / fugas", flag: "humedad" }, { label: "Grietas o accesos abiertos", flag: "exclusion" }, { label: "Manejo de basura deficiente", flag: "saneamiento" }],
    },
    {
      q: "¿Hay mascotas o personas vulnerables en el domicilio?",
      options: [{ label: "No" }, { label: "Sí (se usó producto de baja toxicidad)", flag: "reentrada" }],
    },
  ];
}

const suggestionRules: Record<string, string> = {
  "refuerzo-urgente": "Programar refuerzo en 7–10 días y notificar al coordinador hoy mismo.",
  refuerzo: "Programar visita de refuerzo en 15 días para cortar el ciclo de la plaga.",
  pendientes: "Reagendar visita para completar áreas/estaciones pendientes antes de cerrar el ciclo.",
  saneamiento: "Emitir recomendación de saneamiento al cliente (limpieza y manejo de residuos); adjuntar al certificado.",
  exclusion: "Cotizar trabajos de exclusión (sellado de grietas y accesos) como servicio complementario.",
  humedad: "Recomendar corrección de humedad/fugas; sin ella el tratamiento pierde efecto.",
  dosis: "Registrar justificación del ajuste de dosis en bitácora; el responsable técnico debe validarla.",
  reentrada: "Indicar tiempo de reentrada y precauciones por escrito al cliente (mascotas/vulnerables).",
};

export function surveySuggestions(type: ServiceType, answers: Record<number, number>): string[] {
  const qs = surveyFor(type);
  const flags = Object.entries(answers)
    .map(([qi, oi]) => qs[Number(qi)]?.options[oi]?.flag)
    .filter(Boolean) as string[];
  if (flags.length === 0)
    return ["Servicio dentro de parámetros. Mantener el ciclo programado y monitoreo regular."];
  return [...new Set(flags)].map((f) => suggestionRules[f]);
}

// ——— Protocolo normativo (industria / pecuario) ———

export const bppProtocol: { label: string; ref: string }[] = [
  { label: "Producto con registro sanitario vigente (COFEPRIS / SENASICA)", ref: "obligatorio" },
  { label: "Bitácora por estación con consumo de cebo firmada", ref: "BPP · auditoría" },
  { label: "Evidencia fotográfica sellada (GPS + hora) por área tratada", ref: "la paga el cliente" },
  { label: "Hoja de seguridad (SDS) entregada al responsable de planta", ref: "NOM-256-SSA1" },
  { label: "Constancia DC-3 del aplicador disponible en sitio", ref: "STPS" },
  { label: "Registro sanitario SENASICA del sitio actualizado", ref: "BPP" },
];

// ——— Credenciales del técnico y de la empresa (Perfil) ———

export const techCredentials = [
  { label: "Constancia DC-3 · Manejo de plaguicidas", issuer: "STPS · agente capacitador ext.", valid: "Vence mar 2027", ok: true },
  { label: "Examen de aplicador aprobado", issuer: "COFEPRIS", valid: "Vigente", ok: true },
  { label: "Curso BPP · control de fauna nociva en UP", issuer: "SENASICA", valid: "Vence nov 2026", ok: true },
  { label: "Vigilancia médica anual", issuer: "NOM-256-SSA1", valid: "Próxima: oct 2026", ok: false },
];

export const companyCredentials = [
  { label: "Licencia Sanitaria · servicios urbanos de fumigación", issuer: "COFEPRIS-05-022", valid: "Vigente", ok: true },
  { label: "Aviso de Responsable Sanitario", issuer: "COFEPRIS-05-040", valid: "Vigente", ok: true },
];

// ——— Monitoreo de estaciones de roedor (bitácora por estación) ———
// Modelado sobre un recorrido real de CORMA (formato "ESTACIONES ROEDOR");
// en producción cada recorrido se captura desde la app del técnico.

export interface RodentStation {
  no: number;
  type: "Túnel" | "Plástica";
  method: "Cebo" | "Captura";
  /** % de consumo de cebo por recorrido (0/25/50/75/100); para Captura: 100 = presa capturada */
  cons: number[];
}

export const rodentClient = {
  name: "Transportes G.L.",
  site: "Periférico km 14.5, Lerdo, Dgo.",
  contract: "Mensual · 46 estaciones",
};

export const roundDates = ["13 abr", "11 may", "8 jun", "10 jul", "7 ago", "11 sep"];

function buildRodentStations(): RodentStation[] {
  const plastic = new Set([1, 8, 20, 26, ...Array.from({ length: 20 }, (_, i) => 27 + i)]);
  const capture = new Set([26, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 43, 45, 46]);
  // Historia por estación: [abr, may, jun, jul, ago, sep]
  const hist: Record<number, number[]> = {
    3: [0, 25, 50, 50, 25, 0],
    4: [25, 50, 50, 75, 50, 25],
    8: [0, 0, 50, 75, 25, 0],
    9: [0, 25, 50, 75, 50, 25],
    11: [0, 0, 25, 50, 25, 0],
    12: [25, 50, 75, 75, 50, 25],
    16: [0, 0, 25, 50, 0, 0],
    19: [0, 0, 25, 50, 25, 0],
    21: [0, 25, 50, 75, 50, 25],
    22: [0, 0, 25, 50, 25, 0],
    23: [0, 0, 50, 75, 50, 25],
    24: [0, 0, 25, 50, 50, 50],
    25: [0, 50, 75, 100, 100, 100],
    29: [0, 0, 100, 0, 0, 0], // captura jun
    33: [0, 0, 0, 100, 0, 0], // captura jul
  };
  return Array.from({ length: 46 }, (_, i) => {
    const no = i + 1;
    return {
      no,
      type: plastic.has(no) ? "Plástica" : "Túnel",
      method: capture.has(no) ? "Captura" : "Cebo",
      cons: hist[no] ?? [0, 0, 0, 0, 0, 0],
    };
  });
}

export const rodentStations: RodentStation[] = buildRodentStations();

export function consColor(v: number): string {
  if (v >= 100) return "#cb2027";
  if (v >= 75) return "#e2554a";
  if (v >= 50) return "#c88a17";
  if (v >= 25) return "#e4c26a";
  return "#e4e7eb";
}

// ——— C-05 · Almacén punta a punta (existencias, topes, RQ por servicio, costos) ———

export interface StockItem {
  name: string;
  unit: string;
  pres: string; // presentación de compra
  presQty: number; // unidades por presentación
  stock: number; // existencia en almacén central
  min: number; // tope mínimo (dispara requisición)
  cost: number; // costo unitario $/unidad
  supplier: string;
}

export const warehouseStock: StockItem[] = [
  { name: "Cipermetrina 10% EC", unit: "L", pres: "Garrafa 20 L", presQty: 20, stock: 34, min: 20, cost: 385, supplier: "Agroquímicos del Nazas" },
  { name: "Gel cucarachicida", unit: "pz", pres: "Caja 24 pz", presQty: 24, stock: 41, min: 30, cost: 118, supplier: "BioControl MX" },
  { name: "Cebo rodenticida", unit: "kg", pres: "Cubeta 8 kg", presQty: 8, stock: 14, min: 25, cost: 96, supplier: "BioControl MX" },
  { name: "Larvicida de establo", unit: "L", pres: "Garrafa 10 L", presQty: 10, stock: 22, min: 15, cost: 410, supplier: "Agroquímicos del Nazas" },
  { name: "Insecticida de follaje", unit: "L", pres: "Garrafa 20 L", presQty: 20, stock: 9, min: 12, cost: 298, supplier: "Verde Campo" },
  { name: "Fungicida sistémico", unit: "L", pres: "Garrafa 5 L", presQty: 5, stock: 11, min: 6, cost: 512, supplier: "Verde Campo" },
  { name: "Estaciones de cebo", unit: "pz", pres: "Caja 12 pz", presQty: 12, stock: 26, min: 24, cost: 145, supplier: "BioControl MX" },
  { name: "Lámina adhesiva UV", unit: "pz", pres: "Paquete 10 pz", presQty: 10, stock: 8, min: 20, cost: 62, supplier: "BioControl MX" },
];

/** Consumo aproximado por tipo de servicio — base de la RQ automática por orden. */
export const typeRq: Record<ServiceType, { name: string; qty: number; unit: string }[]> = {
  Comercial: [
    { name: "Cipermetrina 10% EC", qty: 0.6, unit: "L" },
    { name: "Gel cucarachicida", qty: 1, unit: "pz" },
    { name: "Cebo rodenticida", qty: 0.5, unit: "kg" },
    { name: "Lámina adhesiva UV", qty: 1, unit: "pz" },
  ],
  Residencial: [
    { name: "Cipermetrina 10% EC", qty: 0.4, unit: "L" },
    { name: "Gel cucarachicida", qty: 1, unit: "pz" },
  ],
  Industrial: [
    { name: "Cipermetrina 10% EC", qty: 1.4, unit: "L" },
    { name: "Cebo rodenticida", qty: 2.0, unit: "kg" },
    { name: "Estaciones de cebo", qty: 2, unit: "pz" },
  ],
  Jardín: [
    { name: "Insecticida de follaje", qty: 1.8, unit: "L" },
    { name: "Fungicida sistémico", qty: 0.3, unit: "L" },
  ],
  Agropecuario: [
    { name: "Larvicida de establo", qty: 3.0, unit: "L" },
    { name: "Cebo rodenticida", qty: 2.5, unit: "kg" },
  ],
  Desinfección: [{ name: "Cipermetrina 10% EC", qty: 0.8, unit: "L" }],
};

/** Costo estimado de insumos de una orden (RQ × costo de almacén). */
export function serviceCost(type: ServiceType): number {
  return typeRq[type].reduce((a, l) => {
    const item = warehouseStock.find((w) => w.name === l.name);
    return a + (item ? item.cost * l.qty : 0);
  }, 0);
}

export interface ReqLine {
  item: StockItem;
  buyQty: number; // en unidades (múltiplos de presentación)
  packs: number;
}

/** Requisición automática a compras: repone a 2× tope todo lo que está bajo tope mínimo. */
export function purchaseReqLines(): ReqLine[] {
  return warehouseStock
    .filter((w) => w.stock < w.min)
    .map((item) => {
      const packs = Math.ceil((item.min * 2 - item.stock) / item.presQty);
      return { item, packs, buyQty: packs * item.presQty };
    });
}

export const purchaseReqMeta = {
  folio: "RQ-2026-118",
  created: "hoy 6:40 · generada por el sistema",
  status: "Por autorizar",
};

// ——— C-02 · Agente de seguimiento de fechas (pólizas / igualas / contratos) ———
// El agente NO programa por su cuenta: propone y valida. Cada OS pasa por tres
// filtros (contrato · producto · ruta); si alguno falla queda BLOQUEADA con
// motivo en la bandeja del coordinador. Los servicios "a demanda" requieren
// confirmación del cliente entre martes y miércoles (3–4 días antes del corte
// del sábado 20:00); sin confirmación no entran a la semana.

export type PolicyKind = "Iguala mensual" | "Póliza semanal" | "Contrato anual" | "Evento único";
export type ClientClass = "Cautivo" | "Nuevo";
export type AgentState =
  | "Confirmada"
  | "Propuesta lista"
  | "Sin confirmar"
  | "Bloqueada: contrato"
  | "Bloqueada: sin producto"
  | "Bloqueada: ruta"
  | "Vencida";

/** Resultado de cada filtro: ok · falla · pendiente (espera al cliente). */
export type CheckResult = "ok" | "falla" | "pend";

export interface Contract {
  client: string;
  policy: PolicyKind;
  giro: ServiceType;
  cls: ClientClass;
  since: string;
  lastSvc: string;
  nextDue: string;
  daysTo: number; // días para el vencimiento; negativo = vencido
  state: AgentState;
  zone: Zone;
  checks: { contrato: CheckResult; producto: CheckResult; ruta: CheckResult };
  action: string; // última acción del agente / motivo del bloqueo
}

/** Corte de programación semanal (demo): sábado 20:00; confirmaciones a demanda hasta el miércoles previo. */
export const weekCutoff = { day: "sáb 15 ago", time: "20:00", confirmFrom: "mar 11 ago", confirmTo: "mié 12 ago" };

export const contracts: Contract[] = [
  { client: "Bodega Lala Norte", policy: "Póliza semanal", giro: "Industrial", cls: "Cautivo", since: "2023", lastSvc: "12 ago", nextDue: "19 ago", daysTo: 7, state: "Confirmada", zone: "Local", checks: { contrato: "ok", producto: "ok", ruta: "ok" }, action: "Día fijo de contrato (miércoles BPP) · OS-4419 confirmada por el coordinador y asignada a Unidad 05" },
  { client: "Empaque Tomatero SA", policy: "Póliza semanal", giro: "Industrial", cls: "Cautivo", since: "2022", lastSvc: "12 ago", nextDue: "19 ago", daysTo: 7, state: "Confirmada", zone: "Local", checks: { contrato: "ok", producto: "ok", ruta: "ok" }, action: "Semana BPP pactada · OS-4402 confirmada, producto reservado en almacén" },
  { client: "Hotel Posada del Río", policy: "Iguala mensual", giro: "Comercial", cls: "Cautivo", since: "2024", lastSvc: "12 ago", nextDue: "9 sep", daysTo: 28, state: "Propuesta lista", zone: "Local", checks: { contrato: "ok", producto: "ok", ruta: "ok" }, action: "Propuesta para el 9 sep pasa los tres filtros · espera visto bueno del coordinador; aviso WhatsApp saldrá el 7 sep" },
  { client: "Establo San Rafael", policy: "Iguala mensual", giro: "Agropecuario", cls: "Cautivo", since: "2023", lastSvc: "12 ago", nextDue: "9 sep", daysTo: 28, state: "Bloqueada: ruta", zone: "Foráneo", checks: { contrato: "ok", producto: "ok", ruta: "falla" }, action: "Foráneo (Matamoros): sólo entra en día de ruta agropecuaria con unidad y viáticos confirmados · no se recorre un día; coordinador debe reservar la ruta del 9 sep" },
  { client: "Farmacias Delicias", policy: "Contrato anual", giro: "Comercial", cls: "Cautivo", since: "2021", lastSvc: "12 ago", nextDue: "26 ago", daysTo: 14, state: "Propuesta lista", zone: "Local", checks: { contrato: "ok", producto: "ok", ruta: "ok" }, action: "Calendario quincenal de contrato · propuesta lista para el corte del sábado; recordatorio enviado al responsable sanitario" },
  { client: "Restaurante El Fogón", policy: "Contrato anual", giro: "Comercial", cls: "Cautivo", since: "2024", lastSvc: "12 ago", nextDue: "26 ago", daysTo: 14, state: "Bloqueada: sin producto", zone: "Local", checks: { contrato: "ok", producto: "falla", ruta: "ok" }, action: "Gel cucarachicida del plan sin existencia en almacén central · RQ a compras generada; no se programa a ciegas" },
  { client: "Transportes G.L.", policy: "Contrato anual", giro: "Industrial", cls: "Cautivo", since: "2020", lastSvc: "18 jul", nextDue: "15–20 ago", daysTo: 3, state: "Sin confirmar", zone: "Local", checks: { contrato: "ok", producto: "ok", ruta: "pend" }, action: "A demanda: el cliente para operación del 15 al 20 de cada mes desde las 20:00 · confirmación esperada mar 11 / mié 12; recordatorio enviado a planta" },
  { client: "Residencia Fam. Nava", policy: "Evento único", giro: "Residencial", cls: "Nuevo", since: "ago 2026", lastSvc: "12 ago", nextDue: "2 sep", daysTo: 21, state: "Propuesta lista", zone: "Local", checks: { contrato: "ok", producto: "ok", ruta: "ok" }, action: "Seguimiento comercial a 21 días con oferta de iguala · sin OS hasta que el cliente acepte" },
  { client: "Vivero Los Álamos", policy: "Iguala mensual", giro: "Jardín", cls: "Cautivo", since: "2023", lastSvc: "12 ago", nextDue: "16 ago", daysTo: 4, state: "Bloqueada: contrato", zone: "Local", checks: { contrato: "falla", producto: "ok", ruta: "ok" }, action: "La iguala fija el día 16 y cae en domingo · el agente no mueve fechas pactadas: coordinador decide con el cliente (15 o 17 ago)" },
  { client: "Clínica Santa Fe", policy: "Contrato anual", giro: "Comercial", cls: "Cautivo", since: "2022", lastSvc: "29 jul", nextDue: "10 ago", daysTo: -2, state: "Vencida", zone: "Local", checks: { contrato: "falla", producto: "ok", ruta: "ok" }, action: "Vencida hace 2 días: alerta al coordinador y aviso al cliente · entra como excepción en Programación del día" },
  { client: "Casa Fam. Escobedo", policy: "Evento único", giro: "Residencial", cls: "Nuevo", since: "ago 2026", lastSvc: "—", nextDue: "15 ago", daysTo: 3, state: "Confirmada", zone: "Local", checks: { contrato: "ok", producto: "ok", ruta: "ok" }, action: "Primer servicio OS-4437 confirmado por el cliente · entra a seguimiento de 21 días" },
];

export const agentStateColors: Record<AgentState, [string, string]> = {
  Confirmada: ["#e8f5ee", "#1f7a4d"],
  "Propuesta lista": ["#eef2fb", "#3a4e8c"],
  "Sin confirmar": ["#fff3e0", "#a2670a"],
  "Bloqueada: contrato": ["#fdeced", "#cb2027"],
  "Bloqueada: sin producto": ["#fdeced", "#cb2027"],
  "Bloqueada: ruta": ["#fdeced", "#cb2027"],
  Vencida: ["#3b1f21", "#ffffff"],
};

export const checkColors: Record<CheckResult, string> = { ok: "#1f7a4d", falla: "#cb2027", pend: "#a2670a" };

/** Cómo decide el agente (demo) — se valida con CORMA (P-09). */
export const agentFilters: { name: string; rule: string }[] = [
  { name: "Contrato / póliza", rule: "Si el expediente tiene fecha o ventana pactada (día fijo, semana BPP, horario del cliente), esa fecha manda. El agente no la mueve: si no se puede cumplir, escala al coordinador con la cláusula a la vista." },
  { name: "Producto", rule: "Antes de emitir la OS revisa existencia en almacén del producto que pide el plan del cliente. Sin existencia o por caducar → 'Bloqueada: sin producto' y RQ a compras; nunca se programa a ciegas." },
  { name: "Ruta y zona", rule: "Cada cliente tiene zona (local / foráneo) y ruta. Un foráneo sólo se programa en día de ruta foránea, agrupado por zona, con unidad y viáticos confirmados; nunca se 'corre un día'. Un local puede reacomodarse dentro de su misma semana y ruta." },
  { name: "Confirmación previa al corte", rule: "Los servicios a demanda (el cliente avisa cuándo) deben confirmarse martes o miércoles, 3–4 días antes del corte del sábado 20:00. Sin confirmación quedan 'Sin confirmar' con recordatorio al contacto; si confirman después, entran como excepción y decide el coordinador." },
];

/** Reglas por tipo de póliza (demo) — se validan con CORMA (P-09). */
export const agentRules: { policy: PolicyKind; rule: string }[] = [
  { policy: "Iguala mensual", rule: "Propone la OS 5 días antes de cumplirse 30 del último servicio y manda aviso WhatsApp 48 h antes de la visita confirmada." },
  { policy: "Póliza semanal", rule: "Día fijo pactado (giros BPP): si una visita se recorre, sólo dentro de la misma semana y con aviso al responsable de planta." },
  { policy: "Contrato anual", rule: "Calendario del contrato: el día 25 propone las OS del mes siguiente; las que pasan los tres filtros van al corte semanal." },
  { policy: "Evento único", rule: "Cliente nuevo: seguimiento a los 21 días con oferta de iguala; al segundo servicio pagado se reclasifica como cautivo." },
];

export const agentFeed: { time: string; label: string; note: string }[] = [
  { time: "6:40", label: "Barrido diario de pólizas y contratos", note: "11 expedientes revisados contra su regla de fechas y sus tres filtros" },
  { time: "6:41", label: "Propuestas al corte del sábado", note: "3 propuestas pasan contrato · producto · ruta y esperan visto bueno del coordinador" },
  { time: "6:42", label: "Bloqueo: Restaurante El Fogón", note: "Sin existencia de gel cucarachicida · RQ a compras generada" },
  { time: "6:42", label: "Bloqueo: Establo San Rafael (foráneo)", note: "Ruta agropecuaria del 9 sep sin unidad confirmada · no se recorre" },
  { time: "6:43", label: "Bloqueo: Vivero Los Álamos", note: "Fecha pactada cae en domingo · coordinador decide con el cliente" },
  { time: "7:00", label: "Recordatorio de confirmación", note: "Transportes G.L. (a demanda, paro 15–20): plazo de confirmación vence mié 12" },
  { time: "9:30", label: "Encuesta post-servicio enviada", note: "Farmacias Delicias · 3 días después del cierre del 9 ago (SurveyMonkey)" },
];

// ——— Disponibilidad del cliente (alta de expediente) ———
// Cuatro preguntas en lenguaje de operación; de aquí salen las variantes de programación.

export type SchedMode = "Cuando el cliente nos avise" | "Fecha fija pactada" | "Cualquier día hábil";
export type Zone = "Local" | "Foráneo";
export type NotifyChannel = "WhatsApp" | "Llamada" | "Correo";

export interface StopWindow {
  fromDay: string; // día del mes en que inicia el paro
  toDay: string;
  fromHour: string; // hora a partir de la cual no reciben (o desde la que sí)
}

export interface Availability {
  mode: SchedMode;
  windows: StopWindow[];
  channel: NotifyChannel;
  notifyContact: string; // quién avisa / confirma
  notifyPhone: string;
  zone: Zone;
  route: string;
}

export const emptyAvailability: Availability = {
  mode: "Cualquier día hábil",
  windows: [],
  channel: "WhatsApp",
  notifyContact: "",
  notifyPhone: "",
  zone: "Local",
  route: "",
};

export const routeOptions = ["Ruta Centro", "Ruta Norte industrial", "Ruta Lerdo", "Ruta agropecuaria", "Ruta foránea Matamoros–San Pedro", "Ruta foránea Durango"];

/** Texto corto de la disponibilidad, como lo ve el coordinador. */
export function availabilitySummary(a: Availability): string {
  const parts: string[] = [a.mode];
  if (a.windows.length) parts.push(a.windows.map((w) => `paro del ${w.fromDay} al ${w.toDay} desde las ${w.fromHour}`).join(" · "));
  parts.push(`${a.zone}${a.route ? " · " + a.route : ""}`);
  return parts.join(" · ");
}

// ——— C-01 · Expediente integral del servicio ———
// Historial completo por cliente: primera revisión, aplicaciones, seguimiento,
// evidencia, tipo de póliza/iguala/contrato, vigencias y generales.

export type ExpEventKind =
  | "Primera revisión"
  | "Aplicación"
  | "Seguimiento"
  | "Encuesta"
  | "Incidencia"
  | "Certificado";

export interface ExpEvent {
  date: string;
  kind: ExpEventKind;
  title: string;
  detail: string;
  folio?: string;
  tech?: string;
  evid?: number; // fotos selladas ligadas al evento
}

export interface Expediente {
  id: string;
  client: string;
  giro: ServiceType;
  cls: ClientClass;
  policy: PolicyKind;
  policyStart: string;
  policyEnd: string;
  freq: string;
  contact: string;
  phone: string;
  email: string;
  addr: string;
  rfc: string;
  notes: string;
  avail: Availability; // disponibilidad y variantes de programación
  events: ExpEvent[]; // más reciente primero
}

export const expEventColors: Record<ExpEventKind, [string, string]> = {
  "Primera revisión": ["#f3ecfa", "#6b3f9e"],
  Aplicación: ["#eef2fb", "#3a4e8c"],
  Seguimiento: ["#e8f5ee", "#1f7a4d"],
  Encuesta: ["#e6f4f3", "#1f7a72"],
  Incidencia: ["#fdeced", "#cb2027"],
  Certificado: ["#fff3e0", "#a2670a"],
};

export const expedientes: Expediente[] = [
  {
    id: "e1",
    client: "Hotel Posada del Río",
    giro: "Comercial",
    cls: "Cautivo",
    policy: "Iguala mensual",
    policyStart: "15 mar 2024",
    policyEnd: "15 mar 2027",
    freq: "Mensual · 12 visitas/año",
    contact: "Gerardo Luna · Gerente de mantenimiento",
    phone: "871 204 1187",
    email: "mantenimiento@posadadelrio.mx",
    addr: "Blvd. Miguel Alemán 1204, Gómez Palacio",
    rfc: "HPR-940312-K71",
    notes: "Acceso por andén de servicio; avisar a recepción 30 min antes. Cocina se trata después de las 10:00.",
    avail: { mode: "Cualquier día hábil", windows: [], channel: "WhatsApp", notifyContact: "Gerardo Luna", notifyPhone: "871 204 1187", zone: "Local", route: "Ruta Centro" },
    events: [
      { date: "12 ago 2026", kind: "Aplicación", title: "Servicio mensual · control integral", detail: "Gel en cocina, estaciones perimetrales 1–6, trampas UV. Sin actividad relevante.", folio: "OS-4412", tech: "Ana Delgado", evid: 6 },
      { date: "9 ago 2026", kind: "Encuesta", title: "Encuesta post-servicio respondida", detail: "Satisfacción 5/5 · NPS 9 · sin hallazgos nuevos reportados.", folio: "SM-0788" },
      { date: "14 jul 2026", kind: "Aplicación", title: "Servicio mensual + refuerzo en almacén", detail: "Consumo de cebo 50% en estación 4: se repuso y se agregó estación de refuerzo.", folio: "OS-4287", tech: "Ana Delgado", evid: 8 },
      { date: "18 jun 2026", kind: "Incidencia", title: "Reporte de mosca en terraza", detail: "Llamada del cliente; visita correctiva en 24 h. Origen: contenedor de basura vecino.", folio: "INC-112", tech: "Marco Ríos", evid: 3 },
      { date: "16 jun 2026", kind: "Aplicación", title: "Servicio mensual", detail: "Ciclo normal. Recomendación de saneamiento en patio de servicio.", folio: "OS-4180", tech: "Ana Delgado", evid: 5 },
      { date: "15 mar 2024", kind: "Primera revisión", title: "Diagnóstico inicial y alta de iguala", detail: "Infestación moderada de cucaracha en cocina; plano de 6 estaciones perimetrales; se firma iguala mensual.", folio: "DX-0451", tech: "Roberto G.", evid: 12 },
    ],
  },
  {
    id: "e2",
    client: "Bodega Lala Norte",
    giro: "Industrial",
    cls: "Cautivo",
    policy: "Póliza semanal",
    policyStart: "1 feb 2023",
    policyEnd: "31 ene 2027",
    freq: "Semanal · protocolo BPP",
    contact: "Ing. Paola Cedillo · Jefa de inocuidad",
    phone: "871 318 4455",
    email: "inocuidad.norte@lala.com.mx",
    addr: "P.I. Lagunero, Gómez Palacio",
    rfc: "BLN-020714-QA3",
    notes: "Sitio BPP: evidencia sellada obligatoria en cada visita; bitácora por estación firmada por supervisor de planta. Auditoría anual en noviembre.",
    avail: { mode: "Fecha fija pactada", windows: [], channel: "Correo", notifyContact: "Ing. Paola Cedillo", notifyPhone: "871 318 4455", zone: "Local", route: "Ruta Norte industrial" },
    events: [
      { date: "12 ago 2026", kind: "Aplicación", title: "Recorrido semanal · 24 estaciones", detail: "Consumo en estaciones 7 y 15 (25%); nebulización ULV en andén 3.", folio: "OS-4419", tech: "Diana Márquez", evid: 24 },
      { date: "5 ago 2026", kind: "Certificado", title: "Certificado mensual BPP emitido", detail: "Paquete de evidencia y bitácoras jul · enviado a inocuidad y al archivo digital.", folio: "CRM-2026-0790" },
      { date: "29 jul 2026", kind: "Seguimiento", title: "Refuerzo en estación 15", detail: "Consumo sostenido 3 semanas: segunda estación instalada, acceso sellado con malla.", folio: "OS-4361", tech: "Diana Márquez", evid: 9 },
      { date: "1 feb 2023", kind: "Primera revisión", title: "Diagnóstico inicial y plano de estaciones", detail: "Plano de 24 estaciones perimetrales e internas; protocolo BPP acordado con inocuidad.", folio: "DX-0298", tech: "Roberto G.", evid: 18 },
    ],
  },
  {
    id: "e3",
    client: "Transportes G.L.",
    giro: "Industrial",
    cls: "Cautivo",
    policy: "Contrato anual",
    policyStart: "9 ene 2026",
    policyEnd: "9 ene 2027",
    freq: "Mensual · 46 estaciones roedor",
    contact: "Lic. Mario Talamantes · Gerente de patio",
    phone: "871 750 2210",
    email: "patio@tgl.mx",
    addr: "Periférico km 14.5, Lerdo, Dgo.",
    rfc: "TGL-880130-HH0",
    notes: "Recorrido mensual de estaciones cebaderas (vista Estaciones). Acceso con gafete; caseta pide orden de servicio impresa o en app.",
    avail: { mode: "Cuando el cliente nos avise", windows: [{ fromDay: "15", toDay: "20", fromHour: "20:00" }], channel: "WhatsApp", notifyContact: "Lic. Mario Talamantes", notifyPhone: "871 750 2210", zone: "Local", route: "Ruta Lerdo" },
    events: [
      { date: "11 sep 2026", kind: "Aplicación", title: "Recorrido 46 · estaciones roedor", detail: "Estación 25 al 100% por tercer mes: refuerzo propuesto (ver recomendación en vista Estaciones).", folio: "OS-4501", tech: "Raúl Ávila", evid: 46 },
      { date: "7 ago 2026", kind: "Aplicación", title: "Recorrido 45", detail: "Pico de consumo general en descenso tras refuerzos de julio.", folio: "OS-4390", tech: "Raúl Ávila", evid: 46 },
      { date: "10 jul 2026", kind: "Seguimiento", title: "Refuerzo zona de silos", detail: "4 estaciones adicionales en silos por consumo alto sostenido; maleza retirada por el cliente.", folio: "OS-4302", tech: "Raúl Ávila", evid: 11 },
      { date: "9 ene 2026", kind: "Primera revisión", title: "Renovación anual y actualización de plano", detail: "Contrato renovado; plano actualizado a 46 estaciones (4 nuevas en patio sur).", folio: "DX-0512", tech: "Roberto G.", evid: 8 },
    ],
  },
  {
    id: "e4",
    client: "Residencia Fam. Nava",
    giro: "Residencial",
    cls: "Nuevo",
    policy: "Evento único",
    policyStart: "12 ago 2026",
    policyEnd: "—",
    freq: "Eventual · seguimiento a 21 días",
    contact: "Sra. Leticia Nava · Propietaria",
    phone: "871 226 7741",
    email: "leticia.nava@hotmail.com",
    addr: "Fracc. Las Rosas 14, Gómez Palacio",
    rfc: "—",
    notes: "Mascotas: 2 perros — producto de baja toxicidad y tiempo de reentrada por escrito. Candidata a iguala residencial (el agente ofrece a los 21 días).",
    avail: { mode: "Cualquier día hábil", windows: [], channel: "WhatsApp", notifyContact: "Sra. Leticia Nava", notifyPhone: "871 226 7741", zone: "Local", route: "Ruta Centro" },
    events: [
      { date: "12 ago 2026", kind: "Primera revisión", title: "Diagnóstico y primer servicio", detail: "Cucaracha en cocina (moderada) y alacrán en patio. Gel + aspersión perimetral.", folio: "OS-4431", tech: "Ana Delgado", evid: 4 },
    ],
  },
  {
    id: "e5",
    client: "Establo San Rafael",
    giro: "Agropecuario",
    cls: "Cautivo",
    policy: "Iguala mensual",
    policyStart: "3 may 2023",
    policyEnd: "3 may 2027",
    freq: "Mensual · protocolo pecuario",
    contact: "MVZ. Homero Cázares · Administrador",
    phone: "871 442 9083",
    email: "admon@establosanrafael.mx",
    addr: "Ejido La Concha, Matamoros",
    rfc: "ESR-050503-3B9",
    notes: "Unidad de producción con BPP SENASICA: registro sanitario en cada visita. Mosca de establo estacional may–sep; roedor en silos.",
    avail: { mode: "Fecha fija pactada", windows: [], channel: "Llamada", notifyContact: "MVZ. Homero Cázares", notifyPhone: "871 442 9083", zone: "Foráneo", route: "Ruta agropecuaria" },
    events: [
      { date: "12 ago 2026", kind: "Aplicación", title: "Servicio mensual · corrales y silos", detail: "Larvicida en corrales 1–4; cebo repuesto en silos. Registro SENASICA firmado.", folio: "OS-4401", tech: "Raúl Ávila", evid: 14 },
      { date: "15 jul 2026", kind: "Incidencia", title: "Brote de mosca por lluvia", detail: "Visita extraordinaria: nebulización térmica en corrales; se recomendó drenaje de encharcamiento.", folio: "INC-118", tech: "Raúl Ávila", evid: 7 },
      { date: "12 jul 2026", kind: "Aplicación", title: "Servicio mensual", detail: "Ciclo normal previo al pico de temporada.", folio: "OS-4290", tech: "Raúl Ávila", evid: 12 },
      { date: "3 may 2023", kind: "Primera revisión", title: "Diagnóstico inicial y alta de iguala", detail: "Programa de mosca de establo y roedor; requisitos BPP levantados con el MVZ responsable.", folio: "DX-0331", tech: "Roberto G.", evid: 16 },
    ],
  },
];

/** Recomendación operativa según la tendencia de la estación (regla demo). */
export function stationAdvice(s: RodentStation): string {
  const last3 = s.cons.slice(-3);
  if (s.method === "Captura")
    return s.cons.some((v) => v > 0)
      ? "Captura registrada en el periodo. Mantener trampa activa y revisar semanalmente."
      : "Sin capturas en el periodo. Mantener limpieza y posición.";
  if (last3.every((v) => v >= 75))
    return "Consumo alto sostenido 3 recorridos: reforzar con segunda estación, revisar punto de acceso cercano y acortar ciclo a 15 días.";
  if (last3[2] > last3[1] && last3[1] > last3[0])
    return "Tendencia al alza: vigilar en el próximo recorrido y revisar condiciones del entorno (alimento disponible, maleza).";
  if (last3[2] === 0 && s.cons.some((v) => v >= 50))
    return "Actividad controlada tras refuerzo. Mantener estación y ciclo mensual.";
  if (last3[2] > 0) return "Actividad moderada a la baja. Continuar monitoreo en ciclo normal.";
  return "Sin actividad. Mantener estación limpia y anclada.";
}
