import type { PreguntaOpcionUnica } from '@/tipos/juego';
import { BotonOpcion, type EstiloOpcion } from './BotonOpcion';
import { PanelRetroalimentacion } from './PanelRetroalimentacion';

interface PreguntaOpcionUnicaProps {
  pregunta: PreguntaOpcionUnica;
  seleccion: string | null;
  revelada: boolean;
  onSeleccionar: (id: string) => void;
}

function estiloDe(
  id: string,
  pregunta: PreguntaOpcionUnica,
  seleccion: string | null,
  revelada: boolean,
): EstiloOpcion {
  if (!revelada) return id === seleccion ? 'seleccionada' : 'neutro';
  if (id === pregunta.correcta) return 'acierto';
  if (id === seleccion) return 'error';
  return 'neutro';
}

export function PreguntaOpcionUnica({ pregunta, seleccion, revelada, onSeleccionar }: PreguntaOpcionUnicaProps) {
  const correcta = seleccion === pregunta.correcta;

  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        {pregunta.opciones.map((opcion) => (
          <BotonOpcion
            key={opcion.id}
            estilo={estiloDe(opcion.id, pregunta, seleccion, revelada)}
            disabled={revelada}
            aria-pressed={opcion.id === seleccion}
            onClick={() => onSeleccionar(opcion.id)}
            className="w-full rounded-2xl px-5 py-4 text-left font-medium"
          >
            {opcion.texto}
          </BotonOpcion>
        ))}
      </div>
      {revelada && seleccion && (
        <PanelRetroalimentacion
          correcta={correcta}
          explicacion={pregunta.explicacion}
          detalles={[pregunta.explicacionesOpciones[seleccion]]}
        />
      )}
    </div>
  );
}
