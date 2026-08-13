import { useState, createContext, useContext } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import fixoraLogo from "@/imports/Logo_fixora.png";
import techIconImg from "@/imports/LOGO_DE_T_CNICOS_copia.png";
import { loginUsuario } from "@/services/authService";
import {
  Menu, X, Star, Shield, Zap, Users, Calendar, Settings, LogOut,
  Search, Bell, Eye, EyeOff, Mail, Lock, Phone, User, MapPin,
  Clock, Award, TrendingUp, Wrench, Laptop, Wind, Paintbrush,
  Plug, Droplets, Home, ChevronDown, Plus, CheckCircle,
  AlertCircle, Loader2, Briefcase, FileText, Edit, Filter,
  Hammer, Smartphone, Tv,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type Page =
  | "home" | "client-login" | "client-register" | "client-dashboard"
  | "tech-landing" | "tech-login" | "tech-register" | "tech-dashboard";

type ClientView = "overview" | "search" | "requests" | "profile" | "settings";
type TechView = "overview" | "requests" | "calendar" | "jobs" | "profile" | "settings";

// ─── Navigation Context ────────────────────────────────────────────────────

const NavCtx = createContext<{ go: (p: Page) => void }>({ go: () => {} });
const useNav = () => useContext(NavCtx);

// ─── Shared UI Primitives ──────────────────────────────────────────────────

function Btn({
  children, variant = "primary", size = "md", className = "",
  onClick, type = "button", disabled = false, loading = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: "bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white shadow-sm shadow-blue-500/20",
    secondary: "bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A]",
    outline: "border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF]",
    ghost: "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  return (
    <button
      type={type} onClick={onClick} disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}

function InputField({
  label, type = "text", placeholder, value, onChange, error,
  icon, rightEl, id, required,
}: {
  label?: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; error?: string; icon?: React.ReactNode;
  rightEl?: React.ReactNode; id?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#0F172A]">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">{icon}</div>}
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? "pl-10" : "pl-4"} ${rightEl ? "pr-11" : "pr-4"} py-3 rounded-xl border-2 text-sm
            ${error ? "border-red-400 bg-red-50" : "border-[#E2E8F0] bg-white focus:border-[#2563EB]"}
            text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all`}
        />
        {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function SelectField({
  label, value, onChange, options, placeholder, error, id, required,
}: {
  label?: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
  error?: string; id?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#0F172A]">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id} value={value} onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border-2 text-sm appearance-none bg-white
            ${error ? "border-red-400" : "border-[#E2E8F0] focus:border-[#2563EB]"}
            text-[#0F172A] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function TextareaField({
  label, value, onChange, placeholder, error, rows = 4, id, required,
}: {
  label?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; rows?: number; id?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#0F172A]">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={id} rows={rows} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border-2 text-sm resize-none
          ${error ? "border-red-400 bg-red-50" : "border-[#E2E8F0] focus:border-[#2563EB]"}
          text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all`}
      />
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pendiente: "bg-amber-50 text-amber-700 border-amber-100",
    Aceptada: "bg-blue-50 text-blue-700 border-blue-100",
    "En proceso": "bg-violet-50 text-violet-700 border-violet-100",
    Finalizada: "bg-green-50 text-green-700 border-green-100",
    Cancelada: "bg-red-50 text-red-600 border-red-100",
  };
  const dotMap: Record<string, string> = {
    Pendiente: "bg-amber-400", Aceptada: "bg-blue-400",
    "En proceso": "bg-violet-400", Finalizada: "bg-green-500", Cancelada: "bg-red-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${map[status] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotMap[status] ?? "bg-gray-400"}`} />
      {status}
    </span>
  );
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-[#E2E8F0] rounded-lg ${className}`} />;
}

function EmptyState({ icon, title, description, action }: {
  icon: React.ReactNode; title: string; description: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-[#0F172A] mb-2">{title}</h3>
      <p className="text-sm text-[#64748B] max-w-xs mb-4">{description}</p>
      {action}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  let s = 0;
  if (password.length >= 8) s++;
  if (/[A-Z]/.test(password)) s++;
  if (/[0-9]/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  const labels = ["", "Débil", "Regular", "Buena", "Excelente"];
  const bars = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-500"];
  const texts = ["", "text-red-500", "text-amber-500", "text-blue-500", "text-green-600"];
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= s ? bars[s] : "bg-[#E2E8F0]"}`} />
        ))}
      </div>
      <p className={`text-xs font-medium ${texts[s]}`}>Contraseña {labels[s]}</p>
    </div>
  );
}

// ─── Data Constants ────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Electricista", icon: Plug, bg: "bg-yellow-50", color: "text-yellow-600" },
  { label: "Plomero", icon: Droplets, bg: "bg-sky-50", color: "text-sky-600" },
  { label: "Carpintero", icon: Hammer, bg: "bg-orange-50", color: "text-orange-600" },
  { label: "Pintor", icon: Paintbrush, bg: "bg-pink-50", color: "text-pink-600" },
  { label: "Computadoras", icon: Laptop, bg: "bg-violet-50", color: "text-violet-600" },
  { label: "Celulares", icon: Smartphone, bg: "bg-green-50", color: "text-green-600" },
  { label: "Electrodomésticos", icon: Tv, bg: "bg-red-50", color: "text-red-600" },
  { label: "Aire acondicionado", icon: Wind, bg: "bg-cyan-50", color: "text-cyan-600" },
];

const CLIENT_BENEFITS = [
  { icon: Shield, title: "Técnicos verificados", desc: "Todos nuestros técnicos pasan por un proceso de verificación y validación riguroso." },
  { icon: Zap, title: "Respuesta rápida", desc: "Recibe confirmación y atención en minutos, no en días. Disponibilidad inmediata." },
  { icon: Star, title: "Calificaciones reales", desc: "Lee opiniones verificadas de otros clientes antes de contratar cualquier servicio." },
  { icon: Lock, title: "Pagos seguros", desc: "Tus datos financieros siempre están protegidos con cifrado de nivel bancario." },
  { icon: FileText, title: "Historial completo", desc: "Accede a todo el historial de tus servicios y solicitudes en un solo lugar." },
  { icon: MapPin, title: "Seguimiento en tiempo real", desc: "Sigue el estado de tu solicitud en cada etapa del proceso de principio a fin." },
];

const TECH_BENEFITS = [
  { icon: Users, title: "Consigue más clientes", desc: "Accede a cientos de clientes que buscan activamente tu especialidad." },
  { icon: Briefcase, title: "Administra tus trabajos", desc: "Gestiona todas tus solicitudes y trabajos desde un panel centralizado." },
  { icon: Calendar, title: "Calendario inteligente", desc: "Organiza tu agenda y disponibilidad de forma simple y eficiente." },
  { icon: TrendingUp, title: "Incrementa tus ingresos", desc: "Más visibilidad, más solicitudes, más ingresos para hacer crecer tu negocio." },
  { icon: Star, title: "Calificaciones de clientes", desc: "Construye tu reputación con reseñas verificadas de clientes reales." },
  { icon: Clock, title: "Gestiona tu disponibilidad", desc: "Controla cuándo y cómo trabajas. Tú defines tus horarios y área de cobertura." },
];

const TECH_FAQ = [
  { q: "¿Cómo me registro como técnico?", a: "El proceso es simple: crea tu cuenta gratuita, completa tu perfil profesional con tu especialidad y experiencia, y comienza a recibir solicitudes de servicio de clientes en tu área." },
  { q: "¿Tiene algún costo unirse a Fixora?", a: "El registro es completamente gratuito. Solo se aplica una comisión mínima por cada servicio completado exitosamente a través de la plataforma." },
  { q: "¿Cómo recibo los pagos?", a: "Los pagos se gestionan de forma segura a través de la plataforma. Puedes retirar tus ganancias directamente a tu cuenta bancaria de forma periódica." },
  { q: "¿Puedo trabajar en cualquier ciudad?", a: "Sí, puedes indicar tu área de cobertura al registrarte y gestionar solicitudes en las zonas que prefieras según tu disponibilidad." },
  { q: "¿Qué pasa si tengo un problema con un cliente?", a: "Fixora cuenta con un equipo de soporte disponible para mediar y resolver cualquier inconveniente entre técnicos y clientes de forma justa y transparente." },
];

// ─── Shared Footer ─────────────────────────────────────────────────────────

function SharedFooter() {
  return (
    <footer className="bg-[#0F172A] text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <ImageWithFallback src={fixoraLogo} alt="Fixora" className="h-8 w-auto object-contain mb-4 brightness-0 invert" />
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-[200px]">
              La plataforma que conecta clientes con los mejores técnicos especializados.
            </p>
            <div className="flex gap-2 mt-5">
              {["fb", "tw", "in", "ig"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center text-[10px] font-bold text-[#64748B] hover:bg-[#2563EB] hover:text-white transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Plataforma</h4>
            <ul className="space-y-2.5">
              {["Cómo funciona", "Servicios", "Categorías", "Para técnicos", "Blog"].map((l) => (
                <li key={l}><a href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Empresa</h4>
            <ul className="space-y-2.5">
              {["Sobre nosotros", "Equipo", "Carreras", "Prensa", "Contacto"].map((l) => (
                <li key={l}><a href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {["Aviso de privacidad", "Términos y condiciones", "Política de cookies", "GDPR"].map((l) => (
                <li key={l}><a href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1E293B] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748B]">© {new Date().getFullYear()} Fixora. Todos los derechos reservados.</p>
          <div className="flex gap-5 text-xs text-[#64748B]">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── CLIENT LANDING ─────────────────────────────────────────────────────────

function ClientNavbar() {
  const { go } = useNav();
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <button onClick={() => go("home")} className="cursor-pointer flex-shrink-0">
            <ImageWithFallback src={fixoraLogo} alt="Fixora" className="h-8 w-auto object-contain" />
          </button>
          <div className="hidden lg:flex items-center gap-5">
            {["Inicio", "Cómo funciona", "Servicios", "Beneficios", "Contacto"].map((l) => (
              <a key={l} href="#" className="text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Btn variant="ghost" size="sm" onClick={() => go("client-login")}>Iniciar Sesión</Btn>
          <Btn variant="secondary" size="sm" onClick={() => go("client-register")}>Registrarse</Btn>
          <Btn variant="primary" size="sm" onClick={() => go("tech-landing")}>¿Eres Técnico?</Btn>
        </div>
        <button className="md:hidden p-2 text-[#475569] cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 py-4 flex flex-col gap-2">
          {["Inicio", "Cómo funciona", "Servicios", "Beneficios", "Contacto"].map((l) => (
            <a key={l} href="#" className="text-sm text-[#475569] py-2 border-b border-[#F1F5F9]">{l}</a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Btn variant="ghost" onClick={() => { go("client-login"); setOpen(false); }}>Iniciar Sesión</Btn>
            <Btn variant="secondary" onClick={() => { go("client-register"); setOpen(false); }}>Registrarse</Btn>
            <Btn variant="primary" onClick={() => { go("tech-landing"); setOpen(false); }}>¿Eres Técnico?</Btn>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-5">
        {/* Search bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-10 bg-[#F8FAFC] rounded-xl px-3.5 flex items-center gap-2">
            <Search size={14} className="text-[#94A3B8]" />
            <span className="text-sm text-[#94A3B8]">Buscar técnico...</span>
          </div>
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0">
            <Filter size={15} className="text-white" />
          </div>
        </div>
        {/* Tech card 1 */}
        <div className="bg-[#F8FAFC] rounded-2xl p-4 mb-2.5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
              <Plug size={20} className="text-[#2563EB]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0F172A]">Técnico Electricista</span>
                <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Disponible
                </span>
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">10 años de experiencia</div>
              <Stars rating={5} size={11} />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-1.5 text-xs font-semibold text-[#2563EB] border border-[#BFDBFE] rounded-lg hover:bg-[#EFF6FF] transition-colors">Ver Perfil</button>
            <button className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition-colors">Solicitar</button>
          </div>
        </div>
        {/* Tech card 2 */}
        <div className="bg-[#F8FAFC] rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
              <Droplets size={20} className="text-sky-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0F172A]">Técnico Plomero</span>
                <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Disponible
                </span>
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">8 años de experiencia</div>
              <Stars rating={4} size={11} />
            </div>
          </div>
        </div>
      </div>
      {/* Badge */}
      <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
        ✓ Verificado
      </div>
      {/* Floating confirmation */}
      <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-3 flex items-center gap-2.5 max-w-[200px]">
        <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
          <CheckCircle size={16} className="text-green-600" />
        </div>
        <div>
          <div className="text-xs font-bold text-[#0F172A]">Solicitud confirmada</div>
          <div className="text-xs text-[#64748B]">Técnico en camino</div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const { go } = useNav();
  return (
    <section className="bg-gradient-to-br from-[#EFF6FF] via-white to-[#F0F9FF] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#DBEAFE] text-[#1D4ED8] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Zap size={13} />
            La plataforma #1 de servicios técnicos
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold text-[#0F172A] leading-[1.15] mb-6">
            Conecta con el{" "}
            <span className="text-[#2563EB]">técnico perfecto</span>{" "}
            para tu hogar
          </h1>
          <p className="text-lg text-[#475569] mb-8 max-w-lg leading-relaxed">
            Encuentra técnicos verificados y especializados cerca de ti. Rápido, seguro y con garantía de calidad en cada servicio.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn variant="primary" size="lg" onClick={() => go("client-register")}>
              <Search size={18} />
              Buscar Técnico
            </Btn>
            <Btn variant="outline" size="lg" onClick={() => go("client-register")}>
              Crear Cuenta Gratis
            </Btn>
            <button
              onClick={() => go("tech-landing")}
              className="px-5 py-3.5 text-base font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer"
            >
              ¿Eres Técnico? →
            </button>
          </div>
          <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[#E2E8F0]">
            {[
              { value: "—", label: "Técnicos activos" },
              { value: "—", label: "Servicios completados" },
              { value: "—", label: "Clientes satisfechos" },
            ].map((s, i) => (
              <div key={i} className={`${i > 0 ? "pl-6 border-l border-[#E2E8F0]" : ""}`}>
                <div className="text-2xl font-extrabold text-[#0F172A]">{s.value}</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center pb-8">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: User, title: "Crea tu cuenta", desc: "Regístrate gratis en minutos. Solo necesitas tu nombre, correo y número de teléfono." },
    { icon: Search, title: "Busca un técnico", desc: "Explora técnicos verificados por especialidad, calificación y disponibilidad cerca de ti." },
    { icon: CheckCircle, title: "Solicita el servicio", desc: "Elige fecha, hora y describe tu problema. Recibirás confirmación en minutos." },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-3">Proceso simple</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4">¿Cómo funciona Fixora?</h2>
          <p className="text-[#64748B] max-w-xl mx-auto">En tres sencillos pasos, conecta con el técnico adecuado para resolver cualquier problema.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((s, i) => (
            <div key={i} className="text-center relative">
              {i < 2 && <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] border-t-2 border-dashed border-[#BFDBFE]" />}
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center mx-auto">
                  <s.icon size={28} className="text-[#2563EB]" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{s.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-3">¿Por qué elegirnos?</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4">Beneficios que marcan la diferencia</h2>
          <p className="text-[#64748B] max-w-xl mx-auto">Diseñado para darte la mejor experiencia al contratar servicios técnicos de confianza.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CLIENT_BENEFITS.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] transition-colors">
                <b.icon size={22} className="text-[#2563EB] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-[#0F172A] mb-2">{b.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-3">Especialidades</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4">Encuentra el servicio que necesitas</h2>
          <p className="text-[#64748B] max-w-xl mx-auto">Técnicos especializados en múltiples áreas para resolver cualquier problema en tu hogar o negocio.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((c, i) => (
            <button key={i} className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#F8FAFC] hover:bg-white hover:shadow-md border border-transparent hover:border-[#E2E8F0] transition-all duration-200 cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${c.bg} group-hover:scale-110 transition-transform duration-200`}>
                <c.icon size={26} className={c.color} />
              </div>
              <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors text-center leading-tight">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-3">Opiniones</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-[#64748B]">Reseñas reales de clientes. Los datos se cargarán desde la API.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-28 mb-1.5 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
              <Skeleton className="h-3 w-full mb-2 rounded-md" />
              <Skeleton className="h-3 w-4/5 mb-2 rounded-md" />
              <Skeleton className="h-3 w-3/5 rounded-md" />
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#94A3B8] mt-6">Las reseñas se cargarán desde la API una vez conectado el backend.</p>
      </div>
    </section>
  );
}

function CTASection() {
  const { go } = useNav();
  return (
    <section className="py-20 bg-gradient-to-br from-[#1E40AF] to-[#2563EB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-6">
          <Wrench size={28} className="text-white" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">¿Necesitas ayuda?</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          Encuentra al mejor técnico en minutos. Crea tu cuenta gratis y comienza hoy mismo.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Btn variant="secondary" size="lg" onClick={() => go("client-register")}>
            <Search size={18} />
            Buscar Técnico
          </Btn>
          <button
            onClick={() => go("client-register")}
            className="px-7 py-3.5 text-base font-semibold border-2 border-white/50 text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer"
          >
            Crear Cuenta Gratis
          </button>
        </div>
      </div>
    </section>
  );
}

function ClientLanding() {
  return (
    <div className="min-h-screen">
      <ClientNavbar />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
      <SharedFooter />
    </div>
  );
}

// ─── CLIENT AUTH ────────────────────────────────────────────────────────────

function AuthLayout({ children, title, subtitle, backTo = "home", backLabel = "Fixora" }: {
  children: React.ReactNode; title: string; subtitle: string;
  backTo?: Page; backLabel?: string;
}) {
  const { go } = useNav();
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="px-6 h-14 flex items-center border-b border-[#E2E8F0] bg-white">
        <button onClick={() => go(backTo)} className="cursor-pointer">
          <ImageWithFallback src={fixoraLogo} alt="Fixora" className="h-7 w-auto object-contain" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#E2E8F0] p-8">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1.5">{title}</h1>
            <p className="text-sm text-[#64748B]">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function ClientLogin() {
  const { go } = useNav();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Completa todos los campos");
    return;
  }

  try {
    setLoading(true);

    const respuesta = await loginUsuario(email, password);

    console.log("Respuesta del backend:", respuesta);

    localStorage.setItem("token", respuesta.token);

    go("client-dashboard");

  } catch (error: any) {
    console.error(error);

    setError(
      error.response?.data?.message || "Correo o contraseña incorrectos"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout title="Iniciar Sesión" subtitle="Bienvenido de vuelta a Fixora">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            <AlertCircle size={15} />{error}
          </div>
        )}
        <InputField label="Correo electrónico" id="cl-email" type="email" placeholder="correo@ejemplo.com"
          value={email} onChange={setEmail} icon={<Mail size={15} />} />
        <InputField label="Contraseña" id="cl-pw" type={showPw ? "text" : "password"} placeholder="Tu contraseña"
          value={password} onChange={setPassword} icon={<Lock size={15} />}
          rightEl={
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#94A3B8] hover:text-[#475569] cursor-pointer">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#475569]">
            <input type="checkbox" className="accent-[#2563EB] rounded" />
            Recordarme
          </label>
          <a href="#" className="text-sm text-[#2563EB] hover:underline font-medium">¿Olvidaste tu contraseña?</a>
        </div>
        <Btn type="submit" size="lg" loading={loading} className="w-full mt-1">
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Btn>
      </form>
      <p className="text-center text-sm text-[#64748B] mt-5">
        ¿No tienes cuenta?{" "}
        <button onClick={() => go("client-register")} className="text-[#2563EB] font-semibold hover:underline cursor-pointer">
          Regístrate gratis
        </button>
      </p>
      <div className="border-t border-[#E2E8F0] mt-5 pt-4 text-center">
        <p className="text-xs text-[#94A3B8] mb-3">¿Eres un técnico?</p>
        <Btn variant="outline" className="w-full" onClick={() => go("tech-login")}>
          Ingresar como Técnico
        </Btn>
      </div>
    </AuthLayout>
  );
}

function ClientRegister() {
  const { go } = useNav();
  const [form, setForm] = useState({
    nombre: "", apellidoP: "", apellidoM: "", email: "",
    telefono: "", password: "", confirmPassword: "", terms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es requerido";
    if (!form.apellidoP.trim()) e.apellidoP = "El apellido paterno es requerido";
    if (!form.email.includes("@")) e.email = "Correo inválido";
    if (!form.telefono.trim()) e.telefono = "El teléfono es requerido";
    if (form.password.length < 8) e.password = "Mínimo 8 caracteres";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Las contraseñas no coinciden";
    if (!form.terms) e.terms = "Debes aceptar los términos y condiciones";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Simulates: POST /api/auth/register → JWT → redirect
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(() => go("client-dashboard"), 1500); }, 1800);
  };

  if (success) {
    return (
      <AuthLayout title="¡Bienvenido!" subtitle="Tu cuenta ha sido creada exitosamente">
        <div className="flex flex-col items-center py-10 gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <p className="text-[#475569] text-sm">Redirigiendo a tu dashboard...</p>
          <Loader2 size={20} className="animate-spin text-[#2563EB]" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Crear Cuenta" subtitle="Únete a Fixora y encuentra al mejor técnico">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Nombre" id="reg-nom" placeholder="Nombre" value={form.nombre}
            onChange={(v) => set("nombre", v)} error={errors.nombre} required />
          <InputField label="Apellido paterno" id="reg-ap" placeholder="Apellido P." value={form.apellidoP}
            onChange={(v) => set("apellidoP", v)} error={errors.apellidoP} required />
        </div>
        <InputField label="Apellido materno" id="reg-am" placeholder="Apellido M. (opcional)"
          value={form.apellidoM} onChange={(v) => set("apellidoM", v)} />
        <InputField label="Correo electrónico" id="reg-email" type="email" placeholder="correo@ejemplo.com"
          value={form.email} onChange={(v) => set("email", v)} error={errors.email} icon={<Mail size={15} />} required />
        <InputField label="Teléfono" id="reg-tel" type="tel" placeholder="+52 000 000 0000"
          value={form.telefono} onChange={(v) => set("telefono", v)} error={errors.telefono} icon={<Phone size={15} />} required />
        <div>
          <InputField label="Contraseña" id="reg-pw" type={showPw ? "text" : "password"} placeholder="Mínimo 8 caracteres"
            value={form.password} onChange={(v) => set("password", v)} error={errors.password} icon={<Lock size={15} />}
            rightEl={
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#94A3B8] cursor-pointer">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            } required />
          <PasswordStrength password={form.password} />
        </div>
        <InputField label="Confirmar contraseña" id="reg-cpw" type="password" placeholder="Repite tu contraseña"
          value={form.confirmPassword} onChange={(v) => set("confirmPassword", v)}
          error={errors.confirmPassword} icon={<Lock size={15} />} required />
        <label className="flex items-start gap-2.5 cursor-pointer text-sm text-[#475569]">
          <input type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)}
            className="mt-0.5 accent-[#2563EB] flex-shrink-0" />
          <span>Acepto los <a href="#" className="text-[#2563EB] hover:underline">Términos y condiciones</a> y el <a href="#" className="text-[#2563EB] hover:underline">Aviso de privacidad</a></span>
        </label>
        {errors.terms && <p className="text-xs text-red-500 -mt-2 flex items-center gap-1"><AlertCircle size={11} />{errors.terms}</p>}
        <Btn type="submit" size="lg" loading={loading} className="w-full mt-1">
          {loading ? "Creando cuenta..." : "Registrarme"}
        </Btn>
      </form>
      <p className="text-center text-sm text-[#64748B] mt-5">
        ¿Ya tienes cuenta?{" "}
        <button onClick={() => go("client-login")} className="text-[#2563EB] font-semibold hover:underline cursor-pointer">
          Inicia sesión
        </button>
      </p>
    </AuthLayout>
  );
}

// ─── CLIENT DASHBOARD ──────────────────────────────────────────────────────

const CLIENT_NAV = [
  { id: "overview", label: "Inicio", icon: Home },
  { id: "search", label: "Buscar Técnicos", icon: Search },
  { id: "requests", label: "Mis Solicitudes", icon: FileText },
  { id: "profile", label: "Mi Perfil", icon: User },
  { id: "settings", label: "Configuración", icon: Settings },
] as const;

function DashSidebar({ view, setView, onLogout, sidebarOpen, setSidebarOpen }: {
  view: ClientView; setView: (v: ClientView) => void;
  onLogout: () => void; sidebarOpen: boolean; setSidebarOpen: (b: boolean) => void;
}) {
  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E2E8F0] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-5 h-14 flex items-center justify-between border-b border-[#E2E8F0]">
          <ImageWithFallback src={fixoraLogo} alt="Fixora" className="h-7 w-auto object-contain" />
          <button className="lg:hidden text-[#64748B] cursor-pointer" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#EFF6FF] mb-3">
            <div className="w-9 h-9 rounded-full bg-[#BFDBFE] flex items-center justify-center text-[#2563EB] font-bold text-sm flex-shrink-0">
              <User size={16} />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm text-[#0F172A] truncate">Mi Cuenta</div>
              <div className="text-xs text-[#64748B] truncate">cliente@fixora.mx</div>
            </div>
          </div>
          <nav className="flex flex-col gap-0.5">
            {CLIENT_NAV.map((item) => (
              <button key={item.id}
                onClick={() => { setView(item.id as ClientView); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all cursor-pointer ${view === item.id ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"}`}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-3 border-t border-[#E2E8F0]">
          <button onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-red-500 hover:bg-red-50 transition-all cursor-pointer">
            <LogOut size={17} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}

function DashOverview({ onSearch, onRequests }: { onSearch: () => void; onRequests: () => void }) {
  const stats = [
    { label: "Solicitudes totales", value: "—", icon: FileText, cls: "bg-[#EFF6FF] text-[#2563EB]" },
    { label: "En proceso", value: "—", icon: Clock, cls: "bg-amber-50 text-amber-600" },
    { label: "Completadas", value: "—", icon: CheckCircle, cls: "bg-green-50 text-green-600" },
    { label: "Técnicos favoritos", value: "—", icon: Star, cls: "bg-violet-50 text-violet-600" },
  ];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">¡Bienvenido a Fixora!</h2>
        <p className="text-sm text-[#64748B]">Los datos se cargarán desde la API una vez conectado el backend.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.cls}`}>
              <s.icon size={17} />
            </div>
            <div className="text-2xl font-extrabold text-[#0F172A] mb-0.5">{s.value}</div>
            <div className="text-xs text-[#64748B]">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white">
          <Search size={26} className="mb-3 opacity-80" />
          <h3 className="text-lg font-bold mb-1.5">Buscar Técnico</h3>
          <p className="text-blue-100 text-sm mb-4">Encuentra al especialista adecuado para tu problema.</p>
          <Btn variant="secondary" size="sm" onClick={onSearch}>Buscar ahora</Btn>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <FileText size={26} className="mb-3 text-[#2563EB]" />
          <h3 className="text-lg font-bold text-[#0F172A] mb-1.5">Mis Solicitudes</h3>
          <p className="text-[#64748B] text-sm mb-4">Revisa el estado de tus servicios activos e historial.</p>
          <Btn variant="outline" size="sm" onClick={onRequests}>Ver solicitudes</Btn>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <h3 className="font-bold text-[#0F172A] mb-4">Actividad reciente</h3>
        <EmptyState icon={<Clock size={24} />} title="Sin actividad reciente"
          description="Tus solicitudes y servicios recientes aparecerán aquí."
          action={<Btn variant="primary" size="sm" onClick={onSearch}>Hacer mi primera solicitud</Btn>} />
      </div>
    </div>
  );
}

function TechCard({ index }: { index: number }) {
  const cat = CATEGORIES[index % CATEGORIES.length];
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="h-1.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6]" />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.bg}`}>
            <cat.icon size={22} className={cat.color} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <Skeleton className="h-4 w-24 rounded-md" />
              <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Disponible
              </span>
            </div>
            <div className="text-xs text-[#64748B] mb-1">{cat.label}</div>
            <div className="flex items-center gap-1">
              <Stars rating={0} size={11} />
              <span className="text-xs text-[#94A3B8]">— (—)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#64748B] mb-4">
          <span className="flex items-center gap-1"><Briefcase size={11} />— años exp.</span>
          <span className="flex items-center gap-1"><MapPin size={11} />— km</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 text-xs font-semibold text-[#2563EB] border border-[#BFDBFE] rounded-xl hover:bg-[#EFF6FF] transition-colors cursor-pointer">
            Ver Perfil
          </button>
          <button className="flex-1 py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-[#1D4ED8] transition-colors cursor-pointer">
            Solicitar Servicio
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchTechs() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Buscar Técnicos</h2>
        <p className="text-sm text-[#64748B]">Preparado para consumir GET /api/tecnicos con filtros.</p>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative sm:col-span-2">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Nombre o especialidad..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#E2E8F0] focus:border-[#2563EB] text-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all" />
          </div>
          <SelectField value={specialty} onChange={setSpecialty}
            options={CATEGORIES.map((c) => ({ value: c.label, label: c.label }))} placeholder="Especialidad" />
          <SelectField value="" onChange={() => {}}
            options={[{ value: "5", label: "5 estrellas" }, { value: "4", label: "4+ estrellas" }]} placeholder="Calificación" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }, (_, i) => <TechCard key={i} index={i} />)}
      </div>
    </div>
  );
}

function MyRequests() {
  const [filter, setFilter] = useState("Todas");
  const statuses = ["Pendiente", "Aceptada", "En proceso", "Finalizada", "Cancelada"];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Mis Solicitudes</h2>
        <p className="text-sm text-[#64748B]">Preparado para consumir GET /api/solicitudes</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Todas", ...statuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${filter === s ? "bg-[#2563EB] text-white shadow-sm" : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-[#E2E8F0]">
          {["Servicio", "Técnico", "Fecha", "Estado", "Acciones"].map((h) => (
            <div key={h} className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">{h}</div>
          ))}
        </div>
        <EmptyState icon={<FileText size={26} />} title="Sin solicitudes"
          description="Aún no tienes solicitudes de servicio. Los datos se cargarán desde la API." />
      </div>
    </div>
  );
}

function ClientProfile() {
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulates: PUT /api/usuarios/perfil
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 1000);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Mi Perfil</h2>
        <p className="text-sm text-[#64748B]">Preparado para GET/PUT /api/usuarios/perfil</p>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E2E8F0]">
          <div className="w-20 h-20 rounded-2xl bg-[#EFF6FF] border-2 border-[#BFDBFE] flex items-center justify-center text-[#2563EB]">
            <User size={36} />
          </div>
          <div>
            <Btn variant="outline" size="sm"><Edit size={13} />Cambiar foto</Btn>
            <p className="text-xs text-[#94A3B8] mt-1.5">PNG, JPG o WebP. Máx 2MB</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Nombre completo" value={form.nombre} onChange={(v) => set("nombre", v)} placeholder="—" icon={<User size={15} />} />
          <InputField label="Correo electrónico" type="email" value={form.correo} onChange={(v) => set("correo", v)} placeholder="—" icon={<Mail size={15} />} />
          <InputField label="Teléfono" type="tel" value={form.telefono} onChange={(v) => set("telefono", v)} placeholder="—" icon={<Phone size={15} />} />
        </div>
        <div className="border-t border-[#E2E8F0] mt-5 pt-5 flex items-center gap-3">
          <Btn variant="primary" loading={saving} onClick={handleSave}>{saving ? "Guardando..." : "Guardar cambios"}</Btn>
          {saved && <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium"><CheckCircle size={15} />¡Cambios guardados!</span>}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-bold text-[#0F172A] mb-4">Cambiar contraseña</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Contraseña actual" type="password" value="" onChange={() => {}} placeholder="••••••••" icon={<Lock size={15} />} />
          <InputField label="Nueva contraseña" type="password" value="" onChange={() => {}} placeholder="••••••••" icon={<Lock size={15} />} />
        </div>
        <div className="mt-4"><Btn variant="outline">Actualizar contraseña</Btn></div>
      </div>
    </div>
  );
}

function DashSettings() {
  return (
    <div className="space-y-5 max-w-2xl">
      <h2 className="text-xl font-extrabold text-[#0F172A]">Configuración</h2>
      <div className="bg-white rounded-2xl border border-[#E2E8F0]">
        <EmptyState icon={<Settings size={26} />} title="Configuración en desarrollo" description="Esta sección estará disponible próximamente." />
      </div>
    </div>
  );
}

function ClientDashboard() {
  const { go } = useNav();
  const [view, setView] = useState<ClientView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (view) {
      case "overview": return <DashOverview onSearch={() => setView("search")} onRequests={() => setView("requests")} />;
      case "search": return <SearchTechs />;
      case "requests": return <MyRequests />;
      case "profile": return <ClientProfile />;
      case "settings": return <DashSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <DashSidebar view={view} setView={setView} onLogout={() => go("home")}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-[#64748B] cursor-pointer" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
            <h1 className="text-sm font-bold text-[#0F172A]">{CLIENT_NAV.find((n) => n.id === view)?.label}</h1>
          </div>
          <button className="relative p-2 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-[#F8FAFC] cursor-pointer">
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563EB] rounded-full" />
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{renderView()}</main>
      </div>
    </div>
  );
}

// ─── TECH LANDING ───────────────────────────────────────────────────────────

function TechNavbar() {
  const { go } = useNav();
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-[#0F172A]/97 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <button onClick={() => go("home")} className="cursor-pointer flex-shrink-0">
            <ImageWithFallback src={fixoraLogo} alt="Fixora" className="h-7 w-auto object-contain brightness-0 invert" />
          </button>
          <div className="hidden lg:flex items-center gap-5">
            {["Inicio", "Beneficios", "Cómo funciona", "Preguntas frecuentes", "Contacto"].map((l) => (
              <a key={l} href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => go("tech-login")}
            className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer">
            Iniciar Sesión
          </button>
          <Btn variant="primary" size="sm" onClick={() => go("tech-register")}>Registrarme como Técnico</Btn>
        </div>
        <button className="md:hidden p-2 text-white/80 cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0F172A] border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          {["Inicio", "Beneficios", "Cómo funciona", "FAQ", "Contacto"].map((l) => (
            <a key={l} href="#" className="text-sm text-white/70 py-2 border-b border-white/5">{l}</a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button onClick={() => { go("tech-login"); setOpen(false); }}
              className="w-full py-2.5 text-sm font-semibold border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              Iniciar Sesión
            </button>
            <Btn variant="primary" onClick={() => { go("tech-register"); setOpen(false); }}>Registrarme como Técnico</Btn>
          </div>
        </div>
      )}
    </nav>
  );
}

function TechHero() {
  const { go } = useNav();
  return (
    <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#2563EB] opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 rounded-full bg-[#3B82F6] opacity-10 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 border border-[#2563EB]/30 text-[#93C5FD] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <TrendingUp size={13} />
            Haz crecer tu negocio
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold text-white leading-[1.15] mb-6">
            Haz crecer tu trabajo{" "}
            <span className="text-[#60A5FA]">con Fixora</span>
          </h1>
          <p className="text-lg text-[#94A3B8] mb-8 max-w-lg leading-relaxed">
            Conecta con cientos de clientes, administra tus trabajos y organiza tu agenda desde un solo lugar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn variant="primary" size="lg" onClick={() => go("tech-register")}>
              <Users size={18} />
              Registrarme como Técnico
            </Btn>
            <button onClick={() => go("tech-login")}
              className="px-7 py-3.5 text-base font-semibold border-2 border-white/25 text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              Iniciar Sesión
            </button>
          </div>
          <button onClick={() => go("home")}
            className="mt-7 text-sm text-[#64748B] hover:text-[#94A3B8] transition-colors cursor-pointer">
            ← Volver a la página principal
          </button>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#2563EB] rounded-full blur-3xl opacity-20 scale-110" />
            <ImageWithFallback src={techIconImg} alt="Técnico profesional Fixora"
              className="relative w-64 h-64 object-contain drop-shadow-2xl" />
            <div className="absolute -top-8 -right-10 bg-white rounded-2xl shadow-2xl p-3.5 text-center min-w-[110px]">
              <div className="text-2xl font-extrabold text-[#0F172A]">—</div>
              <div className="text-xs text-[#64748B] mt-0.5">Clientes activos</div>
            </div>
            <div className="absolute -bottom-6 -left-10 bg-white rounded-2xl shadow-2xl p-3.5 text-center min-w-[110px]">
              <div className="text-2xl font-extrabold text-[#0F172A]">—</div>
              <div className="text-xs text-[#64748B] mt-0.5">Servicios/mes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechBenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-3">Ventajas para técnicos</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4">¿Por qué unirte a Fixora?</h2>
          <p className="text-[#64748B] max-w-xl mx-auto">Todo lo que necesitas para hacer crecer tu negocio de servicios técnicos.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_BENEFITS.map((b, i) => (
            <div key={i} className="group bg-[#F8FAFC] rounded-2xl p-6 border border-transparent hover:border-[#2563EB]/20 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#0F172A] group-hover:bg-[#2563EB] flex items-center justify-center mb-4 transition-colors">
                <b.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-[#0F172A] mb-2">{b.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowToJoinSection() {
  const steps = [
    { title: "Regístrate", desc: "Crea tu cuenta gratis con tus datos básicos y profesionales." },
    { title: "Completa tu perfil", desc: "Agrega tu especialidad, experiencia y certificaciones para destacar." },
    { title: "Recibe solicitudes", desc: "Los clientes encontrarán tu perfil y comenzarán a contactarte." },
    { title: "Acepta trabajos", desc: "Revisa cada solicitud y acepta las que más te convengan." },
    { title: "Finaliza y cobra", desc: "Completa el trabajo, recibe tu calificación y tus ganancias." },
  ];
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-3">Proceso de registro</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4">Empieza en 5 pasos</h2>
        </div>
        <div className="relative flex flex-col gap-0">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-[#E2E8F0] hidden sm:block" />
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-5 sm:gap-8 pb-8 last:pb-0">
              <div className="relative z-10 w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-base flex-shrink-0 shadow-lg shadow-blue-500/20">
                {i + 1}
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] flex-1 mt-1.5">
                <h3 className="font-bold text-[#0F172A] mb-1">{s.title}</h3>
                <p className="text-sm text-[#64748B]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStatsSection() {
  const stats = [
    { label: "Técnicos registrados", icon: Users },
    { label: "Servicios completados", icon: CheckCircle },
    { label: "Clientes satisfechos", icon: Star },
    { label: "Calificación promedio", icon: Award },
  ];
  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">Fixora en números</h2>
          <p className="text-[#64748B]">Los datos se cargarán desde la API del backend.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/8">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB]/20 flex items-center justify-center mx-auto mb-4">
                <s.icon size={22} className="text-[#60A5FA]" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">—</div>
              <div className="text-sm text-[#64748B]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4">Preguntas frecuentes</h2>
        </div>
        <div className="space-y-3">
          {TECH_FAQ.map((faq, i) => (
            <div key={i} className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                <span className="font-semibold text-[#0F172A] text-sm">{faq.q}</span>
                <ChevronDown size={17} className={`flex-shrink-0 text-[#94A3B8] transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] pt-4">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCTASection() {
  const { go } = useNav();
  return (
    <section className="py-20 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center mx-auto mb-6">
          <TrendingUp size={28} className="text-[#60A5FA]" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Empieza hoy mismo a conseguir más clientes</h2>
        <p className="text-[#94A3B8] text-lg mb-8 max-w-xl mx-auto">
          Únete a la plataforma que está transformando la forma en que los técnicos consiguen trabajo.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Btn variant="primary" size="lg" onClick={() => go("tech-register")}>
            <Users size={18} />
            Crear mi Cuenta
          </Btn>
          <button onClick={() => go("tech-login")}
            className="px-7 py-3.5 text-base font-semibold border-2 border-white/25 text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer">
            Ya tengo cuenta
          </button>
        </div>
      </div>
    </section>
  );
}

function TechLanding() {
  return (
    <div className="min-h-screen">
      <TechNavbar />
      <TechHero />
      <TechBenefitsSection />
      <HowToJoinSection />
      <TechStatsSection />
      <FAQSection />
      <TechCTASection />
      <SharedFooter />
    </div>
  );
}

// ─── TECH AUTH ──────────────────────────────────────────────────────────────

function TechAuthLayout({ children, title, subtitle }: {
  children: React.ReactNode; title: string; subtitle: string;
}) {
  const { go } = useNav();
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      <div className="px-6 h-14 flex items-center border-b border-white/10">
        <button onClick={() => go("tech-landing")} className="cursor-pointer">
          <ImageWithFallback src={fixoraLogo} alt="Fixora" className="h-7 w-auto object-contain brightness-0 invert" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
              <ImageWithFallback src={techIconImg} alt="Técnico" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0F172A]">{title}</h1>
              <p className="text-sm text-[#64748B]">{subtitle}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function TechLogin() {
  const { go } = useNav();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Completa todos los campos."); return; }
    setError("");
    setLoading(true);
    // Simulates: POST /api/tecnicos/login → JWT → redirect
    setTimeout(() => { setLoading(false); go("tech-dashboard"); }, 1500);
  };

  return (
    <TechAuthLayout title="Iniciar Sesión" subtitle="Panel de técnicos Fixora">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            <AlertCircle size={15} />{error}
          </div>
        )}
        <InputField label="Correo electrónico" id="tl-email" type="email" placeholder="correo@ejemplo.com"
          value={email} onChange={setEmail} icon={<Mail size={15} />} />
        <InputField label="Contraseña" id="tl-pw" type={showPw ? "text" : "password"} placeholder="Tu contraseña"
          value={password} onChange={setPassword} icon={<Lock size={15} />}
          rightEl={
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#94A3B8] hover:text-[#475569] cursor-pointer">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#475569]">
            <input type="checkbox" className="accent-[#2563EB] rounded" />
            Recordarme
          </label>
          <a href="#" className="text-sm text-[#2563EB] hover:underline font-medium">¿Olvidaste tu contraseña?</a>
        </div>
        <Btn type="submit" size="lg" loading={loading} className="w-full mt-1">
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Btn>
      </form>
      <p className="text-center text-sm text-[#64748B] mt-5">
        ¿No tienes cuenta?{" "}
        <button onClick={() => go("tech-register")} className="text-[#2563EB] font-semibold hover:underline cursor-pointer">
          Regístrate como técnico
        </button>
      </p>
      <div className="border-t border-[#E2E8F0] mt-5 pt-4 text-center">
        <button onClick={() => go("client-login")} className="text-xs text-[#94A3B8] hover:text-[#475569] cursor-pointer transition-colors">
          ¿Eres cliente? Inicia sesión aquí →
        </button>
      </div>
    </TechAuthLayout>
  );
}

function TechRegister() {
  const { go } = useNav();
  const [form, setForm] = useState({
    nombre: "", apellidoP: "", apellidoM: "", email: "", telefono: "",
    especialidad: "", experiencia: "", descripcion: "", estado: "", ciudad: "",
    password: "", confirmPassword: "", terms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.nombre.trim()) errs.nombre = "Requerido";
    if (!form.email.includes("@")) errs.email = "Correo inválido";
    if (!form.especialidad) errs.especialidad = "Selecciona una especialidad";
    if (form.password.length < 8) errs.password = "Mínimo 8 caracteres";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Las contraseñas no coinciden";
    if (!form.terms) errs.terms = "Debes aceptar los términos";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Simulates: POST /api/tecnicos/register → JWT → redirect
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(() => go("tech-dashboard"), 1500); }, 2000);
  };

  if (success) {
    return (
      <TechAuthLayout title="¡Bienvenido!" subtitle="Tu cuenta de técnico fue creada">
        <div className="flex flex-col items-center py-10 gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <p className="text-[#475569] text-sm text-center">Configurando tu panel de técnico...</p>
          <Loader2 size={20} className="animate-spin text-[#2563EB]" />
        </div>
      </TechAuthLayout>
    );
  }

  const ESTADOS = ["Aguascalientes", "Baja California", "CDMX", "Guadalajara", "Jalisco",
    "Monterrey", "Nuevo León", "Puebla", "Querétaro", "Veracruz", "Yucatán"]
    .map((e) => ({ value: e, label: e }));
  const EXP_OPTS = [1, 2, 3, 5, 7, 10, 15, 20].map((n) => ({ value: String(n), label: `${n} año${n > 1 ? "s" : ""}` }));

  return (
    <TechAuthLayout title="Registro de Técnico" subtitle="Únete a la red de profesionales Fixora">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Nombre" id="tr-nom" placeholder="Nombre" value={form.nombre}
            onChange={(v) => set("nombre", v)} error={errors.nombre} required />
          <InputField label="Ap. Paterno" id="tr-ap" placeholder="Paterno" value={form.apellidoP}
            onChange={(v) => set("apellidoP", v)} required />
        </div>
        <InputField label="Apellido materno" id="tr-am" placeholder="Materno (opcional)"
          value={form.apellidoM} onChange={(v) => set("apellidoM", v)} />
        <InputField label="Correo electrónico" id="tr-email" type="email" placeholder="correo@ejemplo.com"
          value={form.email} onChange={(v) => set("email", v)} error={errors.email} icon={<Mail size={15} />} required />
        <InputField label="Teléfono" id="tr-tel" type="tel" placeholder="+52 000 000 0000"
          value={form.telefono} onChange={(v) => set("telefono", v)} icon={<Phone size={15} />} required />
        <SelectField label="Especialidad" value={form.especialidad} onChange={(v) => set("especialidad", v)}
          options={CATEGORIES.map((c) => ({ value: c.label, label: c.label }))}
          placeholder="Selecciona especialidad" error={errors.especialidad} required />
        <SelectField label="Años de experiencia" value={form.experiencia} onChange={(v) => set("experiencia", v)}
          options={EXP_OPTS} placeholder="Experiencia" required />
        <TextareaField label="Descripción profesional" value={form.descripcion}
          onChange={(v) => set("descripcion", v)} rows={3}
          placeholder="Cuéntanos sobre tu experiencia y habilidades..." required />
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Estado" value={form.estado} onChange={(v) => set("estado", v)} options={ESTADOS} placeholder="Estado" required />
          <InputField label="Ciudad" id="tr-ciudad" placeholder="Tu ciudad" value={form.ciudad} onChange={(v) => set("ciudad", v)} required />
        </div>
        <div>
          <InputField label="Contraseña" id="tr-pw" type={showPw ? "text" : "password"} placeholder="Mínimo 8 caracteres"
            value={form.password} onChange={(v) => set("password", v)} error={errors.password} icon={<Lock size={15} />}
            rightEl={
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#94A3B8] cursor-pointer">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            } required />
          <PasswordStrength password={form.password} />
        </div>
        <InputField label="Confirmar contraseña" id="tr-cpw" type="password" placeholder="Repite tu contraseña"
          value={form.confirmPassword} onChange={(v) => set("confirmPassword", v)}
          error={errors.confirmPassword} icon={<Lock size={15} />} required />
        <label className="flex items-start gap-2.5 cursor-pointer text-sm text-[#475569]">
          <input type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)}
            className="mt-0.5 accent-[#2563EB] flex-shrink-0" />
          <span>Acepto los <a href="#" className="text-[#2563EB] hover:underline">Términos</a> y el <a href="#" className="text-[#2563EB] hover:underline">Aviso de privacidad</a></span>
        </label>
        {errors.terms && <p className="text-xs text-red-500 -mt-2 flex items-center gap-1"><AlertCircle size={11} />{errors.terms}</p>}
        <Btn type="submit" size="lg" loading={loading} className="w-full mt-1">
          {loading ? "Creando cuenta..." : "Registrarme como Técnico"}
        </Btn>
      </form>
      <p className="text-center text-sm text-[#64748B] mt-5">
        ¿Ya tienes cuenta?{" "}
        <button onClick={() => go("tech-login")} className="text-[#2563EB] font-semibold hover:underline cursor-pointer">
          Inicia sesión
        </button>
      </p>
    </TechAuthLayout>
  );
}

// ─── TECH DASHBOARD ─────────────────────────────────────────────────────────

const TECH_NAV = [
  { id: "overview", label: "Inicio", icon: Home },
  { id: "requests", label: "Solicitudes", icon: Bell },
  { id: "calendar", label: "Calendario", icon: Calendar },
  { id: "jobs", label: "Trabajos", icon: Briefcase },
  { id: "profile", label: "Mi Perfil", icon: User },
  { id: "settings", label: "Configuración", icon: Settings },
] as const;

function TechDashSidebar({ view, setView, onLogout, open, setOpen }: {
  view: TechView; setView: (v: TechView) => void;
  onLogout: () => void; open: boolean; setOpen: (b: boolean) => void;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0F172A] flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-5 h-14 flex items-center justify-between border-b border-white/10">
          <ImageWithFallback src={fixoraLogo} alt="Fixora" className="h-7 w-auto object-contain brightness-0 invert" />
          <button className="lg:hidden text-white/60 cursor-pointer" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/8 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
              <Wrench size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm text-white truncate">Panel Técnico</div>
              <div className="text-xs text-[#64748B] truncate">tecnico@fixora.mx</div>
            </div>
          </div>
          <nav className="flex flex-col gap-0.5">
            {TECH_NAV.map((item) => (
              <button key={item.id}
                onClick={() => { setView(item.id as TechView); setOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all cursor-pointer ${view === item.id ? "bg-[#2563EB] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
              >
                <item.icon size={17} />
                <span className="flex-1">{item.label}</span>
                {item.id === "requests" && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">—</span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-3 border-t border-white/10">
          <button onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-red-400 hover:bg-red-900/20 transition-all cursor-pointer">
            <LogOut size={17} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}

function TechDashHome() {
  const stats = [
    { label: "Solicitudes nuevas", value: "—", icon: Bell, cls: "bg-[#EFF6FF] text-[#2563EB]" },
    { label: "Trabajos activos", value: "—", icon: Briefcase, cls: "bg-amber-50 text-amber-600" },
    { label: "Completados este mes", value: "—", icon: CheckCircle, cls: "bg-green-50 text-green-600" },
    { label: "Calificación promedio", value: "—", icon: Star, cls: "bg-violet-50 text-violet-600" },
  ];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Panel del Técnico</h2>
        <p className="text-sm text-[#64748B]">Los datos se cargarán desde la API una vez conectado el backend.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.cls}`}>
              <s.icon size={17} />
            </div>
            <div className="text-2xl font-extrabold text-[#0F172A] mb-0.5">{s.value}</div>
            <div className="text-xs text-[#64748B]">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
          <h3 className="font-bold text-[#0F172A] mb-4">Solicitudes recientes</h3>
          <EmptyState icon={<Bell size={22} />} title="Sin solicitudes nuevas"
            description="Las nuevas solicitudes de clientes aparecerán aquí." />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
          <h3 className="font-bold text-[#0F172A] mb-4">Próximos trabajos</h3>
          <EmptyState icon={<Calendar size={22} />} title="Agenda vacía"
            description="Tus trabajos programados aparecerán aquí." />
        </div>
      </div>
    </div>
  );
}

function TechRequests() {
  const [tab, setTab] = useState("Pendiente");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Solicitudes</h2>
        <p className="text-sm text-[#64748B]">Preparado para GET /api/solicitudes (filtradas por técnico)</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Pendiente", "Aceptada", "En proceso", "Finalizada", "Cancelada"].map((s) => (
          <button key={s} onClick={() => setTab(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${tab === s ? "bg-[#0F172A] text-white" : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0]">
        <EmptyState icon={<FileText size={26} />}
          title={`Sin solicitudes ${tab.toLowerCase()}`}
          description="Los datos se cargarán desde la API del backend." />
      </div>
    </div>
  );
}

function TechCalendar() {
  const [calView, setCalView] = useState<"week" | "month">("week");
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const hours = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Calendario</h2>
          <p className="text-sm text-[#64748B]">Preparado para consumir eventos desde la API</p>
        </div>
        <div className="flex gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1">
          {(["week", "month"] as const).map((v) => (
            <button key={v} onClick={() => setCalView(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${calView === v ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:text-[#0F172A]"}`}>
              {v === "week" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-auto">
        {calView === "week" ? (
          <div className="min-w-[600px]">
            <div className="grid grid-cols-8 border-b border-[#E2E8F0] sticky top-0 bg-white">
              <div className="p-3 text-xs text-[#94A3B8] font-medium" />
              {days.map((d, i) => (
                <div key={i} className="p-3 text-center border-l border-[#E2E8F0]">
                  <div className="text-xs text-[#64748B] font-semibold">{d}</div>
                  <div className="text-sm font-bold text-[#0F172A] mt-0.5">—</div>
                </div>
              ))}
            </div>
            {hours.map((h, i) => (
              <div key={i} className="grid grid-cols-8 border-b border-[#E2E8F0] last:border-0">
                <div className="p-2 text-xs text-[#94A3B8] text-right pr-3 font-medium">{h}</div>
                {days.map((_, j) => (
                  <div key={j} className="border-l border-[#E2E8F0] h-12 hover:bg-[#F8FAFC] transition-colors cursor-pointer" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={<Calendar size={26} />} title="Vista mensual"
            description="Los eventos del calendario se cargarán desde la API." />
        )}
      </div>
    </div>
  );
}

function TechJobs() {
  const [tab, setTab] = useState("En proceso");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Mis Trabajos</h2>
        <p className="text-sm text-[#64748B]">Gestiona todos tus servicios activos e historial</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Pendientes", "Aceptados", "En proceso", "Finalizados", "Cancelados"].map((s) => (
          <button key={s} onClick={() => setTab(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${tab === s ? "bg-[#0F172A] text-white" : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0]">
        <EmptyState icon={<Briefcase size={26} />}
          title={`Sin trabajos ${tab.toLowerCase()}`}
          description="Los datos se cargarán desde la API." />
      </div>
    </div>
  );
}

function TechProfile() {
  const [form, setForm] = useState({ nombre: "", especialidad: "", experiencia: "", descripcion: "" });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const [available, setAvailable] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulates: PUT /api/tecnicos/perfil
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 1000);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">Mi Perfil Técnico</h2>
        <p className="text-sm text-[#64748B]">Preparado para GET/PUT /api/tecnicos/perfil</p>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E2E8F0]">
          <div className="w-20 h-20 rounded-2xl bg-[#0F172A] flex items-center justify-center">
            <Wrench size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <Btn variant="outline" size="sm"><Edit size={13} />Cambiar foto</Btn>
            <p className="text-xs text-[#94A3B8] mt-1.5">PNG, JPG. Máx 2MB</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
            <span className="text-sm font-semibold text-[#0F172A]">Disponible</span>
            <div onClick={() => setAvailable(!available)}
              className={`relative w-11 h-6 rounded-full transition-all cursor-pointer ${available ? "bg-green-500" : "bg-[#CBD5E1]"}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${available ? "left-6" : "left-1"}`} />
            </div>
          </label>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Nombre completo" value={form.nombre} onChange={(v) => set("nombre", v)} placeholder="—" icon={<User size={15} />} />
          <SelectField label="Especialidad" value={form.especialidad} onChange={(v) => set("especialidad", v)}
            options={CATEGORIES.map((c) => ({ value: c.label, label: c.label }))} placeholder="—" />
          <SelectField label="Años de experiencia" value={form.experiencia} onChange={(v) => set("experiencia", v)}
            options={[1, 2, 3, 5, 7, 10, 15].map((n) => ({ value: String(n), label: `${n} años` }))} placeholder="—" />
        </div>
        <div className="mt-4">
          <TextareaField label="Descripción profesional" value={form.descripcion} onChange={(v) => set("descripcion", v)}
            placeholder="Describe tu experiencia y habilidades..." rows={4} />
        </div>
        <div className="mt-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <h4 className="font-semibold text-sm text-[#0F172A] mb-2 flex items-center gap-2">
            <Award size={15} className="text-[#2563EB]" />
            Certificaciones
          </h4>
          <p className="text-xs text-[#94A3B8]">Sube y gestiona tus certificaciones profesionales. Conectado con la API.</p>
          <Btn variant="outline" size="sm" className="mt-3"><Plus size={13} />Agregar certificación</Btn>
        </div>
        <div className="border-t border-[#E2E8F0] mt-5 pt-5 flex items-center gap-3">
          <Btn variant="primary" loading={saving} onClick={handleSave}>{saving ? "Guardando..." : "Guardar cambios"}</Btn>
          {saved && <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium"><CheckCircle size={15} />¡Cambios guardados!</span>}
        </div>
      </div>
    </div>
  );
}

function TechDashboard() {
  const { go } = useNav();
  const [view, setView] = useState<TechView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (view) {
      case "overview": return <TechDashHome />;
      case "requests": return <TechRequests />;
      case "calendar": return <TechCalendar />;
      case "jobs": return <TechJobs />;
      case "profile": return <TechProfile />;
      case "settings": return <DashSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <TechDashSidebar view={view} setView={setView} onLogout={() => go("tech-landing")}
        open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-[#64748B] cursor-pointer" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
            <h1 className="text-sm font-bold text-[#0F172A]">{TECH_NAV.find((n) => n.id === view)?.label}</h1>
          </div>
          <button className="relative p-2 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-[#F8FAFC] cursor-pointer">
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{renderView()}</main>
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <ClientLanding />;
      case "client-login": return <ClientLogin />;
      case "client-register": return <ClientRegister />;
      case "client-dashboard": return <ClientDashboard />;
      case "tech-landing": return <TechLanding />;
      case "tech-login": return <TechLogin />;
      case "tech-register": return <TechRegister />;
      case "tech-dashboard": return <TechDashboard />;
    }
  };

  return (
    <NavCtx.Provider value={{ go: setPage }}>
      {renderPage()}
    </NavCtx.Provider>
  );
}