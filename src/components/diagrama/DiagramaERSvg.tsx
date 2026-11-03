import type { DiagramaER, NodoDiagrama } from '@/tipos/diagramaER';
import {
  EtiquetaCardinalidad,
  FormaAtributo,
  FormaEntidad,
  FormaRelacion,
  LineaConexion,
} from './FormasChen';

const DISTANCIA_ETIQUETA = 80;
const ALTURA_ETIQUETA = 8;

interface DiagramaERSvgProps {
  diagrama: DiagramaER;
  descripcion: string;
}

export function DiagramaERSvg({ diagrama, descripcion }: DiagramaERSvgProps) {
  const nodos = new Map<string, NodoDiagrama>(
    diagrama.nodos.map((nodo) => [nodo.id, nodo])
  );

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <svg
        viewBox="0 0 800 400"
        role="img"
        aria-label={descripcion}
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full max-w-full"
      >
        <g>
          {diagrama.conexiones.map((conexion) => {
            const origen = nodos.get(conexion.desde);
            const destino = nodos.get(conexion.hasta);

            if (!origen || !destino) return null;

            const longitud =
              Math.hypot(destino.x - origen.x, destino.y - origen.y) || 1;

            const ux = (destino.x - origen.x) / longitud;
            const uy = (destino.y - origen.y) / longitud;

            return (
              <g key={`${conexion.desde}-${conexion.hasta}`}>
                <LineaConexion
                  x1={origen.x}
                  y1={origen.y}
                  x2={destino.x}
                  y2={destino.y}
                  total={conexion.participacion === 'total'}
                />
                {conexion.etiqueta && (
                  <EtiquetaCardinalidad
                    x={origen.x + ux * DISTANCIA_ETIQUETA}
                    y={origen.y + uy * DISTANCIA_ETIQUETA - ALTURA_ETIQUETA}
                    texto={conexion.etiqueta}
                  />
                )}
              </g>
            );
          })}
        </g>

        <g>
          {diagrama.nodos.map((nodo) => (
            <NodoView key={nodo.id} nodo={nodo} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function NodoView({ nodo }: { nodo: NodoDiagrama }) {
  if (nodo.tipo === 'entidad') {
    return (
      <FormaEntidad
        x={nodo.x}
        y={nodo.y}
        nombre={nodo.nombre}
        debil={nodo.debil}
      />
    );
  }

  if (nodo.tipo === 'relacion') {
    return (
      <FormaRelacion
        x={nodo.x}
        y={nodo.y}
        nombre={nodo.nombre}
        identificadora={nodo.identificadora}
      />
    );
  }

  return (
    <FormaAtributo
      x={nodo.x}
      y={nodo.y}
      nombre={nodo.nombre}
      variante={nodo.variante}
    />
  );
}
