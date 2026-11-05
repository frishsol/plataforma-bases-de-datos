import { Layers, ListChecks, Play, Save, Sparkles, ArrowRight } from 'lucide-react';
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

export function Inicio({ progreso, onNavegar }: InicioProps) {
  return (
    <div className="space-y-12 pb-8 sm:space-y-20">
      {/* Hero */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-accent-600 px-6 py-12 text-white shadow-elevated sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgba(45, 212, 191, 0.25) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(96, 165, 250, 0.20) 0%, transparent 45%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="animate-aparecer space-y-6 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent-300" aria-hidden />
              Juego de aprendizaje para Bases de Datos
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              DataModel<span className="text-accent-300">Lab</span>
            </h1>
            <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-blue-50/90 sm:text-lg lg:mx-0">
              Aprende a diseñar bases de datos desde cero: analiza un problema, dibuja modelos
              entidad-relación, conviértelos en tablas relacionales, prepáralos para MySQL y
              normalízalos hasta la 3FN.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Boton
                onClick={() =>
                  document.getElementById('catalogo-modulos')?.scrollIntoView({ behavior: 'smooth' })
                }
                variante="claro"
                tamano="lg"
                className="w-full sm:w-auto"
              >
                <Play className="h-5 w-5 fill-current" aria-hidden />
                Comenzar
              </Boton>
              <button
                onClick={() => onNavegar({ nombre: 'modulo', modulo: MODULO_INICIAL })}
                className="group inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-4 text-base font-semibold text-white/90 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Ir al Módulo 1
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="animate-aparecer mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-3xl bg-white/5 p-3 ring-1 ring-white/10 backdrop-blur-sm">
              <DiagramaPortadaER className="h-auto w-full drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de módulos */}
      <section id="catalogo-modulos" className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Ruta de aprendizaje</p>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Elige tu módulo
          </h2>
          <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-slate-600">
            El primer módulo construye el modelo de datos. El segundo revisa cómo organizar esas
            tablas sin redundancias.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
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

      {/* Características */}
      <section className="grid gap-5 md:grid-cols-3">
        {CARACTERISTICAS.map(({ icono: Icono, titulo, texto }) => (
          <article
            key={titulo}
            className="group rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-elevated sm:p-7"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:from-brand-600 group-hover:to-accent-500 group-hover:text-white">
              <Icono className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">{titulo}</h2>
            <p className="mt-2 text-pretty leading-relaxed text-slate-600">{texto}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
