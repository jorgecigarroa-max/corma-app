"use client";

import { fmt, liveTracking, proj, routeKm, techs } from "@/lib/data";
import type { Service } from "@/lib/data";
import { Avatar } from "@/components/ui";

export function RutasView({
  assignedSvcs,
  sel,
  focusTech,
  onFocus,
  onPick,
}: {
  assignedSvcs: Service[];
  sel: string;
  focusTech: string | null;
  onFocus: (id: string) => void;
  onPick: (id: string) => void;
}) {
  const activeTechs = new Set(assignedSvcs.map((s) => s.tech as string));
  const totalKm = routeKm.reduce((a, b) => a + b, 0);
  const focus = techs.find((t) => t.id === focusTech);

  const stats = focus
    ? [
        { v: String(assignedSvcs.filter((s) => s.tech === focus.id).length), k: "paradas" },
        { v: "58", k: "km" },
        { v: "4.2", k: "h ruta" },
      ]
    : [
        { v: String(assignedSvcs.length), k: "paradas" },
        { v: String(totalKm), k: "km" },
        { v: "86%", k: "ocupación" },
      ];

  return (
    <div className="flex min-h-0 flex-1">
      <section className="w-[320px] flex-none overflow-auto border-r border-line bg-white px-4 py-[18px]">
        <h1 className="mb-[3px] text-[22px] font-bold leading-[1.1]">Rutas de hoy</h1>
        <p className="mb-[14px] text-[12.5px] font-medium leading-none text-ink-5">
          {activeTechs.size} unidades en calle · {totalKm} km estimados · {assignedSvcs.length} paradas
        </p>
        {techs.map((t, i) => {
          const list = assignedSvcs.filter((s) => s.tech === t.id);
          const on = focusTech === t.id;
          const live = liveTracking.find((l) => l.techId === t.id)!;
          return (
            <button
              key={t.id}
              onClick={() => onFocus(t.id)}
              className="mb-2 block w-full cursor-pointer rounded-[11px] px-3 py-[11px] text-left"
              style={{
                border: `1px solid ${on ? t.color : "#e6e9ed"}`,
                background: on ? `${t.color}0f` : "#fff",
              }}
            >
              <div className="flex items-center gap-[9px]">
                <Avatar color={t.color} initials={t.initials} size={28} />
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-[13px] font-semibold leading-[1.2]">{t.name}</div>
                  <div className="text-[11px] font-medium leading-[1.3] text-ink-7">
                    {t.unit} · {list.length} paradas
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-cond text-[15px] font-bold leading-none">{routeKm[i]}</div>
                  <div className="text-[10px] font-medium leading-[1.2] text-ink-7">km</div>
                </div>
              </div>
              <div className="mt-[9px] flex gap-[3px]">
                {list.map((s) => (
                  <span
                    key={s.id}
                    className="block h-[5px] flex-1 rounded-[3px]"
                    style={{ background: s.status === "Completado" ? t.color : `${t.color}33` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-[6px]">
                <span
                  className="block h-[7px] w-[7px] flex-none rounded-full"
                  style={{ background: live.state === "En sitio" ? "#1f7a4d" : "#c88a17" }}
                />
                <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium leading-none text-ink-6">
                  {live.state} · {live.detail}
                </span>
                <span className="flex-none text-[10px] font-medium leading-none text-ink-8">{live.lastPing}</span>
              </div>
            </button>
          );
        })}
      </section>

      <section className="relative min-w-0 flex-1 overflow-hidden bg-[#eef1ee]">
        <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <rect width="900" height="520" fill="#eff1ec" />
          <path
            d="M208,98 Q330,150 398,211 T484,276 T623,358 T796,439"
            stroke="#cbdcd8"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <g stroke="#e4e7e1" strokeWidth="12" fill="none" strokeLinecap="round">
            <path d="M123,297 L219,224 L530,283" />
            <path d="M219,224 L560,120 L840,190" />
            <path d="M530,283 L470,470" />
            <path d="M60,140 L880,300" />
          </g>
          <g stroke="#e9ebe6" strokeWidth="5" fill="none">
            <path d="M100,60 L100,470" />
            <path d="M300,40 L300,490" />
            <path d="M470,30 L470,500" />
            <path d="M650,40 L650,490" />
            <path d="M40,150 L870,150" />
            <path d="M40,250 L870,250" />
            <path d="M40,360 L870,360" />
          </g>
          <g fill="#aab3ae" fontFamily="var(--font-barlow), sans-serif" fontSize="15" fontWeight="600" letterSpacing="2">
            <text x="196" y="212">GÓMEZ PALACIO</text>
            <text x="60" y="312">LERDO</text>
            <text x="508" y="272">TORREÓN</text>
            <text x="700" y="140">MATAMOROS</text>
          </g>
          {techs
            .filter((t) => !focusTech || focusTech === t.id)
            .map((t) => {
              const pts = assignedSvcs
                .filter((s) => s.tech === t.id)
                .sort((a, b) => a.start - b.start)
                .map((s) => proj(s.lat, s.lon));
              return (
                <path
                  key={t.id}
                  d={pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(0)},${p.y.toFixed(0)}`).join(" ")}
                  stroke={t.color}
                  strokeWidth={focusTech === t.id ? 4 : 2.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={focusTech && focusTech !== t.id ? 0.15 : 0.75}
                />
              );
            })}
        </svg>

        {assignedSvcs
          .filter((s) => !focusTech || s.tech === focusTech)
          .map((s) => {
            const t = techs.find((x) => x.id === s.tech)!;
            const p = proj(s.lat, s.lon);
            const on = s.id === sel;
            const order =
              assignedSvcs
                .filter((x) => x.tech === s.tech)
                .sort((a, b) => a.start - b.start)
                .findIndex((x) => x.id === s.id) + 1;
            return (
              <button
                key={s.id}
                onClick={() => onPick(s.id)}
                title={`${s.client} · ${fmt(s.start)}`}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[2.5px] border-white p-0 text-[11px] font-bold text-white shadow-[0_2px_6px_rgba(20,24,30,.3)]"
                style={{
                  left: `${((p.x / 900) * 100).toFixed(2)}%`,
                  top: `${((p.y / 520) * 100).toFixed(2)}%`,
                  width: on ? 30 : 24,
                  height: on ? 30 : 24,
                  background: t.color,
                }}
              >
                {order}
              </button>
            );
          })}

        {/* Posición en vivo del técnico (GPS) */}
        {techs
          .filter((t) => !focusTech || t.id === focusTech)
          .map((t) => {
            const live = liveTracking.find((l) => l.techId === t.id)!;
            const p = proj(live.lat, live.lon);
            return (
              <div
                key={`live-${t.id}`}
                title={`${t.name} · ${live.state} · ${live.detail} · ${live.lastPing}`}
                className="animate-pulse-ring absolute flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white text-[10.5px] font-bold text-white shadow-[0_2px_8px_rgba(20,24,30,.4)]"
                style={{
                  left: `${((p.x / 900) * 100).toFixed(2)}%`,
                  top: `${((p.y / 520) * 100).toFixed(2)}%`,
                  background: t.color,
                }}
              >
                {t.initials}
              </div>
            );
          })}

        <div className="absolute left-4 top-4 min-w-[210px] rounded-[11px] border border-line-2 bg-white/95 px-[14px] py-3">
          <div className="text-xs font-bold uppercase leading-none tracking-[.06em] text-ink-6">
            {focus ? "Ruta seleccionada" : "Todas las rutas"}
          </div>
          <div className="mt-[7px] text-sm font-semibold leading-[1.3]">
            {focus ? `${focus.name} · ${focus.zone}` : "La Laguna · 6 unidades activas"}
          </div>
          <div className="mt-[10px] flex gap-[14px]">
            {stats.map((s) => (
              <div key={s.k}>
                <div className="font-cond text-lg font-bold leading-none">{s.v}</div>
                <div className="text-[10px] font-medium uppercase leading-[1.2] tracking-[.05em] text-ink-7">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col gap-[6px] rounded-[11px] border border-line-2 bg-white/95 px-3 py-[10px]">
          {techs.map((t) => (
            <span key={t.id} className="flex items-center gap-[7px] text-[11.5px] font-medium leading-none text-ink-3">
              <i className="block h-[9px] w-[9px] rounded-full" style={{ background: t.color }} />
              {t.name.split(" ")[0]} · {t.unit}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
