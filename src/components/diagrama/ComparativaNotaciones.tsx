import { Tarjeta } from '@/components/ui/Tarjeta';

export function ComparativaNotaciones() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        La misma relación <span className="font-semibold">Cliente tiene Mascota</span>{' '}
        puede representarse con distintas notaciones. Aquí se muestran solo
        para reconocer cómo se ven, sin entrar todavía en todos sus detalles.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <TarjetaNotacion
          titulo="Chen"
          descripcion="Usa rectángulos para entidades, rombos para relaciones y la cardinalidad junto a la relación."
        >
          <DiagramaChen />
        </TarjetaNotacion>

        <TarjetaNotacion
          titulo="Pata de gallo (Crow’s Foot)"
          descripcion="No usa rombo: la cardinalidad se expresa con símbolos al final de la línea."
        >
          <DiagramaCrowFoot />
        </TarjetaNotacion>

        <TarjetaNotacion
          titulo="UML"
          descripcion="Usa cajas tipo clase y multiplicidades como 1 y 0..* sobre la asociación."
        >
          <DiagramaUML />
        </TarjetaNotacion>

        <TarjetaNotacion
          titulo="Barker"
          descripcion="Es parecida a la pata de gallo, pero suele escribir la relación sobre la línea."
        >
          <DiagramaBarker />
        </TarjetaNotacion>
      </div>
    </div>
  );
}

function TarjetaNotacion({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
}) {
  return (
    <Tarjeta className="flex h-full flex-col gap-4 p-5">
      <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
        {children}
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-bold text-slate-900">{titulo}</h4>
        <p className="text-sm leading-normal text-slate-700">{descripcion}</p>
      </div>
    </Tarjeta>
  );
}

function DiagramaChen() {
  return (
    <svg viewBox="0 0 320 120" className="h-36 w-full">
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
    <svg viewBox="0 0 320 120" className="h-36 w-full">
      <rect x="12" y="42" width="86" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="55" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Cliente</text>

      <line x1="98" y1="60" x2="222" y2="60" stroke="#0F766E" strokeWidth="2.5" />
      <text x="160" y="50" textAnchor="middle" fontSize="13" fill="#1E293B">tiene</text>

      <line x1="112" y1="44" x2="112" y2="76" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="120" y1="44" x2="120" y2="76" stroke="#0F766E" strokeWidth="2.5" />

      <line x1="222" y1="60" x2="238" y2="48" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="222" y1="60" x2="238" y2="60" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="222" y1="60" x2="238" y2="72" stroke="#0F766E" strokeWidth="2.5" />

      <rect x="238" y="42" width="70" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="273" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Mascota</text>
    </svg>
  );
}

function DiagramaUML() {
  return (
    <svg viewBox="0 0 320 120" className="h-36 w-full">
      <rect x="12" y="28" width="100" height="56" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <line x1="12" y1="48" x2="112" y2="48" stroke="#2563EB" strokeWidth="1.5" />
      <text x="62" y="42" textAnchor="middle" fontSize="14" fill="#1E293B">Cliente</text>
      <text x="20" y="66" fontSize="11" fill="#475569">id_cliente</text>

      <line x1="112" y1="56" x2="208" y2="56" stroke="#64748B" strokeWidth="2" />
      <text x="123" y="48" fontSize="12" fill="#1E293B">1</text>
      <text x="180" y="48" fontSize="12" fill="#1E293B">0..*</text>

      <rect x="208" y="28" width="100" height="56" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <line x1="208" y1="48" x2="308" y2="48" stroke="#2563EB" strokeWidth="1.5" />
      <text x="258" y="42" textAnchor="middle" fontSize="14" fill="#1E293B">Mascota</text>
      <text x="216" y="66" fontSize="11" fill="#475569">id_mascota</text>
    </svg>
  );
}

function DiagramaBarker() {
  return (
    <svg viewBox="0 0 320 120" className="h-36 w-full">
      <rect x="12" y="42" width="86" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="55" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Cliente</text>

      <line x1="98" y1="60" x2="222" y2="60" stroke="#0F766E" strokeWidth="2.5" />
      <text x="160" y="50" textAnchor="middle" fontSize="13" fill="#1E293B">tiene</text>

      <circle cx="113" cy="60" r="3.5" fill="#0F766E" />
      <line x1="122" y1="44" x2="122" y2="76" stroke="#0F766E" strokeWidth="2.5" />

      <line x1="222" y1="60" x2="238" y2="48" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="222" y1="60" x2="238" y2="60" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="222" y1="60" x2="238" y2="72" stroke="#0F766E" strokeWidth="2.5" />
      <line x1="214" y1="44" x2="214" y2="76" stroke="#0F766E" strokeWidth="2.5" />

      <rect x="238" y="42" width="70" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
      <text x="273" y="64" textAnchor="middle" fontSize="14" fill="#1E293B">Mascota</text>
    </svg>
  );
}
