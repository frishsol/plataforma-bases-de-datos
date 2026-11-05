import { ArrowLeft, Database, Layers } from 'lucide-react';
import { CasoPractico } from '@/components/desafio/CasoPractico';
import { TarjetaDesafio } from '@/components/mapa/TarjetaDesafio';
import { TemaModuloItem } from '@/components/modulo/TemaModuloItem';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { ProgresoPorDesafio } from '@/tipos/juego';
import type { Modulo } from '@/tipos/modulo';
import type { Vista } from '@/tipos/navegacion';

interface ModuloPaginaProps {
  modulo: Modulo;
  progreso: ProgresoPorDesafio;
  onNavegar: (vista: Vista) => void;
}

export function ModuloPagina({ modulo, progreso, onNavegar }: ModuloPaginaProps) {
  const Icono = modulo.icono;

  return (
    <div className="space-y-10">
      <button
        type="button"
        onClick={() => onNavegar({ nombre: 'inicio' })}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver al inicio
      </button>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-accent-600 px-6 py-8 text-white shadow-elevated sm:px-10 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 30%, rgba(45, 212, 191, 0.3) 0%, transparent 50%)',
          }}
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
            <Icono className="h-8 w-8" aria-hidden />
          </span>
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-widest text-accent-300">Módulo {modulo.numero}</p>
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {modulo.titulo}
            </h2>
            <p className="max-w-2xl text-pretty leading-relaxed text-blue-50/90">{modulo.descripcion}</p>
          </div>
        </div>
      </section>

      <CasoPractico />

      <section className="space-y-5" aria-labelledby="titulo-lecciones">
        <div className="flex items-center gap-3 space-y-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <Layers className="h-5 w-5" aria-hidden />
          </span>
          <div className="space-y-0.5">
            <h3 id="titulo-lecciones" className="text-2xl font-extrabold tracking-tight text-slate-900">
              Lecciones
            </h3>
            <p className="text-pretty leading-relaxed text-slate-600">
              Cada lección combina conceptos, un ejemplo resuelto y práctica.
            </p>
          </div>
        </div>
        <ol className="space-y-4">
          {modulo.temas.map((tema, indice) => (
            <TemaModuloItem
              key={tema.titulo}
              tema={tema}
              numero={indice + 1}
              onAbrirLeccion={(leccion) => onNavegar({ nombre: 'leccion', modulo, leccion })}
            />
          ))}
        </ol>
      </section>

      <section className="space-y-5" aria-labelledby="titulo-desafios">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600 ring-1 ring-accent-100">
            <Database className="h-5 w-5" aria-hidden />
          </span>
          <div className="space-y-0.5">
            <h3 id="titulo-desafios" className="text-2xl font-extrabold tracking-tight text-slate-900">
              Desafíos
            </h3>
            <p className="text-pretty leading-relaxed text-slate-600">Sin ayudas: pon a prueba lo que ya dominas.</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {modulo.desafios.map((desafio) => (
            <TarjetaDesafio
              key={desafio.id}
              desafio={desafio}
              resultado={progreso[desafio.id]}
              onAbrir={() => onNavegar({ nombre: 'desafio', modulo, desafio })}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
