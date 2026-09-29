"use client";

import { useState } from "react";
import { consColor, rodentClient, rodentStations, roundDates, stationAdvice } from "@/lib/data";
import { Pill } from "@/components/ui";

const LAST = roundDates.length - 1;

export function EstacionesView() {
  const [sel, setSel] = useState(25);

  const cebo = rodentStations.filter((s) => s.method === "Cebo");
  const capturas = rodentStations.filter((s) => s.method === "Captura");

  // Series por recorrido
  const avgCons = roundDates.map((_, r) =>
    cebo.reduce((a, s) => a + s.cons[r], 0) / cebo.length,
  );
  const activeCount = roundDates.map((_, r) => cebo.filter((s) => s.cons[r] > 0).length);
  const capturesPerRound = roundDates.map((_, r) => capturas.filter((s) => s.cons[r] > 0).length);
  const totalCaptures = capturesPerRound.reduce((a, b) => a + b, 0);

  const station = rodentStations.find((s) => s.no === sel)!;
  const topStations = [...cebo]
    .map((s) => ({ ...s, sum: s.cons.reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.sum - a.sum)
    .slice(0, 5);

  const kpis = [
    { label: "Estaciones instaladas", value: "46", note: `${cebo.length} cebo · ${capturas.length} captura`, color: "#8b929c" },
    {
      label: "Con actividad (11 sep)",
      value: String(activeCount[LAST]),
      note: `vs. ${activeCount[3]} en julio`,
      color: activeCount[LAST] < activeCount[3] ? "#1f7a4d" : "#cb2027",
    },
    {
      label: "Consumo promedio de cebo",
      value: `${avgCons[LAST].toFixed(0)}%`,
      note: `${avgCons[LAST] < avgCons[LAST - 1] ? "−" : "+"}${Math.abs(avgCons[LAST] - avgCons[LAST - 1]).toFixed(0)} pts vs. agosto`,
      color: avgCons[LAST] < avgCons[LAST - 1] ? "#1f7a4d" : "#cb2027",
    },
    { label: "Capturas del periodo", value: String(totalCaptures), note: "est. 029 (jun) · 033 (jul)", color: "#8b929c" },
  ];

  // ——— Gráfica 1: línea/área de consumo promedio ———
  const W = 340;
  const H = 150;
  const PX = 26;
  const PT = 16;
  const PB = 26;
  const maxY = 40;
  const x = (i: number) => PX + (i * (W - PX - 10)) / (roundDates.length - 1);
  const y = (v: number) => PT + (H - PT - PB) * (1 - v / maxY);
  const linePts = avgCons.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const areaPts = `${PX},${y(0)} ${linePts} ${x(LAST).toFixed(1)},${y(0)}`;

  // ——— Gráfica 2: barras de estaciones activas ———
  const maxBar = Math.max(...activeCount);

  return (
    <div className="flex min-h-0 flex-1">
      <section className="min-w-0 flex-1 overflow-auto px-[22px] py-5">
        <div className="mb-[18px] flex items-end gap-4">
          <div>
            <h1 className="text-[26px] font-bold leading-[1.1] tracking-[-.01em]">Monitoreo de estaciones</h1>
            <p className="mt-[5px] text-[13px] font-medium leading-none text-ink-5">
              {rodentClient.name} · {rodentClient.site} · {rodentClient.contract} · último recorrido 11 sep, Téc.
              Jorge Sifuentes
            </p>
          </div>
          <div className="flex-1" />
          <button className="h-[34px] cursor-pointer rounded-lg border border-line bg-white px-[14px] text-[13px] font-semibold text-ink-2 hover:border-[#c3c8cf]">
            Exportar bitácora (NOM-256)
          </button>
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
                  {k.note}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tendencia del sitio */}
        <div className="mb-4 grid grid-cols-2 gap-[14px]">
          <div className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
            <div className="text-[13px] font-semibold leading-none">Tendencia de consumo de cebo</div>
            <div className="mt-[3px] text-[11px] font-medium leading-none text-ink-7">
              Promedio del sitio (%) por recorrido — el pico de julio es la prevalencia que corrigió el refuerzo
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full">
              {[0, 10, 20, 30, 40].map((g) => (
                <g key={g}>
                  <line x1={PX} x2={W - 10} y1={y(g)} y2={y(g)} stroke="#eff1f4" strokeWidth="1" />
                  <text x={PX - 5} y={y(g) + 3} textAnchor="end" fontSize="8.5" fontWeight="600" fill="#a2a8b2">
                    {g}%
                  </text>
                </g>
              ))}
              <polygon points={areaPts} fill="#cb2027" opacity=".08" />
              <polyline points={linePts} fill="none" stroke="#cb2027" strokeWidth="2.2" strokeLinejoin="round" />
              {avgCons.map((v, i) => (
                <g key={i}>
                  <circle cx={x(i)} cy={y(v)} r={i === 3 ? 4 : 3} fill={i === 3 ? "#cb2027" : "#fff"} stroke="#cb2027" strokeWidth="2" />
                  <text x={x(i)} y={y(v) - 8} textAnchor="middle" fontSize="9" fontWeight="700" fill="#42474e">
                    {v.toFixed(0)}%
                  </text>
                  <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#a2a8b2">
                    {roundDates[i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
            <div className="text-[13px] font-semibold leading-none">Estaciones con actividad</div>
            <div className="mt-[3px] text-[11px] font-medium leading-none text-ink-7">
              Número de estaciones de cebo con consumo &gt; 0 en cada recorrido
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full">
              {activeCount.map((v, i) => {
                const bw = 30;
                const bx = x(i) - bw / 2;
                const bh = (H - PT - PB) * (v / (maxBar + 2));
                const by = H - PB - bh;
                return (
                  <g key={i}>
                    <rect x={bx} y={by} width={bw} height={Math.max(bh, 2)} rx="4" fill={i === LAST ? "#1f7a4d" : "#c88a17"} opacity={i === LAST ? 0.9 : 0.55} />
                    <text x={x(i)} y={by - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill="#42474e">
                      {v}
                    </text>
                    <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#a2a8b2">
                      {roundDates[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Heatmap de prevalencia */}
        <div className="rounded-xl border border-line-2 bg-white px-4 py-[14px]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[13px] font-semibold leading-none">Prevalencia por estación — recorrido del 11 sep</span>
            <span className="text-[11px] font-medium leading-none text-ink-7">clic en una estación para ver su tendencia</span>
            <div className="flex-1" />
            {[
              ["0%", "#e4e7eb"],
              ["25%", "#e4c26a"],
              ["50%", "#c88a17"],
              ["75%", "#e2554a"],
              ["100%", "#cb2027"],
            ].map(([l, c]) => (
              <span key={l} className="flex items-center gap-1 text-[10.5px] font-medium leading-none text-ink-6">
                <i className="block h-[9px] w-[9px] rounded-[2px]" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
          <div className="mt-3 grid gap-[6px]" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>
            {rodentStations.map((s) => {
              const v = s.cons[LAST];
              const on = s.no === sel;
              const dark = v >= 50;
              return (
                <button
                  key={s.no}
                  onClick={() => setSel(s.no)}
                  title={`Estación ${String(s.no).padStart(3, "0")} · ${s.type} · ${s.method} · ${v}%`}
                  className="flex h-9 cursor-pointer flex-col items-center justify-center rounded-[7px] leading-none"
                  style={{
                    background: s.method === "Captura" ? "#fff" : consColor(v),
                    border: on ? "2px solid #23262b" : s.method === "Captura" ? "1.5px dashed #c8ccd2" : "1px solid rgba(0,0,0,.05)",
                  }}
                >
                  <span className={`text-[10.5px] font-bold ${dark ? "text-white" : "text-ink-3"}`}>
                    {String(s.no).padStart(3, "0")}
                  </span>
                  <span className={`mt-[2px] text-[8px] font-semibold ${dark ? "text-white/80" : "text-ink-7"}`}>
                    {s.method === "Captura" ? "capt" : `${v}%`}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 border-t border-line-4 pt-3">
            <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.07em] text-ink-8">
              Mayor prevalencia acumulada (6 recorridos)
            </div>
            {topStations.map((s) => (
              <button
                key={s.no}
                onClick={() => setSel(s.no)}
                className="flex w-full cursor-pointer items-center gap-[10px] py-[5px] text-left"
              >
                <span className="w-9 font-cond text-[13px] font-bold text-ink-2">{String(s.no).padStart(3, "0")}</span>
                <span className="w-[62px] text-[11px] font-medium text-ink-6">{s.type}</span>
                <div className="h-[10px] flex-1 overflow-hidden rounded-[3px] bg-[#f3f5f7]">
                  <div
                    className="h-full rounded-[3px]"
                    style={{ width: `${(s.sum / 600) * 100}%`, background: consColor(Math.min(100, s.sum / 4)) }}
                  />
                </div>
                <span className="w-[70px] text-right text-[11px] font-semibold text-ink-4">
                  {s.sum / 25} recargas
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detalle de estación */}
      <aside className="w-[372px] flex-none overflow-auto border-l border-line bg-white px-[18px] pb-[26px] pt-[18px]">
        <div className="mb-[10px] flex items-center gap-2">
          <Pill bg="#eef0f3" fg="#42474e">{station.type}</Pill>
          <Pill bg={station.method === "Captura" ? "#f3ecfa" : "#fdeced"} fg={station.method === "Captura" ? "#6b3f9e" : "#cb2027"}>
            {station.method}
          </Pill>
          <div className="flex-1" />
          <span className="text-[11.5px] font-medium leading-none text-ink-7">rev. mensual</span>
        </div>
        <h2 className="text-xl font-bold leading-[1.15] tracking-[-.01em]">
          Estación {String(station.no).padStart(3, "0")}
        </h2>
        <p className="mt-[4px] text-[12.5px] font-medium leading-[1.45] text-ink-5">
          {rodentClient.name} · {rodentClient.site}
        </p>

        <div className="mt-4">
          <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
            {station.method === "Captura" ? "Capturas por recorrido" : "Consumo de cebo por recorrido"}
          </div>
          <div className="rounded-[10px] border border-line-2 p-3">
            <div className="flex items-end gap-2" style={{ height: 110 }}>
              {station.cons.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center justify-end self-stretch">
                  <span className="mb-1 text-[10px] font-bold leading-none text-ink-3">
                    {station.method === "Captura" ? (v > 0 ? "1" : "0") : `${v}`}
                  </span>
                  <div
                    className="w-full rounded-t-[4px]"
                    style={{
                      height: `${Math.max(v, 3)}%`,
                      background: v > 0 ? consColor(v) : "#eef0f3",
                    }}
                  />
                  <span className="mt-[5px] text-[8.5px] font-semibold leading-none text-ink-8">{roundDates[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
            Condición física — recorrido 11 sep
          </div>
          {["Placa de identificación", "Registro interno", "Limpia", "Anclada", "Tornillería completa"].map((c) => (
            <div key={c} className="flex items-center gap-[9px] border-b border-line-5 py-[7px]">
              <span className="flex h-[17px] w-[17px] flex-none items-center justify-center rounded-[5px] bg-ok text-[10px] font-bold text-white">
                ✓
              </span>
              <span className="flex-1 text-[12.5px] font-medium leading-[1.3] text-ink-2">{c}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
            Recomendación del sistema
          </div>
          <div
            className={`rounded-[10px] border px-3 py-[10px] text-[12.5px] font-medium leading-[1.5] ${
              station.cons.slice(-3).every((v) => v >= 75) && station.method === "Cebo"
                ? "border-[#f2dcdd] bg-[#fbf3f3] text-ink-2"
                : "border-ok-border bg-ok-soft text-[#1f6b47]"
            }`}
          >
            {stationAdvice(station)}
          </div>
        </div>

        <div className="mt-[18px] flex gap-2">
          <button className="h-[38px] flex-1 cursor-pointer rounded-[9px] bg-ink text-[13px] font-semibold text-white hover:bg-black">
            Programar refuerzo
          </button>
          <button className="h-[38px] cursor-pointer rounded-[9px] border border-line bg-white px-[14px] text-[13px] font-semibold text-ink-2 hover:border-[#c3c8cf]">
            Bitácora
          </button>
        </div>

        <div className="mt-4 rounded-[9px] bg-soft-3 px-3 py-2 text-[11px] font-medium leading-[1.5] text-ink-6">
          Cada recorrido se captura desde la app del técnico (check-in GPS + evidencia sellada) y alimenta esta
          tendencia — el mismo dato imprime la bitácora NOM-256 / BPP para auditoría.
        </div>
      </aside>
    </div>
  );
}
