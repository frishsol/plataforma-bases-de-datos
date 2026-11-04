import { useState, type ReactNode } from 'react';
import { ChevronDown, Lightbulb, ListOrdered } from 'lucide-react';
import { ComparativaNotaciones } from '@/components/diagrama/ComparativaNotaciones';
import { DiagramaERSvg } from '@/components/diagrama/DiagramaERSvg';
import { ClasificadorAtributos } from '@/components/actividad/ClasificadorAtributos';
import { ElementosGraficos, ComparativaFiguras } from '@/components/leccion/ElementosGraficos';
import { ComparativaTablas } from '@/components/leccion/ComparativaTablas';
import { TarjetaSimbolo, DetalleSimbolo } from '@/components/leccion/TarjetaSimbolo';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { SimboloChen } from '@/tipos/simbolosChen';
import type { BloqueAprende, SenalTexto, TarjetaIntro } from '@/tipos/leccion';

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
    
case 'tarjetas-intro': {
  const cantidad = bloque.tarjetas.length;
  const cincoTarjetas = cantidad === 5;

  return (
    <SeccionAprende titulo={bloque.titulo}>
      <div
        className={
          cincoTarjetas
            ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6'
            : cantidad === 2
              ? 'grid grid-cols-1 gap-5 sm:grid-cols-2'
              : cantidad === 3
                ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
        }
      >
        {bloque.tarjetas.map((tarjeta, indice) => (
          <div
            key={tarjeta.titulo}
            className={
              cincoTarjetas
                ? indice < 3
                  ? 'min-w-0 lg:col-span-2'
                  : 'min-w-0 lg:col-span-3'
                : 'min-w-0'
            }
          >
            <TarjetaIntroView tarjeta={tarjeta} />
          </div>
        ))}
      </div>
    </SeccionAprende>
  );
}

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
        <SeccionAprende titulo={bloque.titulo} plegable>
          <SenalesView senales={bloque.senales} />
        </SeccionAprende>
      );

    case 'simbolos':
      return (
        <SeccionAprende titulo={bloque.titulo} descripcion={bloque.descripcion}>
          <GaleriaSimbolos simbolos={bloque.simbolos} />
        </SeccionAprende>
      );

    case 'actividad-atributos':
      return (
        <details className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/80 open:ring-blue-200">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 [&::-webkit-details-marker]:hidden">
            <span className="space-y-1">
              <span className="block text-xs font-semibold uppercase tracking-wide text-blue-600">Actividad</span>
              <span className="block text-lg font-bold text-slate-900">{bloque.titulo}</span>
            </span>
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" aria-hidden />
          </summary>
          <div className="animate-aparecer space-y-5 border-t border-slate-100 px-6 py-6">
            <p className="leading-normal text-slate-600">{bloque.descripcion}</p>
            <ClasificadorAtributos atributos={bloque.atributos} />
          </div>
        </details>
      );

    case 'ejemplo-diagrama':
      return (
        <SeccionAprende titulo={bloque.titulo} descripcion={bloque.descripcion}>
          <Tarjeta className="grid min-w-0 grid-cols-1 gap-6 overflow-hidden p-4 sm:p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
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
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">{indice + 1}</span>
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
          <ComparativaNotaciones />
        </SeccionAprende>
      );
  }
}

function SeccionAprende({
  titulo,
  descripcion,
  children,
  plegable = false,
}: {
  titulo: string;
  descripcion?: string;
  children: ReactNode;
  plegable?: boolean;
}) {
  if (plegable) {
    return (
      <details className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 sm:p-6 [&::-webkit-details-marker]:hidden">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-blue-900">{titulo}</h3>
            {descripcion && <p className="text-sm leading-normal text-slate-600">{descripcion}</p>}
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-2xl font-medium text-blue-700">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="animate-aparecer border-t border-slate-100 p-5 sm:p-6">{children}</div>
      </details>
    );
  }

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
    <Tarjeta className="flex h-full w-full flex-col gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
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

function GaleriaSimbolos({ simbolos }: { simbolos: SimboloChen[] }) {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const simboloActivo = simbolos.find((simbolo) => simbolo.id === seleccionado);
  const cincoSimbolos = simbolos.length === 5;

  return (
    <div className="w-full space-y-5">
      <p className="text-sm text-slate-600">Selecciona un símbolo para consultar su explicación y ejemplo.</p>
      <div
        className={cincoSimbolos ? 'grid w-full grid-cols-1 gap-4 sm:grid-cols-6' : 'grid w-full gap-4'}
        style={cincoSimbolos ? undefined : { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))' }}
      >
        {simbolos.map((simbolo, indice) => (
          <div
            key={simbolo.id}
            className={
              cincoSimbolos
                ? indice < 3
                  ? 'flex min-w-0 sm:col-span-2 [&>button]:w-full'
                  : 'flex min-w-0 sm:col-span-3 [&>button]:w-full'
                : 'flex min-w-0 [&>button]:w-full'
            }
          >
            <TarjetaSimbolo
              simbolo={simbolo}
              activo={seleccionado === simbolo.id}
              onSeleccionar={() => setSeleccionado(seleccionado === simbolo.id ? null : simbolo.id)}
            />
          </div>
        ))}
      </div>
      {simboloActivo && <DetalleSimbolo simbolo={simboloActivo} />}
    </div>
  );
}
