import { Tarjeta } from '@/components/ui/Tarjeta';
import type { TablaEjemplo } from '@/tipos/leccion';

interface ComparativaTablasProps {
  logica: TablaEjemplo;
  fisica: TablaEjemplo;
  diferencias: string[];
}

export function ComparativaTablas({ logica, fisica, diferencias }: ComparativaTablasProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
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
      <Tarjeta className="space-y-3 p-6">
        <p className="font-semibold text-slate-900">Qué cambia al pasar de un modelo a otro</p>
        <ul className="space-y-2">
          {diferencias.map((diferencia) => (
            <li key={diferencia} className="flex gap-3 text-sm leading-normal text-slate-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
              <span>{diferencia}</span>
            </li>
          ))}
        </ul>
      </Tarjeta>
    </div>
  );
}

function VistaTabla({ etiqueta, colorEtiqueta, tabla }: { etiqueta: string; colorEtiqueta: string; tabla: TablaEjemplo }) {
  return (
    <Tarjeta className="flex flex-col gap-4 p-6">
      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${colorEtiqueta}`}>{etiqueta}</span>
      <p className="font-mono text-base font-bold text-slate-900">Tabla {tabla.nombre}</p>
      <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200">
        <table className="w-full min-w-[18rem] text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              {tabla.columnas.map((columna) => (
                <th key={columna} scope="col" className="px-4 py-3 font-semibold">
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tabla.filas.map((fila) => (
              <tr key={fila.join('|')} className="transition hover:bg-sky-50/60">
                {fila.map((celda, indice) => (
                  <td key={`${indice}-${celda}`} className="px-4 py-3 font-mono text-slate-800">
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
