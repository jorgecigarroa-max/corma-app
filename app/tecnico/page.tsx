"use client";

import { useState } from "react";
import Image from "next/image";
import {
  checksFor,
  checkupSections,
  companyCredentials,
  dayLogs,
  fleetData,
  fmt,
  services,
  surveyFor,
  surveySuggestions,
  techCredentials,
  techProducts,
  typeColor,
  unitInventories,
  workOrderFor,
} from "@/lib/data";
import { PhoneFrame, Pill, StatusPill } from "@/components/ui";

type Screen = "lista" | "checkup" | "detalle" | "cam" | "survey" | "cert";

// ——— Evidencia verificable (C-06): cada foto nace con folio y sello de integridad ———
interface EvPhoto {
  id: string;
  tag: "ANTES" | "DESPUÉS";
  label: string;
  time: string; // hh:mm:ss del sello
  grad: string;
  code: string; // folio de evidencia
  hash: string; // sello de integridad (SHA-256 en producción)
}

const hexBlock = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
const makeHash = () => Array.from({ length: 4 }, hexBlock).join(":");

const initialPhotos: EvPhoto[] = [
  { id: "ev1", tag: "ANTES", label: "Estación 3 · perímetro", time: "11:41:07", grad: "from-[#dfe4e8] to-[#c9d0d6]", code: "EV-8841", hash: "3f2a:91cc:07de:5ab1" },
  { id: "ev2", tag: "DESPUÉS", label: "Bodega · est. de cebo", time: "12:47:12", grad: "from-[#e2e6df] to-[#ccd3ca]", code: "EV-8842", hash: "b7d4:2e08:c913:44af" },
];
type Tab = "hoy" | "ruta" | "inv" | "perfil";

const ME = "t3"; // Ana Delgado · Unidad 02
const myStops = services.filter((s) => s.tech === ME);
const myUnit = fleetData[2];
const myLog = dayLogs.find((d) => d.techId === ME)!;
const myInv = unitInventories.find((u) => u.techId === ME)!;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 mt-5 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
      {children}
    </div>
  );
}

export default function TecnicoPage() {
  const [tab, setTab] = useState<Tab>("hoy");
  const [screen, setScreen] = useState<Screen>("lista");
  const [selId, setSelId] = useState("s3");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [arrived, setArrived] = useState(false);
  const [started, setStarted] = useState(false);
  const [physical, setPhysical] = useState<Record<number, string>>({});
  const [checkup, setCheckup] = useState<Record<string, boolean>>({});
  const [checkupDone, setCheckupDone] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<EvPhoto[]>(initialPhotos);
  const [verifyId, setVerifyId] = useState<string | null>(null);

  const sel = myStops.find((s) => s.id === selId) ?? myStops[0];
  const checks = checksFor(sel.type);
  const order = workOrderFor(sel);
  const survey = surveyFor(sel.type);
  const checkupTotal = checkupSections.reduce((a, s) => a + s.items.length, 0);
  const checkupCount = Object.values(checkup).filter(Boolean).length;
  const surveyComplete = survey.every((_, i) => answers[i] !== undefined);

  const resetService = () => {
    setChecked({});
    setArrived(false);
    setStarted(false);
    setAnswers({});
    setNotes("");
    setPhotos(initialPhotos);
    setVerifyId(null);
  };

  const capturePhoto = () => {
    const now = new Date().toLocaleTimeString("es-MX", { hour12: false });
    const p: EvPhoto = {
      id: `ev${Date.now()}`,
      tag: started ? "DESPUÉS" : "ANTES",
      label: `Área tratada · captura ${photos.length + 1}`,
      time: now,
      grad: photos.length % 2 ? "from-[#dfe4e8] to-[#c9d0d6]" : "from-[#e2e6df] to-[#ccd3ca]",
      code: `EV-${8841 + photos.length}`,
      hash: makeHash(),
    };
    setPhotos((prev) => [...prev, p]);
    setVerifyId(p.id); // muestra de inmediato que la foto nació verificable
    setScreen("detalle");
  };

  const verifyPhoto = photos.find((p) => p.id === verifyId) ?? null;

  const back = () => {
    setScreen("lista");
    resetService();
  };

  const openStop = (id: string) => {
    setSelId(id);
    resetService();
    setScreen("detalle");
  };

  const goTab = (t: Tab) => {
    setTab(t);
    if (t === "hoy") back();
  };

  return (
    <PhoneFrame active="/tecnico" statusBar="light">
      {/* ——— HOY · Mi día ——— */}
      {tab === "hoy" && screen === "lista" && (
        <div className="flex-1 overflow-auto px-4 pb-5 pt-[6px]">
          <div className="mb-[14px] flex items-center gap-[10px] pt-2 md:pt-0">
            <Image src="/corma-logo.png" alt="CORMA" width={97} height={22} className="h-[22px] w-auto" />
            <div className="flex-1" />
            <span className="text-[11px] font-semibold uppercase leading-none tracking-[.06em] text-ink-6">
              Mié 12 ago
            </span>
          </div>
          <div className="rounded-2xl bg-ink px-4 py-[15px] text-white">
            <div className="text-[11px] font-medium uppercase leading-none tracking-[.08em] opacity-60">Tu día</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-cond text-[34px] font-bold leading-none">2/4</span>
              <span className="text-[12.5px] font-medium opacity-70">servicios · 41 km ruta</span>
            </div>
            <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-1/2 rounded-full bg-brand" />
            </div>
            <div className="mt-3 flex items-center gap-[7px] border-t border-white/10 pt-3">
              <span className="block h-[7px] w-[7px] rounded-full bg-[#4cd08a]" />
              <span className="text-[11.5px] font-medium leading-none opacity-80">
                GPS activo · {myUnit.tech.unit} · placas {myUnit.plate}
              </span>
            </div>
          </div>
          <button
            onClick={() => setScreen("checkup")}
            className={`mt-[10px] flex w-full cursor-pointer items-center gap-[10px] rounded-[14px] p-3 text-left ${
              checkupDone ? "border border-ok-border bg-ok-soft" : "border border-[#f5d4d6] bg-brand-bg"
            }`}
          >
            <span
              className={`flex h-9 w-9 flex-none items-center justify-center rounded-[10px] text-base font-bold text-white ${
                checkupDone ? "bg-ok" : "bg-brand"
              }`}
            >
              {checkupDone ? "✓" : "!"}
            </span>
            <span className="flex-1">
              <span className={`block text-[13.5px] font-bold leading-[1.2] ${checkupDone ? "text-ok" : "text-brand"}`}>
                {checkupDone ? "Check-up de salida completado · 7:02" : "Check-up de salida pendiente"}
              </span>
              <span className="mt-[2px] block text-[11.5px] font-medium leading-[1.35] text-ink-4">
                {checkupDone
                  ? "Herramienta, producto, EPP y documentos verificados. Listo para salir."
                  : `Verifica herramienta, producto, EPP y documentos antes de salir (${checkupCount}/${checkupTotal})`}
              </span>
            </span>
            <span className="text-[15px] text-ink-7">›</span>
          </button>
          <div className="mb-[9px] mt-[18px] text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
            Siguiente parada
          </div>
          {myStops.map((s) => (
            <button
              key={s.id}
              onClick={() => openStop(s.id)}
              className="mb-[9px] block w-full cursor-pointer rounded-[14px] bg-white p-3 text-left"
              style={{ border: `1px solid ${s.id === selId ? "#cb2027" : "#e9ecef"}` }}
            >
              <div className="flex items-center gap-[10px]">
                <div className="w-[46px] flex-none border-r border-[#eef0f3] pr-2 text-center font-cond text-[13px] font-bold leading-[1.2] text-ink-2">
                  {fmt(s.start)}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-sm font-bold leading-[1.2]">{s.client}</div>
                  <div className="mt-[2px] text-[11.5px] font-medium leading-[1.35] text-ink-6">{s.addr}</div>
                </div>
                <StatusPill status={s.status} />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ——— HOY · Check-up de salida ——— */}
      {tab === "hoy" && screen === "checkup" && (
        <div className="flex-1 overflow-auto px-4 pb-6 pt-[6px]">
          <button
            onClick={() => setScreen("lista")}
            className="cursor-pointer py-[6px] text-[13px] font-semibold text-brand"
          >
            ‹ Mi día
          </button>
          <h1 className="mb-1 mt-[2px] text-[23px] font-bold leading-[1.15]">Check-up de salida</h1>
          <p className="mb-3 text-[12.5px] font-medium leading-[1.45] text-ink-5">
            Armado según tus {myStops.length} órdenes de hoy. Verifica todo antes de salir para no regresar a base.
          </p>
          {checkupSections.map((sec, si) => (
            <div key={sec.title}>
              <SectionLabel>{sec.title}</SectionLabel>
              {sec.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                const on = !!checkup[key];
                return (
                  <button
                    key={key}
                    onClick={() => setCheckup((p) => ({ ...p, [key]: !p[key] }))}
                    className="mb-2 flex w-full cursor-pointer items-center gap-[11px] rounded-[13px] p-3 text-left"
                    style={{
                      border: `1px solid ${on ? "#cfe6da" : "#e9ecef"}`,
                      background: on ? "#f4fbf7" : "#fff",
                    }}
                  >
                    <span
                      className={`flex h-[22px] w-[22px] flex-none items-center justify-center rounded-[7px] text-xs font-bold ${
                        on ? "bg-ok text-white" : "border-[1.5px] border-[#d4d9df] text-transparent"
                      }`}
                    >
                      {on ? "✓" : ""}
                    </span>
                    <span className="flex-1 text-[13px] font-semibold leading-[1.25] text-ink">{item.label}</span>
                    <span className="text-[10.5px] font-medium leading-none text-ink-7">{item.note}</span>
                  </button>
                );
              })}
            </div>
          ))}
          <button
            onClick={() => {
              if (checkupCount === checkupTotal) {
                setCheckupDone(true);
                setScreen("lista");
              }
            }}
            className={`mt-4 h-12 w-full rounded-xl text-sm font-bold text-white ${
              checkupCount === checkupTotal ? "cursor-pointer bg-ok" : "cursor-default bg-ink/35"
            }`}
          >
            {checkupCount === checkupTotal
              ? "Confirmar salida de base"
              : `Faltan ${checkupTotal - checkupCount} puntos por verificar`}
          </button>
        </div>
      )}

      {/* ——— HOY · Orden de servicio ——— */}
      {tab === "hoy" && screen === "detalle" && (
        <div className="flex-1 overflow-auto px-4 pb-6 pt-[6px]">
          <button onClick={back} className="cursor-pointer py-[6px] text-[13px] font-semibold text-brand">
            ‹ Mi día
          </button>
          <div className="mt-[6px] flex items-center gap-2">
            <Pill bg="#eef0f3" fg={typeColor[sel.type]}>
              {sel.type}
            </Pill>
            <span className="text-[11px] font-medium leading-none text-ink-7">{sel.folio}</span>
            <div className="flex-1" />
            <span className="text-[11px] font-medium leading-none text-ink-7">
              Ventana {fmt(sel.start)}–{fmt(sel.start + sel.dur)}
            </span>
          </div>
          <h2 className="mb-[3px] mt-[9px] text-[21px] font-bold leading-[1.15]">{sel.client}</h2>
          <p className="text-[12.5px] font-medium leading-[1.45] text-ink-5">{sel.addr}</p>

          {/* Orden de trabajo */}
          <SectionLabel>Orden de trabajo</SectionLabel>
          <div className="rounded-xl border border-line-3 bg-white px-[13px] py-3">
            <div className="flex items-center gap-[10px] border-b border-line-5 pb-[10px]">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-soft text-[13px] font-bold text-ink-3">
                {order.contact.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold leading-[1.2]">Visitas a: {order.contact}</div>
                <div className="text-[11px] font-medium leading-[1.3] text-ink-7">
                  {order.contactRole} · {order.phone}
                </div>
              </div>
              <button className="h-[30px] cursor-pointer rounded-lg border border-line-2 bg-white px-3 text-xs font-semibold text-ink-2">
                Llamar
              </button>
            </div>
            <div className="pt-[10px]">
              {order.scope.map((t, i) => (
                <div key={t} className="flex gap-[9px] py-[5px]">
                  <span className="mt-[1px] h-[18px] w-[18px] flex-none rounded-md bg-brand-bg text-center text-[10.5px] font-bold leading-[18px] text-brand">
                    {i + 1}
                  </span>
                  <span className="text-[12.5px] font-medium leading-[1.4] text-ink-2">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-line-3 bg-white px-[13px] py-[11px]">
              <div className="text-[10px] font-semibold uppercase leading-none tracking-[.07em] text-ink-8">
                Equipo de aplicación
              </div>
              <div className="mt-2 flex flex-wrap gap-[5px]">
                {order.equipment.map((e) => (
                  <span key={e} className="rounded-md bg-soft px-2 py-1 text-[10.5px] font-semibold leading-[1.3] text-ink-3">
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line-3 bg-white px-[13px] py-[11px]">
              <div className="text-[10px] font-semibold uppercase leading-none tracking-[.07em] text-ink-8">
                Equipo de seguridad
              </div>
              <div className="mt-2 flex flex-wrap gap-[5px]">
                {order.ppe.map((e) => (
                  <span key={e} className="rounded-md bg-[#fff3e0] px-2 py-1 text-[10.5px] font-semibold leading-[1.3] text-warn">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-[10px] rounded-xl border border-line-3 bg-white px-[13px] py-[11px]">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-[9px] bg-soft text-[15px]">🚐</span>
            <div className="flex-1">
              <div className="text-[12.5px] font-semibold leading-[1.2]">
                {myUnit.tech.unit} · placas {myUnit.plate}
              </div>
              <div className="text-[11px] font-medium leading-[1.3] text-ink-7">{myUnit.model}</div>
            </div>
            <span className="text-[11px] font-semibold leading-none text-ok">Verificación vigente</span>
          </div>

          {/* Flujo: llegada → inicio → cierre */}
          <SectionLabel>Registro GPS y tiempos</SectionLabel>
          <div className="flex gap-2">
            <button
              onClick={() => setArrived((v) => !v)}
              className={`h-10 flex-1 cursor-pointer rounded-[10px] text-[13px] font-bold ${
                arrived ? "bg-ok-bg text-ok" : "bg-brand text-white"
              }`}
            >
              {arrived ? "✓ Llegada 11:32 · GPS ok" : "Check-in de llegada (GPS)"}
            </button>
            <button className="h-10 cursor-pointer rounded-[10px] border border-line-2 bg-white px-[14px] text-[13px] font-semibold text-ink-2">
              Navegar
            </button>
          </div>
          {arrived && !started && (
            <button
              onClick={() => setStarted(true)}
              className="mt-2 h-11 w-full cursor-pointer rounded-[10px] bg-ink text-[13.5px] font-bold text-white"
            >
              ▶ Iniciar servicio
            </button>
          )}
          <div className="mt-2 rounded-xl border border-line-3 bg-white px-[13px] py-[6px]">
            {[
              { k: "Llegada a sitio", v: arrived ? "11:32 · 25.5541, -103.4842" : "—", on: arrived },
              { k: "Inicio de servicio", v: started ? "11:38 · orden abierta" : "—", on: started },
              { k: "Tiempo en servicio", v: started ? "00:42 h corriendo" : "—", on: started },
              { k: "Check-out", v: "— al cerrar con cuestionario", on: false },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between border-b border-line-5 py-[7px] last:border-0">
                <span className="text-xs font-medium leading-none text-ink-6">{r.k}</span>
                <span className={`text-xs font-semibold leading-none ${r.on ? "text-ok" : "text-ink-7"}`}>{r.v}</span>
              </div>
            ))}
          </div>

          <SectionLabel>Estaciones y puntos de control</SectionLabel>
          {checks.map((c, i) => {
            const on = !!checked[i];
            return (
              <button
                key={c.label}
                onClick={() => started && setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
                className={`mb-2 flex w-full items-start gap-[11px] rounded-[13px] p-3 text-left ${
                  started ? "cursor-pointer" : "cursor-default opacity-60"
                }`}
                style={{
                  border: `1px solid ${on ? "#cfe6da" : "#e9ecef"}`,
                  background: on ? "#f4fbf7" : "#fff",
                }}
              >
                <span
                  className={`flex h-[22px] w-[22px] flex-none items-center justify-center rounded-[7px] text-xs font-bold ${
                    on ? "bg-ok text-white" : "border-[1.5px] border-[#d4d9df] text-transparent"
                  }`}
                >
                  {on ? "✓" : ""}
                </span>
                <span className="flex-1 text-left">
                  <span className="block text-[13px] font-semibold leading-[1.25] text-ink">{c.label}</span>
                  <span className="mt-[2px] block text-[11px] font-medium leading-[1.3] text-ink-7">{c.note}</span>
                </span>
              </button>
            );
          })}
          {!started && (
            <div className="rounded-[10px] bg-soft px-3 py-2 text-[11.5px] font-medium leading-[1.4] text-ink-5">
              Inicia el servicio para habilitar los puntos de control.
            </div>
          )}

          <SectionLabel>Producto aplicado</SectionLabel>
          <div className="rounded-xl border border-line-3 bg-white px-[13px] py-3">
            {techProducts.map((p) => (
              <div key={p.name} className="flex items-center gap-[9px] py-[6px]">
                <span className="flex-1 text-[12.5px] font-semibold leading-[1.25]">{p.name}</span>
                <span className="text-xs font-medium leading-none text-ink-5">{p.dose}</span>
              </div>
            ))}
            <button className="mt-[6px] h-[34px] w-full cursor-pointer rounded-[9px] border border-dashed border-[#d4d9df] bg-soft-3 text-xs font-semibold text-ink-5">
              + Agregar producto
            </button>
          </div>

          <SectionLabel>Evidencia del trabajo (CAM sellada)</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {photos.map((p) => (
              <button
                key={p.id}
                onClick={() => setVerifyId((v) => (v === p.id ? null : p.id))}
                className={`relative h-[148px] cursor-pointer overflow-hidden rounded-[11px] bg-gradient-to-br text-left ${p.grad}`}
                style={{ outline: verifyId === p.id ? "2px solid #cb2027" : "none", outlineOffset: 1 }}
              >
                <span className="absolute right-[6px] top-[6px] rounded bg-white/85 px-[5px] py-[2px] text-[9px] font-bold text-ink-4">
                  {p.tag}
                </span>
                <div className="p-[7px] text-[10.5px] font-semibold text-ink-3">{p.label}</div>
                {/* Sello tipo Timemark: hora grande + fecha, ubicación y GPS, verificado CORMA */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111417]/85 via-[#111417]/60 to-transparent px-2 pb-[6px] pt-5">
                  <div className="flex items-end gap-[6px]">
                    <span className="border-l-[3px] border-[#f5b50a] pl-[6px] font-cond text-[21px] font-bold leading-none text-white">
                      {p.time.slice(0, 5)}
                    </span>
                    <span className="pb-[1px] text-[9px] font-semibold leading-[1.3] text-white/90">
                      12 ago
                      <br />
                      2026
                    </span>
                  </div>
                  <div className="mt-[4px] text-[8.5px] font-semibold leading-[1.35] text-white/90">
                    Calz. Lázaro Cárdenas 730, Gómez Palacio
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-cond text-[8.5px] font-medium leading-[1.35] text-white/75">
                      25.5541, -103.4842 · ±4 m
                    </span>
                    <span className="flex items-center gap-[3px] rounded-[3px] bg-brand px-[4px] py-[2px] text-[7.5px] font-bold uppercase leading-none tracking-[.03em] text-white">
                      ✓ {p.code}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-[6px] text-center text-[10px] font-medium leading-none text-ink-7">
            Toca una foto para verificar su sello
          </div>

          {verifyPhoto && (
            <div className="mt-2 rounded-[12px] border border-ok-border bg-ok-soft p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ok text-[12px] font-bold text-white">✓</span>
                <span className="flex-1 text-[12.5px] font-bold leading-[1.2] text-[#1f6b47]">
                  Evidencia {verifyPhoto.code} · sello íntegro
                </span>
              </div>
              {[
                ["Orden", `${sel.folio} · ${sel.client}`],
                ["Capturada", `12 ago 2026 · ${verifyPhoto.time} · Ana Delgado (Unidad 02)`],
                ["GPS", "25.5541, -103.4842 · ±4 m — coincide con el sitio ✓"],
                ["Sello de integridad", verifyPhoto.hash],
                ["Origen", "CAM CORMA · sin galería, sin edición"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-ok-border py-[5px] text-[11px] last:border-0">
                  <span className="flex-none font-medium text-ink-6">{k}</span>
                  <span className="text-right font-semibold text-ink-2">{v}</span>
                </div>
              ))}
              <div className="mt-2 text-[10px] font-medium leading-[1.4] text-ink-6">
                Cualquier cambio a la imagen rompe el sello y la foto se marca como no confiable. En producción, el
                certificado lleva un QR para que el cliente o un auditor haga esta misma verificación.
              </div>
            </div>
          )}

          <button
            onClick={() => setScreen("cam")}
            className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[11px] border border-dashed border-[#d4d9df] bg-white text-[12.5px] font-semibold text-ink-4"
          >
            📷 Tomar foto con sello GPS + hora
          </button>
          <div className="mt-2 rounded-[10px] bg-soft-3 px-3 py-2 text-[11px] font-medium leading-[1.4] text-ink-6">
            Cámara integrada (sustituye la app externa de sello): cada foto nace con folio, hora, dirección, GPS y
            sello de integridad, ligada a la orden y verificable desde la app. Sin galería. Mínimo 1 antes y 1
            después por área tratada
            {(sel.type === "Industrial" || sel.type === "Agropecuario") && "; en sitios BPP la evidencia es parte del entregable"}
            .
          </div>

          <SectionLabel>Firma del cliente</SectionLabel>
          <div className="flex h-[92px] items-center justify-center rounded-xl border border-dashed border-[#d4d9df] bg-white">
            <svg viewBox="0 0 220 60" className="h-[52px] w-[180px]">
              <path
                d="M12 44 C 34 8, 46 52, 66 30 S 96 6, 112 34 S 142 52, 158 22 S 190 12, 206 32"
                fill="none"
                stroke="#23262b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <button
            onClick={() => started && setScreen("survey")}
            className={`mt-5 h-12 w-full rounded-xl text-sm font-bold text-white ${
              started ? "cursor-pointer bg-ink" : "cursor-default bg-ink/40"
            }`}
          >
            Check-out · cuestionario y certificado
          </button>
        </div>
      )}

      {/* ——— HOY · Cámara sellada (simulación) ——— */}
      {tab === "hoy" && screen === "cam" && (
        <div className="flex flex-1 flex-col bg-[#0c0e10]">
          <div className="flex items-center px-4 pb-2 pt-3">
            <button onClick={() => setScreen("detalle")} className="cursor-pointer text-[13px] font-semibold text-white/80">
              ✕ Cancelar
            </button>
            <div className="flex-1 text-center text-[12px] font-bold uppercase tracking-[.06em] text-white/90">
              CAM sellada · {sel.folio}
            </div>
            <span className="w-[64px] text-right text-[10px] font-semibold text-[#4cd08a]">● GPS fijo</span>
          </div>

          {/* Visor */}
          <div className="relative mx-3 flex-1 overflow-hidden rounded-[14px] bg-gradient-to-br from-[#2a2f34] to-[#171a1d]">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }, (_, i) => (
                <span key={i} className="border border-white/[0.06]" />
              ))}
            </div>
            <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40" />
            {/* Previsualización del sello en vivo */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-6">
              <div className="flex items-end gap-2">
                <span className="border-l-4 border-[#f5b50a] pl-2 font-cond text-[26px] font-bold leading-none text-white">
                  {new Date().toLocaleTimeString("es-MX", { hour12: false }).slice(0, 5)}
                </span>
                <span className="pb-[1px] text-[10px] font-semibold leading-[1.3] text-white/90">
                  12 ago
                  <br />
                  2026
                </span>
              </div>
              <div className="mt-1 text-[10px] font-semibold text-white/90">{sel.addr}</div>
              <div className="flex items-center justify-between">
                <span className="font-cond text-[10px] text-white/70">25.5541, -103.4842 · ±4 m</span>
                <span className="rounded-[3px] bg-brand px-[5px] py-[2px] text-[8px] font-bold uppercase text-white">
                  Sello CORMA
                </span>
              </div>
            </div>
          </div>

          {/* Obturador */}
          <div className="flex flex-col items-center gap-2 py-4">
            <button
              onClick={capturePhoto}
              className="flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full border-4 border-white/90 bg-transparent"
            >
              <span className="block h-[46px] w-[46px] rounded-full bg-white" />
            </button>
            <span className="px-6 text-center text-[10px] font-medium leading-[1.4] text-white/50">
              El sello y el folio se graban en la imagen al capturar · galería deshabilitada
            </span>
          </div>
        </div>
      )}

      {/* ——— HOY · Cuestionario post-servicio ——— */}
      {tab === "hoy" && screen === "survey" && (
        <div className="flex-1 overflow-auto px-4 pb-6 pt-[6px]">
          <button
            onClick={() => setScreen("detalle")}
            className="cursor-pointer py-[6px] text-[13px] font-semibold text-brand"
          >
            ‹ Orden de servicio
          </button>
          <h1 className="mb-1 mt-[2px] text-[22px] font-bold leading-[1.15]">Cuestionario post-servicio</h1>
          <p className="mb-3 text-[12.5px] font-medium leading-[1.45] text-ink-5">
            {sel.client} · protocolo{" "}
            {sel.type === "Industrial" || sel.type === "Agropecuario"
              ? "normativo (BPP)"
              : sel.type === "Residencial"
                ? "residencial"
                : "estándar"}{" "}
            · check-out 12:58
          </p>
          {survey.map((q, qi) => (
            <div key={q.q} className="mb-3 rounded-[13px] border border-line-3 bg-white p-3">
              <div className="mb-2 text-[13px] font-bold leading-[1.3]">
                {qi + 1}. {q.q}
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {q.options.map((o, oi) => {
                  const on = answers[qi] === oi;
                  return (
                    <button
                      key={o.label}
                      onClick={() => setAnswers((p) => ({ ...p, [qi]: oi }))}
                      className="cursor-pointer rounded-[9px] px-[11px] py-[7px] text-[12px] font-semibold leading-[1.2]"
                      style={{
                        border: `1px solid ${on ? "#cb2027" : "#e2e5ea"}`,
                        background: on ? "#fdeced" : "#fff",
                        color: on ? "#cb2027" : "#5c6169",
                      }}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {surveyComplete && (
            <div className="mb-3 rounded-[13px] border border-ok-border bg-ok-soft p-3">
              <div className="mb-1 text-[11px] font-bold uppercase leading-none tracking-[.07em] text-ok">
                Sugerencia post-trabajo (según protocolo)
              </div>
              {surveySuggestions(sel.type, answers).map((s) => (
                <div key={s} className="flex gap-[7px] py-[3px]">
                  <span className="text-[12px] leading-[1.4] text-ok">▸</span>
                  <span className="text-[12.5px] font-medium leading-[1.4] text-[#1f6b47]">{s}</span>
                </div>
              ))}
            </div>
          )}

          <SectionLabel>Notas específicas (opcional)</SectionLabel>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observaciones adicionales del técnico…"
            rows={3}
            className="w-full rounded-[12px] border border-line-2 bg-white p-3 text-[13px] font-medium leading-[1.45] outline-none focus:border-brand"
          />

          <button
            onClick={() => surveyComplete && setScreen("cert")}
            className={`mt-3 h-12 w-full rounded-xl text-sm font-bold text-white ${
              surveyComplete ? "cursor-pointer bg-ink" : "cursor-default bg-ink/35"
            }`}
          >
            {surveyComplete ? "Cerrar servicio y generar certificado" : "Responde todas las preguntas"}
          </button>
        </div>
      )}

      {/* ——— HOY · Certificado ——— */}
      {tab === "hoy" && screen === "cert" && (
        <div className="flex flex-1 flex-col items-center overflow-auto px-[18px] pb-6 pt-5 text-center">
          <div className="mt-[22px] h-[62px] w-[62px] rounded-full bg-ok-bg text-[28px] font-bold leading-[62px] text-ok">
            ✓
          </div>
          <h2 className="mb-[6px] mt-4 text-[21px] font-bold leading-[1.2]">Servicio cerrado</h2>
          <p className="text-[13px] font-medium leading-normal text-ink-5">
            Certificado CRM-2026-0841 generado y enviado a {sel.client}.
          </p>
          <div className="mt-[18px] w-full rounded-[14px] border border-line-3 bg-white px-[15px] py-[14px] text-left">
            {[
              ["Folio", sel.folio],
              ["Técnico", "Ana Delgado"],
              ["Check-in (GPS)", "11:32 · 25.5541, -103.4842"],
              ["Check-out", "12:58 · cuestionario aplicado"],
              ["Tiempo en servicio", "1 h 20 min"],
              ["Producto", "Cipermetrina 10% EC"],
              ["Evidencia", `${photos.length} fotos selladas · folios verificables`],
              ["Próximo servicio", "9 de septiembre"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-line-5 py-[7px]">
                <span className="text-xs font-medium leading-none text-ink-6">{k}</span>
                <span className="text-right text-xs font-semibold leading-[1.3]">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 w-full rounded-[14px] border border-ok-border bg-ok-soft px-[15px] py-3 text-left">
            <div className="mb-1 text-[10.5px] font-bold uppercase leading-none tracking-[.07em] text-ok">
              Sugerencia post-trabajo incluida en el certificado
            </div>
            {surveySuggestions(sel.type, answers).map((s) => (
              <div key={s} className="py-[2px] text-[12px] font-medium leading-[1.4] text-[#1f6b47]">
                ▸ {s}
              </div>
            ))}
            {notes && (
              <div className="mt-1 border-t border-ok-border pt-[6px] text-[11.5px] font-medium leading-[1.4] text-ink-4">
                Notas del técnico: {notes}
              </div>
            )}
          </div>
          <button
            onClick={back}
            className="mt-4 h-11 w-full cursor-pointer rounded-[11px] bg-brand text-sm font-bold text-white hover:bg-brand-dark"
          >
            Siguiente servicio
          </button>
        </div>
      )}

      {/* ——— RUTA · resumen del día de la unidad ——— */}
      {tab === "ruta" && (
        <div className="flex-1 overflow-auto px-4 pb-6 pt-[6px]">
          <h1 className="mb-1 mt-2 text-[23px] font-bold leading-[1.15]">Mi ruta de hoy</h1>
          <p className="mb-3 text-[12.5px] font-medium leading-[1.4] text-ink-5">
            {myUnit.tech.unit} · placas {myUnit.plate} · Mié 12 ago
          </p>
          <div className="rounded-2xl bg-ink px-4 py-[15px] text-white">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="font-cond text-[24px] font-bold leading-none">{myLog.kmNow - myLog.kmStart}</div>
                <div className="mt-1 text-[10px] font-medium uppercase leading-[1.2] tracking-[.05em] opacity-60">
                  km hoy
                </div>
              </div>
              <div>
                <div className="font-cond text-[24px] font-bold leading-none">
                  {myLog.stops.filter((s) => s.done).length}/{myLog.stops.length}
                </div>
                <div className="mt-1 text-[10px] font-medium uppercase leading-[1.2] tracking-[.05em] opacity-60">
                  paradas
                </div>
              </div>
              <div>
                <div className="font-cond text-[24px] font-bold leading-none">
                  {Math.floor(myLog.stops.reduce((a, s) => a + s.onSiteMin, 0) / 60)}:
                  {String(myLog.stops.reduce((a, s) => a + s.onSiteMin, 0) % 60).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] font-medium uppercase leading-[1.2] tracking-[.05em] opacity-60">
                  h en sitio
                </div>
              </div>
            </div>
            <div className="mt-3 border-t border-white/10 pt-3 text-[11.5px] font-medium leading-none opacity-80">
              Salida de base {myLog.departBase} · regreso estimado {myLog.returnEta}
            </div>
          </div>
          <SectionLabel>Paradas y tiempos</SectionLabel>
          {myLog.stops.map((s, i) => (
            <div key={s.client} className="mb-2 rounded-[13px] border border-line-3 bg-white p-3">
              <div className="flex items-center gap-[9px]">
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-bold ${
                    s.done ? "bg-ok text-white" : "bg-soft text-ink-5"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex-1 text-[13px] font-bold leading-[1.2]">{s.client}</span>
                <span className="font-cond text-[13px] font-bold leading-none text-ink-4">{s.legKm} km</span>
              </div>
              <div className="mt-2 flex gap-3 pl-[33px] text-[11.5px] font-medium leading-none text-ink-6">
                <span>Llegada {s.arrive}</span>
                <span>Salida {s.depart}</span>
                {s.onSiteMin > 0 && <span className="text-ok">{s.onSiteMin} min en sitio</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ——— INVENTARIO · conciliación ——— */}
      {tab === "inv" && (
        <div className="flex-1 overflow-auto px-4 pb-6 pt-[6px]">
          <h1 className="mb-1 mt-2 text-[23px] font-bold leading-[1.15]">Inventario de unidad</h1>
          <p className="mb-3 text-[12.5px] font-medium leading-[1.4] text-ink-5">
            Salida de producto vs. sobrante · captura el físico al regresar a base
          </p>
          {myInv.items.map((item, i) => {
            const expected = +(item.out - item.used).toFixed(2);
            const captured = physical[i] !== undefined && physical[i] !== "";
            const phys = captured ? parseFloat(physical[i]) : null;
            const diff = phys !== null && !isNaN(phys) ? +(phys - expected).toFixed(2) : null;
            const ok = diff !== null && Math.abs(diff) < 0.01;
            return (
              <div key={item.name} className="mb-2 rounded-[13px] border border-line-3 bg-white p-3">
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-[13px] font-bold leading-[1.2]">{item.name}</span>
                  {diff === null ? (
                    <Pill bg="#eef0f3" fg="#6d737c">Pendiente</Pill>
                  ) : ok ? (
                    <Pill bg="#e8f5ee" fg="#1f7a4d">Conciliado</Pill>
                  ) : (
                    <Pill bg="#fdeced" fg="#cb2027">
                      {diff > 0 ? "+" : ""}{diff} {item.unit}
                    </Pill>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-3 gap-[6px]">
                  {[
                    ["Salida", item.out],
                    ["Consumo", item.used],
                    ["Sobrante esp.", expected],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-[9px] bg-soft-2 px-2 py-[7px]">
                      <div className="text-[9.5px] font-medium uppercase leading-none tracking-[.04em] text-ink-7">
                        {k}
                      </div>
                      <div className="mt-[3px] font-cond text-[15px] font-bold leading-none">
                        {v} {item.unit}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11.5px] font-semibold leading-none text-ink-3">Conteo físico:</span>
                  <input
                    value={physical[i] ?? ""}
                    onChange={(e) => setPhysical((p) => ({ ...p, [i]: e.target.value }))}
                    placeholder="0.0"
                    inputMode="decimal"
                    className="h-8 w-[72px] rounded-[8px] border border-line-2 bg-soft-3 px-2 text-center text-[13px] font-bold outline-none focus:border-brand"
                  />
                  <span className="text-[11.5px] font-medium leading-none text-ink-7">{item.unit}</span>
                </div>
              </div>
            );
          })}
          <button className="mt-2 h-11 w-full cursor-pointer rounded-[11px] bg-ink text-[13.5px] font-bold text-white">
            Enviar conciliación a base
          </button>
          <div className="mt-2 rounded-[10px] bg-soft-3 px-3 py-2 text-[11px] font-medium leading-[1.4] text-ink-6">
            La diferencia contra sobrante esperado se reporta al coordinador con tu firma.
          </div>
        </div>
      )}

      {/* ——— PERFIL ——— */}
      {tab === "perfil" && (
        <div className="flex-1 overflow-auto px-4 pb-6 pt-[6px]">
          <h1 className="mb-3 mt-2 text-[23px] font-bold leading-[1.15]">Mi perfil</h1>
          <div className="flex items-center gap-3 rounded-2xl border border-line-3 bg-white p-[14px]">
            <span className="h-[46px] w-[46px] flex-none rounded-full bg-[#1f7a72] text-center text-base font-bold leading-[46px] text-white">
              AD
            </span>
            <div className="flex-1">
              <div className="text-[15px] font-bold leading-[1.2]">Ana Delgado</div>
              <div className="mt-[2px] text-xs font-medium leading-[1.35] text-ink-6">
                Técnico aplicador · Cert. NOM-256-SSA1
              </div>
            </div>
          </div>
          <SectionLabel>Mi unidad</SectionLabel>
          <div className="rounded-[13px] border border-line-3 bg-white px-[13px] py-[6px]">
            {[
              ["Unidad", myUnit.tech.unit],
              ["Placas", myUnit.plate],
              ["Vehículo", myUnit.model],
              ["Zona", myUnit.tech.zone],
              ["Próx. servicio mecánico", myUnit.maint],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-line-5 py-2 last:border-0">
                <span className="text-xs font-medium leading-none text-ink-6">{k}</span>
                <span className="text-xs font-semibold leading-none">{v}</span>
              </div>
            ))}
          </div>
          <SectionLabel>Mis certificaciones y documentos</SectionLabel>
          {techCredentials.map((c) => (
            <div key={c.label} className="mb-2 flex items-center gap-[10px] rounded-[13px] border border-line-3 bg-white px-[13px] py-[11px]">
              <span
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg text-[13px] font-bold ${
                  c.ok ? "bg-ok-bg text-ok" : "bg-[#fff3e0] text-warn"
                }`}
              >
                {c.ok ? "✓" : "!"}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold leading-[1.25]">{c.label}</div>
                <div className="mt-[2px] text-[10.5px] font-medium leading-[1.3] text-ink-7">{c.issuer}</div>
              </div>
              <span className={`text-[10.5px] font-semibold leading-none ${c.ok ? "text-ok" : "text-warn"}`}>
                {c.valid}
              </span>
            </div>
          ))}
          <SectionLabel>Documentos de la empresa</SectionLabel>
          {companyCredentials.map((c) => (
            <div key={c.label} className="mb-2 flex items-center gap-[10px] rounded-[13px] border border-line-3 bg-white px-[13px] py-[11px]">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-ok-bg text-[13px] font-bold text-ok">
                ✓
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold leading-[1.25]">{c.label}</div>
                <div className="mt-[2px] text-[10.5px] font-medium leading-[1.3] text-ink-7">{c.issuer}</div>
              </div>
              <span className="text-[10.5px] font-semibold leading-none text-ok">{c.valid}</span>
            </div>
          ))}
          <SectionLabel>EPP asignado</SectionLabel>
          <div className="flex flex-wrap gap-[6px]">
            {["Respirador media cara", "Respirador cara completa", "Guantes de nitrilo", "Lentes de seguridad", "Overol x2", "Botas de hule"].map((e) => (
              <span key={e} className="rounded-md bg-soft px-[9px] py-1 text-[11px] font-semibold leading-[1.3] text-ink-3">
                {e}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ——— Tab bar ——— */}
      <div className="flex h-[60px] flex-none items-center border-t border-line-3 bg-white px-2">
        {(
          [
            ["hoy", "Hoy", "▤"],
            ["ruta", "Ruta", "◈"],
            ["inv", "Inventario", "▣"],
            ["perfil", "Perfil", "◉"],
          ] as const
        ).map(([id, label, icon]) => (
          <button
            key={id}
            onClick={() => goTab(id)}
            className={`flex flex-1 cursor-pointer flex-col items-center gap-[2px] py-[6px] text-[10px] font-semibold ${
              tab === id ? "text-brand" : "text-ink-8"
            }`}
          >
            <span className="text-[15px] leading-none">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </PhoneFrame>
  );
}
