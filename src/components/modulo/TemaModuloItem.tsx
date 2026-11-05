import { BookOpen, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Boton } from '@/components/ui/Boton';
import type { Leccion } from '@/tipos/leccion';
import type { SubtemaModulo, TemaModulo } from '@/tipos/modulo';

interface TemaModuloItemProps {
  tema: TemaModulo;
  numero: number;
  onAbrirLeccion: (leccion: Leccion) => void;
}

export function TemaModuloItem({ tema, numero, onAbrirLeccion }: TemaModuloItemProps) {
  const { leccion, subtemas = [] } = tema;
  const disponible = Boolean(leccion) || subtemas.some((subtema) => subtema.leccion);

  return (
    <li className="space-y-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200/70 transition duration-300 hover:shadow-elevated sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-sm font-extrabold text-brand-700 ring-1 ring-brand-100">
            {numero}
          </span>
          <div className="space-y-1.5">
            <p className="text-lg font-bold tracking-tight text-slate-900">{tema.titulo}</p>
            {tema.descripcion && <p className="text-pretty leading-relaxed text-slate-600">{tema.descripcion}</p>}
            <EstadoContenido disponible={disponible} />
          </div>
        </div>
        {leccion && (
          <Boton variante="secundario" onClick={() => onAbrirLeccion(leccion)} className="shrink-0">
            <BookOpen className="h-4 w-4" aria-hidden />
            Abrir lección
          </Boton>
        )}
      </div>

      {subtemas.length > 0 && (
        <ol className="divide-y divide-slate-100 overflow-hidden rounded-xl ring-1 ring-slate-200/70">
          {subtemas.map((subtema, indice) => (
            <SubtemaItem
              key={subtema.titulo}
              subtema={subtema}
              codigo={`${numero}.${indice + 1}`}
              onAbrirLeccion={onAbrirLeccion}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

function SubtemaItem({
  subtema,
  codigo,
  onAbrirLeccion,
}: {
  subtema: SubtemaModulo;
  codigo: string;
  onAbrirLeccion: (leccion: Leccion) => void;
}) {
  const { leccion } = subtema;

  return (
    <li className="group flex flex-col gap-3 bg-white px-5 py-4 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="shrink-0 rounded-lg bg-brand-50 px-2.5 py-1 font-mono text-xs font-bold text-brand-700 ring-1 ring-brand-100">
          {codigo}
        </span>
        <div className="space-y-1">
          <p className="font-semibold tracking-tight text-slate-900">{subtema.titulo}</p>
          <EstadoContenido disponible={Boolean(leccion)} />
        </div>
      </div>
      {leccion && (
        <button
          type="button"
          onClick={() => onAbrirLeccion(leccion)}
          className="group/btn inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Abrir
          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
        </button>
      )}
    </li>
  );
}

function EstadoContenido({ disponible }: { disponible: boolean }) {
  return disponible ? (
    <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
      <CheckCircle2 className="h-4 w-4" aria-hidden />
      Lección disponible
    </p>
  ) : (
    <p className="inline-flex items-center gap-1.5 text-sm text-slate-400">
      <Clock className="h-4 w-4" aria-hidden />
      Próximamente
    </p>
  );
}
