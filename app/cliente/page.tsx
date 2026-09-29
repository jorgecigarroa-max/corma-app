"use client";

import { useState } from "react";
import Image from "next/image";
import {
  addressList,
  catalog,
  clientHistory,
  dayList,
  levelMeta,
  pests,
  seasonsData,
  slotList,
  zonesData,
} from "@/lib/data";
import { PhoneFrame } from "@/components/ui";

type Screen = "login" | "otp" | "app";
type Tab = "home" | "plagas" | "hist" | "perfil";

export default function ClientePage() {
  const [screen, setScreen] = useState<Screen>("login");
  const [tab, setTab] = useState<Tab>("home");
  const [phone, setPhone] = useState("871 143 8964");
  const [booking, setBooking] = useState(false);
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState<string | null>(null);
  const [selPests, setSelPests] = useState<Record<string, boolean>>({});
  const [addr, setAddr] = useState(0);
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState(1);
  const [zone, setZone] = useState("gp");
  const [season, setSeason] = useState("ver");
  const [prefs, setPrefs] = useState({ wa: true, sms: false, cal: true });

  const inApp = screen === "app";
  const zoneData = zonesData.find((z) => z.id === zone)!;
  const chosenSvc = catalog.find((s) => s.id === svc) ?? catalog[0];
  const chosenPests = pests.filter((p) => selPests[p.id]);
  const canNext = step === 1 ? !!svc : true;

  const startBooking = (withSvc?: string, withPest?: string) => {
    setStep(1);
    if (withSvc) setSvc(withSvc);
    if (withPest) setSelPests((p) => ({ ...p, [withPest]: true }));
    setBooking(true);
  };

  const bookNext = () => {
    if (!canNext) return;
    if (step === 5) {
      setBooking(false);
      setStep(1);
      setTab("hist");
    } else {
      setStep(step + 1);
    }
  };

  const stepTitles: Record<number, string> = {
    1: "¿Qué servicio necesitas?",
    2: "Plaga y dirección",
    3: "Fecha y horario",
    4: "Confirma tu cita",
    5: "Confirmado",
  };

  return (
    <PhoneFrame active="/cliente" statusBar={inApp && tab === "home" ? "dark" : "light"}>
      {/* ——— Registro ——— */}
      {screen === "login" && (
        <div className="flex flex-1 flex-col bg-white px-6 pb-7">
          <div className="flex flex-1 flex-col justify-center">
            <Image src="/corma-logo.png" alt="CORMA" width={229} height={52} className="mb-[26px] h-[52px] w-auto self-start" />
            <h1 className="mb-2 text-[27px] font-bold leading-[1.15] tracking-[-.015em]">
              Tu casa, libre de plagas.
            </h1>
            <p className="mb-[26px] text-sm font-medium leading-normal text-ink-5">
              Agenda en 40 segundos. Con tu número guardamos tu historial y te avisamos cuándo toca la
              siguiente aplicación.
            </p>
            <label className="text-[11px] font-semibold uppercase leading-none tracking-[.07em] text-ink-8">
              Tu celular
            </label>
            <div className="mt-[9px] flex h-[54px] items-center gap-[9px] rounded-[14px] border-[1.5px] border-line-2 bg-[#fbfcfd] px-[14px]">
              <span className="text-[15px] font-semibold leading-none text-ink-5">🇲🇽 +52</span>
              <div className="h-[22px] w-px bg-line-2" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="871 143 8964"
                inputMode="tel"
                className="min-w-0 flex-1 bg-transparent text-base font-semibold tracking-[.02em] outline-none"
              />
            </div>
            <button
              onClick={() => setScreen("otp")}
              className="mt-[14px] h-[52px] cursor-pointer rounded-[14px] bg-brand text-[15px] font-bold text-white hover:bg-brand-dark"
            >
              Continuar
            </button>
            <p className="mt-[14px] text-[11.5px] font-medium leading-normal text-ink-8">
              Al continuar aceptas el aviso de privacidad. Sólo usamos tu número para tu historial y
              recordatorios.
            </p>
          </div>
          <div className="flex justify-center gap-4 text-[11.5px] font-medium leading-none text-ink-8">
            <span>(871) 192 4400</span>
            <span>·</span>
            <span>contacto@corma.mx</span>
          </div>
        </div>
      )}

      {/* ——— Código ——— */}
      {screen === "otp" && (
        <div className="flex flex-1 flex-col bg-white px-6 pb-7 pt-2">
          <button
            onClick={() => setScreen("login")}
            className="cursor-pointer self-start py-[6px] text-[13px] font-semibold text-brand"
          >
            ‹ Cambiar número
          </button>
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-2 text-[25px] font-bold leading-[1.18]">Te mandamos un código por WhatsApp</h1>
            <p className="mb-6 text-sm font-medium leading-normal text-ink-5">Al +52 {phone}</p>
            <div className="flex gap-[10px]">
              {["4", "7", "2", ""].map((d, i) => (
                <div
                  key={i}
                  className="flex h-[58px] flex-1 items-center justify-center rounded-[14px] text-[22px] font-bold"
                  style={{
                    border: `1.5px solid ${d ? "#23262b" : i === 3 ? "#cb2027" : "#e2e5ea"}`,
                    background: d ? "#fff" : "#fbfcfd",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setScreen("app");
                setTab("home");
              }}
              className="mt-[22px] h-[52px] cursor-pointer rounded-[14px] bg-brand text-[15px] font-bold text-white hover:bg-brand-dark"
            >
              Verificar
            </button>
            <div className="mt-[18px] rounded-[13px] border border-ok-border bg-ok-soft px-[14px] py-[13px]">
              <div className="text-xs font-bold leading-[1.3] text-ok">Ya tenemos historial con este número</div>
              <div className="mt-1 text-xs font-medium leading-[1.45] text-ink-3">
                3 servicios desde 2024 en Fracc. Las Rosas 14, Gómez Palacio.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ——— Inicio ——— */}
      {inApp && tab === "home" && (
        <div className="flex-1 overflow-auto pb-[22px]">
          <div className="rounded-b-[26px] bg-ink px-5 pb-[26px] pt-[6px] text-white max-md:pt-4">
            <div className="flex items-center gap-[10px]">
              <div className="flex-1">
                <div className="text-xs font-medium leading-none opacity-60">Hola de nuevo</div>
                <div className="mt-[3px] text-xl font-bold leading-[1.2]">Mayela Salas</div>
              </div>
              <span className="h-[38px] w-[38px] rounded-full bg-white/10 text-center text-sm font-bold leading-[38px]">
                MS
              </span>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/8 px-[15px] py-[14px]">
              <div className="flex items-center gap-2">
                <span className="animate-pulse-ring-slow block h-2 w-2 rounded-full bg-brand" />
                <span className="text-[10.5px] font-bold uppercase leading-none tracking-[.09em] opacity-75">
                  Te toca pronto
                </span>
              </div>
              <div className="mt-[9px] text-[17px] font-bold leading-[1.25]">
                Control residencial · 9 de septiembre
              </div>
              <div className="mt-[3px] text-[12.5px] font-medium leading-[1.4] opacity-65">
                Han pasado 58 días desde tu última aplicación
              </div>
              <div className="mt-[13px] flex gap-2">
                <button
                  onClick={() => startBooking("res")}
                  className="h-[38px] flex-1 cursor-pointer rounded-[10px] bg-brand text-[13px] font-bold text-white hover:bg-brand-dark"
                >
                  Agendar ahora
                </button>
                <button className="h-[38px] cursor-pointer rounded-[10px] border border-white/20 px-[14px] text-[13px] font-semibold text-white">
                  Recordar después
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 pt-5">
            <div className="mb-[11px] flex items-baseline gap-2">
              <span className="text-[15px] font-bold leading-none">Plagas activas en tu zona</span>
              <div className="flex-1" />
              <button
                onClick={() => setTab("plagas")}
                className="cursor-pointer text-xs font-semibold text-brand"
              >
                Ver todas
              </button>
            </div>
            <div className="flex gap-[9px] overflow-auto pb-1">
              {pests.slice(0, 4).map((p) => {
                const l = levelMeta[p.lvl];
                return (
                  <div key={p.id} className="w-[172px] flex-none rounded-[14px] border border-line-3 bg-white p-[13px]">
                    <span
                      className="inline-flex h-5 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-[.06em]"
                      style={{ background: l.bg, color: l.fg }}
                    >
                      {l.label}
                    </span>
                    <div className="mt-[9px] text-sm font-bold leading-[1.2]">{p.name}</div>
                    <div className="mt-1 text-[11.5px] font-medium leading-[1.4] text-ink-5">{p.where}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-5 pt-[22px]">
            <div className="mb-[11px] text-[15px] font-bold leading-none">¿Qué necesitas?</div>
            <div className="grid grid-cols-2 gap-[9px]">
              {catalog.map((s) => (
                <button
                  key={s.id}
                  onClick={() => startBooking(s.id)}
                  className="cursor-pointer rounded-[15px] border border-line-3 bg-white p-[13px] text-left"
                >
                  <span
                    className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] text-base"
                    style={{ background: `${s.color}18`, color: s.color }}
                  >
                    {s.glyph}
                  </span>
                  <span className="mt-[10px] block text-left text-[13.5px] font-bold leading-[1.2]">{s.name}</span>
                  <span className="mt-[3px] block text-left text-[11.5px] font-medium leading-[1.4] text-ink-6">
                    {s.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 pt-5">
            <div className="rounded-2xl border border-[#f5d4d6] bg-brand-bg px-4 py-[15px]">
              <div className="text-[15px] font-bold leading-[1.2] text-brand">Inspección sin costo</div>
              <div className="mt-[5px] text-[12.5px] font-medium leading-[1.45] text-[#7d5257]">
                Un especialista revisa tu espacio y te entrega un diagnóstico con propuesta el mismo día.
              </div>
              <button
                onClick={() => startBooking()}
                className="mt-3 h-9 cursor-pointer rounded-[9px] bg-brand px-[15px] text-[12.5px] font-bold text-white hover:bg-brand-dark"
              >
                Solicitar visita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ——— Plagas ——— */}
      {inApp && tab === "plagas" && (
        <div className="flex-1 overflow-auto px-5 pb-[22px] pt-1 max-md:pt-4">
          <h1 className="mb-1 mt-[6px] text-[23px] font-bold leading-[1.15]">Plagas por zona y temporada</h1>
          <p className="mb-[14px] text-[12.5px] font-medium leading-[1.45] text-ink-5">
            Lo que estamos encontrando en La Laguna este mes, según nuestros servicios recientes.
          </p>
          <div className="flex gap-[7px] overflow-auto pb-[6px]">
            {zonesData.map((z) => {
              const on = zone === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => setZone(z.id)}
                  className="h-8 flex-none cursor-pointer rounded-[9px] px-[13px] text-[12.5px] font-semibold"
                  style={{
                    border: `1px solid ${on ? "#cb2027" : "#e2e5ea"}`,
                    background: on ? "#cb2027" : "#fff",
                    color: on ? "#fff" : "#5c6169",
                  }}
                >
                  {z.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-[7px] overflow-auto py-2 pb-3">
            {seasonsData.map(([id, label]) => {
              const on = season === id;
              return (
                <button
                  key={id}
                  onClick={() => setSeason(id)}
                  className="h-7 flex-none cursor-pointer rounded-lg px-[11px] text-[11.5px] font-semibold"
                  style={{
                    border: `1px solid ${on ? "#23262b" : "#e6e9ed"}`,
                    background: on ? "#23262b" : "transparent",
                    color: on ? "#fff" : "#8b929c",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="mb-[14px] rounded-[14px] border border-line-3 bg-white px-[14px] py-[13px]">
            <div className="text-[11px] font-bold uppercase leading-none tracking-[.08em] text-ink-8">
              Recomendación para {zoneData.label}
            </div>
            <div className="mt-[7px] text-[13px] font-medium leading-[1.45] text-ink-2">{zoneData.advice}</div>
          </div>
          {pests.map((p) => {
            // Regla del prototipo: fuera de verano el nivel baja un escalón.
            const lvl = Math.max(1, Math.min(3, p.lvl + (season === "ver" ? 0 : -1)));
            const l = levelMeta[lvl];
            return (
              <div key={p.id} className="mb-[9px] rounded-[14px] border border-line-3 bg-white px-[14px] py-[13px]">
                <div className="flex items-center gap-[9px]">
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-soft text-[15px] text-ink-3">
                    {p.glyph}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold leading-[1.2]">{p.name}</div>
                    <div className="mt-[2px] text-[11.5px] font-medium leading-[1.35] text-ink-6">{p.where}</div>
                  </div>
                  <span
                    className="inline-flex h-5 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-[.06em]"
                    style={{ background: l.bg, color: l.fg }}
                  >
                    {l.label}
                  </span>
                </div>
                <div className="mt-[11px] h-[6px] overflow-hidden rounded-full bg-soft">
                  <div className="h-full rounded-full" style={{ width: `${lvl * 33}%`, background: l.fg }} />
                </div>
                <div className="mt-[11px] flex items-center gap-[9px]">
                  <span className="flex-1 text-xs font-medium leading-[1.4] text-ink-4">{p.tip}</span>
                  <button
                    onClick={() => startBooking(undefined, p.id)}
                    className="h-[30px] cursor-pointer whitespace-nowrap rounded-lg border border-line-2 bg-white px-3 text-xs font-semibold text-brand"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ——— Historial ——— */}
      {inApp && tab === "hist" && (
        <div className="flex-1 overflow-auto px-5 pb-[22px] pt-1 max-md:pt-4">
          <h1 className="mb-1 mt-[6px] text-[23px] font-bold leading-[1.15]">Mi historial</h1>
          <p className="mb-4 text-[12.5px] font-medium leading-[1.45] text-ink-5">
            Ligado a tu número +52 {phone}
          </p>
          <div className="mb-4 rounded-2xl bg-ink px-4 py-[15px] text-white">
            <div className="text-[11px] font-medium uppercase leading-none tracking-[.08em] opacity-60">
              Próximo sugerido
            </div>
            <div className="mt-2 text-lg font-bold leading-[1.2]">9 de septiembre · 10:00–12:00</div>
            <div className="mt-[3px] text-[12.5px] font-medium leading-[1.4] opacity-65">
              Ciclo residencial cada 60 días
            </div>
            <button
              onClick={() => startBooking("res")}
              className="mt-3 h-9 cursor-pointer rounded-[9px] bg-white px-[15px] text-[12.5px] font-bold text-ink"
            >
              Confirmar fecha
            </button>
          </div>
          {clientHistory.map((h) => (
            <div key={h.date} className="mb-[9px] rounded-[14px] border border-line-3 bg-white px-[14px] py-[13px]">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-5 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-[.06em]"
                  style={
                    h.type === "Jardín"
                      ? { background: "#eef3e8", color: "#4d6626" }
                      : { background: "#fdeced", color: "#cb2027" }
                  }
                >
                  {h.type}
                </span>
                <div className="flex-1" />
                <span className="text-[11.5px] font-medium leading-none text-ink-7">{h.date}</span>
              </div>
              <div className="mt-[9px] text-sm font-bold leading-[1.25]">{h.title}</div>
              <div className="mt-[3px] text-xs font-medium leading-[1.4] text-ink-6">{h.detail}</div>
              <div className="mt-3 flex gap-2">
                <button className="h-[33px] flex-1 cursor-pointer rounded-[9px] border border-line-2 bg-white text-xs font-semibold text-ink-2">
                  Ver certificado
                </button>
                <button
                  onClick={() => startBooking()}
                  className="h-[33px] flex-1 cursor-pointer rounded-[9px] bg-soft text-xs font-semibold text-ink-2"
                >
                  Repetir servicio
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ——— Cuenta ——— */}
      {inApp && tab === "perfil" && (
        <div className="flex-1 overflow-auto px-5 pb-[22px] pt-1 max-md:pt-4">
          <h1 className="mb-4 mt-[6px] text-[23px] font-bold leading-[1.15]">Mi cuenta</h1>
          <div className="flex items-center gap-3 rounded-2xl border border-line-3 bg-white p-[14px]">
            <span className="h-[46px] w-[46px] rounded-full bg-brand text-center text-base font-bold leading-[46px] text-white">
              MS
            </span>
            <div className="flex-1">
              <div className="text-[15px] font-bold leading-[1.2]">Mayela Salas</div>
              <div className="mt-[2px] text-xs font-medium leading-[1.35] text-ink-6">
                +52 {phone} · cliente desde 2024
              </div>
            </div>
          </div>
          <div className="mb-[9px] mt-5 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
            Recordatorios
          </div>
          {(
            [
              ["wa", "Avisos por WhatsApp", "Recordatorio 24 h antes y cuando toque tu ciclo"],
              ["sms", "SMS de respaldo", "Por si no tienes datos ese día"],
              ["cal", "Agregar a mi calendario", "Evento automático al confirmar"],
            ] as const
          ).map(([key, label, desc]) => {
            const on = prefs[key];
            return (
              <button
                key={key}
                onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                className="mb-2 flex w-full cursor-pointer items-center gap-[11px] rounded-[14px] border border-line-3 bg-white px-[14px] py-[13px] text-left"
              >
                <span className="flex-1">
                  <span className="block text-[13.5px] font-semibold leading-[1.2]">{label}</span>
                  <span className="mt-[3px] block text-[11.5px] font-medium leading-[1.35] text-ink-6">{desc}</span>
                </span>
                <span
                  className="flex h-[26px] w-11 flex-none items-center rounded-full p-[3px] transition-colors"
                  style={{ background: on ? "#1f7a4d" : "#dfe3e8", justifyContent: on ? "flex-end" : "flex-start" }}
                >
                  <i className="block h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.2)]" />
                </span>
              </button>
            );
          })}
          <div className="mb-[9px] mt-5 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
            Mis direcciones
          </div>
          {addressList.map((a) => (
            <div key={a.name} className="mb-2 rounded-[14px] border border-line-3 bg-white px-[14px] py-3">
              <div className="text-[13px] font-bold leading-[1.2]">{a.name}</div>
              <div className="mt-[3px] text-xs font-medium leading-[1.4] text-ink-6">{a.line}</div>
            </div>
          ))}
          <button
            onClick={() => setScreen("login")}
            className="mt-[14px] h-[42px] w-full cursor-pointer rounded-[11px] border border-line-2 bg-white text-[13px] font-semibold text-ink-6"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* ——— Tab bar ——— */}
      {inApp && (
        <div className="flex h-[62px] flex-none items-center border-t border-line-3 bg-white px-[6px]">
          {(
            [
              ["home", "Inicio", "⌂"],
              ["plagas", "Plagas", "✳"],
              ["hist", "Historial", "▤"],
              ["perfil", "Cuenta", "◉"],
            ] as const
          ).map(([id, label, icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-1 cursor-pointer flex-col items-center gap-[3px] py-[6px] text-[10px] font-semibold ${
                tab === id ? "text-brand" : "text-ink-8"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ——— Bottom sheet de agendado ——— */}
      {booking && (
        <div className="absolute inset-0 z-20 flex items-end bg-[#111417]/45">
          <div className="animate-slide-up flex max-h-[92%] w-full flex-col overflow-auto rounded-t-[26px] bg-white px-5 pb-6 pt-4 md:rounded-b-[36px]">
            <div className="mb-[14px] h-1 w-[38px] self-center rounded-full bg-line-2" />
            <div className="mb-[14px] flex items-center gap-[10px]">
              <span className="flex-1 text-base font-bold leading-[1.2]">{stepTitles[step]}</span>
              <button
                onClick={() => {
                  setBooking(false);
                  setStep(1);
                }}
                className="h-[30px] w-[30px] cursor-pointer rounded-full bg-soft text-[15px] font-semibold text-ink-5"
              >
                ×
              </button>
            </div>
            <div className="mb-[18px] flex gap-[5px]">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="block h-[3px] flex-1 rounded-full"
                  style={{ background: step >= i ? "#cb2027" : "#e9ecef" }}
                />
              ))}
            </div>

            {step === 1 && (
              <div>
                {catalog.map((s) => {
                  const on = svc === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSvc(s.id)}
                      className="mb-2 flex w-full cursor-pointer items-center gap-[11px] rounded-[14px] px-[13px] py-3"
                      style={{
                        border: `1px solid ${on ? s.color : "#e9ecef"}`,
                        background: on ? `${s.color}0d` : "#fff",
                      }}
                    >
                      <span
                        className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] text-base"
                        style={{ background: `${s.color}18`, color: s.color }}
                      >
                        {s.glyph}
                      </span>
                      <span className="flex-1 text-left">
                        <span className="block text-[13.5px] font-bold leading-[1.2]">{s.name}</span>
                        <span className="mt-[2px] block text-[11.5px] font-medium leading-[1.35] text-ink-6">
                          {s.desc}
                        </span>
                      </span>
                      <span className="text-[12.5px] font-semibold leading-none text-ink-5">{s.price}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="mb-3 text-[12.5px] font-medium leading-[1.45] text-ink-5">
                  Marca lo que has visto. Con eso el técnico llega con el producto correcto.
                </div>
                <div className="flex flex-wrap gap-2">
                  {pests.map((p) => {
                    const on = !!selPests[p.id];
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelPests((prev) => ({ ...prev, [p.id]: !prev[p.id] }))}
                        className="h-[34px] cursor-pointer rounded-[10px] px-3 text-[12.5px] font-semibold"
                        style={{
                          border: `1px solid ${on ? "#cb2027" : "#e2e5ea"}`,
                          background: on ? "#fdeced" : "#fff",
                          color: on ? "#cb2027" : "#5c6169",
                        }}
                      >
                        {p.glyph} {p.name}
                      </button>
                    );
                  })}
                </div>
                <div className="mb-[9px] mt-5 text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
                  Dirección
                </div>
                {addressList.map((a, i) => (
                  <button
                    key={a.name}
                    onClick={() => setAddr(i)}
                    className="mb-2 flex w-full cursor-pointer items-center gap-[10px] rounded-[13px] bg-white px-[13px] py-3"
                    style={{ border: `1px solid ${addr === i ? "#cb2027" : "#e9ecef"}` }}
                  >
                    <span className="flex-1 text-left">
                      <span className="block text-[13px] font-bold leading-[1.2]">{a.name}</span>
                      <span className="mt-[2px] block text-[11.5px] font-medium leading-[1.35] text-ink-6">
                        {a.line}
                      </span>
                    </span>
                    <span
                      className="block h-[18px] w-[18px] flex-none rounded-full"
                      style={{ border: addr === i ? "5px solid #cb2027" : "1.5px solid #d4d9df" }}
                    />
                  </button>
                ))}
                <button className="mt-[6px] h-10 w-full cursor-pointer rounded-[11px] border border-dashed border-[#d4d9df] bg-soft-3 text-[12.5px] font-semibold text-ink-5">
                  + Agregar otra dirección
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex gap-2 overflow-auto pb-[6px]">
                  {dayList.map(([dow, n], i) => {
                    const on = day === i;
                    return (
                      <button
                        key={dow}
                        onClick={() => setDay(i)}
                        className="w-14 flex-none cursor-pointer rounded-xl py-[9px] text-center"
                        style={{
                          border: `1px solid ${on ? "#cb2027" : "#e2e5ea"}`,
                          background: on ? "#cb2027" : "#fff",
                          color: on ? "#fff" : "#42474e",
                        }}
                      >
                        <span className="block text-[10.5px] font-semibold uppercase leading-none tracking-[.06em] opacity-65">
                          {dow}
                        </span>
                        <span className="mt-[5px] block font-cond text-[19px] font-bold leading-none">{n}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mb-[9px] mt-[18px] text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink-8">
                  Horario disponible
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {slotList.map((s, i) => {
                    const on = slot === i;
                    return (
                      <button
                        key={s.label}
                        onClick={() => setSlot(i)}
                        className="cursor-pointer rounded-xl px-3 py-[11px] text-left"
                        style={{
                          border: `1px solid ${on ? "#cb2027" : "#e9ecef"}`,
                          background: on ? "#fdeced" : "#fff",
                          color: on ? "#cb2027" : "#42474e",
                        }}
                      >
                        <span className="block text-[13px] font-bold leading-[1.2]">{s.label}</span>
                        <span className="mt-[3px] block text-[11px] font-medium leading-[1.3] opacity-70">
                          {s.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 rounded-xl border border-ok-border bg-ok-soft px-[13px] py-3 text-xs font-medium leading-[1.45] text-[#1f6b47]">
                  Ese horario tiene una unidad trabajando a 6 min de tu dirección, por eso te lo sugerimos.
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="rounded-[14px] border border-line-3 bg-soft-3 px-[15px] py-[14px]">
                  {[
                    ["Servicio", chosenSvc.name],
                    [
                      "Plagas reportadas",
                      chosenPests.length ? chosenPests.map((p) => p.name).join(", ") : "Diagnóstico en sitio",
                    ],
                    ["Dirección", addressList[addr].line],
                    ["Fecha", `${dayList[day][0]} ${dayList[day][1]} de agosto`],
                    ["Horario", slotList[slot].label],
                    ["Estimado", chosenSvc.price],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-line-4 py-2">
                      <span className="text-xs font-medium leading-[1.3] text-ink-6">{k}</span>
                      <span className="text-right text-[12.5px] font-semibold leading-[1.3]">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-[14px] flex items-center gap-[10px] rounded-[14px] border border-line-3 px-[14px] py-[13px]">
                  <span className="h-[30px] w-[30px] flex-none rounded-[9px] bg-wa text-center text-[13px] font-bold leading-[30px] text-white">
                    W
                  </span>
                  <span className="flex-1 text-xs font-medium leading-[1.4] text-ink-3">
                    Te confirmamos por WhatsApp y te avisamos 24 h antes.
                  </span>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="px-0 pb-1 pt-[10px] text-center">
                <div className="mx-auto h-[60px] w-[60px] rounded-full bg-ok-bg text-[27px] font-bold leading-[60px] text-ok">
                  ✓
                </div>
                <h3 className="mb-[6px] mt-[15px] text-xl font-bold leading-[1.2]">¡Listo, quedó agendado!</h3>
                <p className="mb-4 text-[13px] font-medium leading-normal text-ink-5">
                  Folio OS-4441 · {dayList[day][0]} {dayList[day][1]} de agosto, {slotList[slot].label}
                </p>
                <div className="rounded-[14px] border border-line-3 bg-soft-3 px-[14px] py-[13px] text-left">
                  <div className="text-xs font-medium leading-[1.45] text-ink-3">
                    Guardamos este servicio en tu historial. Cuando toque el siguiente ciclo te escribimos al{" "}
                    <b>+52 {phone}</b>.
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={bookNext}
              className={`mt-[18px] h-[50px] w-full flex-none rounded-[14px] text-[14.5px] font-bold ${
                canNext
                  ? "cursor-pointer bg-brand text-white hover:bg-brand-dark"
                  : "cursor-default bg-page text-ink-8"
              }`}
            >
              {step === 4 ? "Confirmar cita" : step === 5 ? "Ver en mi historial" : "Continuar"}
            </button>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
