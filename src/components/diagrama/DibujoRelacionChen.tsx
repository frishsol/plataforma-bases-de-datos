import { COLOR_CHEN } from './coloresChen';
import { FormaEntidad } from './FormasChen';

const CENTRO_Y = 60;
const CENTRO_IZQ = 66;
const CENTRO_DER = 334;
const BORDE_IZQ = 128;
const BORDE_DER = 272;
const ROMBO_CENTRO = 200;
const ROMBO_MEDIA_ANCHO = 50;
const ROMBO_MEDIA_ALTO = 20;
const ROMBO_IZQ = ROMBO_CENTRO - ROMBO_MEDIA_ANCHO;
const ROMBO_DER = ROMBO_CENTRO + ROMBO_MEDIA_ANCHO;
const SEPARACION_DOBLE = 4;
const DESPLAZAMIENTO_DOBLE = (SEPARACION_DOBLE / ROMBO_MEDIA_ALTO) * ROMBO_MEDIA_ANCHO;
const CENTRO_ETIQUETA_IZQ = (BORDE_IZQ + ROMBO_IZQ) / 2;
const CENTRO_ETIQUETA_DER = (ROMBO_DER + BORDE_DER) / 2;

interface DibujoRelacionProps {
  entidadIzquierda: string;
  relacion: string;
  entidadDerecha: string;
  dobleIzquierda?: boolean;
  dobleDerecha?: boolean;
  cardinalidadIzquierda?: string;
  cardinalidadDerecha?: string;
}

export function DibujoRelacion({
  entidadIzquierda,
  relacion,
  entidadDerecha,
  dobleIzquierda = false,
  dobleDerecha = false,
  cardinalidadIzquierda,
  cardinalidadDerecha,
}: DibujoRelacionProps) {
  const finIzquierda = dobleIzquierda ? ROMBO_IZQ + DESPLAZAMIENTO_DOBLE : ROMBO_IZQ;
  const finDerecha = dobleDerecha ? ROMBO_DER - DESPLAZAMIENTO_DOBLE : ROMBO_DER;

  return (
    <g>
      <Trazo x1={BORDE_IZQ} x2={finIzquierda} doble={dobleIzquierda} />
      <Trazo x1={finDerecha} x2={BORDE_DER} doble={dobleDerecha} />
      {cardinalidadIzquierda && <Cardinalidad x={CENTRO_ETIQUETA_IZQ} texto={cardinalidadIzquierda} />}
      {cardinalidadDerecha && <Cardinalidad x={CENTRO_ETIQUETA_DER} texto={cardinalidadDerecha} />}
      <FormaEntidad x={CENTRO_IZQ} y={CENTRO_Y} nombre={entidadIzquierda} />
      <FormaEntidad x={CENTRO_DER} y={CENTRO_Y} nombre={entidadDerecha} />
      <polygon
        points={`${ROMBO_CENTRO},${CENTRO_Y - ROMBO_MEDIA_ALTO} ${ROMBO_DER},${CENTRO_Y} ${ROMBO_CENTRO},${CENTRO_Y + ROMBO_MEDIA_ALTO} ${ROMBO_IZQ},${CENTRO_Y}`}
        fill={COLOR_CHEN.relacion.relleno}
        stroke={COLOR_CHEN.relacion.trazo}
        strokeWidth={2}
      />
      <text
        x={ROMBO_CENTRO}
        y={CENTRO_Y + 4}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={COLOR_CHEN.texto}
      >
        {relacion}
      </text>
    </g>
  );
}

function Trazo({ x1, x2, doble }: { x1: number; x2: number; doble: boolean }) {
  const estilo = { stroke: COLOR_CHEN.conexion, strokeWidth: 1.6 };
  if (!doble) {
    return <line x1={x1} y1={CENTRO_Y} x2={x2} y2={CENTRO_Y} {...estilo} />;
  }
  return (
    <>
      <line x1={x1} y1={CENTRO_Y - SEPARACION_DOBLE} x2={x2} y2={CENTRO_Y - SEPARACION_DOBLE} {...estilo} />
      <line x1={x1} y1={CENTRO_Y + SEPARACION_DOBLE} x2={x2} y2={CENTRO_Y + SEPARACION_DOBLE} {...estilo} />
    </>
  );
}

function Cardinalidad({ x, texto }: { x: number; texto: string }) {
  return (
    <text
      x={x}
      y={CENTRO_Y - 8}
      textAnchor="middle"
      fontSize={14}
      fontWeight={700}
      fill={COLOR_CHEN.etiqueta}
    >
      {texto}
    </text>
  );
}
