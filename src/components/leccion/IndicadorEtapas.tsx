import { Check } from 'lucide-react';
import { ETAPAS_LECCION, type EtapaLeccion } from '@/datos/etapasLeccion';

interface IndicadorEtapasProps {
  actual: EtapaLeccion;
  onSeleccionar: (etapa: EtapaLeccion) => void;
}

export function IndicadorEtapas({ actual, onSeleccionar }: IndicadorEtapasProps) {
  const indiceActual = ETAPAS_LECCION.findIndex((etapa) => etapa.id === actual);

  return (
    <nav aria-label="Etapas de la lección">
      <ol className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200/80">
        {ETAPAS_LECCION.map((etapa, indice) => {
          const esActual = indice === indiceActual;
          const completada = indice < indiceActual;
          return (
            <li key={etapa.id}>
              <button
                type="button"
                aria-current={esActual ? 'step' : undefined}
                onClick={() => onSeleccionar(etapa.id)}
                className={`flex min-h-[3.25rem] w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-xs font-semibold sm:flex-row sm:gap-2 sm:px-2 sm:py-3 sm:text-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  esActual ? 'bg-blue-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    esActual
                      ? 'bg-white/20 text-white'
                      : completada
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {completada ? <Check className="h-3.5 w-3.5" aria-hidden /> : indice + 1}
                </span>
                <span>{etapa.etiqueta}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
