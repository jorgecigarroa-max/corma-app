// Capa de datos de Expedientes contra Supabase (C-01 · P-07).
// La vista carga de aquí y cae a los datos demo de lib/data.ts si no hay conexión.

import { supabase } from "@/lib/supabase";
import type { Availability, ExpEvent, ExpEventKind, Expediente, StopWindow } from "@/lib/data";

const monthsEs = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** "2026-09-28" → "28 sep 2026" (formato de fecha del historial). */
export function fmtISO(iso: string): string {
  const [y, m, d] = (iso ?? "").split("-");
  return m ? `${+d} ${monthsEs[+m - 1]} ${y}` : iso;
}

interface ClienteRow {
  id: string;
  nombre: string;
  giro: string;
  clasificacion: string;
  contacto: string;
  telefono: string;
  correo: string;
  direccion: string;
  sitio_web: string;
  rfc: string;
  notas: string;
  creado_en: string;
  polizas: { tipo: string; vigencia_desde: string | null; vigencia_hasta: string | null; frecuencia: string; activa: boolean }[];
  disponibilidad: {
    modo: string;
    canal: string;
    avisa_contacto: string;
    avisa_telefono: string;
    zona: string;
    ruta: string;
  } | null;
  ventanas_paro: { dia_desde: number; dia_hasta: number; desde_hora: string }[];
  expediente_eventos: {
    fecha: string;
    tipo: string;
    titulo: string;
    detalle: string;
    folio: string;
    tecnico: string;
    evidencias: number;
    creado_en: string;
  }[];
}

function toExpediente(r: ClienteRow): Expediente {
  const pol = r.polizas.find((p) => p.activa) ?? r.polizas[0];
  const disp = r.disponibilidad;
  const avail: Availability = {
    mode: (disp?.modo as Availability["mode"]) ?? "Cualquier día hábil",
    channel: (disp?.canal as Availability["channel"]) ?? "WhatsApp",
    notifyContact: disp?.avisa_contacto ?? "",
    notifyPhone: disp?.avisa_telefono ?? "",
    zone: (disp?.zona as Availability["zone"]) ?? "Local",
    route: disp?.ruta ?? "",
    windows: r.ventanas_paro.map(
      (w): StopWindow => ({ fromDay: String(w.dia_desde), toDay: String(w.dia_hasta), fromHour: w.desde_hora }),
    ),
  };
  const events: ExpEvent[] = [...r.expediente_eventos]
    .sort((a, b) => (a.fecha === b.fecha ? (a.creado_en < b.creado_en ? 1 : -1) : a.fecha < b.fecha ? 1 : -1))
    .map((e) => ({
      date: fmtISO(e.fecha),
      kind: e.tipo as ExpEventKind,
      title: e.titulo,
      detail: e.detalle,
      folio: e.folio || undefined,
      tech: e.tecnico || undefined,
      evid: e.evidencias || undefined,
    }));
  return {
    id: r.id,
    client: r.nombre,
    giro: r.giro as Expediente["giro"],
    cls: r.clasificacion as Expediente["cls"],
    policy: (pol?.tipo as Expediente["policy"]) ?? "Evento único",
    policyStart: pol?.vigencia_desde ?? "",
    policyEnd: pol?.vigencia_hasta ?? "",
    freq: pol?.frecuencia ?? "",
    contact: r.contacto,
    phone: r.telefono,
    email: r.correo,
    addr: r.direccion,
    web: r.sitio_web,
    rfc: r.rfc,
    notes: r.notas,
    avail,
    events,
  };
}

const SELECT =
  "id,nombre,giro,clasificacion,contacto,telefono,correo,direccion,sitio_web,rfc,notas,creado_en," +
  "polizas(tipo,vigencia_desde,vigencia_hasta,frecuencia,activa)," +
  "disponibilidad(modo,canal,avisa_contacto,avisa_telefono,zona,ruta)," +
  "ventanas_paro(dia_desde,dia_hasta,desde_hora)," +
  "expediente_eventos(fecha,tipo,titulo,detalle,folio,tecnico,evidencias,creado_en)";

export async function fetchExpedientes(): Promise<Expediente[]> {
  const { data, error } = await supabase
    .from("clientes")
    .select(SELECT)
    .order("creado_en", { ascending: true });
  if (error) throw error;
  return (data as unknown as ClienteRow[]).map(toExpediente);
}

function clienteFields(e: Expediente) {
  return {
    nombre: e.client,
    giro: e.giro,
    clasificacion: e.cls,
    contacto: e.contact,
    telefono: e.phone,
    correo: e.email,
    direccion: e.addr,
    sitio_web: e.web ?? "",
    rfc: e.rfc,
    notas: e.notes,
  };
}

function dispFields(a: Availability) {
  return {
    modo: a.mode,
    canal: a.channel,
    avisa_contacto: a.notifyContact,
    avisa_telefono: a.notifyPhone,
    zona: a.zone,
    ruta: a.route,
  };
}

async function saveVentanas(clienteId: string, windows: StopWindow[]) {
  await supabase.from("ventanas_paro").delete().eq("cliente_id", clienteId);
  if (windows.length) {
    const { error } = await supabase.from("ventanas_paro").insert(
      windows.map((w) => ({
        cliente_id: clienteId,
        dia_desde: +w.fromDay,
        dia_hasta: +w.toDay,
        desde_hora: w.fromHour,
      })),
    );
    if (error) throw error;
  }
}

/** Alta completa (formulario "Nuevo expediente"). Devuelve el uuid del cliente. */
export async function createExpedienteDb(e: Expediente): Promise<string> {
  const { data, error } = await supabase.from("clientes").insert(clienteFields(e)).select("id").single();
  if (error) throw error;
  const id = data.id as string;
  const { error: e2 } = await supabase.from("polizas").insert({
    cliente_id: id,
    tipo: e.policy,
    vigencia_desde: e.policyStart || null,
    vigencia_hasta: e.policyEnd || null,
    frecuencia: e.freq,
  });
  if (e2) throw e2;
  const { error: e3 } = await supabase.from("disponibilidad").insert({ cliente_id: id, ...dispFields(e.avail) });
  if (e3) throw e3;
  await saveVentanas(id, e.avail.windows);
  return id;
}

/** Guarda generales + póliza + disponibilidad del expediente (botón "Guardar cambios"). */
export async function saveExpedienteDb(e: Expediente): Promise<void> {
  const { error } = await supabase.from("clientes").update(clienteFields(e)).eq("id", e.id);
  if (error) throw error;
  const { error: e2 } = await supabase
    .from("polizas")
    .update({ vigencia_desde: e.policyStart || null, vigencia_hasta: e.policyEnd || null, frecuencia: e.freq })
    .eq("cliente_id", e.id)
    .eq("activa", true);
  if (e2) throw e2;
  const { error: e3 } = await supabase
    .from("disponibilidad")
    .upsert({ cliente_id: e.id, ...dispFields(e.avail) });
  if (e3) throw e3;
  await saveVentanas(e.id, e.avail.windows);
}

/** Registra un evento del historial (fecha en ISO YYYY-MM-DD). */
export async function addEventoDb(
  clienteId: string,
  ev: { fecha: string; kind: ExpEventKind; title: string; detail: string },
): Promise<void> {
  const { error } = await supabase.from("expediente_eventos").insert({
    cliente_id: clienteId,
    fecha: ev.fecha,
    tipo: ev.kind,
    titulo: ev.title,
    detalle: ev.detail,
  });
  if (error) throw error;
}
