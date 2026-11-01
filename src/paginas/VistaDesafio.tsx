import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CasoPractico } from '@/components/desafio/CasoPractico';
import { EjecutorDesafio } from '@/components/desafio/EjecutorDesafio';
import { MaterialDeApoyo } from '@/components/desafio/MaterialDeApoyo';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { Desafio } from '@/tipos/juego';
import type { Modulo } from '@/tipos/modulo';
import type { Vista } from '@/tipos/navegacion';

interface VistaDesafioProps {
  modulo: Modulo;
  desafio: Desafio;
  onRegistrar: (id: number, puntaje: number, total: number) => void;
  onNavegar: (vista: Vista) => void;
}

export function VistaDesafio({ modulo, desafio, onRegistrar, onNavegar }: VistaDesafioProps) {
  const [intento, setIntento] = useState(0);
  const indice = modulo.desafios.findIndex((item) => item.id === desafio.id);
  const siguienteDesafio = modulo.desafios[indice + 1];
  const Icono = desafio.icono;

  const siguiente = siguienteDesafio
    ? { etiqueta: 'Siguiente desafío', onClick: () => onNavegar({ nombre: 'desafio', modulo, desafio: siguienteDesafio }) }
    : undefined;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => onNavegar({ nombre: 'modulo', modulo })}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 sm:py-2 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver al módulo
      </button>

      <Tarjeta className="space-y-5">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
            <Icono className="h-7 w-7" aria-hidden />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-blue-600">
              Desafío {indice + 1} de {modulo.desafios.length}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{desafio.titulo}</h2>
            <p className="text-slate-600">{desafio.subtitulo}</p>
          </div>
        </div>
        <p className="leading-normal text-slate-700">{desafio.instrucciones}</p>
      </Tarjeta>

      <CasoPractico />

      {desafio.contexto && <MaterialDeApoyo contexto={desafio.contexto} />}

      <EjecutorDesafio
        key={`${desafio.id}-${intento}`}
        preguntas={desafio.preguntas}
        tituloResultado="Resultado del desafío"
        onFinalizar={(aciertos) => onRegistrar(desafio.id, aciertos, desafio.preguntas.length)}
        onReintentar={() => setIntento((actual) => actual + 1)}
        onSalir={() => onNavegar({ nombre: 'modulo', modulo })}
        siguiente={siguiente}
      />
    </div>
  );
}
