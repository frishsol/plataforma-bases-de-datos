import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { EjecutorDesafio } from '@/components/desafio/EjecutorDesafio';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { Pregunta } from '@/tipos/juego';

interface PracticaLeccionProps {
  preguntas: Pregunta[];
  onSalir: () => void;
}

export function PracticaLeccion({ preguntas, onSalir }: PracticaLeccionProps) {
  const [intento, setIntento] = useState(0);

  return (
    <div className="animate-aparecer space-y-6">
      <div className="flex gap-4 rounded-2xl bg-gradient-to-br from-accent-50 to-brand-50 p-5 ring-1 ring-accent-100 sm:p-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 shadow-soft">
          <Lightbulb className="h-5 w-5" aria-hidden />
        </span>
        <p className="text-pretty text-sm leading-relaxed text-slate-700">
          Puedes pedir una pista en cualquier pregunta y reintentar tantas veces como necesites. Las
          pistas no restan puntos: sirven para aprender.
        </p>
      </div>

      <EjecutorDesafio
        key={intento}
        preguntas={preguntas}
        tituloResultado="Resultado de la práctica"
        conAyudas
        onReintentar={() => setIntento((actual) => actual + 1)}
        onSalir={onSalir}
      />
    </div>
  );
}
