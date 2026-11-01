import { BookOpen, CheckCircle2, Clock } from 'lucide-react';
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
    <li className="space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
            {numero}
          </span>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-slate-900">{tema.titulo}</p>
            {tema.descripcion && <p className="leading-normal text-slate-600">{tema.descripcion}</p>}
            <EstadoContenido disponible={disponible} />
          </div>
        </div>
        {leccion && (
          <Boton variante="secundario" onClick={() => onAbrirLeccion(leccion)}>
            <BookOpen className="h-4 w-4" aria-hidden />
            Abrir lección
          </Boton>
        )}
      </div>

      {subtemas.length > 0 && (
        <ol className="divide-y divide-slate-100 overflow-hidden rounded-2xl ring-1 ring-slate-200/80">
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
    <li className="flex flex-col gap-3 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-blue-800">
          {codigo}
        </span>
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{subtema.titulo}</p>
          <EstadoContenido disponible={Boolean(leccion)} />
        </div>
      </div>
      {leccion && (
        <Boton variante="secundario" onClick={() => onAbrirLeccion(leccion)}>
          <BookOpen className="h-4 w-4" aria-hidden />
          Abrir lección
        </Boton>
      )}
    </li>
  );
}

function EstadoContenido({ disponible }: { disponible: boolean }) {
  return disponible ? (
    <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-800">
      <CheckCircle2 className="h-4 w-4" aria-hidden />
      Lección disponible
    </p>
  ) : (
    <p className="inline-flex items-center gap-1.5 text-sm text-slate-500">
      <Clock className="h-4 w-4" aria-hidden />
      Próximamente
    </p>
  );
}
