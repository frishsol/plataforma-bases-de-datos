import { ArrowRight, RotateCcw, ArrowLeft } from 'lucide-react';
import { Boton } from '@/components/ui/Boton';
import { Tarjeta } from '@/components/ui/Tarjeta';

interface AccionSiguiente {
  etiqueta: string;
  onClick: () => void;
}

interface ResultadoDesafioProps {
  aciertos: number;
  total: number;
  resultados: boolean[];
  tituloResultado: string;
  onReintentar: () => void;
  onSalir: () => void;
  siguiente?: AccionSiguiente;
}

function mensajeSegunPorcentaje(porcentaje: number): string {
  if (porcentaje === 100) return '¡Perfecto! Dominas este tema.';
  if (porcentaje >= 60) return 'Buen trabajo. Revisa las explicaciones de las respuestas incorrectas.';
  return 'Cada intento te acerca más. Vuelve a intentarlo cuando quieras.';
}

export function ResultadoDesafio({
  aciertos,
  total,
  resultados,
  tituloResultado,
  onReintentar,
  onSalir,
  siguiente,
}: ResultadoDesafioProps) {
  const porcentaje = Math.round((aciertos / total) * 100);

  return (
    <Tarjeta className="animate-aparecer space-y-8 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{tituloResultado}</p>
        <div className="mx-auto mt-4 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-teal-600 text-white shadow-lg shadow-blue-700/25">
          <span className="text-3xl font-bold">
            {aciertos}/{total}
          </span>
          <span className="text-sm font-medium">{porcentaje}%</span>
        </div>
        <p className="mt-6 text-lg font-semibold text-slate-900">{mensajeSegunPorcentaje(porcentaje)}</p>
      </div>

      <ul className="flex flex-wrap justify-center gap-2" aria-label="Respuestas por pregunta">
        {resultados.map((correcta, indice) => (
          <li
            key={indice}
            aria-label={`Pregunta ${indice + 1}: ${correcta ? 'correcta' : 'incorrecta'}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
              correcta ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}
          >
            {indice + 1}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Boton variante="secundario" onClick={onReintentar}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          Intentar de nuevo
        </Boton>
        <Boton variante="fantasma" onClick={onSalir}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Volver al módulo
        </Boton>
        {siguiente && (
          <Boton onClick={siguiente.onClick}>
            {siguiente.etiqueta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Boton>
        )}
      </div>
    </Tarjeta>
  );
}
