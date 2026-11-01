import type { Pregunta, Respuesta } from '@/tipos/juego';
import { PreguntaClasificacion } from './PreguntaClasificacion';
import { PreguntaOpcionUnica } from './PreguntaOpcionUnica';
import { PreguntaSeleccionMultiple } from './PreguntaSeleccionMultiple';

interface RenderizadorPreguntaProps {
  pregunta: Pregunta;
  respuesta: Respuesta;
  revelada: boolean;
  onCambiar: (respuesta: Respuesta) => void;
}

export function RenderizadorPregunta({ pregunta, respuesta, revelada, onCambiar }: RenderizadorPreguntaProps) {
  if (pregunta.tipo === 'opcion-unica' && respuesta.tipo === 'opcion-unica') {
    return (
      <PreguntaOpcionUnica
        pregunta={pregunta}
        seleccion={respuesta.seleccion}
        revelada={revelada}
        onSeleccionar={(id) => onCambiar({ tipo: 'opcion-unica', seleccion: id })}
      />
    );
  }

  if (pregunta.tipo === 'seleccion-multiple' && respuesta.tipo === 'seleccion-multiple') {
    return (
      <PreguntaSeleccionMultiple
        pregunta={pregunta}
        seleccion={respuesta.seleccion}
        revelada={revelada}
        onCambiar={(seleccion) => onCambiar({ tipo: 'seleccion-multiple', seleccion })}
      />
    );
  }

  if (pregunta.tipo === 'clasificacion' && respuesta.tipo === 'clasificacion') {
    return (
      <PreguntaClasificacion
        pregunta={pregunta}
        asignaciones={respuesta.asignaciones}
        revelada={revelada}
        onAsignar={(elementoId, categoriaId) =>
          onCambiar({
            tipo: 'clasificacion',
            asignaciones: { ...respuesta.asignaciones, [elementoId]: categoriaId },
          })
        }
      />
    );
  }

  return null;
}
