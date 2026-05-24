import "./App.css";
import { useNavigate } from "react-router-dom";

type BtnVariant = "filled" | "ghost";
type BtnSize = "sm" | "md" | "lg";

function Btn({
  children,
  variant = "filled",
  size = "md",
  onClick,
}: {
  children: React.ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  onClick?: () => void;
}) {
  const sizes: Record<BtnSize, string> = {
    sm: "px-3 py-1.25 text-xs",
    md: "px-4 py-2 text-[13px]",
    lg: "px-5.5 py-2.75 text-sm",
  };
  const variants: Record<BtnVariant, string> = {
    filled: "bg-ky-accent hover:bg-ky-accent-dark text-white border-0",
    ghost:
      "bg-transparent hover:bg-ky-elevated text-ky-text border border-ky-border",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg font-semibold font-sans cursor-pointer outline-none transition-all duration-150 ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

type Role = "admin" | "compras" | "legal" | "viewer";

const ROLES_CONFIG: Record<
  Role,
  { label: string; badgeClass: string; checkClass: string }
> = {
  admin: {
    label: "Admin",
    badgeClass: "text-ky-accent bg-ky-accent/12 border-ky-accent/25",
    checkClass: "text-ky-accent",
  },
  compras: {
    label: "Compras",
    badgeClass: "text-ky-indigo bg-ky-indigo/12 border-ky-indigo/25",
    checkClass: "text-ky-indigo",
  },
  legal: {
    label: "Legal",
    badgeClass: "text-ky-amber bg-ky-amber/10 border-ky-amber/25",
    checkClass: "text-ky-amber",
  },
  viewer: {
    label: "Viewer",
    badgeClass: "text-ky-muted bg-ky-muted/10 border-ky-muted/25",
    checkClass: "text-ky-muted",
  },
};

function Badge({ role }: { role: Role }) {
  const cfg = ROLES_CONFIG[role];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.04em] border ${cfg.badgeClass}`}
    >
      {cfg.label}
    </span>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-ky-card border border-ky-border rounded-xl p-6 transition-all duration-200 hover:border-ky-accent/30 hover:-translate-y-0.5 cursor-default">
      <div className="text-[28px] mb-3">{icon}</div>
      <h3 className="text-sm font-bold text-ky-text mb-2 mt-0">{title}</h3>
      <p className="text-[13px] text-ky-muted leading-relaxed m-0">{desc}</p>
    </div>
  );
}

const FEATURES = [
  {
    icon: "🏢",
    title: "Registro de proveedores",
    desc: "Alta completa con RUC/DV panameño, categoría, y condiciones de pago. Gestiona todo el ciclo de vida del proveedor.",
  },
  {
    icon: "📋",
    title: "Ciclo de vida contractual",
    desc: "Flujo Borrador → Revisión → Activo → Renovado con aprobaciones por roles y trazabilidad total.",
  },
  {
    icon: "🔔",
    title: "Alertas de vencimiento",
    desc: "Notificaciones automáticas a 30, 60 y 90 días antes del vencimiento. Nunca pierdas una renovación crítica.",
  },
  {
    icon: "☁️",
    title: "Almacenamiento AWS S3",
    desc: "Documentos cifrados con presigned URLs temporales. Acceso seguro y auditado desde cualquier lugar.",
  },
  {
    icon: "📊",
    title: "Reportes exportables",
    desc: "CSV y PDF con filtros por proveedor, estado, categoría y período. Dashboards en tiempo real.",
  },
  {
    icon: "🔐",
    title: "Control por roles",
    desc: "Admin, Compras, Legal y Viewer con permisos granulares. Cada usuario ve exactamente lo que necesita.",
  },
];

const ROLE_SECTIONS: { r: Role; perms: string[] }[] = [
  {
    r: "admin",
    perms: [
      "Acceso total",
      "Gestión de usuarios",
      "Configuración del sistema",
      "Exportar reportes",
    ],
  },
  {
    r: "compras",
    perms: [
      "Crear proveedores",
      "Iniciar contratos",
      "Subir documentos",
      "Ver alertas",
    ],
  },
  {
    r: "legal",
    perms: [
      "Aprobar contratos",
      "Rechazar contratos",
      "Gestionar renovaciones",
      "Ver documentos",
    ],
  },
  {
    r: "viewer",
    perms: ["Ver proveedores", "Ver contratos", "Ver alertas", "Solo lectura"],
  },
];

export default function App() {
  const navigate = useNavigate();
  const goLogin = () => navigate("/login");
  const goSignup = () => navigate("/signup");

  return (
    <div className="bg-ky-bg text-ky-text font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-100 border-b border-ky-border bg-[rgba(8,11,16,0.9)] backdrop-blur-xl">
        <div className="max-w-275 mx-auto px-8 h-15 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold tracking-[-0.03em]">
              Kyōtei
            </span>
            <span className="text-[10px] text-ky-accent font-medium">協定</span>
          </div>
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={goLogin}>
              Iniciar sesión
            </Btn>
            <Btn size="sm" onClick={goLogin}>
              Solicitar demo
            </Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-275 mx-auto px-8 pt-22 pb-18 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[radial-gradient(ellipse,rgba(59,130,246,0.09)_0%,transparent_70%)] pointer-events-none" />
        <div className="text-center max-w-185 mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.25 rounded-full bg-ky-accent/12 border border-ky-accent/20 mb-7 text-xs font-semibold text-ky-accent tracking-[0.04em]">
            <span className="w-1.5 h-1.5 rounded-full bg-ky-accent animate-pulse" />
            Gestión contractual · Latinoamérica
          </div>

          <h1 className="text-[clamp(34px,5vw,58px)] font-extrabold leading-[1.1] tracking-[-0.03em] mt-0 mb-6 text-ky-text">
            El sistema que tu equipo necesita para{" "}
            <span className="text-ky-accent">controlar cada contrato</span> y
            proveedor
          </h1>

          <p className="text-[17px] text-ky-muted leading-[1.7] mb-9 max-w-135 mx-auto">
            Kyōtei centraliza proveedores, contratos y documentos corporativos
            en una sola plataforma segura, con alertas inteligentes y control de
            acceso por roles.
          </p>

          <div className="flex gap-3 justify-center mb-16">
            <Btn size="lg" onClick={goLogin}>
              Comenzar ahora →
            </Btn>
            <Btn variant="ghost" size="lg" onClick={goSignup}>
              Ver demo
            </Btn>
          </div>

          {/* Dashboard preview */}
          <div className="bg-ky-card border border-ky-border-md rounded-[14px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            <div className="bg-ky-bg-alt border-b border-ky-border px-4.5 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-ky-red/53" />
                <div className="w-2.5 h-2.5 rounded-full bg-ky-amber/53" />
                <div className="w-2.5 h-2.5 rounded-full bg-ky-green/53" />
              </div>
              <span className="text-[11px] text-ky-faint ml-2">
                app.kyotei.com.pa — Dashboard
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] min-h-60">
              <div className="border-r border-ky-border py-3">
                {[
                  "Dashboard",
                  "Proveedores",
                  "Contratos",
                  "Alertas",
                  "Reportes",
                ].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3.5 py-1.75 text-[11px] border-l-2 ${
                      i === 0
                        ? "text-ky-accent bg-ky-accent/12 border-l-ky-accent"
                        : "text-ky-faint border-l-transparent"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2.5 mb-3">
                  {[
                    { v: "7", l: "Proveedores", c: "text-ky-accent" },
                    { v: "10", l: "Contratos", c: "text-ky-green" },
                    { v: "3", l: "Por vencer", c: "text-ky-red" },
                    { v: "$683K", l: "Valor", c: "text-ky-indigo" },
                  ].map(({ v, l, c }) => (
                    <div
                      key={l}
                      className="bg-ky-bg-alt border border-ky-border rounded-lg px-3 py-2.25"
                    >
                      <div className={`text-sm font-bold ${c}`}>{v}</div>
                      <div className="text-[10px] text-ky-faint">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-ky-bg-alt border border-ky-border rounded-lg p-3 flex items-end gap-1.5 h-27.5">
                  {[45, 72, 58, 85, 63, 92, 78, 96].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-[3px] ${i === 7 ? "bg-ky-accent" : "bg-ky-border"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-275 mx-auto px-8 py-18">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-ky-accent tracking-[0.12em] mb-3 m-0">
            CARACTERÍSTICAS
          </p>
          <h2 className="text-[32px] font-extrabold tracking-[-0.02em] text-ky-text mt-0 mb-0">
            Todo lo que necesitas en una plataforma
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4.5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="bg-ky-bg-alt border-t border-b border-ky-border">
        <div className="max-w-275 mx-auto px-8 py-18">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold text-ky-accent tracking-[0.12em] mb-3 m-0">
              ROLES
            </p>
            <h2 className="text-[32px] font-extrabold tracking-[-0.02em] text-ky-text mt-0 mb-0">
              Acceso diseñado para cada perfil
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {ROLE_SECTIONS.map(({ r, perms }) => (
              <div
                key={r}
                className="bg-ky-card border border-ky-border rounded-xl p-6"
              >
                <Badge role={r} />
                <ul className="mt-4 list-none p-0 flex flex-col gap-2">
                  {perms.map((p, i) => (
                    <li key={i} className="text-xs text-ky-muted flex gap-2">
                      <span className={ROLES_CONFIG[r].checkClass}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-275 mx-auto px-8 py-18">
        <div className="bg-gradient-to-br from-ky-card to-ky-bg-alt border border-ky-border-md rounded-[20px] px-16 py-14 text-center relative overflow-hidden">
          <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-150 h-100 bg-[radial-gradient(ellipse,rgba(59,130,246,0.07)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="text-[32px] font-extrabold tracking-[-0.02em] mb-4 mt-0 relative text-ky-text">
            Listo para transformar tu gestión contractual
          </h2>
          <p className="text-base text-ky-muted mb-8 relative">
            Únete a las empresas que confían en Kyōtei para controlar sus
            contratos con eficiencia.
          </p>
          <div className="relative">
            <Btn size="lg" onClick={goSignup}>
              Solicitar acceso demo →
            </Btn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ky-border max-w-275 mx-auto px-8 py-7 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-[15px] font-extrabold text-ky-text">
            Kyōtei
          </span>
          <span className="text-[9px] text-ky-accent">協定</span>
        </div>
        <span className="text-xs text-ky-faint">
          © 2026 Kyōtei · Todos los derechos reservados
        </span>
        <div className="flex gap-6">
          {["Privacidad", "Términos", "Contacto"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-ky-faint no-underline hover:text-ky-muted transition-colors duration-150"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
