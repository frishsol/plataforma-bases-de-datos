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
      <ol className="grid grid-cols-3 gap-1.5 rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-slate-200/70">
        {ETAPAS_LECCION.map((etapa, indice) => {
          const esActual = indice === indiceActual;
          const completada = indice < indiceActual;
          return (
            <li key={etapa.id}>
              <button
                type="button"
                aria-current={esActual ? 'step' : undefined}
                onClick={() => onSeleccionar(etapa.id)}
                className={`flex min-h-[3.5rem] w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5 text-xs font-bold tracking-tight transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:flex-row sm:gap-2 sm:px-3 sm:text-sm ${
                  esActual
                    ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-md shadow-brand-600/25'
                    : completada
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                    esActual
                      ? 'bg-white/20 text-white'
                      : completada
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500'
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
