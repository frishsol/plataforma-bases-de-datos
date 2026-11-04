import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { VisualPaso } from '@/components/leccion/VisualPaso';
import { BarraProgreso } from '@/components/ui/BarraProgreso';
import { Boton } from '@/components/ui/Boton';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { PasoObservacion } from '@/tipos/leccion';

interface ObservaLeccionProps {
  pasos: PasoObservacion[];
}

export function ObservaLeccion({ pasos }: ObservaLeccionProps) {
  const [indice, setIndice] = useState(0);
  const total = pasos.length;
  const paso = pasos[indice];
  const esUltimo = indice === total - 1;

  return (
    <div className="animate-aparecer space-y-6">
      <Tarjeta className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-600">
            Paso {indice + 1} de {total}
          </p>
          <BarraProgreso valor={((indice + 1) / total) * 100} etiqueta="Avance del ejemplo" />
        </div>

        <div key={indice} className="animate-aparecer space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">{paso.titulo}</h3>
            <p className="w-full leading-relaxed text-slate-700">{paso.explicacion}</p>
          </div>
          <VisualPaso visual={paso.visual} descripcion={paso.titulo} />
        </div>
      </Tarjeta>

      <div className="flex items-center justify-between gap-3">
        <Boton variante="fantasma" onClick={() => setIndice(indice - 1)} disabled={indice === 0}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Paso anterior
        </Boton>
        <Boton onClick={() => setIndice(indice + 1)} disabled={esUltimo}>
          Siguiente paso
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Boton>
      </div>
    </div>
  );
}
