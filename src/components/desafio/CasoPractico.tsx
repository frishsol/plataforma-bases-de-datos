import { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { CASO_HOTEL_PATITAS } from '@/datos/caso';

interface CasoPracticoProps {
  abiertoInicialmente?: boolean;
}

export function CasoPractico({ abiertoInicialmente = false }: CasoPracticoProps) {
  const [abierto, setAbierto] = useState(abiertoInicialmente);

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/80">
      <button
        type="button"
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
      >
        <span className="flex items-center gap-3 font-semibold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <BookOpen className="h-5 w-5" aria-hidden />
          </span>
          {CASO_HOTEL_PATITAS.titulo}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${abierto ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {abierto && (
        <div className="animate-aparecer space-y-3 border-t border-slate-100 px-6 py-5 leading-normal text-slate-700">
          {CASO_HOTEL_PATITAS.parrafos.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>
      )}
    </section>
  );
}
