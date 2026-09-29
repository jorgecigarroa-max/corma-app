"use client";

import { dayLogs, fleetData, liveTracking, techs } from "@/lib/data";
import { Avatar, Pill } from "@/components/ui";

export function BitacoraView() {
  const totalKm = dayLogs.reduce((a, d) => a + (d.kmNow - d.kmStart), 0);
  const totalStops = dayLogs.reduce((a, d) => a + d.stops.filter((s) => s.done).length, 0);
  const totalFuel = dayLogs.reduce((a, d) => a + d.fuelL, 0);

  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <h1 className="mb-[3px] text-[26px] font-bold leading-[1.1]">Bitácora diaria por unidad</h1>
      <p className="mb-[18px] text-[13px] font-medium leading-none text-ink-5">
        Miércoles 12 de agosto · {totalKm} km recorridos · {totalStops} paradas completadas · {totalFuel.toFixed(1)} L
        de combustible
      </p>
      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(380px,1fr))" }}>
        {dayLogs.map((log) => {
          const t = techs.find((x) => x.id === log.techId)!;
          const unit = fleetData[techs.indexOf(t)];
          const live = liveTracking.find((l) => l.techId === log.techId)!;
          const onSite = log.stops.reduce((a, s) => a + s.onSiteMin, 0);
          return (
            <div key={log.techId} className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
              <div className="flex items-center gap-[10px]">
                <Avatar color={t.color} initials={t.initials} size={30} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold leading-[1.2]">
                    {t.unit} · {unit.plate}
                  </div>
                  <div className="text-[11.5px] font-medium leading-[1.3] text-ink-7">
                    {t.name} · {t.zone}
                  </div>
                </div>
                {live.state === "En sitio" ? (
                  <Pill bg="#e8f5ee" fg="#1f7a4d">En sitio</Pill>
                ) : live.state === "En tránsito" ? (
                  <Pill bg="#fff3e0" fg="#a2670a">En tránsito</Pill>
                ) : (
                  <Pill bg="#eef0f3" fg="#6d737c">En base</Pill>
                )}
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {(
                  [
                    ["Km hoy", `${log.kmNow - log.kmStart}`],
                    ["Salida base", log.departBase],
                    ["Regreso est.", log.returnEta],
                    ["H en sitio", `${Math.floor(onSite / 60)}:${String(onSite % 60).padStart(2, "0")}`],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="rounded-[9px] bg-soft-2 px-2 py-2">
                    <div className="text-[9.5px] font-medium uppercase leading-none tracking-[.04em] text-ink-7">
                      {k}
                    </div>
                    <div className="mt-[3px] font-cond text-[15px] font-bold leading-none">{v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                {log.stops.map((s, i) => (
                  <div key={s.client} className="flex items-center gap-[9px] border-b border-line-5 py-[7px] last:border-0">
                    <span
                      className={`flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full text-[10px] font-bold ${
                        s.done ? "text-white" : "bg-soft text-ink-6"
                      }`}
                      style={s.done ? { background: t.color } : undefined}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold leading-none">{s.client}</span>
                    <span className="w-[74px] text-right text-[11px] font-medium leading-none text-ink-6">
                      {s.arrive}
                    </span>
                    <span className="w-[52px] text-right text-[11px] font-medium leading-none text-ink-7">
                      {s.depart !== "—" ? `→ ${s.depart}` : ""}
                    </span>
                    <span className={`w-[56px] text-right text-[11px] font-semibold leading-none ${s.onSiteMin ? "text-ok" : "text-ink-9"}`}>
                      {s.onSiteMin ? `${s.onSiteMin} min` : "—"}
                    </span>
                    <span className="w-[42px] text-right font-cond text-xs font-bold leading-none text-ink-4">
                      {s.legKm} km
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-[9px] bg-soft-3 px-3 py-2">
                <span className="text-[11px] font-medium leading-none text-ink-6">
                  Odómetro {log.kmStart.toLocaleString()} → {log.kmNow.toLocaleString()} km
                </span>
                <div className="flex-1" />
                <span className="text-[11px] font-semibold leading-none text-ink-4">{log.fuelL} L combustible</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
