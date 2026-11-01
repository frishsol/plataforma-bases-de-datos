import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Boton } from '@/components/ui/Boton';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { Desafio, ResultadoDesafio as ResultadoGuardado } from '@/tipos/juego';

interface TarjetaDesafioProps {
  desafio: Desafio;
  resultado?: ResultadoGuardado;
  onAbrir: () => void;
}

export function TarjetaDesafio({ desafio, resultado, onAbrir }: TarjetaDesafioProps) {
  const Icono = desafio.icono;

  return (
    <Tarjeta className="group flex flex-col gap-5 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
          <Icono className="h-7 w-7" aria-hidden />
        </span>
        {resultado?.completado ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Mejor: {resultado.mejorPuntaje}/{resultado.total}
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Pendiente</span>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-blue-600">Desafío {desafio.id}</p>
        <h3 className="text-xl font-bold leading-tight text-slate-900">{desafio.titulo}</h3>
        <p className="leading-normal text-slate-600">{desafio.subtitulo}</p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
        <span className="text-sm text-slate-500">{desafio.preguntas.length} preguntas</span>
        <Boton onClick={onAbrir}>
          {resultado?.completado ? 'Repetir' : 'Empezar'}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Boton>
      </div>
    </Tarjeta>
  );
}
