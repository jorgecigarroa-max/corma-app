"use client";

import { useState } from "react";
import { techs, weekDays, weekPlan } from "@/lib/data";
import { Avatar, Pill } from "@/components/ui";

export function SemanaView() {
  const [published, setPublished] = useState(false);

  const dayTotals = weekDays.map((_, di) => weekPlan.reduce((a, r) => a + r.days[di].count, 0));
  const weekTotal = dayTotals.reduce((a, b) => a + b, 0);

  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <div className="mb-[18px] flex items-end gap-4">
        <div>
          <h1 className="text-[26px] font-bold leading-[1.1] tracking-[-.01em]">Programación semanal</h1>
          <p className="mt-[5px] text-[13px] font-medium leading-none text-ink-5">
            Semana del 17 al 22 de agosto · {weekTotal} servicios · se genera cada sábado a las 20:00
          </p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {published ? (
            <Pill bg="#e8f5ee" fg="#1f7a4d">Publicada · sáb 20:00 ✓</Pill>
          ) : (
            <Pill bg="#fff3e0" fg="#a2670a">Borrador</Pill>
          )}
          <button
            onClick={() => setPublished(true)}
            className={`h-[34px] rounded-lg border-0 px-[15px] text-[13px] font-semibold ${
              published
                ? "cursor-default bg-ok-bg text-ok"
                : "cursor-pointer bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            {published ? "Rutas visibles para el personal" : "Generar y publicar rutas"}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-line-2 bg-white">
        <div className="flex items-center border-b border-[#eceef1] px-[15px] py-3">
          <span className="w-[190px] flex-none text-[11px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">
            Técnico / unidad
          </span>
          {weekDays.map((d, i) => (
            <span key={d} className="flex-1 text-center text-[11px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">
              {d}
              <span className="ml-[6px] font-cond text-xs font-bold text-ink-4">{dayTotals[i]}</span>
            </span>
          ))}
          <span className="w-[70px] flex-none text-right text-[11px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">
            Semana
          </span>
        </div>
        {weekPlan.map((row) => {
          const t = techs.find((x) => x.id === row.techId)!;
          const total = row.days.reduce((a, d) => a + d.count, 0);
          return (
            <div key={row.techId} className="flex items-center border-b border-line-5 px-[15px] py-[10px] last:border-0">
              <div className="flex w-[190px] flex-none items-center gap-[9px]">
                <Avatar color={t.color} initials={t.initials} size={26} />
                <div className="min-w-0">
                  <div className="truncate text-[12.5px] font-semibold leading-[1.2]">{t.name}</div>
                  <div className="text-[10.5px] font-medium leading-[1.3] text-ink-7">{t.unit}</div>
                </div>
              </div>
              {row.days.map((d, di) => (
                <div key={di} className="flex-1 px-[3px]">
                  <div
                    className="rounded-[8px] px-2 py-[6px] text-center"
                    style={{ background: `${t.color}${published ? "16" : "0c"}` }}
                  >
                    <div className="font-cond text-[15px] font-bold leading-none" style={{ color: t.color }}>
                      {d.count}
                    </div>
                    <div className="mt-[2px] truncate text-[9.5px] font-medium leading-none text-ink-6">{d.zone}</div>
                  </div>
                </div>
              ))}
              <span className="w-[70px] flex-none text-right font-cond text-[17px] font-bold leading-none">{total}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-[14px]">
        <div className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
          <div className="text-[11px] font-medium uppercase leading-none tracking-[.05em] text-ink-6">
            Al publicar, cada técnico recibe
          </div>
          <div className="mt-2 text-[12.5px] font-medium leading-[1.55] text-ink-3">
            Su ruta optimizada del día, las órdenes de trabajo con herramienta y producto requeridos, y su
            check-up de salida ya armado — sin esperas en despacho.
          </div>
        </div>
        <div className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
          <div className="text-[11px] font-medium uppercase leading-none tracking-[.05em] text-ink-6">
            Criterios de optimización
          </div>
          <div className="mt-2 text-[12.5px] font-medium leading-[1.55] text-ink-3">
            Cercanía geográfica por zona, carga pareja entre técnicos, ventanas comprometidas con el cliente y
            frecuencias de contrato (semanal, quincenal, mensual).
          </div>
        </div>
        <div className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
          <div className="text-[11px] font-medium uppercase leading-none tracking-[.05em] text-ink-6">
            Cambios de última hora
          </div>
          <div className="mt-2 text-[12.5px] font-medium leading-[1.55] text-ink-3">
            Las urgencias entran como &quot;Sin asignar&quot; en Programación del día y se sugiere el técnico con la
            ruta más cercana, sin romper la semana publicada.
          </div>
        </div>
      </div>
    </section>
  );
}
