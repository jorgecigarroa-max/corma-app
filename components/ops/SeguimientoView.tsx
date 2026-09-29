"use client";

import { agentFeed, agentFilters, agentRules, agentStateColors, checkColors, contracts, typeColor, weekCutoff } from "@/lib/data";
import type { CheckResult, Contract } from "@/lib/data";
import { Pill } from "@/components/ui";

function Checks({ c }: { c: Contract["checks"] }) {
  const items: [string, CheckResult][] = [
    ["Contrato", c.contrato],
    ["Producto", c.producto],
    ["Ruta", c.ruta],
  ];
  return (
    <span className="flex items-center gap-[5px]">
      {items.map(([label, r]) => (
        <span
          key={label}
          title={`${label}: ${r === "ok" ? "cumple" : r === "falla" ? "bloquea" : "pendiente"}`}
          className="flex h-[16px] w-[16px] items-center justify-center rounded-full text-[9px] font-bold leading-none text-white"
          style={{ background: checkColors[r], opacity: r === "pend" ? 0.85 : 1 }}
        >
          {label[0]}
        </span>
      ))}
    </span>
  );
}

export function SeguimientoView() {
  const confirmed = contracts.filter((c) => c.state === "Confirmada").length;
  const proposals = contracts.filter((c) => c.state === "Propuesta lista").length;
  const blocked = contracts.filter((c) => c.state.startsWith("Bloqueada") || c.state === "Vencida").length;
  const unconfirmed = contracts.filter((c) => c.state === "Sin confirmar").length;

  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <div className="mb-[3px] flex items-center gap-[10px]">
        <h1 className="text-[26px] font-bold leading-[1.1]">Agente de seguimiento</h1>
        <span className="flex items-center gap-[6px] rounded-full bg-ok-bg px-[10px] py-[5px] text-[10.5px] font-bold uppercase leading-none tracking-[.05em] text-ok">
          <span className="block h-[6px] w-[6px] animate-pulse rounded-full bg-ok" /> Activo · barrido diario 6:40
        </span>
      </div>
      <p className="mb-[14px] text-[13px] font-medium leading-none text-ink-5">
        Vigila cuándo toca cada servicio según su póliza, iguala o contrato. No programa por su cuenta: propone, valida
        contrato · producto · ruta, y lo que no pasa queda bloqueado con motivo para el coordinador
      </p>

      {/* Corte semanal */}
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-[#f2dcdd] bg-[#fbf3f3] px-4 py-[10px] text-[12px] font-medium text-ink-3">
        <span className="rounded-full bg-brand px-[9px] py-[4px] text-[10px] font-bold uppercase tracking-[.05em] text-white">
          Corte semanal
        </span>
        <span>
          Programación se cierra el <b className="font-bold">{weekCutoff.day} · {weekCutoff.time}</b>. Servicios a demanda
          deben confirmarse entre <b className="font-bold">{weekCutoff.confirmFrom}</b> y{" "}
          <b className="font-bold">{weekCutoff.confirmTo}</b> (3–4 días antes). Después del miércoles entran como
          excepción y decide el coordinador.
        </span>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-[14px]">
        {[
          { label: "Confirmadas al corte", value: String(confirmed), note: "pasan los tres filtros y tienen visto bueno", warn: false },
          { label: "Propuestas listas", value: String(proposals), note: "esperan visto bueno del coordinador", warn: false },
          { label: "Bloqueadas / vencidas", value: String(blocked), note: "contrato, producto o ruta — requieren decisión", warn: blocked > 0 },
          { label: "Sin confirmar", value: String(unconfirmed), note: "a demanda: esperan aviso del cliente", warn: unconfirmed > 0 },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
            <div className="text-[11px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">{k.label}</div>
            <div className={`mt-2 font-cond text-[26px] font-bold leading-none ${k.warn ? "text-brand" : ""}`}>{k.value}</div>
            <div className="mt-[6px] truncate text-[11px] font-medium leading-none text-ink-6">{k.note}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1.7fr 1fr" }}>
        {/* Tabla de expedientes */}
        <div className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold leading-none">
            Próximos servicios por expediente
            <span className="ml-auto flex items-center gap-[10px] text-[10px] font-semibold uppercase tracking-[.05em] text-ink-7">
              Filtros:
              <span className="flex items-center gap-[4px]"><span className="h-[8px] w-[8px] rounded-full" style={{ background: checkColors.ok }} /> cumple</span>
              <span className="flex items-center gap-[4px]"><span className="h-[8px] w-[8px] rounded-full" style={{ background: checkColors.pend }} /> pendiente</span>
              <span className="flex items-center gap-[4px]"><span className="h-[8px] w-[8px] rounded-full" style={{ background: checkColors.falla }} /> bloquea</span>
            </span>
          </div>
          <div className="flex border-b border-line-4 pb-[6px] text-[10px] font-semibold uppercase leading-none tracking-[.05em] text-ink-7">
            <span className="flex-1">Cliente · póliza</span>
            <span className="w-[60px] text-center">Zona</span>
            <span className="w-[58px] text-right">Último</span>
            <span className="w-[66px] text-right">Próximo</span>
            <span className="w-[68px] text-center">C · P · R</span>
            <span className="w-[140px] text-right">Estado</span>
          </div>
          {[...contracts]
            .sort((a, b) => a.daysTo - b.daysTo)
            .map((c) => (
              <div key={c.client} className="border-b border-line-5 py-[8px] last:border-0">
                <div className="flex items-center text-xs">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-[6px]">
                      <span className="h-[7px] w-[7px] flex-none rounded-full" style={{ background: typeColor[c.giro] }} />
                      <span className="truncate font-bold">{c.client}</span>
                      {c.cls === "Nuevo" && <Pill bg="#f3ecfa" fg="#6b3f9e">Nuevo</Pill>}
                    </div>
                    <div className="mt-[2px] pl-[13px] text-[10.5px] font-medium text-ink-7">
                      {c.policy} · desde {c.since}
                    </div>
                  </div>
                  <span className="flex w-[60px] justify-center">
                    <Pill bg={c.zone === "Foráneo" ? "#e6f4f3" : "#eef0f3"} fg={c.zone === "Foráneo" ? "#1f7a72" : "#6d737c"}>
                      {c.zone}
                    </Pill>
                  </span>
                  <span className="w-[58px] text-right font-cond font-bold text-ink-6">{c.lastSvc}</span>
                  <span className={`w-[66px] text-right font-cond font-bold ${c.daysTo < 0 ? "text-brand" : ""}`}>
                    {c.nextDue}
                  </span>
                  <span className="flex w-[68px] justify-center">
                    <Checks c={c.checks} />
                  </span>
                  <span className="flex w-[140px] justify-end">
                    <Pill bg={agentStateColors[c.state][0]} fg={agentStateColors[c.state][1]}>{c.state}</Pill>
                  </span>
                </div>
                <div className="mt-[4px] pl-[13px] text-[10.5px] font-medium leading-[1.35] text-ink-6">
                  ⚙ {c.action}
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-[14px]">
          {/* Cómo decide */}
          <div className="rounded-xl border border-[#f2dcdd] bg-[#fbf3f3] px-4 py-[15px]">
            <div className="mb-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-brand">
              Cómo decide el agente (demo — se valida con CORMA)
            </div>
            {agentFilters.map((f, i) => (
              <div key={f.name} className="border-b border-[#f2dcdd] py-[7px] text-[11.5px] leading-[1.45] last:border-0">
                <b className="font-bold text-ink-2">{i + 1}. {f.name}:</b>{" "}
                <span className="font-medium text-ink-4">{f.rule}</span>
              </div>
            ))}
          </div>

          {/* Actividad del agente */}
          <div className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
            <div className="mb-2 text-sm font-bold leading-none">Actividad de hoy</div>
            {agentFeed.map((e) => (
              <div key={e.time + e.label} className="flex gap-[10px] border-b border-line-5 py-[7px] text-xs last:border-0">
                <span className="w-[34px] flex-none pt-[1px] font-cond font-bold text-ink-6">{e.time}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold leading-[1.25]">{e.label}</div>
                  <div className="mt-[2px] text-[10.5px] font-medium leading-[1.35] text-ink-6">{e.note}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Reglas por póliza */}
          <div className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
            <div className="mb-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-ink-7">
              Reglas por tipo de póliza
            </div>
            {agentRules.map((r) => (
              <div key={r.policy} className="border-b border-line-5 py-[7px] text-[11.5px] leading-[1.45] last:border-0">
                <b className="font-bold text-ink-2">{r.policy}:</b>{" "}
                <span className="font-medium text-ink-4">{r.rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
