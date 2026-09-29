"use client";

import { fleetData, invStatus, techs, unitInventories } from "@/lib/data";
import { Avatar, Pill } from "@/components/ui";

export function InventarioView() {
  const rows = unitInventories.flatMap((u) => u.items.map((i) => invStatus(i)));
  const diffs = rows.filter((r) => r.label === "Diferencia").length;
  const pending = rows.filter((r) => r.label === "Pendiente").length;

  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <h1 className="mb-[3px] text-[26px] font-bold leading-[1.1]">Inventario del día</h1>
      <p className="mb-[18px] text-[13px] font-medium leading-none text-ink-5">
        Salida de producto vs. ingreso de sobrantes, conciliado contra conteo físico ·{" "}
        {diffs > 0 ? `${diffs} renglón${diffs > 1 ? "es" : ""} con diferencia` : "sin diferencias"} · {pending}{" "}
        pendientes de conteo
      </p>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(400px,1fr))" }}>
        {unitInventories.map((u) => {
          const t = techs.find((x) => x.id === u.techId)!;
          const unit = fleetData[techs.indexOf(t)];
          const states = u.items.map(invStatus);
          const unitDiffs = states.filter((s) => s.label === "Diferencia").length;
          const unitPending = states.filter((s) => s.label === "Pendiente").length;
          return (
            <div key={u.techId} className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
              <div className="flex items-center gap-[10px]">
                <Avatar color={t.color} initials={t.initials} size={28} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold leading-[1.2]">
                    {t.unit} · {unit.plate}
                  </div>
                  <div className="text-[11.5px] font-medium leading-[1.3] text-ink-7">{t.name}</div>
                </div>
                {unitPending > 0 ? (
                  <Pill bg="#eef0f3" fg="#6d737c">En ruta · sin conteo</Pill>
                ) : unitDiffs > 0 ? (
                  <Pill bg="#fdeced" fg="#cb2027">
                    {unitDiffs} diferencia{unitDiffs > 1 ? "s" : ""}
                  </Pill>
                ) : (
                  <Pill bg="#e8f5ee" fg="#1f7a4d">Conciliado</Pill>
                )}
              </div>

              <div className="mt-3 flex border-b border-line-4 pb-[6px] text-[10px] font-semibold uppercase leading-none tracking-[.05em] text-ink-7">
                <span className="flex-1">Producto</span>
                <span className="w-[54px] text-right">Salida</span>
                <span className="w-[62px] text-right">Consumo</span>
                <span className="w-[62px] text-right">Esperado</span>
                <span className="w-[54px] text-right">Físico</span>
                <span className="w-[64px] text-right">Dif.</span>
              </div>
              {u.items.map((i) => {
                const st = invStatus(i);
                const expected = +(i.out - i.used).toFixed(2);
                return (
                  <div key={i.name} className="flex items-center border-b border-line-5 py-[8px] text-xs last:border-0">
                    <span className="min-w-0 flex-1 truncate font-semibold">{i.name}</span>
                    <span className="w-[54px] text-right font-cond font-bold">{i.out} {i.unit}</span>
                    <span className="w-[62px] text-right font-cond font-bold text-ink-4">{i.used} {i.unit}</span>
                    <span className="w-[62px] text-right font-cond font-bold">{expected} {i.unit}</span>
                    <span className="w-[54px] text-right font-cond font-bold">
                      {i.physical === null ? "—" : `${i.physical} ${i.unit}`}
                    </span>
                    <span
                      className={`w-[64px] text-right font-bold ${
                        st.label === "Diferencia" ? "text-brand" : st.label === "Conciliado" ? "text-ok" : "text-ink-9"
                      }`}
                    >
                      {st.label === "Pendiente" ? "—" : st.diff === 0 ? "✓ 0" : `${st.diff > 0 ? "+" : ""}${st.diff}`}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-[#f2dcdd] bg-[#fbf3f3] px-4 py-3 text-[12.5px] font-medium leading-[1.5] text-ink-3">
        <b className="text-brand">Regla de conciliación:</b> sobrante esperado = salida − consumo reportado en órdenes.
        El técnico captura el conteo físico al regresar a base desde su app; cualquier diferencia se reporta con firma
        del técnico y del almacenista.
      </div>
    </section>
  );
}
