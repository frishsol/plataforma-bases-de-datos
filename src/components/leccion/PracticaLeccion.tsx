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
      <Tarjeta className="flex gap-4 p-6">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
        <p className="text-sm leading-normal text-slate-600">
          Puedes pedir una pista en cualquier pregunta y reintentar tantas veces como necesites. Las pistas no restan
          puntos: sirven para aprender.
        </p>
      </Tarjeta>

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
