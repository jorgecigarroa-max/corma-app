"use client";

import { fleetData } from "@/lib/data";
import { Avatar, Pill } from "@/components/ui";

export function FlotaView() {
  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <h1 className="mb-[3px] text-[26px] font-bold leading-[1.1]">Flota</h1>
      <p className="mb-[18px] text-[13px] font-medium leading-none text-ink-5">
        6 unidades · 1 en mantenimiento · verificación vigente en 5
      </p>
      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))" }}>
        {fleetData.map((v) => {
          const inv = [
            { label: "Cipermetrina 2 L", ok: true },
            { label: "Cebo rodenticida 4 kg", ok: v.fuel > 40 },
            { label: "Gel cucaracha 6 pz", ok: true },
            { label: "Estaciones cebo 12 pz", ok: v.fuel > 30 },
          ];
          return (
            <div key={v.tech.id} className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
              <div className="flex items-start gap-[10px]">
                <div className="flex-1">
                  <div className="text-[17px] font-bold leading-[1.1]">{v.tech.unit}</div>
                  <div className="mt-[2px] text-xs font-medium leading-[1.4] text-ink-5">
                    {v.model} · {v.plate}
                  </div>
                </div>
                {v.status === "Mantenimiento" ? (
                  <Pill bg="#f3ecfa" fg="#6b3f9e">Mantenimiento</Pill>
                ) : (
                  <Pill bg="#fff3e0" fg="#a2670a">En ruta</Pill>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Avatar color={v.tech.color} initials={v.tech.initials} size={24} />
                <span className="text-[12.5px] font-semibold leading-none">{v.tech.name}</span>
                <div className="flex-1" />
                <span className="text-[11.5px] font-medium leading-none text-ink-7">{v.tech.zone}</span>
              </div>
              <div className="mt-[14px]">
                <div className="mb-[5px] flex justify-between text-[11px] font-medium leading-none text-ink-6">
                  <span>Combustible</span>
                  <span>{v.fuel}%</span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-[#eef0f3]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${v.fuel}%`,
                      background: v.fuel < 35 ? "#cb2027" : v.fuel < 60 ? "#c88a17" : "#1f7a4d",
                    }}
                  />
                </div>
              </div>
              <div className="mt-[13px] grid grid-cols-2 gap-[9px]">
                <div className="rounded-[9px] bg-soft-2 px-[10px] py-2">
                  <div className="text-[10px] font-medium uppercase leading-none tracking-[.05em] text-ink-7">
                    Odómetro
                  </div>
                  <div className="mt-[3px] font-cond text-sm font-bold leading-[1.2]">{v.km} km</div>
                </div>
                <div className="rounded-[9px] bg-soft-2 px-[10px] py-2">
                  <div className="text-[10px] font-medium uppercase leading-none tracking-[.05em] text-ink-7">
                    Próx. servicio
                  </div>
                  <div className="mt-[3px] font-cond text-sm font-bold leading-[1.2]">{v.maint}</div>
                </div>
              </div>
              <div className="mt-[13px]">
                <div className="mb-[7px] text-[10px] font-semibold uppercase leading-none tracking-[.07em] text-ink-8">
                  Inventario a bordo
                </div>
                <div className="flex flex-wrap gap-[6px]">
                  {inv.map((i) => (
                    <span
                      key={i.label}
                      className={`rounded-md px-[9px] py-1 text-[11px] font-semibold leading-[1.3] ${
                        i.ok ? "bg-soft text-ink-3" : "bg-brand-bg text-brand"
                      }`}
                    >
                      {i.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
