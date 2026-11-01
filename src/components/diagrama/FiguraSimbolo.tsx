import type { ClaveFigura } from '@/tipos/simbolosChen';
import { FormaAtributo, FormaEntidad, FormaRelacion, LineaConexion } from './FormasChen';
import { COLOR_CHEN } from './coloresChen';
import { DibujoRelacion } from './DibujoRelacionChen';

const CENTRO_X = 160;
const CENTRO_Y = 60;
const IZQUIERDA = 70;
const DERECHA = 250;

interface FiguraSimboloProps {
  figura: ClaveFigura;
}

export function FiguraSimbolo({ figura }: FiguraSimboloProps) {
  const ancho = figura.startsWith('participacion') || figura.startsWith('cardinalidad') ? 400 : 320;
  return (
    <svg viewBox={`0 0 ${ancho} 120`} aria-hidden="true" className="h-32 w-full">
      {renderFigura(figura)}
    </svg>
  );
}

function renderFigura(figura: ClaveFigura) {
  switch (figura) {
    case 'entidad-fuerte':
      return <FormaEntidad x={CENTRO_X} y={CENTRO_Y} />;
    case 'entidad-debil':
      return <FormaEntidad x={CENTRO_X} y={CENTRO_Y} debil />;
    case 'entidad-asociativa':
      return (
        <g>
          <rect x={CENTRO_X - 80} y={CENTRO_Y - 34} width={160} height={68} rx={4} fill={COLOR_CHEN.entidad.relleno} stroke={COLOR_CHEN.entidad.trazo} strokeWidth={2} />
          <polygon
            points={`${CENTRO_X},${CENTRO_Y - 22} ${CENTRO_X + 56},${CENTRO_Y} ${CENTRO_X},${CENTRO_Y + 22} ${CENTRO_X - 56},${CENTRO_Y}`}
            fill={COLOR_CHEN.relacion.relleno}
            stroke={COLOR_CHEN.relacion.trazo}
            strokeWidth={2}
          />
        </g>
      );
    case 'relacion':
      return <FormaRelacion x={CENTRO_X} y={CENTRO_Y} />;
    case 'relacion-identificadora':
      return <FormaRelacion x={CENTRO_X} y={CENTRO_Y} identificadora />;
    case 'atributo-simple':
      return <FormaAtributo x={CENTRO_X} y={CENTRO_Y} variante="simple" />;
    case 'atributo-clave':
      return <FormaAtributo x={CENTRO_X} y={CENTRO_Y} variante="clave" nombre="id" />;
    case 'atributo-multivalor':
      return <FormaAtributo x={CENTRO_X} y={CENTRO_Y} variante="multivalor" />;
    case 'atributo-derivado':
      return <FormaAtributo x={CENTRO_X} y={CENTRO_Y} variante="derivado" />;
    case 'atributo-compuesto':
      return (
        <g>
          <LineaConexion x1={CENTRO_X} y1={40} x2={90} y2={98} />
          <LineaConexion x1={CENTRO_X} y1={40} x2={230} y2={98} />
          <FormaAtributo x={CENTRO_X} y={40} variante="compuesto" ry={20} />
          <FormaAtributo x={90} y={98} variante="simple" rx={52} ry={16} />
          <FormaAtributo x={230} y={98} variante="simple" rx={52} ry={16} />
        </g>
      );
    case 'linea-total':
      return <ParEntidades total />;
    case 'linea-parcial':
      return <ParEntidades />;
    case 'participacion-total':
      return <DibujoRelacion entidadIzquierda="Mascota" relacion="pertenece a" entidadDerecha="Cliente" dobleIzquierda />;
    case 'participacion-parcial':
      return <DibujoRelacion entidadIzquierda="Cliente" relacion="tiene" entidadDerecha="Mascota" dobleDerecha />;
    case 'linea-conexion':
      return (
        <g>
          <LineaConexion x1={152} y1={CENTRO_Y} x2={184} y2={CENTRO_Y} />
          <FormaEntidad x={90} y={CENTRO_Y} nombre="Cliente" />
          <FormaRelacion x={250} y={CENTRO_Y} nombre="tiene" />
        </g>
      );
    case 'cardinalidad-1-1':
      return <DibujoRelacion entidadIzquierda="Persona" relacion="posee" entidadDerecha="Pasaporte" cardinalidadIzquierda="1" cardinalidadDerecha="1" />;
    case 'cardinalidad-1-n':
      return <DibujoRelacion entidadIzquierda="Cliente" relacion="tiene" entidadDerecha="Mascota" cardinalidadIzquierda="1" cardinalidadDerecha="N" />;
    case 'cardinalidad-n-m':
      return <DibujoRelacion entidadIzquierda="Estancia" relacion="contrata" entidadDerecha="Servicio" cardinalidadIzquierda="N" cardinalidadDerecha="M" />;
  }
}

interface ParEntidadesProps {
  total?: boolean;
}

function ParEntidades({ total = false }: ParEntidadesProps) {
  return (
    <g>
      <LineaConexion x1={IZQUIERDA} y1={CENTRO_Y} x2={DERECHA} y2={CENTRO_Y} total={total} />
      <FormaEntidad x={IZQUIERDA} y={CENTRO_Y} />
      <FormaEntidad x={DERECHA} y={CENTRO_Y} />
    </g>
  );
}
