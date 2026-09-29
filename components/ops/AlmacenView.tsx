"use client";

import { purchaseReqLines, purchaseReqMeta, serviceCost, services, typeColor, typeRq, warehouseStock } from "@/lib/data";
import { Pill } from "@/components/ui";

const money = (n: number) => `$${n.toLocaleString("es-MX", { maximumFractionDigits: 0 })}`;

export function AlmacenView() {
  const low = warehouseStock.filter((w) => w.stock < w.min);
  const reqLines = purchaseReqLines();
  const reqTotal = reqLines.reduce((a, l) => a + l.buyQty * l.item.cost, 0);
  const stockValue = warehouseStock.reduce((a, w) => a + w.stock * w.cost, 0);
  const today = services.filter((s) => s.tech);
  const todayCost = today.reduce((a, s) => a + serviceCost(s.type), 0);

  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <h1 className="mb-[3px] text-[26px] font-bold leading-[1.1]">Almacén central</h1>
      <p className="mb-[18px] text-[13px] font-medium leading-none text-ink-5">
        Punta a punta: RQ de insumos por servicio → salida → retorno de sobrantes → costos → topes mínimos y
        requisición automática a compras
      </p>

      <div className="mb-4 grid grid-cols-4 gap-[14px]">
        {[
          { label: "Valor de existencias", value: money(stockValue), note: `${warehouseStock.length} insumos activos`, warn: false },
          { label: "Bajo tope mínimo", value: String(low.length), note: low.map((w) => w.name.split(" ")[0]).join(" · "), warn: low.length > 0 },
          { label: "Costo de insumos hoy", value: money(todayCost), note: `${today.length} órdenes con RQ aplicada`, warn: false },
          { label: "Requisición a compras", value: money(reqTotal), note: `${purchaseReqMeta.folio} · ${purchaseReqMeta.status.toLowerCase()}`, warn: true },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
            <div className="text-[11px] font-semibold uppercase leading-none tracking-[.06em] text-ink-7">{k.label}</div>
            <div className={`mt-2 font-cond text-[26px] font-bold leading-none ${k.warn ? "text-brand" : ""}`}>{k.value}</div>
            <div className="mt-[6px] truncate text-[11px] font-medium leading-none text-ink-6">{k.note}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        {/* Existencias y topes */}
        <div className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
          <div className="mb-1 text-sm font-bold leading-none">Existencias y topes mínimos</div>
          <div className="mb-2 text-[11.5px] font-medium leading-[1.4] text-ink-6">
            El sistema descuenta cada salida y suma cada retorno de sobrante conciliado; al cruzar el tope mínimo
            genera la línea de requisición.
          </div>
          <div className="flex border-b border-line-4 pb-[6px] text-[10px] font-semibold uppercase leading-none tracking-[.05em] text-ink-7">
            <span className="flex-1">Insumo</span>
            <span className="w-[70px] text-right">Stock</span>
            <span className="w-[58px] text-right">Tope</span>
            <span className="w-[72px] text-right">Costo/u</span>
            <span className="w-[92px] text-right">Estado</span>
          </div>
          {warehouseStock.map((w) => {
            const isLow = w.stock < w.min;
            const pct = Math.min(100, (w.stock / (w.min * 2)) * 100);
            return (
              <div key={w.name} className="border-b border-line-5 py-[8px] last:border-0">
                <div className="flex items-center text-xs">
                  <span className="min-w-0 flex-1 truncate font-semibold">{w.name}</span>
                  <span className={`w-[70px] text-right font-cond font-bold ${isLow ? "text-brand" : ""}`}>
                    {w.stock} {w.unit}
                  </span>
                  <span className="w-[58px] text-right font-cond font-bold text-ink-6">{w.min} {w.unit}</span>
                  <span className="w-[72px] text-right font-cond font-bold text-ink-4">${w.cost}</span>
                  <span className="flex w-[92px] justify-end">
                    {isLow ? <Pill bg="#fdeced" fg="#cb2027">Bajo tope</Pill> : <Pill bg="#e8f5ee" fg="#1f7a4d">OK</Pill>}
                  </span>
                </div>
                <div className="mt-[6px] h-[4px] overflow-hidden rounded-full bg-soft-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: isLow ? "#cb2027" : "#1f7a4d" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-[14px]">
          {/* Requisición automática */}
          <div className="rounded-xl border border-[#f2dcdd] bg-white px-4 py-[15px]">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="text-sm font-bold leading-[1.2]">Requisición a compras · {purchaseReqMeta.folio}</div>
                <div className="mt-[3px] text-[11px] font-medium leading-none text-ink-6">{purchaseReqMeta.created}</div>
              </div>
              <Pill bg="#fff3e0" fg="#a2670a">{purchaseReqMeta.status}</Pill>
            </div>
            <div className="mt-3">
              {reqLines.map((l) => (
                <div key={l.item.name} className="flex items-center border-b border-line-5 py-[8px] text-xs last:border-0">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{l.item.name}</div>
                    <div className="mt-[2px] text-[10.5px] font-medium text-ink-7">
                      {l.packs} × {l.item.pres} · {l.item.supplier}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-cond font-bold">{l.buyQty} {l.item.unit}</div>
                    <div className="mt-[2px] text-[10.5px] font-medium text-ink-6">{money(l.buyQty * l.item.cost)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-line-4 pt-2">
              <span className="text-xs font-semibold text-ink-4">Total estimado</span>
              <span className="font-cond text-[15px] font-bold">{money(reqTotal)}</span>
            </div>
            <button className="mt-3 h-9 w-full cursor-pointer rounded-[9px] bg-brand text-xs font-bold text-white">
              Autorizar y enviar a compras
            </button>
            <div className="mt-2 text-[10.5px] font-medium leading-[1.4] text-ink-7">
              Regla demo: repone a 2× el tope mínimo en múltiplos de la presentación de compra.
            </div>
          </div>

          {/* RQ por tipo de servicio */}
          <div className="rounded-xl border border-line-2 bg-white px-4 py-[15px]">
            <div className="mb-1 text-sm font-bold leading-none">RQ de insumos por servicio</div>
            <div className="mb-2 text-[11.5px] font-medium leading-[1.4] text-ink-6">
              Consumo aproximado por tipo de orden: es lo que el almacén surte a cada unidad y el costo que se aplica
              al servicio.
            </div>
            {(Object.keys(typeRq) as (keyof typeof typeRq)[])
              .filter((t) => t !== "Desinfección")
              .map((t) => (
                <div key={t} className="border-b border-line-5 py-[8px] last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="h-[8px] w-[8px] flex-none rounded-full" style={{ background: typeColor[t] }} />
                    <span className="flex-1 text-xs font-bold">{t}</span>
                    <span className="font-cond text-xs font-bold text-ink-4">{money(serviceCost(t))} / orden</span>
                  </div>
                  <div className="mt-[5px] flex flex-wrap gap-[5px] pl-[16px]">
                    {typeRq[t].map((l) => (
                      <span key={l.name} className="rounded-md bg-soft px-[7px] py-[3px] text-[10.5px] font-semibold text-ink-3">
                        {l.name.split(" ").slice(0, 2).join(" ")} · {l.qty} {l.unit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#f2dcdd] bg-[#fbf3f3] px-4 py-3 text-[12.5px] font-medium leading-[1.5] text-ink-3">
        <b className="text-brand">Ciclo completo:</b> la orden genera su RQ → el almacenista surte y registra la
        salida → el técnico reporta consumo por orden → el sobrante retorna y se concilia contra físico (vista
        Inventario) → el costo real se aplica al servicio → si una existencia cruza su tope mínimo, el sistema arma la
        requisición a compras y la deja lista para autorizar.
      </div>
    </section>
  );
}
