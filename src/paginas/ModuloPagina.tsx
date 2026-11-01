import { ArrowLeft } from 'lucide-react';
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
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 sm:py-2 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver al inicio
      </button>

      <Tarjeta className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
          <Icono className="h-8 w-8" aria-hidden />
        </span>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Módulo {modulo.numero}</p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {modulo.titulo}
          </h2>
          <p className="leading-normal text-slate-600">{modulo.descripcion}</p>
        </div>
      </Tarjeta>

      <CasoPractico />

      <section className="space-y-5" aria-labelledby="titulo-lecciones">
        <div className="space-y-1">
          <h3 id="titulo-lecciones" className="text-2xl font-bold text-slate-900">
            Lecciones
          </h3>
          <p className="leading-normal text-slate-600">Cada lección combina conceptos, un ejemplo resuelto y práctica.</p>
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
        <div className="space-y-1">
          <h3 id="titulo-desafios" className="text-2xl font-bold text-slate-900">
            Desafíos
          </h3>
          <p className="leading-normal text-slate-600">Sin ayudas: pon a prueba lo que ya dominas.</p>
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
