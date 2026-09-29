import Link from "next/link";
import Image from "next/image";
import { statusColors, type ServiceStatus } from "@/lib/data";

export function Avatar({
  color,
  initials,
  size = 28,
}: {
  color: string;
  initials: string;
  size?: number;
}) {
  return (
    <span
      className="block flex-none rounded-full text-center font-bold text-white"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: Math.round(size * 0.4),
        lineHeight: `${size}px`,
      }}
    >
      {initials}
    </span>
  );
}

export function Pill({ bg, fg, children }: { bg: string; fg: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex h-5 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-[.06em]"
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: ServiceStatus }) {
  const [bg, fg] = statusColors[status];
  return (
    <Pill bg={bg} fg={fg}>
      {status}
    </Pill>
  );
}

const apps = [
  { href: "/operaciones", label: "Escritorio" },
  { href: "/tecnico", label: "Técnico" },
  { href: "/cliente", label: "Cliente" },
];

/** Conmutador entre las tres superficies (equivale al segmented control del prototipo). */
export function AppSwitcher({ active }: { active: string }) {
  return (
    <div className="flex gap-[2px] rounded-[9px] bg-soft p-[3px]">
      {apps.map((a) => (
        <Link
          key={a.href}
          href={a.href}
          className={`flex h-7 items-center rounded-[7px] px-[13px] text-[12.5px] font-semibold ${
            active === a.href
              ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.12)]"
              : "text-ink-5"
          }`}
        >
          {a.label}
        </Link>
      ))}
    </div>
  );
}

/**
 * Marco de teléfono: en escritorio muestra la app dentro de un bezel de 392px;
 * en móvil real la app ocupa toda la pantalla (README: "estirarse a 100%").
 */
export function PhoneFrame({
  active,
  statusBar = "light",
  children,
}: {
  active: string;
  statusBar?: "light" | "dark" | "none";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh md:flex md:min-h-screen md:flex-col md:bg-gradient-to-b md:from-[#eceef1] md:to-[#e4e7eb]">
      <div className="hidden h-[58px] items-center gap-5 border-b border-line bg-white px-[22px] md:flex">
        <Image src="/corma-logo.png" alt="CORMA" width={132} height={30} className="h-[30px] w-auto" />
        <div className="h-6 w-px bg-line-2" />
        <span className="text-[13.5px] font-semibold">
          {active === "/cliente" ? "App de cliente" : "App del técnico"}
        </span>
        <span className="text-[11.5px] font-medium text-ink-6">
          {active === "/cliente"
            ? "Independiente del panel interno · sólo ve lo suyo"
            : "El técnico sólo ve sus paradas del día"}
        </span>
        <div className="flex-1" />
        <AppSwitcher active={active} />
      </div>
      <div className="md:flex md:flex-1 md:items-start md:justify-center md:px-6 md:pb-16 md:pt-[34px]">
        <div className="md:w-[392px] md:flex-none md:rounded-[46px] md:bg-[#111417] md:p-[11px] md:shadow-[0_26px_64px_rgba(20,24,30,.3)]">
          <div className="relative flex h-dvh flex-col overflow-hidden bg-[#f5f6f8] md:h-[800px] md:rounded-[36px]">
            {statusBar !== "none" && (
              <div
                className={`relative z-[5] hidden h-11 flex-none items-center justify-between px-6 text-[13px] font-semibold md:flex ${
                  statusBar === "dark" ? "bg-ink text-white" : "text-ink"
                }`}
              >
                <span>9:41</span>
                <span className="flex items-center gap-[5px]">
                  <i className="block h-[9px] w-4 rounded-[2px] border-[1.5px] border-current" />
                  <i className="block h-[9px] w-[15px] rounded-[2px] bg-current" />
                </span>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
