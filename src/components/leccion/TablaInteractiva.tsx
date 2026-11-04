import { useState } from 'react';
import type { TablaEjemplo } from '@/tipos/leccion';

interface TablaInteractivaProps {
  tabla: TablaEjemplo;
  mostrarInstrucciones?: boolean;
}

type Seleccion =
  | { tipo: 'fila'; indice: number }
  | { tipo: 'columna'; indice: number }
  | { tipo: 'clave'; clave: 'PK' | 'FK' }
  | { tipo: 'celda'; fila: number; columna: number }
  | null;

function tieneClave(columna: string, clave: 'PK' | 'FK') {
  return columna.includes(`(${clave})`);
}

export function TablaInteractiva({
  tabla,
  mostrarInstrucciones = true,
}: TablaInteractivaProps) {
  const [seleccion, setSeleccion] = useState<Seleccion>(null);

  const contieneNull = tabla.filas.some((fila) =>
    fila.some((valor) => valor === 'NULL')
  );

  const columnasClave = (clave: 'PK' | 'FK') =>
    tabla.columnas
      .map((nombre, indice) => ({ nombre, indice }))
      .filter(({ nombre }) => tieneClave(nombre, clave));

  const seleccionar = (nueva: Exclude<Seleccion, null>) => {
    setSeleccion((actual) =>
      actual && JSON.stringify(actual) === JSON.stringify(nueva)
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
      {mostrarInstrucciones && (
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">
              🔎
            </span>

            <div className="space-y-1">
              <p className="font-semibold text-sky-900">
                Explora la tabla interactiva
              </p>

              <p className="text-sm leading-relaxed text-sky-800">
                Haz clic en los encabezados de las columnas,
                en los números de las filas o en los botones
                de clave primaria y clave foránea.
                {contieneNull && (
                  <>
                    {' '}También puedes seleccionar la celda NULL
                    para conocer qué significa un dato ausente.
                  </>
                )}
                {' '}Lee las explicaciones que aparecen debajo de la tabla.
              </p>
            </div>
          </div>
        </div>
      )}

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
                onClick={() =>
                  seleccionar({ tipo: 'clave', clave })
                }
                className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 aria-pressed:bg-blue-600 aria-pressed:text-white"
              >
                {clave === 'PK'
                  ? 'Clave primaria'
                  : 'Clave foránea'}
              </button>
            ) : null
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-3 py-3">
                #
              </th>

              {tabla.columnas.map((columna, indice) => (
                <th
                  key={indice}
                  scope="col"
                  className="p-0"
                >
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
              <tr
                key={indiceFila}
                className="border-t border-slate-100"
              >
                <td className="p-0">
                  <button
                    type="button"
                    aria-pressed={
                      seleccion?.tipo === 'fila' &&
                      seleccion.indice === indiceFila
                    }
                    onClick={() =>
                      seleccionar({
                        tipo: 'fila',
                        indice: indiceFila,
                      })
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

                {fila.map((valor, indiceColumna) => {
                  const esNull = valor === 'NULL';

                  const celdaSeleccionada =
                    seleccion?.tipo === 'celda' &&
                    seleccion.fila === indiceFila &&
                    seleccion.columna === indiceColumna;

                  return (
                    <td
                      key={indiceColumna}
                      className={`whitespace-nowrap p-0 font-mono ${
                        columnaResaltada(indiceColumna)
                          ? 'bg-blue-50'
                          : seleccion?.tipo === 'fila' &&
                              seleccion.indice === indiceFila
                            ? 'bg-sky-50'
                            : ''
                      }`}
                    >
                      {esNull ? (
                        <button
                          type="button"
                          aria-pressed={celdaSeleccionada}
                          aria-label={`Explorar NULL en ${tabla.columnas[indiceColumna]}, fila ${indiceFila + 1}`}
                          onClick={() =>
                            seleccionar({
                              tipo: 'celda',
                              fila: indiceFila,
                              columna: indiceColumna,
                            })
                          }
                          className={`w-full px-4 py-3 text-left font-bold underline decoration-dotted underline-offset-4 ${
                            celdaSeleccionada
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                          }`}
                        >
                          NULL
                        </button>
                      ) : (
                        <span className="block px-4 py-3 text-slate-800">
                          {valor}
                        </span>
                      )}
                    </td>
                  );
                })}
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
            {contieneNull
              ? 'Selecciona una fila, una columna, una clave o la celda NULL para descubrir su significado.'
              : 'Selecciona una fila, una columna o una clave para descubrir su significado.'}
          </p>
        )}

        {seleccion?.tipo === 'fila' && (
          <p>
            <strong>
              Tupla {seleccion.indice + 1}:
            </strong>{' '}
            representa un registro de {tabla.nombre},
            con un valor o una marca de ausencia por cada atributo.
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
              Sus valores deben cumplir el dominio y las
              restricciones correspondientes.
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
                ? 'Identifica cada fila de manera única y no admite NULL en ninguno de sus componentes.'
                : 'Referencia una clave candidata o primaria de otra tabla. Puede admitir NULL cuando las restricciones lo permitan.'}
            </p>

            <p>
              Columnas identificadas:{' '}
              {columnasClave(seleccion.clave)
                .map(({ nombre }) => nombre)
                .join(', ')}
            </p>
          </div>
        )}

        {seleccion?.tipo === 'celda' && (
          <div className="space-y-2">
            <p className="font-semibold text-amber-900">
              ¿Qué significa NULL?
            </p>

            <p>
              En la columna{' '}
              <strong>
                {tabla.columnas[seleccion.columna]}
              </strong>
              , NULL indica que no hay un dato disponible.
            </p>

            <p>
              Por ejemplo, si todavía no conocemos el peso
              de Nube, se registra NULL. Esto no significa
              que pese 0 kg ni que su peso sea una cadena vacía.
            </p>

            <p>
              En SQL, para identificar estos registros
              se utiliza <code>IS NULL</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
