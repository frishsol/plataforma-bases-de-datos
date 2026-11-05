import { ArrowRight } from 'lucide-react';
import { BarraProgreso } from '@/components/ui/BarraProgreso';
import { Boton } from '@/components/ui/Boton';
import type { ProgresoPorDesafio } from '@/tipos/juego';
import type { Modulo } from '@/tipos/modulo';

interface TarjetaModuloProps {
  modulo: Modulo;
  progreso: ProgresoPorDesafio;
  onAbrir: () => void;
}

export function TarjetaModulo({ modulo, progreso, onAbrir }: TarjetaModuloProps) {
  const Icono = modulo.icono;
  const temas = modulo.temas.length;
  const leccionesDisponibles = modulo.temas.reduce(
    (total, tema) => total + (tema.leccion ? 1 : 0) + (tema.subtemas?.filter((subtema) => subtema.leccion).length ?? 0),
    0,
  );
  const desafiosTotales = modulo.desafios.length;
  const desafiosCompletados = modulo.desafios.filter((desafio) => progreso[desafio.id]?.completado).length;
  const porcentaje = desafiosTotales > 0 ? (desafiosCompletados / desafiosTotales) * 100 : 0;

  return (
    <article className="group flex h-full flex-col gap-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-elevated hover:ring-brand-200 sm:p-7">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-md shadow-brand-600/25 transition group-hover:scale-105">
          <Icono className="h-7 w-7" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Módulo {modulo.numero}</p>
          <h3 className="text-xl font-bold leading-tight tracking-tight text-slate-900">{modulo.titulo}</h3>
        </div>
      </div>

      <p className="text-pretty leading-relaxed text-slate-600">{modulo.descripcion}</p>

      <div className="mt-auto space-y-5">
        <BarraProgreso
          valor={porcentaje}
          etiqueta={`${desafiosCompletados} de ${desafiosTotales} desafíos completados`}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-slate-500">
            {temas} temas · {leccionesDisponibles} lecciones
          </p>
          <Boton onClick={onAbrir} variante="secundario">
            Entrar
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Boton>
        </div>
      </div>
    </article>
  );
}
