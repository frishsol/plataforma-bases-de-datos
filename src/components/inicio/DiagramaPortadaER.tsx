const COLOR_LINEA = '#dbeafe';
const COLOR_ENTIDAD = '#1e3a8a';
const COLOR_RELACION = '#0f766e';

function AtributoOval({ x, y, rx, texto, clave = false }: { x: number; y: number; rx: number; texto: string; clave?: boolean }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx} ry={24} fill="#ffffff" stroke={COLOR_RELACION} strokeWidth={2} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={14} fill="#134e4a">
        {texto}
      </text>
      {clave && <line x1={x - rx * 0.7} y1={y + 9} x2={x + rx * 0.7} y2={y + 9} stroke="#134e4a" strokeWidth={1.5} />}
    </g>
  );
}

export function DiagramaPortadaER({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 40 560 300"
      role="img"
      aria-label="Diagrama entidad-relación en notación de Chen: la entidad Cliente se relaciona con Mascota mediante el rombo tiene"
      className={className}
    >
      <g stroke={COLOR_LINEA} strokeWidth={2} fill="none">
        <line x1={105} y1={104} x2={105} y2={162} />
        <line x1={105} y1={218} x2={105} y2={276} />
        <line x1={455} y1={104} x2={455} y2={162} />
        <line x1={455} y1={218} x2={455} y2={276} />
        <line x1={180} y1={190} x2={218} y2={190} />
        <line x1={342} y1={186} x2={380} y2={186} />
        <line x1={342} y1={194} x2={380} y2={194} />
      </g>

      <AtributoOval x={105} y={80} rx={68} texto="id_cliente" clave />
      <AtributoOval x={105} y={300} rx={58} texto="nombre" />
      <AtributoOval x={455} y={80} rx={72} texto="id_mascota" clave />
      <AtributoOval x={455} y={300} rx={58} texto="nombre" />

      <rect x={30} y={162} width={150} height={56} rx={6} fill="#ffffff" stroke={COLOR_ENTIDAD} strokeWidth={2} />
      <text x={105} y={190} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={700} fill="#0f172a">
        Cliente
      </text>

      <rect x={380} y={162} width={150} height={56} rx={6} fill="#ffffff" stroke={COLOR_ENTIDAD} strokeWidth={2} />
      <text x={455} y={190} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={700} fill="#0f172a">
        Mascota
      </text>

      <polygon points="218,190 280,160 342,190 280,220" fill="#ccfbf1" stroke={COLOR_RELACION} strokeWidth={2} />
      <text x={280} y={190} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={600} fill="#134e4a">
        tiene
      </text>

      <text x={199} y={178} textAnchor="middle" fontSize={20} fontWeight={700} fill="#ffffff">
        1
      </text>
      <text x={361} y={178} textAnchor="middle" fontSize={20} fontWeight={700} fill="#ffffff">
        N
      </text>
    </svg>
  );
}
