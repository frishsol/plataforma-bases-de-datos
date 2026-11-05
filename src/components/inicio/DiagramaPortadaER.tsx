const COLOR_LINEA = '#93c5fd';
const COLOR_ENTIDAD = '#1e40af';
const COLOR_RELACION = '#0d9488';
const COLOR_RELACION_FILL = '#f0fdfa';

function AtributoOval({ x, y, texto, clave = false }: { x: number; y: number; texto: string; clave?: boolean }) {
  const rx = 68;
  return (
    <g className="transition-opacity">
      <ellipse cx={x} cy={y} rx={rx} ry={25} fill="#ffffff" stroke={COLOR_RELACION} strokeWidth={2} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={600} fill="#0f766e">
        {texto}
      </text>
      {clave && (
        <line x1={x - 46} y1={y + 11} x2={x + 46} y2={y + 11} stroke="#0f766e" strokeWidth={1.5} strokeLinecap="round" />
      )}
    </g>
  );
}

export function DiagramaPortadaER({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 10 560 310"
      role="img"
      aria-label="Diagrama entidad-relación en notación de Chen: la entidad Cliente se relaciona con Mascota mediante el rombo tiene, con cardinalidad 1 a N"
      className={className}
    >
      <defs>
        <linearGradient id="fondoDiagrama" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#f0fdfa" />
        </linearGradient>
        <filter id="sombraSuave" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a8a" floodOpacity="0.10" />
        </filter>
      </defs>

      <rect x="0" y="0" width="560" height="320" rx="24" fill="url(#fondoDiagrama)" />

      <g stroke={COLOR_LINEA} strokeWidth={2.5} fill="none" strokeLinecap="round">
        <line x1={100} y1={84} x2={100} y2={140} />
        <line x1={100} y1={196} x2={100} y2={250} />
        <line x1={460} y1={84} x2={460} y2={140} />
        <line x1={460} y1={196} x2={460} y2={250} />
        <line x1={170} y1={168} x2={230} y2={168} />
        <line x1={330} y1={168} x2={390} y2={168} />
      </g>

      <AtributoOval x={100} y={60} texto="id_cliente" clave />
      <AtributoOval x={100} y={274} texto="nombre" />
      <AtributoOval x={460} y={60} texto="id_mascota" clave />
      <AtributoOval x={460} y={274} texto="nombre" />

      <rect
        x={30}
        y={140}
        width={140}
        height={56}
        rx={10}
        fill="#ffffff"
        stroke={COLOR_ENTIDAD}
        strokeWidth={2.5}
        filter="url(#sombraSuave)"
      />
      <text x={100} y={168} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={700} fill="#0f172a">
        Cliente
      </text>

      <rect
        x={390}
        y={140}
        width={140}
        height={56}
        rx={10}
        fill="#ffffff"
        stroke={COLOR_ENTIDAD}
        strokeWidth={2.5}
        filter="url(#sombraSuave)"
      />
      <text x={460} y={168} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={700} fill="#0f172a">
        Mascota
      </text>

      <polygon
        points="230,168 280,136 330,168 280,200"
        fill={COLOR_RELACION_FILL}
        stroke={COLOR_RELACION}
        strokeWidth={2.5}
        filter="url(#sombraSuave)"
      />
      <text x={280} y={168} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700} fill="#0f766e">
        tiene
      </text>

      <g>
        <circle cx={200} cy={154} r={13} fill="#1e40af" />
        <text x={200} y={154} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={800} fill="#fff">
          1
        </text>
      </g>
      <g>
        <circle cx={360} cy={154} r={13} fill="#0d9488" />
        <text x={360} y={154} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={800} fill="#fff">
          N
        </text>
      </g>

      <g transform="translate(20, 20)" opacity={0.5}>
        <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#0d9488" />
      </g>
    </svg>
  );
}
