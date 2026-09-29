"use client";

import { compliance, reportBars, reportKpis, typeColor } from "@/lib/data";
import { Avatar } from "@/components/ui";

export function ReportesView() {
  const max = reportBars[0][1];
  return (
    <section className="flex-1 overflow-auto px-6 py-[22px]">
      <h1 className="mb-[3px] text-[26px] font-bold leading-[1.1]">Reportes</h1>
      <p className="mb-[18px] text-[13px] font-medium leading-none text-ink-5">Agosto 2026 · comparado con julio</p>

      <div className="mb-4 grid grid-cols-4 gap-3">
        {reportKpis.map((k) => (
          <div key={k.label} className="rounded-[11px] border border-line-2 bg-white px-4 py-[14px]">
            <div className="text-[11px] font-medium uppercase leading-none tracking-[.05em] text-ink-6">{k.label}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-cond text-[30px] font-bold leading-none">{k.value}</span>
              <span className={`text-xs font-semibold ${k.tone === "ok" ? "text-ok" : "text-ink-6"}`}>{k.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1.45fr 1fr" }}>
        <div className="rounded-xl border border-line-2 bg-white px-[18px] py-4">
          <div className="mb-4 text-[13px] font-semibold leading-none">Servicios por línea de negocio</div>
          {reportBars.map(([label, v]) => (
            <div key={label} className="mb-[11px] flex items-center gap-[11px]">
              <span className="w-28 flex-none text-xs font-medium leading-none text-ink-3">{label}</span>
              <div className="h-5 flex-1 overflow-hidden rounded-[5px] bg-[#f3f5f7]">
                <div
                  className="h-full rounded-[5px]"
                  style={{ width: `${(v / max) * 100}%`, background: typeColor[label] ?? "#1f7a72" }}
                />
              </div>
              <span className="w-[34px] text-right font-cond text-[13px] font-bold leading-none">{v}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-line-2 bg-white px-[18px] py-4">
          <div className="mb-[14px] text-[13px] font-semibold leading-none">Cumplimiento por técnico</div>
          {compliance.map((c) => (
            <div key={c.tech.id} className="flex items-center gap-[10px] border-b border-line-5 py-[7px]">
              <Avatar color={c.tech.color} initials={c.tech.initials} size={24} />
              <span className="flex-1 text-[12.5px] font-medium leading-none">{c.tech.name}</span>
              <span className="text-[11.5px] font-medium leading-none text-ink-7">{c.count} serv.</span>
              <span
                className="w-[42px] text-right text-[12.5px] font-bold leading-none"
                style={{ color: c.pct >= 95 ? "#1f7a4d" : c.pct >= 90 ? "#a2670a" : "#cb2027" }}
              >
                {c.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
