
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { TablaEjemplo } from '@/tipos/leccion';

interface ComparativaTablasProps {
  logica: TablaEjemplo;
  fisica: TablaEjemplo;
  diferencias: string[];
}

export function ComparativaTablas({
  logica,
  fisica,
  diferencias,
}: ComparativaTablasProps) {
  return (
    <div className="w-full min-w-0 max-w-full space-y-6">
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
        <VistaTabla
          etiqueta="Modelo lógico"
          colorEtiqueta="bg-sky-100 text-sky-900"
          tabla={logica}
        />
        <VistaTabla
          etiqueta="Modelo físico (MySQL)"
          colorEtiqueta="bg-teal-100 text-teal-900"
          tabla={fisica}
        />
      </div>

      <Tarjeta className="min-w-0 space-y-3 p-5 sm:p-6">
        <p className="font-semibold text-slate-900">
          Qué cambia al pasar de un modelo a otro
        </p>

        <ul className="space-y-2">
          {diferencias.map((diferencia) => (
            <li
              key={diferencia}
              className="flex min-w-0 gap-3 text-sm leading-normal text-slate-700"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                aria-hidden
              />
              <span className="min-w-0 break-words">
                {diferencia}
              </span>
            </li>
          ))}
        </ul>
      </Tarjeta>
    </div>
  );
}

export function VistaTabla({
  etiqueta,
  colorEtiqueta,
  tabla,
}: {
  etiqueta: string;
  colorEtiqueta: string;
  tabla: TablaEjemplo;
}) {
  return (
    <Tarjeta className="flex w-full min-w-0 max-w-full flex-col gap-4 overflow-hidden p-4 sm:p-6">
      <span
        className={`inline-flex w-fit max-w-full rounded-full px-3 py-1 text-xs font-semibold ${colorEtiqueta}`}
      >
        {etiqueta}
      </span>

      <p className="min-w-0 break-words font-mono text-base font-bold text-slate-900">
        Tabla {tabla.nombre}
      </p>

      <p className="text-xs text-slate-500 sm:hidden">
        Desliza la tabla hacia los lados para ver todas las columnas.
      </p>

      <div
        role="region"
        aria-label={`Tabla del ${etiqueta}: ${tabla.nombre}`}
        tabIndex={0}
        className="w-full min-w-0 max-w-full overflow-x-auto rounded-2xl ring-1 ring-slate-200"
      >
        <table className="w-max min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              {tabla.columnas.map((columna) => (
                <th
                  key={columna}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 font-semibold"
                >
                  {columna}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tabla.filas.map((fila, filaIndice) => (
              <tr
                key={filaIndice}
                className="transition hover:bg-sky-50/60"
              >
                {fila.map((celda, indice) => (
                  <td
                    key={indice}
                    className="whitespace-nowrap px-4 py-3 font-mono text-slate-800"
                  >
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tarjeta>
  );
}
