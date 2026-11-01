import type { VarianteAtributo } from '@/tipos/diagramaER';
import { COLOR_CHEN } from './coloresChen';

const ENTIDAD = { ancho: 124, alto: 52 };
const RELACION = { media_ancho: 66, media_alto: 30 };

interface PosicionProps {
  x: number;
  y: number;
}

interface FormaEntidadProps extends PosicionProps {
  nombre?: string;
  debil?: boolean;
}

export function FormaEntidad({ x, y, nombre, debil = false }: FormaEntidadProps) {
  const { ancho, alto } = ENTIDAD;
  return (
    <g>
      <rect
        x={x - ancho / 2}
        y={y - alto / 2}
        width={ancho}
        height={alto}
        rx={4}
        fill={COLOR_CHEN.entidad.relleno}
        stroke={COLOR_CHEN.entidad.trazo}
        strokeWidth={2}
      />
      {debil && (
        <rect
          x={x - ancho / 2 + 5}
          y={y - alto / 2 + 5}
          width={ancho - 10}
          height={alto - 10}
          rx={2}
          fill="none"
          stroke={COLOR_CHEN.entidad.trazo}
          strokeWidth={1.5}
        />
      )}
      {nombre && <Texto x={x} y={y} texto={nombre} tamano={14} negrita />}
    </g>
  );
}

interface FormaRelacionProps extends PosicionProps {
  nombre?: string;
  identificadora?: boolean;
}

export function FormaRelacion({ x, y, nombre, identificadora = false }: FormaRelacionProps) {
  const { media_ancho: mw, media_alto: mh } = RELACION;
  const rombo = (ancho: number, alto: number) =>
    `${x},${y - alto} ${x + ancho},${y} ${x},${y + alto} ${x - ancho},${y}`;
  return (
    <g>
      <polygon
        points={rombo(mw, mh)}
        fill={COLOR_CHEN.relacion.relleno}
        stroke={COLOR_CHEN.relacion.trazo}
        strokeWidth={2}
      />
      {identificadora && (
        <polygon points={rombo(mw - 6, mh - 6)} fill="none" stroke={COLOR_CHEN.relacion.trazo} strokeWidth={1.5} />
      )}
      {nombre && <Texto x={x} y={y} texto={nombre} tamano={13} />}
    </g>
  );
}

interface FormaAtributoProps extends PosicionProps {
  nombre?: string;
  variante: VarianteAtributo;
  rx?: number;
  ry?: number;
}

export function FormaAtributo({ x, y, nombre, variante, rx = 60, ry = 24 }: FormaAtributoProps) {
  const trazo = COLOR_CHEN.atributo.trazo;
  const relleno = COLOR_CHEN.atributo.relleno;
  const discontinua = variante === 'derivado' ? '6 4' : undefined;
  return (
    <g>
      {variante === 'multivalor' && (
        <ellipse cx={x} cy={y} rx={rx + 5} ry={ry + 5} fill={relleno} stroke={trazo} strokeWidth={1.5} />
      )}
      <ellipse
        cx={x}
        cy={y}
        rx={rx}
        ry={ry}
        fill={relleno}
        stroke={trazo}
        strokeWidth={2}
        strokeDasharray={discontinua}
      />
      {nombre && <Texto x={x} y={y} texto={nombre} tamano={12} subrayado={variante === 'clave'} />}
    </g>
  );
}

interface LineaConexionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  total?: boolean;
}

export function LineaConexion({ x1, y1, x2, y2, total = false }: LineaConexionProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const longitud = Math.hypot(dx, dy) || 1;
  const px = (-dy / longitud) * 3.5;
  const py = (dx / longitud) * 3.5;
  const comun = { stroke: COLOR_CHEN.conexion, strokeWidth: 1.6 };

  if (!total) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} {...comun} />;
  }

  return (
    <g>
      <line x1={x1 + px} y1={y1 + py} x2={x2 + px} y2={y2 + py} {...comun} />
      <line x1={x1 - px} y1={y1 - py} x2={x2 - px} y2={y2 - py} {...comun} />
    </g>
  );
}

interface EtiquetaCardinalidadProps extends PosicionProps {
  texto: string;
}

export function EtiquetaCardinalidad({ x, y, texto }: EtiquetaCardinalidadProps) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLOR_CHEN.etiqueta}>
      {texto}
    </text>
  );
}

interface TextoProps extends PosicionProps {
  texto: string;
  tamano: number;
  negrita?: boolean;
  subrayado?: boolean;
  color?: string;
}

function Texto({ x, y, texto, tamano, negrita = false, subrayado = false, color = COLOR_CHEN.texto }: TextoProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={tamano}
      fontWeight={negrita ? 700 : 500}
      fill={color}
      textDecoration={subrayado ? 'underline' : undefined}
      style={{ fontFamily: 'inherit' }}
    >
      {texto}
    </text>
  );
}
