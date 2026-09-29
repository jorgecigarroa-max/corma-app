"use client";

import { agentFeed, agentRules, agentStateColors, contracts, typeColor } from "@/lib/data";
import { Pill } from "@/components/ui";

export function SeguimientoView() {
  const attention = contracts.filter((c) => c.state === "Por programar" || c.state === "Vencido").length;
  const scheduled = contracts.filter((c) => c.state === "Programado").length;
  const nuevos = contracts.filter((c) => c.cls === "Nuevo").length;

  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <div className="mb-[3px] flex items-center gap-[10px]">
        <h1 className="text-[26px] font-bold leading-[1.1]">Agente de seguimiento</h1>
        <span className="flex items-center gap-[6px] rounded-full bg-ok-bg px-[10px] py-[5px] text-[10.5px] font-bold uppercase leading-none tracking-[.05em] text-ok">
          <span className="block h-[6px] w-[6px] animate-pulse rounded-full bg-ok" /> Activo · barrido diario 6:40
        </span>
      </div>
      <p className="mb-[18px] text-[13px] font-medium leading-none text-ink-5">
        Vigila cuándo toca cada servicio según su póliza, iguala o contrato — fijo o recurrente, cliente cautivo o
        nuevo — y dispara programación y avisos
      </p>

      <div className="mb-4 grid grid-cols-4 gap-[14px]">
        {[
          { label: "Expedientes vigilados", value: String(contracts.length), note: "pólizas, igualas y contratos", warn: false },
          { label: "Programados por el agente", value: String(scheduled), note: "OS generadas según su regla", warn: false },
          { label: "Requieren atención", value: String(attention), note: "vencidos o por programar", warn: attention > 0 },
          { label: "Clientes nuevos en seguimiento", value: String(nuevos), note: "ciclo de conversión a iguala", warn: false },
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
          <div className="mb-2 text-sm font-bold leading-none">Próximos servicios por expediente</div>
          <div className="flex border-b border-line-4 pb-[6px] text-[10px] font-semibold uppercase leading-none tracking-[.05em] text-ink-7">
            <span className="flex-1">Cliente · póliza</span>
            <span className="w-[64px] text-center">Clase</span>
            <span className="w-[58px] text-right">Último</span>
            <span className="w-[64px] text-right">Próximo</span>
            <span className="w-[104px] text-right">Estado</span>
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
                    </div>
                    <div className="mt-[2px] pl-[13px] text-[10.5px] font-medium text-ink-7">
                      {c.policy} · desde {c.since}
                    </div>
                  </div>
                  <span className="flex w-[64px] justify-center">
                    <Pill bg={c.cls === "Nuevo" ? "#f3ecfa" : "#eef0f3"} fg={c.cls === "Nuevo" ? "#6b3f9e" : "#6d737c"}>
                      {c.cls}
                    </Pill>
                  </span>
                  <span className="w-[58px] text-right font-cond font-bold text-ink-6">{c.lastSvc}</span>
                  <span className={`w-[64px] text-right font-cond font-bold ${c.daysTo < 0 ? "text-brand" : ""}`}>
                    {c.nextDue}
                  </span>
                  <span className="flex w-[104px] justify-end">
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

          {/* Reglas */}
          <div className="rounded-xl border border-[#f2dcdd] bg-[#fbf3f3] px-4 py-[15px]">
            <div className="mb-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-brand">
              Reglas del agente (demo — se validan con CORMA)
            </div>
            {agentRules.map((r) => (
              <div key={r.policy} className="border-b border-[#f2dcdd] py-[7px] text-[11.5px] leading-[1.45] last:border-0">
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
