import type { PreguntaSeleccionMultiple } from '@/tipos/juego';
import { BotonOpcion, type EstiloOpcion } from './BotonOpcion';
import { PanelRetroalimentacion } from './PanelRetroalimentacion';

interface PreguntaSeleccionMultipleProps {
  pregunta: PreguntaSeleccionMultiple;
  seleccion: string[];
  revelada: boolean;
  onCambiar: (seleccion: string[]) => void;
}

function estiloDe(id: string, pregunta: PreguntaSeleccionMultiple, seleccion: string[], revelada: boolean): EstiloOpcion {
  const marcada = seleccion.includes(id);
  const esCorrecta = pregunta.correctas.includes(id);
  if (!revelada) return marcada ? 'seleccionada' : 'neutro';
  if (esCorrecta && marcada) return 'acierto';
  if (esCorrecta) return 'omitida';
  if (marcada) return 'error';
  return 'neutro';
}

export function PreguntaSeleccionMultiple({ pregunta, seleccion, revelada, onCambiar }: PreguntaSeleccionMultipleProps) {
  const detalles = pregunta.opciones
    .filter((opcion) => seleccion.includes(opcion.id) !== pregunta.correctas.includes(opcion.id))
    .map((opcion) => pregunta.explicacionesOpciones[opcion.id]);
  const correcta = detalles.length === 0;

  function alternar(id: string) {
    onCambiar(seleccion.includes(id) ? seleccion.filter((item) => item !== id) : [...seleccion, id]);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-slate-500">Puedes marcar varias opciones.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {pregunta.opciones.map((opcion) => (
          <BotonOpcion
            key={opcion.id}
            estilo={estiloDe(opcion.id, pregunta, seleccion, revelada)}
            disabled={revelada}
            aria-pressed={seleccion.includes(opcion.id)}
            onClick={() => alternar(opcion.id)}
            className="w-full rounded-2xl px-5 py-4 text-left font-medium"
          >
            {opcion.texto}
          </BotonOpcion>
        ))}
      </div>
      {revelada && (
        <PanelRetroalimentacion correcta={correcta} explicacion={pregunta.explicacion} detalles={detalles} />
      )}
    </div>
  );
}
