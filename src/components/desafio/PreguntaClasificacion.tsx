import type { PreguntaClasificacion } from '@/tipos/juego';
import { BotonOpcion, type EstiloOpcion } from './BotonOpcion';
import { PanelRetroalimentacion } from './PanelRetroalimentacion';

interface PreguntaClasificacionProps {
  pregunta: PreguntaClasificacion;
  asignaciones: Record<string, string | null>;
  revelada: boolean;
  onAsignar: (elementoId: string, categoriaId: string) => void;
}

function estiloDe(
  elementoCorrecta: string,
  categoriaId: string,
  asignada: string | null,
  revelada: boolean,
): EstiloOpcion {
  if (!revelada) return categoriaId === asignada ? 'seleccionada' : 'neutro';
  if (categoriaId === asignada) return categoriaId === elementoCorrecta ? 'acierto' : 'error';
  if (categoriaId === elementoCorrecta) return 'omitida';
  return 'neutro';
}

export function PreguntaClasificacion({ pregunta, asignaciones, revelada, onAsignar }: PreguntaClasificacionProps) {
  const detalles = pregunta.elementos
    .filter((elemento) => asignaciones[elemento.id] !== elemento.correcta)
    .map((elemento) => `${elemento.texto}: ${elemento.explicacion}`);
  const correcta = detalles.length === 0;

  return (
    <div className="space-y-6">
      <ul className="divide-y divide-slate-100">
        {pregunta.elementos.map((elemento) => (
          <li key={elemento.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold text-slate-900">{elemento.texto}</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label={`Categorías de ${elemento.texto}`}>
              {pregunta.categorias.map((categoria) => (
                <BotonOpcion
                  key={categoria.id}
                  estilo={estiloDe(elemento.correcta, categoria.id, asignaciones[elemento.id], revelada)}
                  disabled={revelada}
                  aria-pressed={asignaciones[elemento.id] === categoria.id}
                  onClick={() => onAsignar(elemento.id, categoria.id)}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                >
                  {categoria.texto}
                </BotonOpcion>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {revelada && (
        <PanelRetroalimentacion correcta={correcta} explicacion={pregunta.explicacion} detalles={detalles} />
      )}
    </div>
  );
}
