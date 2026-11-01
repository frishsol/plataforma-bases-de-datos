import type { ReactNode } from 'react';
import { Lightbulb, ListOrdered } from 'lucide-react';
import { ComparativaNotaciones } from '@/components/diagrama/ComparativaNotaciones';
import { DiagramaERSvg } from '@/components/diagrama/DiagramaERSvg';
import { ClasificadorAtributos } from '@/components/actividad/ClasificadorAtributos';
import { ElementosGraficos, ComparativaFiguras } from '@/components/leccion/ElementosGraficos';
import { ComparativaTablas } from '@/components/leccion/ComparativaTablas';
import { TarjetaSimbolo } from '@/components/leccion/TarjetaSimbolo';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { BloqueAprende, NotacionAlternativa, SenalTexto, TarjetaIntro } from '@/tipos/leccion';

interface AprendeLeccionProps {
  bloques: BloqueAprende[];
}

export function AprendeLeccion({ bloques }: AprendeLeccionProps) {
  return (
    <div className="animate-aparecer space-y-12">
      {bloques.map((bloque, indice) => (
        <BloqueView key={indice} bloque={bloque} />
      ))}
    </div>
  );
}

function BloqueView({ bloque }: { bloque: BloqueAprende }) {
  switch (bloque.tipo) {
    case 'tarjetas-intro':
      return (
        <SeccionAprende titulo={bloque.titulo}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bloque.tarjetas.map((tarjeta) => (
              <TarjetaIntroView key={tarjeta.titulo} tarjeta={tarjeta} />
            ))}
          </div>
        </SeccionAprende>
      );
    case 'destacado':
      return (
        <div className="flex gap-4 rounded-3xl bg-blue-700 p-6 text-white shadow-lg shadow-blue-700/20 sm:p-8">
          <Lightbulb className="mt-0.5 h-6 w-6 shrink-0 text-sky-200" aria-hidden />
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">{bloque.titulo}</p>
            <p className="text-lg leading-normal text-white">{bloque.texto}</p>
          </div>
        </div>
      );
    case 'elementos-graficos':
      return (
        <SeccionAprende titulo={bloque.titulo}>
          <ElementosGraficos elementos={bloque.elementos} />
        </SeccionAprende>
      );
    case 'comparativa-figuras':
      return (
        <SeccionAprende titulo={bloque.titulo}>
          <ComparativaFiguras elementos={bloque.elementos} />
        </SeccionAprende>
      );
    case 'senales':
      return (
        <SeccionAprende titulo={bloque.titulo}>
          <SenalesView senales={bloque.senales} />
        </SeccionAprende>
      );
    case 'simbolos':
      return (
        <SeccionAprende titulo={bloque.titulo} descripcion={bloque.descripcion}>
          <div className="grid gap-5 md:grid-cols-2">
            {bloque.simbolos.map((simbolo) => (
              <TarjetaSimbolo key={simbolo.id} simbolo={simbolo} />
            ))}
          </div>
        </SeccionAprende>
      );
    case 'actividad-atributos':
      return (
        <SeccionAprende titulo={bloque.titulo} descripcion={bloque.descripcion}>
          <ClasificadorAtributos atributos={bloque.atributos} />
        </SeccionAprende>
      );
    case 'ejemplo-diagrama':
      return (
        <SeccionAprende titulo={bloque.titulo} descripcion={bloque.descripcion}>
          <Tarjeta className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
              <DiagramaERSvg diagrama={bloque.diagrama} descripcion={bloque.descripcion} />
            </div>
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <p className="flex items-center gap-2 font-semibold text-blue-800">
                  <ListOrdered className="h-5 w-5" aria-hidden />
                  Cómo se construye
                </p>
                <ol className="space-y-3">
                  {bloque.pasos.map((paso, indice) => (
                    <li key={paso} className="flex gap-3 text-sm leading-normal text-slate-700">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                        {indice + 1}
                      </span>
                      <span className="pt-0.5">{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="rounded-2xl bg-teal-50 p-4 text-sm leading-normal text-teal-900 ring-1 ring-teal-100">
                <span className="font-semibold">Cómo se lee:</span> {bloque.lectura}
              </p>
            </div>
          </Tarjeta>
        </SeccionAprende>
      );
    case 'comparativa-tablas':
      return (
        <SeccionAprende titulo={bloque.titulo}>
          <div className="space-y-6">
            <p className="max-w-3xl leading-normal text-slate-700">{bloque.texto}</p>
            <ComparativaTablas logica={bloque.logica} fisica={bloque.fisica} diferencias={bloque.diferencias} />
          </div>
        </SeccionAprende>
      );
    case 'comparativa-notaciones':
      return (
        <SeccionAprende titulo={bloque.titulo}>
          <div className="space-y-6">
            <p className="max-w-3xl leading-normal text-slate-700">{bloque.texto}</p>
            <ComparativaNotaciones />
            <div className="grid gap-5 md:grid-cols-3">
              {bloque.otras.map((notacion) => (
                <NotacionView key={notacion.nombre} notacion={notacion} />
              ))}
            </div>
          </div>
        </SeccionAprende>
      );
  }
}

function SeccionAprende({ titulo, descripcion, children }: { titulo: string; descripcion?: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-blue-600" aria-hidden />
          <h3 className="text-2xl font-bold text-blue-900">{titulo}</h3>
        </div>
        {descripcion && <p className="max-w-3xl text-slate-600">{descripcion}</p>}
      </div>
      {children}
    </section>
  );
}

function TarjetaIntroView({ tarjeta }: { tarjeta: TarjetaIntro }) {
  const Icono = tarjeta.icono;
  return (
    <Tarjeta className="flex flex-col gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/25">
          <Icono className="h-6 w-6" aria-hidden />
        </span>
        {tarjeta.etiqueta && (
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-900">{tarjeta.etiqueta}</span>
        )}
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-slate-900">{tarjeta.titulo}</h4>
        <p className="text-sm leading-normal text-slate-700">{tarjeta.texto}</p>
      </div>
    </Tarjeta>
  );
}

function SenalesView({ senales }: { senales: SenalTexto[] }) {
  return (
    <Tarjeta className="overflow-hidden p-0 sm:p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">Señal en el texto</th>
              <th scope="col" className="px-5 py-4 font-semibold">Suele indicar</th>
              <th scope="col" className="px-5 py-4 font-semibold">Ejemplo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {senales.map((senal) => (
              <tr key={senal.senal} className="align-top text-slate-700 transition hover:bg-sky-50/60">
                <td className="px-5 py-4 font-medium text-slate-900">{senal.senal}</td>
                <td className="px-5 py-4 text-blue-800">{senal.indica}</td>
                <td className="px-5 py-4 italic text-slate-600">{senal.ejemplo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tarjeta>
  );
}

function NotacionView({ notacion }: { notacion: NotacionAlternativa }) {
  return (
    <Tarjeta className="space-y-2 p-5">
      <h4 className="font-bold text-slate-900">{notacion.nombre}</h4>
      <p className="text-sm leading-normal text-slate-700">{notacion.descripcion}</p>
    </Tarjeta>
  );
}
