import { Layers, ListChecks, Play, Save } from 'lucide-react';
import { Boton } from '@/components/ui/Boton';
import { DiagramaPortadaER } from '@/components/inicio/DiagramaPortadaER';
import { TarjetaModulo } from '@/components/inicio/TarjetaModulo';
import { MODULOS } from '@/datos/modulos';
import type { ProgresoPorDesafio } from '@/tipos/juego';
import type { Vista } from '@/tipos/navegacion';

interface InicioProps {
  progreso: ProgresoPorDesafio;
  onNavegar: (vista: Vista) => void;
}

const CARACTERISTICAS = [
  {
    icono: Layers,
    titulo: 'Aprende desde cero',
    texto: 'Cada lección tiene tres pasos: conceptos, un ejemplo resuelto y una práctica.',
  },
  {
    icono: ListChecks,
    titulo: 'Ejercicios con retroalimentación',
    texto: 'Cada respuesta se explica al instante, y puedes pedir pistas opcionales antes de responder.',
  },
  {
    icono: Save,
    titulo: 'Progreso guardado',
    texto: 'Tus puntuaciones se conservan en este navegador para que sigas donde te quedaste.',
  },
];

const MODULO_INICIAL = MODULOS[0];
const PRIMERA_LECCION = MODULO_INICIAL.temas.find((tema) => tema.leccion)?.leccion;

export function Inicio({ progreso, onNavegar }: InicioProps) {
  return (
    <div className="space-y-12 pb-8 sm:space-y-16">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-600 to-teal-600 px-6 py-12 text-white shadow-xl shadow-blue-900/20 sm:px-10 sm:py-14 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="animate-aparecer space-y-6 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25">
              Juego de aprendizaje para Bases de Datos
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              DataModel <span className="text-teal-200">Lab</span>
            </h1>
            <p className="mx-auto max-w-xl text-base leading-normal text-blue-50 sm:text-lg lg:mx-0">
              Aprende a diseñar bases de datos desde cero: analiza un problema, dibuja modelos entidad-relación,
              conviértelos en tablas relacionales, prepáralos para MySQL y normalízalos hasta la 3FN.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Boton
                onClick={() =>
                  PRIMERA_LECCION
                    ? onNavegar({ nombre: 'leccion', modulo: MODULO_INICIAL, leccion: PRIMERA_LECCION })
                    : onNavegar({ nombre: 'modulo', modulo: MODULO_INICIAL })
                }
                variante="claro"
                tamano="lg"
              >
                <Play className="h-5 w-5 fill-current" aria-hidden />
                Comenzar
              </Boton>
            </div>
          </div>

          <div className="animate-aparecer mx-auto w-full max-w-md lg:max-w-none">
            <DiagramaPortadaER className="h-auto w-full drop-shadow-xl" />
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Ruta de aprendizaje</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Elige tu módulo</h2>
          <p className="mx-auto max-w-2xl leading-normal text-slate-600">
            El primer módulo construye el modelo de datos. El segundo revisa cómo organizar esas tablas sin
            redundancias.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {MODULOS.map((modulo) => (
            <TarjetaModulo
              key={modulo.id}
              modulo={modulo}
              progreso={progreso}
              onAbrir={() => onNavegar({ nombre: 'modulo', modulo })}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {CARACTERISTICAS.map(({ icono: Icono, titulo, texto }) => (
          <article
            key={titulo}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Icono className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="text-lg font-bold text-slate-900">{titulo}</h2>
            <p className="mt-2 leading-normal text-slate-600">{texto}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
