"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { services, techs } from "@/lib/data";
import type { Service } from "@/lib/data";
import { AppSwitcher, Avatar } from "@/components/ui";
import { AgendaView } from "@/components/ops/AgendaView";
import { RutasView } from "@/components/ops/RutasView";
import { FlotaView } from "@/components/ops/FlotaView";
import { ReportesView } from "@/components/ops/ReportesView";
import { BitacoraView } from "@/components/ops/BitacoraView";
import { InventarioView } from "@/components/ops/InventarioView";
import { SemanaView } from "@/components/ops/SemanaView";
import { EstacionesView } from "@/components/ops/EstacionesView";
import { SeguimientoView } from "@/components/ops/SeguimientoView";
import { AlmacenView } from "@/components/ops/AlmacenView";
import { ExpedientesView } from "@/components/ops/ExpedientesView";
import { contracts, expedientes, warehouseStock } from "@/lib/data";

export type Section =
  | "agenda"
  | "semana"
  | "expedientes"
  | "seguimiento"
  | "rutas"
  | "estaciones"
  | "bitacora"
  | "inventario"
  | "almacen"
  | "flota"
  | "reportes";

export default function OperacionesPage() {
  const [section, setSection] = useState<Section>("agenda");
  const [sel, setSel] = useState("s3");
  const [assigned, setAssigned] = useState<Record<string, string>>({});
  const [focusTech, setFocusTech] = useState<string | null>(null);

  const all: Service[] = useMemo(
    () =>
      services.map((s) => ({
        ...s,
        tech: assigned[s.id] !== undefined ? assigned[s.id] : s.tech,
      })),
    [assigned],
  );

  const assignedSvcs = all.filter((s) => s.tech);
  const pendingSvcs = all.filter((s) => !s.tech);
  const activeTechs = new Set(assignedSvcs.map((s) => s.tech as string));
  const selService = all.find((s) => s.id === sel) ?? all[0];

  const assign = (id: string, techId: string) =>
    setAssigned((a) => ({ ...a, [id]: techId }));

  const autoAssign = () =>
    setAssigned((a) => {
      const next = { ...a };
      services.filter((s) => !s.tech && s.sug).forEach((s) => {
        next[s.id] = s.sug as string;
      });
      return next;
    });

  const goDetail = (id: string) => {
    setSel(id);
    setSection("agenda");
  };

  const followUp = contracts.filter((c) => c.state === "Por programar" || c.state === "Vencido").length;
  const lowStock = warehouseStock.filter((w) => w.stock < w.min).length;

  const nav: { id: Section; label: string; badge: string }[] = [
    { id: "agenda", label: "Programación", badge: String(all.length) },
    { id: "semana", label: "Semana", badge: "" },
    { id: "expedientes", label: "Expedientes", badge: String(expedientes.length) },
    { id: "seguimiento", label: "Seguimiento", badge: followUp ? String(followUp) : "" },
    { id: "rutas", label: "Rutas y mapa", badge: String(activeTechs.size) },
    { id: "estaciones", label: "Estaciones", badge: "" },
    { id: "bitacora", label: "Bitácora diaria", badge: "" },
    { id: "inventario", label: "Inventario", badge: "" },
    { id: "almacen", label: "Almacén", badge: lowStock ? String(lowStock) : "" },
    { id: "flota", label: "Flota", badge: "" },
    { id: "reportes", label: "Reportes", badge: "" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-[60px] items-center gap-6 border-b border-line bg-white px-5">
        <Image src="/corma-logo.png" alt="CORMA" width={150} height={34} className="h-[34px] w-auto" priority />
        <div className="h-[26px] w-px bg-line-2" />
        <div className="flex flex-col gap-[1px]">
          <span className="text-sm font-semibold leading-none tracking-[.01em]">Panel de Operaciones</span>
          <span className="text-[11px] font-medium uppercase leading-none tracking-[.06em] text-ink-6">
            Comarca Lagunera
          </span>
        </div>
        <div className="ml-3">
          <AppSwitcher active="/operaciones" />
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-[10px] rounded-full border border-[#e4e7eb] bg-[#f6f7f9] py-[5px] pl-[6px] pr-3">
          <Avatar color="#cb2027" initials="RG" size={26} />
          <div className="flex flex-col">
            <span className="text-xs font-semibold leading-[1.2]">Roberto G.</span>
            <span className="text-[10px] font-medium leading-[1.2] text-ink-6">Coordinador</span>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex min-h-0 min-w-[1280px] flex-1">
          <nav className="flex w-[216px] flex-none flex-col gap-[2px] border-r border-line bg-white px-[10px] py-[14px]">
            <span className="px-[10px] pb-2 pt-[6px] text-[10px] font-semibold uppercase leading-none tracking-[.1em] text-ink-8">
              Operación
            </span>
            {nav.map((n) => {
              const on = section === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setSection(n.id)}
                  className={`flex h-9 w-full cursor-pointer items-center gap-[9px] rounded-lg px-[10px] text-[13px] font-semibold ${
                    on ? "bg-brand-bg text-brand" : "text-ink-3"
                  }`}
                >
                  <span
                    className="block h-[6px] w-[6px] rounded-full"
                    style={{ background: on ? "#cb2027" : "#c8ccd2" }}
                  />
                  <span className="flex-1 text-left">{n.label}</span>
                  {n.badge && (
                    <span className={`text-[10.5px] font-bold leading-none ${on ? "text-brand" : "text-ink-8"}`}>
                      {n.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="flex-1" />
            <div className="mx-1 rounded-[10px] border border-[#f2dcdd] bg-[#fbf3f3] p-3">
              <div className="mb-[6px] text-[11px] font-bold uppercase leading-none tracking-[.06em] text-brand">
                Alertas
              </div>
              <div className="text-xs font-medium leading-[1.45] text-ink-3">
                Unidad 09 con verificación vencida el 30 de agosto · 1 servicio industrial sin confirmar.
              </div>
            </div>
            <div className="mx-1 mt-[10px] text-[10px] font-medium leading-normal text-[#aeb4bd]">
              CORMA · Gómez Palacio, Dgo.
            </div>
          </nav>

          <main className="flex min-w-0 flex-1 flex-col">
            {section === "agenda" && (
              <AgendaView
                all={all}
                pendingSvcs={pendingSvcs}
                assignedSvcs={assignedSvcs}
                sel={selService}
                onSelect={setSel}
                onAssign={assign}
                onAutoAssign={autoAssign}
              />
            )}
            {section === "rutas" && (
              <RutasView
                assignedSvcs={assignedSvcs}
                sel={sel}
                focusTech={focusTech}
                onFocus={(id) => setFocusTech((f) => (f === id ? null : id))}
                onPick={goDetail}
              />
            )}
            {section === "semana" && <SemanaView />}
            {section === "expedientes" && <ExpedientesView />}
            {section === "seguimiento" && <SeguimientoView />}
            {section === "estaciones" && <EstacionesView />}
            {section === "almacen" && <AlmacenView />}
            {section === "bitacora" && <BitacoraView />}
            {section === "inventario" && <InventarioView />}
            {section === "flota" && <FlotaView />}
            {section === "reportes" && <ReportesView />}
          </main>
        </div>
      </div>
    </div>
  );
}
