-- Plataforma CORMA · esquema inicial (28 sep 2026)
-- Dominio expedientes (C-01/C-07) + catálogos base. Se amplía por módulo en
-- siguientes migraciones (órdenes/almacén ya esbozados aquí para no re-modelar).
-- RLS: lectura pública (demo con datos ficticios); escritura anónima SÓLO en el
-- dominio de expedientes mientras no haya login de coordinador (ver nota al final).

-- ——— Clientes y expedientes ———

create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  giro text not null default 'Comercial'
    check (giro in ('Comercial','Residencial','Industrial','Jardín','Agropecuario','Desinfección')),
  clasificacion text not null default 'Nuevo' check (clasificacion in ('Cautivo','Nuevo')),
  contacto text not null default '',
  telefono text not null default '',
  correo text not null default '',
  direccion text not null default '',
  sitio_web text not null default '',
  rfc text not null default '',
  notas text not null default '',
  creado_en timestamptz not null default now()
);

create table if not exists polizas (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  tipo text not null default 'Evento único'
    check (tipo in ('Iguala mensual','Póliza semanal','Contrato anual','Evento único')),
  vigencia_desde date,
  vigencia_hasta date,
  frecuencia text not null default '',
  activa boolean not null default true
);
create index if not exists polizas_cliente_idx on polizas (cliente_id) where activa;

-- Disponibilidad (las 4 preguntas del alta, C-07b)
create table if not exists disponibilidad (
  cliente_id uuid primary key references clientes(id) on delete cascade,
  modo text not null default 'Cualquier día hábil'
    check (modo in ('Cuando el cliente nos avise','Fecha fija pactada','Cualquier día hábil')),
  canal text not null default 'WhatsApp' check (canal in ('WhatsApp','Llamada','Correo')),
  avisa_contacto text not null default '',
  avisa_telefono text not null default '',
  zona text not null default 'Local' check (zona in ('Local','Foráneo')),
  ruta text not null default ''
);

create table if not exists ventanas_paro (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  dia_desde smallint not null check (dia_desde between 1 and 31),
  dia_hasta smallint not null check (dia_hasta between 1 and 31),
  desde_hora text not null default '20:00'
);
create index if not exists ventanas_cliente_idx on ventanas_paro (cliente_id);

-- Historial del expediente (línea de tiempo 3.11)
create table if not exists expediente_eventos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  fecha date not null default current_date,
  tipo text not null default 'Seguimiento'
    check (tipo in ('Primera revisión','Aplicación','Seguimiento','Encuesta','Incidencia','Certificado')),
  titulo text not null,
  detalle text not null default '',
  folio text not null default '',
  tecnico text not null default '',
  evidencias int not null default 0,
  creado_en timestamptz not null default now()
);
create index if not exists eventos_cliente_idx on expediente_eventos (cliente_id, fecha desc);

-- ——— Catálogos base (para los siguientes módulos) ———

create table if not exists tecnicos (
  id text primary key, -- t1…t6 en el demo
  nombre text not null,
  iniciales text not null,
  color text not null default '#cb2027',
  unidad text not null default '',
  placas text not null default '',
  zona text not null default ''
);

create table if not exists insumos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  unidad text not null,
  presentacion text not null default '',
  presentacion_qty numeric not null default 1,
  stock numeric not null default 0,
  tope_minimo numeric not null default 0,
  costo_unitario numeric not null default 0,
  proveedor text not null default ''
);

create table if not exists ordenes (
  id uuid primary key default gen_random_uuid(),
  folio text not null unique,
  cliente_id uuid references clientes(id) on delete set null,
  tecnico_id text references tecnicos(id),
  fecha date,
  estado text not null default 'Programado',
  creado_en timestamptz not null default now()
);

-- ——— RLS ———

alter table clientes enable row level security;
alter table polizas enable row level security;
alter table disponibilidad enable row level security;
alter table ventanas_paro enable row level security;
alter table expediente_eventos enable row level security;
alter table tecnicos enable row level security;
alter table insumos enable row level security;
alter table ordenes enable row level security;

-- Lectura pública (demo, datos ficticios/anonimizados)
create policy "lectura demo" on clientes for select using (true);
create policy "lectura demo" on polizas for select using (true);
create policy "lectura demo" on disponibilidad for select using (true);
create policy "lectura demo" on ventanas_paro for select using (true);
create policy "lectura demo" on expediente_eventos for select using (true);
create policy "lectura demo" on tecnicos for select using (true);
create policy "lectura demo" on insumos for select using (true);
create policy "lectura demo" on ordenes for select using (true);

-- Captura anónima SOLO en el dominio de expedientes (llenado de cartera).
-- NOTA: al entrar el login del coordinador (Supabase Auth), estas políticas se
-- cambian a authenticated y se revoca la escritura anónima.
create policy "alta demo" on clientes for insert with check (true);
create policy "edicion demo" on clientes for update using (true);
create policy "alta demo" on polizas for insert with check (true);
create policy "edicion demo" on polizas for update using (true);
create policy "alta demo" on disponibilidad for insert with check (true);
create policy "edicion demo" on disponibilidad for update using (true);
create policy "alta demo" on ventanas_paro for insert with check (true);
create policy "baja demo" on ventanas_paro for delete using (true);
create policy "alta demo" on expediente_eventos for insert with check (true);
