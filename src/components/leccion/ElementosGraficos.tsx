
import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { FiguraSimbolo } from '@/components/diagrama/FiguraSimbolo';
import { ESTILOS_CONCEPTO } from '@/components/leccion/estilosConcepto';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { ElementoComparado, ElementoGrafico } from '@/tipos/leccion';

const ESTILO_LINEA = {
  fondo: 'bg-slate-100',
  texto: 'text-slate-800',
  etiqueta: 'Línea',
};

export function ElementosGraficos({
  elementos,
}: {
  elementos: ElementoGrafico[];
}) {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const elementoActivo = elementos.find(
    (elemento) => elemento.nombre === seleccionado
  );

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Selecciona un elemento para conocer su definición y un ejemplo.
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {elementos.map((elemento) => {
          const estilo =
            elemento.tono === 'linea'
              ? ESTILO_LINEA
              : ESTILOS_CONCEPTO[elemento.tono];

          const activo = seleccionado === elemento.nombre;

          return (
            <button
              key={elemento.nombre}
              type="button"
              aria-pressed={activo}
              onClick={() =>
                setSeleccionado(activo ? null : elemento.nombre)
              }
              className={`group flex flex-col items-center gap-3 rounded-2xl border bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                activo
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-100'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex w-full items-center justify-center rounded-xl bg-sky-50 p-3">
                <FiguraSimbolo figura={elemento.figura} />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${estilo.fondo} ${estilo.texto}`}
              >
                {elemento.nombre}
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
        })}
      </div>

      {elementoActivo && (
        <div
          role="region"
          aria-label={`Explicación de ${elementoActivo.nombre}`}
          className="animate-aparecer rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <h4 className="text-xl font-bold text-blue-900">
              {elementoActivo.nombre}
            </h4>

            <button
              type="button"
              onClick={() => setSeleccionado(null)}
              aria-label="Cerrar explicación"
              className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-bold text-slate-800">
                ¿Qué es?
              </p>
              <p className="leading-relaxed text-slate-700">
                {elementoActivo.definicion}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-900">
                Ejemplo
              </p>
              <p className="mt-1 leading-relaxed text-blue-900">
                {elementoActivo.ejemplo}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ComparativaFiguras({
  elementos,
}: {
  elementos: ElementoComparado[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {elementos.map((elemento) => (
        <Tarjeta
          key={elemento.titulo}
          className="flex flex-col gap-4 p-6"
        >
          <div className="flex items-center justify-center rounded-2xl bg-sky-50 px-3 py-4">
            <FiguraSimbolo figura={elemento.figura} />
          </div>
          <h4 className="text-lg font-bold text-slate-900">
            {elemento.titulo}
          </h4>
          <p className="leading-normal text-slate-800">
            {elemento.descripcion}
          </p>
          <p className="mt-auto rounded-xl bg-blue-50 px-4 py-3 text-sm leading-normal text-blue-900">
            <span className="font-semibold">Ejemplo:</span>{' '}
            {elemento.ejemplo}
          </p>
        </Tarjeta>
      ))}
    </div>
  );
}
