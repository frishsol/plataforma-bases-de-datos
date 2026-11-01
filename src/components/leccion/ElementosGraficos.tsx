import { FiguraSimbolo } from '@/components/diagrama/FiguraSimbolo';
import { ESTILOS_CONCEPTO } from '@/components/leccion/estilosConcepto';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { ElementoComparado, ElementoGrafico } from '@/tipos/leccion';

const ESTILO_LINEA = { fondo: 'bg-slate-100', texto: 'text-slate-800', etiqueta: 'Línea' };

export function ElementosGraficos({ elementos }: { elementos: ElementoGrafico[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {elementos.map((elemento) => {
        const estilo = elemento.tono === 'linea' ? ESTILO_LINEA : ESTILOS_CONCEPTO[elemento.tono];
        return (
          <Tarjeta key={elemento.nombre} className="flex flex-col gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center rounded-2xl bg-sky-50 px-3 py-4">
              <FiguraSimbolo figura={elemento.figura} />
            </div>
            <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${estilo.fondo} ${estilo.texto}`}>
              {elemento.nombre}
            </span>
            <p className="leading-normal text-slate-800">{elemento.definicion}</p>
            <p className="mt-auto rounded-xl bg-blue-50 px-4 py-3 text-sm leading-normal text-blue-900">
              <span className="font-semibold">Ejemplo:</span> {elemento.ejemplo}
            </p>
          </Tarjeta>
        );
      })}
    </div>
  );
}

export function ComparativaFiguras({ elementos }: { elementos: ElementoComparado[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {elementos.map((elemento) => (
        <Tarjeta key={elemento.titulo} className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-center rounded-2xl bg-sky-50 px-3 py-4">
            <FiguraSimbolo figura={elemento.figura} />
          </div>
          <h4 className="text-lg font-bold text-slate-900">{elemento.titulo}</h4>
          <p className="leading-normal text-slate-800">{elemento.descripcion}</p>
          <p className="mt-auto rounded-xl bg-blue-50 px-4 py-3 text-sm leading-normal text-blue-900">
            <span className="font-semibold">Ejemplo:</span> {elemento.ejemplo}
          </p>
        </Tarjeta>
      ))}
    </div>
  );
}
