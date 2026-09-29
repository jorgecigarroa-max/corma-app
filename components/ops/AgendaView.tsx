"use client";

import { bppProtocol, checksFor, fmt, serviceEvents, techs, typeColor } from "@/lib/data";
import type { Service } from "@/lib/data";
import { Avatar, Pill, StatusPill } from "@/components/ui";

const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export function AgendaView({
  all,
  assignedSvcs,
  pendingSvcs,
  sel,
  onSelect,
  onAssign,
  onAutoAssign,
}: {
  all: Service[];
  assignedSvcs: Service[];
  pendingSvcs: Service[];
  sel: Service;
  onSelect: (id: string) => void;
  onAssign: (id: string, techId: string) => void;
  onAutoAssign: () => void;
}) {
  const completed = all.filter((s) => s.status === "Completado").length;

  const kpis = [
    { label: "Servicios hoy", value: String(all.length), delta: "+3 vs. ayer", color: "#1f7a4d" },
    { label: "Completados", value: String(completed), delta: "41%", color: "#8b929c" },
    {
      label: "Sin asignar",
      value: String(pendingSvcs.length),
      delta: pendingSvcs.length ? "requiere acción" : "al día",
      color: pendingSvcs.length ? "#cb2027" : "#1f7a4d",
    },
    { label: "Ocupación de flota", value: "86%", delta: "5 de 6 unidades", color: "#8b929c" },
  ];

  return (
    <div className="flex min-h-0 flex-1">
      <section className="min-w-0 flex-1 overflow-auto px-[22px] py-5">
        <div className="mb-[18px] flex items-end gap-4">
          <div>
            <h1 className="text-[26px] font-bold leading-[1.1] tracking-[-.01em]">Programación del día</h1>
            <p className="mt-[5px] text-[13px] font-medium leading-none text-ink-5">
              Miércoles 12 de agosto · La Laguna
            </p>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button
              onClick={onAutoAssign}
              className={`h-[34px] cursor-pointer rounded-lg border-0 px-[15px] text-[13px] font-semibold ${
                pendingSvcs.length
                  ? "bg-brand text-white hover:bg-brand-dark"
                  : "bg-ok-bg text-ok"
              }`}
            >
              {pendingSvcs.length ? `Auto-asignar ${pendingSvcs.length} pendientes` : "Ruta optimizada ✓"}
            </button>
            <button className="h-[34px] cursor-pointer rounded-lg border border-line bg-white px-[14px] text-[13px] font-semibold text-ink-2 hover:border-[#c3c8cf]">
              Imprimir rutas
            </button>
          </div>
        </div>

        <div className="mb-[18px] grid grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-[11px] border border-line-2 bg-white px-[15px] py-[13px]">
              <div className="text-[11px] font-medium uppercase leading-none tracking-[.05em] text-ink-6">
                {k.label}
              </div>
              <div className="mt-[7px] flex items-baseline gap-[7px]">
                <span className="font-cond text-[26px] font-bold leading-none tracking-[.01em]">{k.value}</span>
                <span className="text-[11px] font-semibold" style={{ color: k.color }}>
                  {k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline por técnico */}
        <div className="overflow-hidden rounded-xl border border-line-2 bg-white">
          <div className="flex items-center gap-[10px] border-b border-[#eceef1] px-[15px] py-3">
            <span className="text-[13px] font-semibold leading-none">Ruta por técnico</span>
            <span className="truncate text-xs font-medium leading-none text-ink-7">
              Clic en un bloque para ver el detalle
            </span>
            <div className="flex-1" />
            {(
              [
                ["Completado", "#1f7a4d"],
                ["En proceso", "#c88a17"],
                ["Programado", "#c8ccd2"],
              ] as const
            ).map(([label, c]) => (
              <span key={label} className="flex items-center gap-[5px] text-[11px] font-medium leading-none text-ink-4">
                <i className="block h-2 w-2 rounded-[2px]" style={{ background: c }} />
                {label}
              </span>
            ))}
          </div>

          <div className="flex px-[15px] pt-2">
            <div className="w-[168px] flex-none" />
            <div className="flex flex-1">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="min-w-0 flex-1 overflow-hidden whitespace-nowrap border-l border-line-4 pb-[6px] pl-[5px] text-[10px] font-semibold leading-none text-ink-8"
                >
                  {h}:00
                </div>
              ))}
            </div>
          </div>

          {techs.map((t) => (
            <div key={t.id} className="flex items-stretch border-t border-[#f0f2f4]">
              <div className="flex w-[168px] flex-none items-center gap-[9px] py-[10px] pl-[15px] pr-3">
                <Avatar color={t.color} initials={t.initials} size={28} />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[12.5px] font-semibold leading-[1.2]">{t.name}</span>
                  <span className="text-[10.5px] font-medium leading-[1.3] text-ink-7">
                    {t.unit} · {t.zone}
                  </span>
                </span>
              </div>
              <div
                className="relative min-h-[52px] flex-1"
                style={{
                  backgroundImage: "linear-gradient(to right,#eff1f4 1px,transparent 1px)",
                  backgroundSize: "8.3333% 100%",
                }}
              >
                {assignedSvcs
                  .filter((s) => s.tech === t.id)
                  .map((s) => {
                    const on = s.id === sel.id;
                    const done = s.status === "Completado";
                    return (
                      <button
                        key={s.id}
                        onClick={() => onSelect(s.id)}
                        title={`${s.client} · ${fmt(s.start)}`}
                        className="absolute bottom-[6px] top-[6px] cursor-pointer overflow-hidden rounded-[7px] px-2 py-[5px] text-left"
                        style={{
                          left: `${((s.start - 7) / 12) * 100}%`,
                          width: `${(s.dur / 12) * 100}%`,
                          background: `${t.color}${done ? "22" : "18"}`,
                          color: t.color,
                          borderLeft: `3px solid ${t.color}`,
                          border: on ? "1.5px solid #23262b" : undefined,
                          opacity: done ? 0.72 : 1,
                        }}
                      >
                        <span className="block truncate text-[11px] font-bold leading-[1.15]">{s.client}</span>
                        <span className="block truncate text-[10px] font-medium leading-[1.2] opacity-80">
                          {s.type} · {fmt(s.start)}
                        </span>
                      </button>
                    );
                  })}
                <div className="absolute bottom-0 top-0 w-[2px] bg-brand opacity-55" style={{ left: "37.5%" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Por asignar */}
        <div className="mt-4 rounded-xl border border-line-2 bg-white px-[15px] py-[14px]">
          <div className="mb-[11px] flex items-center gap-[9px]">
            <span className="text-[13px] font-semibold leading-none">Por asignar</span>
            <Pill bg="#f3ecfa" fg="#6b3f9e">
              {pendingSvcs.length}
            </Pill>
            <div className="flex-1" />
            <span className="text-[11.5px] font-medium leading-none text-ink-7">
              Sugerencia por cercanía de ruta y carga del técnico
            </span>
          </div>
          <div className="flex flex-wrap gap-[10px]">
            {pendingSvcs.map((p) => {
              const sug = techs.find((t) => t.id === p.sug)!;
              return (
                <div
                  key={p.id}
                  className="w-[270px] rounded-[10px] border border-line-2 bg-[#fcfcfd] px-3 py-[11px]"
                  style={{ borderLeft: "3px solid #6b3f9e" }}
                >
                  <div className="flex items-center gap-[7px]">
                    <Pill bg="#eef0f3" fg={typeColor[p.type]}>
                      {p.type}
                    </Pill>
                    <span className="text-[11px] font-medium leading-none text-ink-7">
                      {fmt(p.start)}–{fmt(p.start + p.dur)}
                    </span>
                  </div>
                  <div className="mt-[7px] text-[13px] font-bold leading-[1.2]">{p.client}</div>
                  <div className="mt-[2px] text-[11.5px] font-medium leading-[1.35] text-ink-5">{p.addr}</div>
                  <div className="mt-[10px] flex items-center gap-2">
                    <span className="text-[11px] font-medium leading-none text-ink-5">Sugerido:</span>
                    <span className="inline-flex items-center gap-[5px] text-[11.5px] font-semibold leading-none" style={{ color: sug.color }}>
                      {sug.name}
                    </span>
                    <div className="flex-1" />
                    <button
                      onClick={() => {
                        onAssign(p.id, p.sug as string);
                        onSelect(p.id);
                      }}
                      className="h-[26px] cursor-pointer rounded-[7px] bg-brand px-[11px] text-[11.5px] font-semibold text-white hover:bg-brand-dark"
                    >
                      Asignar
                    </button>
                  </div>
                </div>
              );
            })}
            {pendingSvcs.length === 0 && (
              <div className="px-1 py-4 text-[12.5px] font-medium text-ink-7">
                Todo el día está asignado. 👍
              </div>
            )}
          </div>
        </div>
      </section>

      <DetailPanel sel={sel} assignedSvcs={assignedSvcs} onAssign={onAssign} />
    </div>
  );
}

function DetailPanel({
  sel,
  assignedSvcs,
  onAssign,
}: {
  sel: Service;
  assignedSvcs: Service[];
  onAssign: (id: string, techId: string) => void;
}) {
  const tech = sel.tech ? techs.find((t) => t.id === sel.tech) : undefined;
  const load = techs.map((t) => assignedSvcs.filter((s) => s.tech === t.id).length);
  const checks = checksFor(sel.type);

  const facts = [
    { k: "Horario", v: `${fmt(sel.start)} – ${fmt(sel.start + sel.dur)}` },
    { k: "Frecuencia", v: sel.rec },
    { k: "Duración", v: `${sel.dur} h` },
    { k: "Contrato", v: sel.rec === "Eventual" ? "Por evento" : "Anual 2026" },
  ];

  return (
    <aside className="w-[372px] flex-none overflow-auto border-l border-line bg-white px-[18px] pb-[26px] pt-[18px]">
      <div className="mb-[14px] flex items-center gap-2">
        <Pill bg="#eef0f3" fg={typeColor[sel.type]}>
          {sel.type}
        </Pill>
        <span className="text-[11.5px] font-medium leading-none text-ink-7">{sel.folio}</span>
        <div className="flex-1" />
        <StatusPill status={sel.status} />
      </div>
      <h2 className="text-xl font-bold leading-[1.15] tracking-[-.01em]">{sel.client}</h2>
      <p className="mt-[6px] text-[13px] font-medium leading-[1.45] text-ink-5">{sel.addr}</p>

      {/* Mini-mapa */}
      <div className="relative mt-[14px] h-[150px] overflow-hidden rounded-[10px] border border-line-2 bg-[#eef1ee]">
        <svg viewBox="0 0 300 150" className="absolute inset-0 h-full w-full">
          <rect width="300" height="150" fill="#f0f2ee" />
          <path d="M-10 96 Q 80 78 150 92 T 320 74" stroke="#cfe0dd" strokeWidth="9" fill="none" />
          <g stroke="#e2e5e0" strokeWidth="7" fill="none">
            <path d="M40 -10 L 40 160" />
            <path d="M118 -10 L 118 160" />
            <path d="M212 -10 L 212 160" />
            <path d="M-10 42 L 310 42" />
            <path d="M-10 118 L 310 118" />
          </g>
          <path
            d="M40 130 L 40 60 L 118 60 L 118 30 L 212 30"
            stroke="#cb2027"
            strokeWidth="3"
            strokeDasharray="8 5"
            fill="none"
            className="animate-dash"
          />
          <circle cx="40" cy="130" r="5" fill="#42474e" />
        </svg>
        <div className="animate-pulse-ring absolute left-[206px] top-6 h-4 w-4 rounded-full border-[3px] border-white bg-brand shadow-[0_1px_4px_rgba(0,0,0,.3)]" />
        <div className="absolute bottom-[9px] left-[10px] rounded-[7px] bg-white/90 px-[9px] py-[5px] text-[11px] font-semibold leading-none text-ink-2">
          {sel.status === "En camino"
            ? "Llega en 18 min · 6.4 km"
            : `Ventana ${fmt(sel.start)}–${fmt(sel.start + sel.dur)}`}
        </div>
      </div>

      <div className="mt-[14px] grid grid-cols-2 gap-[9px]">
        {facts.map((f) => (
          <div key={f.k} className="rounded-[9px] bg-soft-2 px-[11px] py-[9px]">
            <div className="text-[10px] font-medium uppercase leading-none tracking-[.06em] text-ink-7">{f.k}</div>
            <div className="mt-1 text-[13px] font-semibold leading-[1.3]">{f.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
          Técnico asignado
        </div>
        <div className="flex items-center gap-[10px] rounded-[10px] border border-line-2 p-[10px]">
          <Avatar color={tech?.color ?? "#c8ccd2"} initials={tech?.initials ?? "—"} size={34} />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold leading-[1.2]">{tech?.name ?? "Sin asignar"}</div>
            <div className="text-[11px] font-medium leading-[1.3] text-ink-7">
              {tech ? `${tech.unit} · ${tech.zone}` : "Pendiente de despacho"}
            </div>
          </div>
          <select
            value={sel.tech ?? ""}
            onChange={(e) => onAssign(sel.id, e.target.value)}
            className="h-[30px] cursor-pointer rounded-[7px] border border-line bg-white px-[6px] text-xs font-semibold text-ink-2"
          >
            {!sel.tech && <option value="">Elegir…</option>}
            {techs.map((t, i) => (
              <option key={t.id} value={t.id}>
                {t.name} ({load[i]})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
          Actividad del técnico (GPS)
        </div>
        <div className="rounded-[10px] border border-line-2 px-3 py-1">
          {serviceEvents(sel).map((e, i, arr) => (
            <div key={`${e.time}-${e.label}`} className="flex items-center gap-[10px] py-[7px]">
              <div className="flex flex-col items-center self-stretch">
                <span
                  className={`mt-[3px] block h-[9px] w-[9px] flex-none rounded-full ${
                    e.time === "ahora" ? "animate-pulse-ring bg-brand" : "bg-ink-9"
                  }`}
                  style={e.time !== "ahora" && e.time !== "—" ? { background: "#1f7a4d" } : undefined}
                />
                {i < arr.length - 1 && <span className="mt-[2px] w-px flex-1 bg-line-4" />}
              </div>
              <span className="w-[38px] flex-none font-cond text-xs font-bold leading-none text-ink-2">{e.time}</span>
              <span className="flex-1 text-[12px] font-semibold leading-[1.25]">{e.label}</span>
              <span className="text-[10.5px] font-medium leading-none text-ink-7">{e.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
          Puntos de control
        </div>
        {checks.map((c, i) => {
          const done = sel.status === "Completado" || i < 2;
          return (
            <div key={c.label} className="flex items-center gap-[9px] border-b border-line-5 py-2">
              <span
                className={`flex h-[17px] w-[17px] flex-none items-center justify-center rounded-[5px] text-[10px] font-bold ${
                  done ? "bg-ok text-white" : "border-[1.5px] border-[#d4d9df] text-transparent"
                }`}
              >
                {done ? "✓" : ""}
              </span>
              <span className="flex-1 text-[12.5px] font-medium leading-[1.3] text-ink-2">{c.label}</span>
              <span className="text-[11px] font-medium leading-none text-ink-7">{c.note}</span>
            </div>
          );
        })}
      </div>

      {(sel.type === "Industrial" || sel.type === "Agropecuario") && (
        <div className="mt-4">
          <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
            Protocolo normativo (BPP / auditoría)
          </div>
          <div className="rounded-[10px] border border-[#f2dcdd] bg-[#fbf3f3] px-3 py-1">
            {bppProtocol.map((p) => (
              <div key={p.label} className="flex items-center gap-2 border-b border-[#f2dcdd] py-[7px] last:border-0">
                <span className="flex h-[15px] w-[15px] flex-none items-center justify-center rounded-[4px] bg-brand text-[9px] font-bold text-white">
                  !
                </span>
                <span className="flex-1 text-[11.5px] font-medium leading-[1.3] text-ink-2">{p.label}</span>
                <span className="text-[10px] font-semibold uppercase leading-none tracking-[.04em] text-brand">
                  {p.ref}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-[18px] flex gap-2">
        <button className="h-[38px] flex-1 cursor-pointer rounded-[9px] bg-ink text-[13px] font-semibold text-white hover:bg-black">
          Enviar al técnico
        </button>
        <button className="h-[38px] cursor-pointer rounded-[9px] border border-line bg-white px-[14px] text-[13px] font-semibold text-ink-2 hover:border-[#c3c8cf]">
          Reagendar
        </button>
      </div>
    </aside>
  );
}
