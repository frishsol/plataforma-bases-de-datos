
import { useState } from 'react';
import type { TablaEjemplo } from '@/tipos/leccion';

interface TablaInteractivaProps {
  tabla: TablaEjemplo;
}

type Seleccion =
  | { tipo: 'fila'; indice: number }
  | { tipo: 'columna'; indice: number }
  | { tipo: 'clave'; clave: 'PK' | 'FK' }
  | null;

function tieneClave(columna: string, clave: 'PK' | 'FK') {
  return columna.includes(`(${clave})`);
}

export function TablaInteractiva({ tabla }: TablaInteractivaProps) {
  const [seleccion, setSeleccion] = useState<Seleccion>(null);

  const columnasClave = (clave: 'PK' | 'FK') =>
    tabla.columnas
      .map((nombre, indice) => ({ nombre, indice }))
      .filter(({ nombre }) => tieneClave(nombre, clave));

  const seleccionar = (nueva: Exclude<Seleccion, null>) => {
    setSeleccion((actual) =>
      actual &&
      actual.tipo === nueva.tipo &&
      JSON.stringify(actual) === JSON.stringify(nueva)
        ? null
        : nueva
    );
  };

  const columnaSeleccionada = (indice: number) =>
    seleccion?.tipo === 'columna' && seleccion.indice === indice;

  const columnaResaltada = (indice: number) =>
    columnaSeleccionada(indice) ||
    (seleccion?.tipo === 'clave' &&
      tieneClave(tabla.columnas[indice], seleccion.clave));

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
      <div className="flex items-start gap-3">
        <span className="text-xl" aria-hidden="true">🔎</span>
    
        <div className="space-y-1">
          <p className="font-semibold text-sky-900">
            Explora la tabla interactiva
          </p>
    
          <p className="text-sm leading-relaxed text-sky-800">
            Haz clic en los encabezados de las columnas, en los
            números de las filas o en los botones de clave primaria
            y clave foránea. Observa qué elementos se resaltan y
            lee la explicación que aparece debajo de la tabla.
          </p>
        </div>
      </div>
    </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-900">
          Tabla {tabla.nombre}
        </h3>

        <div className="flex flex-wrap gap-2">
          {(['PK', 'FK'] as const).map((clave) =>
            columnasClave(clave).length > 0 ? (
              <button
                key={clave}
                type="button"
                aria-pressed={
                  seleccion?.tipo === 'clave' &&
                  seleccion.clave === clave
                }
                onClick={() => seleccionar({ tipo: 'clave', clave })}
                className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 aria-pressed:bg-blue-600 aria-pressed:text-white"
              >
                {clave === 'PK' ? 'Clave primaria' : 'Clave foránea'}
              </button>
            ) : null
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              {tabla.columnas.map((columna, indice) => (
                <th key={indice} scope="col" className="p-0">
                  <button
                    type="button"
                    aria-pressed={columnaSeleccionada(indice)}
                    onClick={() =>
                      seleccionar({ tipo: 'columna', indice })
                    }
                    className={`w-full whitespace-nowrap px-4 py-3 text-left font-semibold ${
                      columnaResaltada(indice)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-blue-100'
                    }`}
                  >
                    {columna}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tabla.filas.map((fila, indiceFila) => (
              <tr key={indiceFila} className="border-t border-slate-100">
                <td className="p-0">
                  <button
                    type="button"
                    aria-pressed={
                      seleccion?.tipo === 'fila' &&
                      seleccion.indice === indiceFila
                    }
                    onClick={() =>
                      seleccionar({ tipo: 'fila', indice: indiceFila })
                    }
                    className={`w-full px-3 py-3 font-medium ${
                      seleccion?.tipo === 'fila' &&
                      seleccion.indice === indiceFila
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-blue-100'
                    }`}
                  >
                    {indiceFila + 1}
                  </button>
                </td>

                {fila.map((valor, indiceColumna) => (
                  <td
                    key={indiceColumna}
                    className={`whitespace-nowrap px-4 py-3 font-mono ${
                      columnaResaltada(indiceColumna)
                        ? 'bg-blue-50'
                        : seleccion?.tipo === 'fila' &&
                            seleccion.indice === indiceFila
                          ? 'bg-sky-50'
                          : ''
                    }`}
                  >
                    {valor}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        aria-live="polite"
        className="min-h-20 rounded-xl bg-blue-50 p-4 text-sm text-slate-700"
      >
        {!seleccion && (
          <p>
            Selecciona una fila, una columna o una clave para
            descubrir su significado.
          </p>
        )}

        {seleccion?.tipo === 'fila' && (
          <p>
            <strong>Tupla {seleccion.indice + 1}:</strong> representa
            un registro de {tabla.nombre}, con un valor por cada
            atributo.
          </p>
        )}

        {seleccion?.tipo === 'columna' && (
          <div className="space-y-1">
            <p>
              <strong>Atributo:</strong>{' '}
              {tabla.columnas[seleccion.indice]}
            </p>
            <p>
              Un atributo describe una propiedad de la relación.
              Los valores mostrados pertenecen a su columna.
            </p>
          </div>
        )}

        {seleccion?.tipo === 'clave' && (
          <div className="space-y-1">
            <p className="font-semibold">
              {seleccion.clave === 'PK'
                ? 'Clave primaria'
                : 'Clave foránea'}
            </p>
            <p>
              {seleccion.clave === 'PK'
                ? 'Identifica cada tupla de manera única y no admite NULL.'
                : 'Permite referenciar registros de otra relación. No necesita ser única y puede admitir NULL cuando la regla de negocio lo permita.'}
            </p>
            <p>
              Columnas identificadas:{' '}
              {columnasClave(seleccion.clave)
                .map(({ nombre }) => nombre)
                .join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
