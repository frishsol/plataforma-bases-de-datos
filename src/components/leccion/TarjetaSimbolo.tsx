import { ChevronDown } from 'lucide-react';
import { FiguraSimbolo } from '@/components/diagrama/FiguraSimbolo';
import type { SimboloChen } from '@/tipos/simbolosChen';

interface TarjetaSimboloProps {
  simbolo: SimboloChen;
  activo: boolean;
  onSeleccionar: () => void;
}

export function TarjetaSimbolo({
  simbolo,
  activo,
  onSeleccionar,
}: TarjetaSimboloProps) {
  return (
    <button
      type="button"
      onClick={onSeleccionar}
      aria-pressed={activo}
      className={`flex flex-col items-center gap-3 rounded-2xl border bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        activo
          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-100'
          : 'border-slate-200 hover:border-blue-300'
      }`}
    >
      <div className="flex w-full items-center justify-center rounded-xl bg-sky-50 p-3">
        <FiguraSimbolo figura={simbolo.figura} />
      </div>

      <span className="text-sm font-bold text-slate-900">
        {simbolo.nombre}
      </span>

      <span className="flex items-center gap-1 text-xs font-medium text-blue-700">
        {activo ? 'Ocultar' : 'Ver explicación'}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            activo ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </span>
    </button>
  );
}

export function DetalleSimbolo({
  simbolo,
}: {
  simbolo: SimboloChen;
}) {
  return (
    <div
      role="region"
      aria-label={`Explicación de ${simbolo.nombre}`}
      className="animate-aparecer space-y-5 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h4 className="text-xl font-bold text-blue-900">
        {simbolo.nombre}
      </h4>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-700">
          Qué es
        </p>
        <p className="leading-normal text-slate-800">
          {simbolo.significado}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700">
          Cómo se dibuja
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm leading-normal text-slate-600">
          {simbolo.comoSeDibuja.map((regla) => (
            <li key={regla}>{regla}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-700">
          Cuándo se usa
        </p>
        <p className="text-sm leading-normal text-slate-600">
          {simbolo.cuandoUsar}
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm leading-normal text-blue-900">
        <span className="font-semibold">
          Ejemplo en Hotel Patitas:
        </span>{' '}
        {simbolo.ejemplo}
      </div>

      {simbolo.variante && (
        <div className="rounded-xl bg-teal-50 px-4 py-3 text-sm leading-normal text-teal-900 ring-1 ring-teal-100">
          <span className="font-semibold">
            Variante de la notación:
          </span>{' '}
          {simbolo.variante}
        </div>
      )}
    </div>
  );
}
