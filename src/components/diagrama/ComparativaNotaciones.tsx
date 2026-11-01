import { COLOR_CHEN } from './coloresChen';

const TRAZO_PATA = '#0f766e';

function CajaEntidad({ x, nombre }: { x: number; nombre: string }) {
  return (
    <g>
      <rect x={x} y={70} width={100} height={40} rx={4} fill={COLOR_CHEN.entidad.relleno} stroke={COLOR_CHEN.entidad.trazo} strokeWidth={2} />
      <text x={x + 50} y={90} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700} fill={COLOR_CHEN.texto}>
        {nombre}
      </text>
    </g>
  );
}

function ChenPanel() {
  return (
    <svg viewBox="0 0 400 180" role="img" aria-label="Cliente tiene Mascota en notación de Chen" className="h-auto w-full">
      <line x1={120} y1={90} x2={160} y2={90} stroke={COLOR_CHEN.conexion} strokeWidth={1.6} />
      <line x1={240} y1={90} x2={280} y2={90} stroke={COLOR_CHEN.conexion} strokeWidth={1.6} />
      <CajaEntidad x={20} nombre="Cliente" />
      <CajaEntidad x={280} nombre="Mascota" />
      <polygon points="200,62 240,90 200,118 160,90" fill={COLOR_CHEN.relacion.relleno} stroke={COLOR_CHEN.relacion.trazo} strokeWidth={2} />
      <text x={200} y={90} textAnchor="middle" dominantBaseline="central" fontSize={13} fill={COLOR_CHEN.texto}>
        tiene
      </text>
      <circle cx={136} cy={78} r={10} fill="white" stroke={COLOR_CHEN.conexion} strokeWidth={1.2} />
      <text x={136} y={78} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700} fill={COLOR_CHEN.etiqueta}>
        1
      </text>
      <circle cx={264} cy={78} r={10} fill="white" stroke={COLOR_CHEN.conexion} strokeWidth={1.2} />
      <text x={264} y={78} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700} fill={COLOR_CHEN.etiqueta}>
        N
      </text>
    </svg>
  );
}

function PataGalloPanel() {
  return (
    <svg viewBox="0 0 400 180" role="img" aria-label="Cliente tiene Mascota en notación pata de gallo" className="h-auto w-full">
      <line x1={120} y1={90} x2={280} y2={90} stroke={TRAZO_PATA} strokeWidth={2} />
      <line x1={130} y1={78} x2={130} y2={102} stroke={TRAZO_PATA} strokeWidth={2} />
      <line x1={137} y1={78} x2={137} y2={102} stroke={TRAZO_PATA} strokeWidth={2} />
      <path d="M266 78 L280 90 L266 102 M266 90 L280 90" fill="none" stroke={TRAZO_PATA} strokeWidth={2} />
      <CajaEntidad x={20} nombre="Cliente" />
      <CajaEntidad x={280} nombre="Mascota" />
      <text x={200} y={78} textAnchor="middle" fontSize={12} fill={COLOR_CHEN.texto}>
        tiene
      </text>
    </svg>
  );
}

export function ComparativaNotaciones() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <figure className="space-y-3 rounded-2xl bg-blue-50/70 p-5 ring-1 ring-blue-100">
        <figcaption className="space-y-1">
          <p className="font-semibold text-blue-900">Chen</p>
          <p className="text-sm leading-normal text-slate-700">
            El rombo une las entidades y las etiquetas 1 y N aparecen junto a cada entidad.
          </p>
        </figcaption>
        <ChenPanel />
      </figure>
      <figure className="space-y-3 rounded-2xl bg-teal-50/70 p-5 ring-1 ring-teal-100">
        <figcaption className="space-y-1">
          <p className="font-semibold text-teal-900">Pata de gallo (Crow&apos;s Foot)</p>
          <p className="text-sm leading-normal text-slate-700">
            No hay rombo: la línea se lee en los extremos. Una barra es uno y la pata de tres puntas es muchos.
          </p>
        </figcaption>
        <PataGalloPanel />
      </figure>
    </div>
  );
}
