"use client";

import { useMemo, useState } from "react";
import { availabilitySummary, emptyAvailability, expedientes as baseExpedientes, expEventColors, routeOptions, typeColor } from "@/lib/data";
import type { Availability, ExpEvent, ExpEventKind, Expediente, NotifyChannel, SchedMode, StopWindow, Zone } from "@/lib/data";
import { Pill } from "@/components/ui";

const emptyForm = {
  client: "",
  giro: "Comercial",
  cls: "Nuevo",
  policy: "Evento único",
  policyStart: "",
  policyEnd: "",
  freq: "",
  contact: "",
  phone: "",
  email: "",
  addr: "",
  rfc: "",
  notes: "",
};

function Field({
  label,
  value,
  onChange,
  wide,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={`block ${wide ? "col-span-2" : ""}`}>
      <span className="mb-[3px] block text-[10px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-full rounded-[8px] border border-line-2 bg-white px-2 text-xs font-semibold outline-none focus:border-brand"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-[3px] block text-[10px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full cursor-pointer rounded-[8px] border border-line-2 bg-white px-2 text-xs font-semibold outline-none focus:border-brand"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

const dayOpts = Array.from({ length: 31 }, (_, i) => String(i + 1));
const hourOpts = ["06:00", "07:00", "08:00", "09:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

/** Disponibilidad del cliente: cuatro preguntas en lenguaje de operación (sin pensar en programación). */
function AvailabilityForm({ value, onChange, compact }: { value: Availability; onChange: (a: Availability) => void; compact?: boolean }) {
  const set = (patch: Partial<Availability>) => onChange({ ...value, ...patch });
  const setWin = (i: number, patch: Partial<StopWindow>) =>
    set({ windows: value.windows.map((w, j) => (j === i ? { ...w, ...patch } : w)) });
  const modes: SchedMode[] = ["Cuando el cliente nos avise", "Fecha fija pactada", "Cualquier día hábil"];
  const q = (n: number, text: string) => (
    <div className="mb-[6px] flex items-center gap-2 text-[12px] font-bold leading-none text-ink-2">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand text-[10px] text-white">{n}</span>
      {text}
    </div>
  );
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
      {/* 1 · Cuándo */}
      <div className="rounded-[10px] border border-line-3 bg-soft-3 p-3">
        {q(1, "¿Cuándo podemos ir?")}
        <div className="flex flex-col gap-[5px]">
          {modes.map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-ink-3">
              <input type="radio" name={`mode-${compact ? "d" : "f"}`} checked={value.mode === m} onChange={() => set({ mode: m })} className="accent-brand" />
              {m}
            </label>
          ))}
        </div>
        <div className="mt-2 text-[10.5px] font-medium leading-[1.4] text-ink-6">
          {value.mode === "Cuando el cliente nos avise"
            ? "El agente no genera OS por su cuenta: espera el aviso y pide confirmación martes o miércoles antes del corte del sábado."
            : value.mode === "Fecha fija pactada"
              ? "La fecha del contrato manda; si no se puede cumplir, el agente escala al coordinador."
              : "El agente propone la fecha según la póliza y la ruta de la zona."}
        </div>
      </div>

      {/* 2 · Paros */}
      <div className="rounded-[10px] border border-line-3 bg-soft-3 p-3">
        {q(2, "¿Hay días u horas en que el cliente para o no recibe?")}
        {value.windows.length === 0 && (
          <div className="mb-2 text-[11px] font-medium text-ink-6">Sin ventanas de paro registradas.</div>
        )}
        {value.windows.map((w, i) => (
          <div key={i} className="mb-[6px] flex flex-wrap items-center gap-[6px] text-[11.5px] font-semibold text-ink-3">
            <span>Del día</span>
            <select value={w.fromDay} onChange={(e) => setWin(i, { fromDay: e.target.value })} className="h-7 rounded-[7px] border border-line-2 bg-white px-1 text-xs font-bold outline-none focus:border-brand">
              {dayOpts.map((d) => <option key={d}>{d}</option>)}
            </select>
            <span>al</span>
            <select value={w.toDay} onChange={(e) => setWin(i, { toDay: e.target.value })} className="h-7 rounded-[7px] border border-line-2 bg-white px-1 text-xs font-bold outline-none focus:border-brand">
              {dayOpts.map((d) => <option key={d}>{d}</option>)}
            </select>
            <span>de cada mes, a partir de las</span>
            <select value={w.fromHour} onChange={(e) => setWin(i, { fromHour: e.target.value })} className="h-7 rounded-[7px] border border-line-2 bg-white px-1 text-xs font-bold outline-none focus:border-brand">
              {hourOpts.map((h) => <option key={h}>{h}</option>)}
            </select>
            <button
              onClick={() => set({ windows: value.windows.filter((_, j) => j !== i) })}
              className="ml-auto h-7 cursor-pointer rounded-[7px] border border-line-2 bg-white px-2 text-[11px] font-semibold text-ink-6"
            >
              Quitar
            </button>
          </div>
        ))}
        <button
          onClick={() => set({ windows: [...value.windows, { fromDay: "15", toDay: "20", fromHour: "20:00" }] })}
          className="h-7 cursor-pointer rounded-[7px] border border-dashed border-line-2 bg-white px-3 text-[11px] font-bold text-brand"
        >
          + Otra ventana
        </button>
      </div>

      {/* 3 · Cómo avisa */}
      <div className="rounded-[10px] border border-line-3 bg-soft-3 p-3">
        {q(3, "¿Cómo nos avisa o confirma el cliente?")}
        <div className="mb-2 flex gap-[6px]">
          {(["WhatsApp", "Llamada", "Correo"] as NotifyChannel[]).map((ch) => (
            <button
              key={ch}
              onClick={() => set({ channel: ch })}
              className={`h-7 cursor-pointer rounded-full px-3 text-[11px] font-bold ${value.channel === ch ? "bg-ink text-white" : "border border-line-2 bg-white text-ink-4"}`}
            >
              {ch}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Quién avisa" value={value.notifyContact} onChange={(v) => set({ notifyContact: v })} placeholder="Nombre" />
          <Field label="Teléfono / WhatsApp" value={value.notifyPhone} onChange={(v) => set({ notifyPhone: v })} placeholder="871 …" />
        </div>
      </div>

      {/* 4 · Zona y ruta */}
      <div className="rounded-[10px] border border-line-3 bg-soft-3 p-3">
        {q(4, "Zona y ruta")}
        <div className="mb-2 flex gap-[6px]">
          {(["Local", "Foráneo"] as Zone[]).map((z) => (
            <button
              key={z}
              onClick={() => set({ zone: z })}
              className={`h-7 cursor-pointer rounded-full px-3 text-[11px] font-bold ${value.zone === z ? "bg-ink text-white" : "border border-line-2 bg-white text-ink-4"}`}
            >
              {z}
            </button>
          ))}
        </div>
        <Select label="Ruta" value={value.route || routeOptions[0]} options={routeOptions} onChange={(v) => set({ route: v })} />
        {value.zone === "Foráneo" && (
          <div className="mt-2 text-[10.5px] font-medium leading-[1.4] text-ink-6">
            Foráneo: sólo se programa en día de ruta foránea, agrupado con su zona y con unidad y viáticos confirmados. Nunca se recorre un día.
          </div>
        )}
      </div>
    </div>
  );
}

export function ExpedientesView() {
  const [items, setItems] = useState<Expediente[]>(baseExpedientes);
  const [selId, setSelId] = useState(baseExpedientes[0].id);
  const [q, setQ] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(emptyForm);
  const [avail, setAvail] = useState<Availability>(emptyAvailability);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [addingEvent, setAddingEvent] = useState(false);
  const [evKind, setEvKind] = useState<ExpEventKind>("Seguimiento");
  const [evTitle, setEvTitle] = useState("");
  const [evDetail, setEvDetail] = useState("");

  const sel = items.find((e) => e.id === selId) ?? items[0];
  const list = useMemo(
    () => items.filter((e) => e.client.toLowerCase().includes(q.toLowerCase())),
    [items, q],
  );

  const patchSel = (patch: Partial<Expediente>) => {
    setItems((prev) => prev.map((e) => (e.id === sel.id ? { ...e, ...patch } : e)));
    setSavedAt(null);
  };

  const createExpediente = () => {
    if (!form.client.trim()) return;
    const nuevo: Expediente = {
      ...(emptyForm as unknown as Expediente),
      ...(form as unknown as Expediente),
      id: `e${Date.now()}`,
      giro: form.giro as Expediente["giro"],
      cls: form.cls as Expediente["cls"],
      policy: form.policy as Expediente["policy"],
      policyEnd: form.policyEnd || "—",
      rfc: form.rfc || "—",
      avail: { ...avail, route: avail.route || routeOptions[0] },
      events: [],
    };
    setItems((prev) => [nuevo, ...prev]);
    setSelId(nuevo.id);
    setCreating(false);
    setForm(emptyForm);
    setAvail(emptyAvailability);
  };

  const addEvent = () => {
    if (!evTitle.trim()) return;
    const ev: ExpEvent = { date: "hoy", kind: evKind, title: evTitle, detail: evDetail || "Capturado desde el panel." };
    patchSel({ events: [ev, ...sel.events] });
    setAddingEvent(false);
    setEvTitle("");
    setEvDetail("");
  };

  const kinds = Object.keys(expEventColors) as ExpEventKind[];

  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <h1 className="mb-[3px] text-[26px] font-bold leading-[1.1]">Expedientes de servicio</h1>
      <p className="mb-[18px] text-[13px] font-medium leading-none text-ink-5">
        Historial completo por cliente: primera revisión, aplicaciones, seguimiento, evidencia, póliza y generales ·
        editable para el llenado de la cartera actual
      </p>

      <div className="grid items-start gap-[14px]" style={{ gridTemplateColumns: "290px 1fr" }}>
        {/* Lista de clientes */}
        <div className="rounded-xl border border-line-2 bg-white p-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar cliente…"
            className="mb-2 h-9 w-full rounded-[9px] border border-line-2 bg-soft-3 px-3 text-xs font-semibold outline-none focus:border-brand"
          />
          <button
            onClick={() => setCreating((v) => !v)}
            className={`mb-2 h-9 w-full cursor-pointer rounded-[9px] text-xs font-bold ${
              creating ? "border border-line-2 bg-soft text-ink-4" : "bg-brand text-white"
            }`}
          >
            {creating ? "Cancelar alta" : "+ Nuevo expediente"}
          </button>
          {list.map((e) => (
            <button
              key={e.id}
              onClick={() => {
                setSelId(e.id);
                setCreating(false);
                setSavedAt(null);
              }}
              className="mb-[6px] block w-full cursor-pointer rounded-[10px] p-[10px] text-left"
              style={{
                border: `1px solid ${e.id === sel.id && !creating ? "#cb2027" : "#e9ecef"}`,
                background: e.id === sel.id && !creating ? "#fdeced" : "#fff",
              }}
            >
              <div className="flex items-center gap-[7px]">
                <span className="h-[7px] w-[7px] flex-none rounded-full" style={{ background: typeColor[e.giro] }} />
                <span className="min-w-0 flex-1 truncate text-[12.5px] font-bold leading-[1.2]">{e.client}</span>
              </div>
              <div className="mt-[3px] flex items-center gap-[6px] pl-[14px]">
                <span className="text-[10px] font-medium leading-none text-ink-7">{e.policy}</span>
                {e.cls === "Nuevo" && <Pill bg="#f3ecfa" fg="#6b3f9e">Nuevo</Pill>}
              </div>
            </button>
          ))}
          {list.length === 0 && (
            <div className="px-2 py-3 text-center text-[11.5px] font-medium text-ink-7">Sin resultados.</div>
          )}
        </div>

        {/* Alta de expediente (llenado de cartera actual) */}
        {creating ? (
          <div className="rounded-xl border border-line-2 bg-white px-5 py-[18px]">
            <div className="mb-1 text-[17px] font-bold leading-none">Alta de expediente</div>
            <div className="mb-4 text-[12px] font-medium leading-[1.4] text-ink-6">
              Captura de un cliente de la cartera actual. En producción, cada servicio nuevo alimenta el historial
              automáticamente; aquí se cargan los generales y la póliza vigente.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field wide label="Cliente / razón social" value={form.client} onChange={(v) => setForm((f) => ({ ...f, client: v }))} placeholder="Ej. Empaques del Guadiana SA" />
              <Select label="Giro" value={form.giro} options={["Comercial", "Residencial", "Industrial", "Jardín", "Agropecuario", "Desinfección"]} onChange={(v) => setForm((f) => ({ ...f, giro: v }))} />
              <Select label="Clasificación" value={form.cls} options={["Cautivo", "Nuevo"]} onChange={(v) => setForm((f) => ({ ...f, cls: v }))} />
              <Select label="Tipo de póliza" value={form.policy} options={["Iguala mensual", "Póliza semanal", "Contrato anual", "Evento único"]} onChange={(v) => setForm((f) => ({ ...f, policy: v }))} />
              <Field label="Frecuencia" value={form.freq} onChange={(v) => setForm((f) => ({ ...f, freq: v }))} placeholder="Ej. Mensual · 12 visitas/año" />
              <Field label="Vigencia desde" value={form.policyStart} onChange={(v) => setForm((f) => ({ ...f, policyStart: v }))} placeholder="Ej. 1 oct 2026" />
              <Field label="Vigencia hasta" value={form.policyEnd} onChange={(v) => setForm((f) => ({ ...f, policyEnd: v }))} placeholder="Ej. 1 oct 2027" />
              <Field label="Contacto" value={form.contact} onChange={(v) => setForm((f) => ({ ...f, contact: v }))} placeholder="Nombre · puesto" />
              <Field label="Teléfono" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
              <Field label="Correo" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
              <Field label="RFC" value={form.rfc} onChange={(v) => setForm((f) => ({ ...f, rfc: v }))} />
              <Field wide label="Dirección del sitio" value={form.addr} onChange={(v) => setForm((f) => ({ ...f, addr: v }))} />
              <Field wide label="Notas de acceso / condiciones" value={form.notes} onChange={(v) => setForm((f) => ({ ...f, notes: v }))} />
            </div>

            <div className="mb-1 mt-5 text-[15px] font-bold leading-none">Disponibilidad y programación</div>
            <div className="mb-3 text-[11.5px] font-medium leading-[1.4] text-ink-6">
              Cuatro preguntas en lenguaje de operación. De aquí salen las variantes de programación del agente
              (a demanda, fecha pactada, ventanas de paro, zona y ruta); quien captura no tiene que pensar en programación.
            </div>
            <AvailabilityForm value={avail} onChange={setAvail} />

            <button
              onClick={createExpediente}
              className={`mt-4 h-10 rounded-[9px] px-5 text-[13px] font-bold text-white ${
                form.client.trim() ? "cursor-pointer bg-brand" : "cursor-default bg-ink/30"
              }`}
            >
              Crear expediente
            </button>
          </div>
        ) : (
          <div className="grid items-start gap-[14px]" style={{ gridTemplateColumns: "1fr 340px" }}>
            {/* Historial */}
            <div className="rounded-xl border border-line-2 bg-white px-5 py-[18px]">
              <div className="flex items-center gap-[10px]">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-[19px] font-bold leading-[1.15]">{sel.client}</h2>
                    <Pill bg="#eef0f3" fg={typeColor[sel.giro]}>{sel.giro}</Pill>
                    <Pill bg={sel.cls === "Nuevo" ? "#f3ecfa" : "#eef0f3"} fg={sel.cls === "Nuevo" ? "#6b3f9e" : "#6d737c"}>
                      {sel.cls}
                    </Pill>
                  </div>
                  <div className="mt-[3px] text-[11.5px] font-medium leading-none text-ink-6">{sel.addr}</div>
                </div>
                <button
                  onClick={() => setAddingEvent((v) => !v)}
                  className="h-8 cursor-pointer rounded-lg border border-line-2 bg-white px-3 text-xs font-semibold text-ink-2"
                >
                  {addingEvent ? "Cancelar" : "+ Registrar evento"}
                </button>
              </div>

              {addingEvent && (
                <div className="mt-3 rounded-[10px] border border-line-3 bg-soft-3 p-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Select label="Tipo de evento" value={evKind} options={kinds} onChange={(v) => setEvKind(v as ExpEventKind)} />
                    <Field label="Título" value={evTitle} onChange={setEvTitle} placeholder="Ej. Llamada de seguimiento" />
                    <Field wide label="Detalle" value={evDetail} onChange={setEvDetail} placeholder="Qué se hizo / acordó" />
                  </div>
                  <button
                    onClick={addEvent}
                    className={`mt-2 h-8 rounded-lg px-4 text-xs font-bold text-white ${evTitle.trim() ? "cursor-pointer bg-ink" : "cursor-default bg-ink/30"}`}
                  >
                    Guardar en el historial
                  </button>
                </div>
              )}

              <div className="mb-2 mt-4 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
                Historial completo · {sel.events.length} eventos
              </div>
              {sel.events.length === 0 && (
                <div className="rounded-[10px] bg-soft-3 px-3 py-3 text-[12px] font-medium text-ink-6">
                  Expediente recién dado de alta: el historial se llenará con cada servicio, o registra aquí los
                  antecedentes en papel.
                </div>
              )}
              <div className="relative pl-[18px]">
                <span className="absolute bottom-2 left-[5px] top-2 w-px bg-line-2" />
                {sel.events.map((ev, i) => (
                  <div key={ev.date + ev.title + i} className="relative pb-4 last:pb-0">
                    <span
                      className="absolute -left-[18px] top-[3px] block h-[11px] w-[11px] rounded-full border-2 border-white"
                      style={{ background: expEventColors[ev.kind][1] }}
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-cond text-xs font-bold text-ink-5">{ev.date}</span>
                      <Pill bg={expEventColors[ev.kind][0]} fg={expEventColors[ev.kind][1]}>{ev.kind}</Pill>
                      {ev.folio && <span className="text-[10.5px] font-medium leading-none text-ink-7">{ev.folio}</span>}
                    </div>
                    <div className="mt-[4px] text-[13px] font-bold leading-[1.25]">{ev.title}</div>
                    <div className="mt-[2px] text-[12px] font-medium leading-[1.45] text-ink-4">{ev.detail}</div>
                    <div className="mt-[4px] flex gap-3 text-[10.5px] font-medium leading-none text-ink-6">
                      {ev.tech && <span>Téc. {ev.tech}</span>}
                      {ev.evid !== undefined && ev.evid > 0 && (
                        <span className="font-semibold text-ok">▣ {ev.evid} fotos selladas</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Póliza + generales editables */}
            <div className="flex flex-col gap-[14px]">
              <div className="rounded-xl border border-[#f2dcdd] bg-white px-4 py-[15px]">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm font-bold leading-none">Póliza vigente</span>
                  <div className="flex-1" />
                  <Pill bg="#fdeced" fg="#cb2027">{sel.policy}</Pill>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Vigencia desde" value={sel.policyStart} onChange={(v) => patchSel({ policyStart: v })} />
                  <Field label="Vigencia hasta" value={sel.policyEnd} onChange={(v) => patchSel({ policyEnd: v })} />
                  <Field wide label="Frecuencia pactada" value={sel.freq} onChange={(v) => patchSel({ freq: v })} />
                </div>
                <div className="mt-2 rounded-[8px] bg-soft-3 px-[10px] py-2 text-[10.5px] font-medium leading-[1.4] text-ink-6">
                  El agente de fechas (vista Seguimiento) usa este tipo de póliza y vigencia para programar el próximo
                  servicio y los avisos.
                </div>
              </div>

              <div className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-bold leading-none">Disponibilidad y programación</span>
                  <div className="flex-1" />
                  <Pill bg={sel.avail.zone === "Foráneo" ? "#e6f4f3" : "#eef0f3"} fg={sel.avail.zone === "Foráneo" ? "#1f7a72" : "#6d737c"}>
                    {sel.avail.zone}
                  </Pill>
                </div>
                <div className="mb-3 rounded-[8px] bg-soft-3 px-[10px] py-2 text-[11px] font-semibold leading-[1.4] text-ink-3">
                  {availabilitySummary(sel.avail)}
                  {sel.avail.notifyContact && (
                    <span className="block font-medium text-ink-6">
                      Avisa/confirma: {sel.avail.notifyContact} · {sel.avail.channel} {sel.avail.notifyPhone}
                    </span>
                  )}
                </div>
                <AvailabilityForm compact value={sel.avail} onChange={(a) => patchSel({ avail: a })} />
              </div>

              <div className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
                <div className="mb-3 text-sm font-bold leading-none">Generales del cliente</div>
                <div className="grid grid-cols-1 gap-2">
                  <Field label="Contacto" value={sel.contact} onChange={(v) => patchSel({ contact: v })} />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Teléfono" value={sel.phone} onChange={(v) => patchSel({ phone: v })} />
                    <Field label="RFC" value={sel.rfc} onChange={(v) => patchSel({ rfc: v })} />
                  </div>
                  <Field label="Correo" value={sel.email} onChange={(v) => patchSel({ email: v })} />
                  <Field label="Dirección del sitio" value={sel.addr} onChange={(v) => patchSel({ addr: v })} />
                  <label className="block">
                    <span className="mb-[3px] block text-[10px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">
                      Notas de acceso / condiciones
                    </span>
                    <textarea
                      value={sel.notes}
                      onChange={(e) => patchSel({ notes: e.target.value })}
                      rows={3}
                      className="w-full rounded-[8px] border border-line-2 bg-white p-2 text-xs font-medium leading-[1.45] outline-none focus:border-brand"
                    />
                  </label>
                </div>
                <button
                  onClick={() => setSavedAt("ahora")}
                  className="mt-3 h-9 w-full cursor-pointer rounded-[9px] bg-ink text-xs font-bold text-white"
                >
                  {savedAt ? "✓ Cambios guardados" : "Guardar cambios"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
