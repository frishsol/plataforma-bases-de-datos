import { FiguraSimbolo } from '@/components/diagrama/FiguraSimbolo';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { SimboloChen } from '@/tipos/simbolosChen';

interface TarjetaSimboloProps {
  simbolo: SimboloChen;
}

export function TarjetaSimbolo({ simbolo }: TarjetaSimboloProps) {
  return (
    <Tarjeta className="flex flex-col gap-5 p-6">
      <div className="flex items-center justify-center rounded-2xl bg-sky-50 px-4 py-4">
        <FiguraSimbolo figura={simbolo.figura} />
      </div>
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-900">{simbolo.nombre}</h4>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-700">Qué es</p>
          <p className="leading-normal text-slate-800">{simbolo.significado}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">Cómo se dibuja</p>
          <ul className="list-inside list-disc space-y-1 text-sm leading-normal text-slate-600">
            {simbolo.comoSeDibuja.map((regla) => (
              <li key={regla}>{regla}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-700">Cuándo se usa</p>
          <p className="text-sm leading-normal text-slate-600">{simbolo.cuandoUsar}</p>
        </div>
        <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm leading-normal text-blue-900">
          <span className="font-semibold">Ejemplo en Hotel Patitas:</span> {simbolo.ejemplo}
        </p>
        {simbolo.variante && (
          <p className="rounded-xl bg-teal-50 px-4 py-3 text-sm leading-normal text-teal-900 ring-1 ring-teal-100">
            <span className="font-semibold">Variante de la notación:</span> {simbolo.variante}
          </p>
        )}
      </div>
    </Tarjeta>
  );
}
