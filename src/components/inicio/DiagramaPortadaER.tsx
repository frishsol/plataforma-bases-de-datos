const COLOR_LINEA = '#bfdbfe';
const COLOR_ENTIDAD = '#1e3a8a';
const COLOR_RELACION = '#0f766e';

function AtributoOval({ x, y, texto, clave = false }: { x: number; y: number; texto: string; clave?: boolean }) {
  const rx = 66;
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx} ry={24} fill="#ffffff" stroke={COLOR_RELACION} strokeWidth={2} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={15} fill="#134e4a">
        {texto}
      </text>
      {clave && <line x1={x - 44} y1={y + 10} x2={x + 44} y2={y + 10} stroke="#134e4a" strokeWidth={1.5} />}
    </g>
  );
}

export function DiagramaPortadaER({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 20 560 290"
      role="img"
      aria-label="Diagrama entidad-relación en notación de Chen: la entidad Cliente se relaciona con Mascota mediante el rombo tiene, con cardinalidad 1 a N"
      className={className}
    >
      <g stroke={COLOR_LINEA} strokeWidth={2.5} fill="none" strokeLinecap="round">
        <line x1={100} y1={84} x2={100} y2={140} />
        <line x1={100} y1={196} x2={100} y2={246} />
        <line x1={460} y1={84} x2={460} y2={140} />
        <line x1={460} y1={196} x2={460} y2={246} />
        <line x1={170} y1={168} x2={230} y2={168} />
        <line x1={330} y1={168} x2={390} y2={168} />
      </g>

      <AtributoOval x={100} y={60} texto="id_cliente" clave />
      <AtributoOval x={100} y={270} texto="nombre" />
      <AtributoOval x={460} y={60} texto="id_mascota" clave />
      <AtributoOval x={460} y={270} texto="nombre" />

      <rect x={30} y={140} width={140} height={56} rx={8} fill="#ffffff" stroke={COLOR_ENTIDAD} strokeWidth={2.5} />
      <text x={100} y={168} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={700} fill="#0f172a">
        Cliente
      </text>

      <rect x={390} y={140} width={140} height={56} rx={8} fill="#ffffff" stroke={COLOR_ENTIDAD} strokeWidth={2.5} />
      <text x={460} y={168} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={700} fill="#0f172a">
        Mascota
      </text>

      <polygon points="230,168 280,140 330,168 280,196" fill="#ccfbf1" stroke={COLOR_RELACION} strokeWidth={2.5} />
      <text x={280} y={168} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={600} fill="#134e4a">
        tiene
      </text>

      <text x={200} y={150} textAnchor="middle" fontSize={18} fontWeight={700} fill="#ffffff">
        1
      </text>
      <text x={360} y={150} textAnchor="middle" fontSize={18} fontWeight={700} fill="#ffffff">
        N
      </text>
    </svg>
  );
}
