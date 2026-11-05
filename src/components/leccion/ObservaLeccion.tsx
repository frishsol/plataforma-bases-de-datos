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
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold tracking-tight text-slate-500">
              Paso <span className="text-brand-700">{indice + 1}</span> de {total}
            </p>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
              Observa
            </span>
          </div>
          <BarraProgreso valor={((indice + 1) / total) * 100} etiqueta="Avance del ejemplo" />
        </div>

        <div key={indice} className="animate-aparecer space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold tracking-tight text-slate-900">{paso.titulo}</h3>
            <p className="text-pretty w-full leading-relaxed text-slate-600">{paso.explicacion}</p>
          </div>
          <VisualPaso visual={paso.visual} descripcion={paso.titulo} />
        </div>
      </Tarjeta>

      <div className="flex items-center justify-between gap-3">
        <Boton variante="fantasma" onClick={() => setIndice(indice - 1)} disabled={indice === 0}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Anterior
        </Boton>
        <div className="flex gap-1.5">
          {pasos.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === indice ? 'w-6 bg-brand-600' : 'w-2 bg-slate-300'
              }`}
              aria-hidden
            />
          ))}
        </div>
        <Boton onClick={() => setIndice(indice + 1)} disabled={esUltimo}>
          Siguiente
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Boton>
      </div>
    </div>
  );
}
