import type { ReactNode } from 'react';
import { Tarjeta } from '@/components/ui/Tarjeta';

// Cuatro ejemplos visuales introductorios de una relación Cliente–Mascota.
// Estas ilustraciones son esquemáticas y no una referencia exhaustiva de cada notación.
export function ComparativaNotaciones() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        La relación <span className="font-semibold">Cliente tiene Mascota</span> puede representarse
        mediante diferentes notaciones. Observa las diferencias gráficas principales.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <TarjetaNotacion titulo="Chen" descripcion="Usa rectángulos, rombos y cardinalidades indicadas junto a las conexiones.">
          <DiagramaChen />
        </TarjetaNotacion>
        <TarjetaNotacion titulo="Pata de gallo (Crow's Foot)" descripcion="Usa símbolos en los extremos de las líneas para representar multiplicidad y opcionalidad.">
          <DiagramaCrowFoot />
        </TarjetaNotacion>
        <TarjetaNotacion titulo="UML (diagrama de clases)" descripcion="Representa clases, asociaciones y multiplicidades como 1 y 0..*.">
          <DiagramaUML />
        </TarjetaNotacion>
        <TarjetaNotacion titulo="Barker" descripcion="Variante de notación E-R con nombres de relación y símbolos de multiplicidad y obligatoriedad.">
          <DiagramaBarker />
        </TarjetaNotacion>
      </div>
    </div>
  );
}

function TarjetaNotacion({ titulo, descripcion, children }: { titulo: string; descripcion: string; children: ReactNode }) {
  return (
    <Tarjeta className="flex h-full flex-col gap-4 p-5">
      <div className="flex min-h-44 items-center rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">{children}</div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-slate-900">{titulo}</h4>
        <p className="text-sm leading-normal text-slate-700">{descripcion}</p>
      </div>
    </Tarjeta>
  );
}

function DiagramaChen() {
  return (
    <svg viewBox="0 0 320 120" role="img" aria-label="Chen: Cliente, rombo tiene y Mascota, cardinalidad uno a muchos" className="h-36 w-full">
      <rect x="12" y="42" width="86" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="55" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Cliente</text>
      <line x1="98" y1="60" x2="125" y2="60" stroke="#64748B" strokeWidth="2" />
      <line x1="195" y1="60" x2="222" y2="60" stroke="#64748B" strokeWidth="2" />
      <polygon points="160,34 195,60 160,86 125,60" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
      <text x="160" y="64" textAnchor="middle" fontSize="13" fill="#1E293B">tiene</text>
      <text x="112" y="52" textAnchor="middle" fontSize="12" fill="#1E293B">1</text>
      <text x="208" y="52" textAnchor="middle" fontSize="12" fill="#1E293B">N</text>
      <rect x="222" y="42" width="86" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="265" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Mascota</text>
    </svg>
  );
}

function DiagramaCrowFoot() {
  return (
    <svg viewBox="0 0 320 120" role="img" aria-label="Pata de gallo: un Cliente puede tener varias Mascotas" className="h-36 w-full">
      <rect x="12" y="42" width="86" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="55" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Cliente</text>
      <line x1="98" y1="60" x2="238" y2="60" stroke="#0F766E" strokeWidth="2.5" />
      <text x="160" y="49" textAnchor="middle" fontSize="13" fill="#1E293B">tiene</text>
      <line x1="110" y1="46" x2="110" y2="74" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="118" y1="46" x2="118" y2="74" stroke="#0F766E" strokeWidth="2.5" />
      <path d="M238 60 L221 47 M238 60 L221 73" stroke="#0F766E" strokeWidth="2.5" fill="none" />
      <rect x="238" y="42" width="70" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="273" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Mascota</text>
    </svg>
  );
}

function DiagramaUML() {
  return (
    <svg viewBox="0 0 320 120" role="img" aria-label="UML: Cliente y Mascota como clases, relación uno a cero o muchos" className="h-36 w-full">
      <rect x="12" y="28" width="100" height="56" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <line x1="12" y1="48" x2="112" y2="48" stroke="#2563EB" strokeWidth="1.5" />
      <text x="62" y="42" textAnchor="middle" fontSize="14" fill="#1E293B">Cliente</text>
      <text x="20" y="66" fontSize="11" fill="#475569">id_cliente</text>
      <line x1="112" y1="56" x2="208" y2="56" stroke="#64748B" strokeWidth="2" />
      <text x="120" y="48" fontSize="12" fill="#1E293B">1</text>
      <text x="174" y="48" fontSize="12" fill="#1E293B">0..*</text>
      <rect x="208" y="28" width="100" height="56" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <line x1="208" y1="48" x2="308" y2="48" stroke="#2563EB" strokeWidth="1.5" />
      <text x="258" y="42" textAnchor="middle" fontSize="14" fill="#1E293B">Mascota</text>
      <text x="216" y="66" fontSize="11" fill="#475569">id_mascota</text>
    </svg>
  );
}

function DiagramaBarker() {
  return (
    <svg viewBox="0 0 320 120" role="img" aria-label="Barker: ejemplo esquemático Cliente tiene Mascota" className="h-36 w-full">
      <rect x="12" y="42" width="86" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="55" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Cliente</text>
      <line x1="98" y1="60" x2="238" y2="60" stroke="#0F766E" strokeWidth="2.5" />
      <text x="160" y="48" textAnchor="middle" fontSize="13" fill="#1E293B">tiene</text>
      <line x1="120" y1="46" x2="120" y2="74" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="215" y1="46" x2="215" y2="74" stroke="#0F766E" strokeWidth="2.5" />
      <path d="M238 60 L221 47 M238 60 L221 73" stroke="#0F766E" strokeWidth="2.5" fill="none" />
      <rect x="238" y="42" width="70" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="273" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Mascota</text>
    </svg>
  );
}
