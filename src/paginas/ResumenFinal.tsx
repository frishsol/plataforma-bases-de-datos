import { ArrowRight, RotateCcw } from 'lucide-react';
import { DESAFIOS } from '@/datos/desafios';
import type { ProgresoPorDesafio } from '@/tipos/juego';
import { calcularResumen } from '@/lib/estadisticas';
import { BarraProgreso } from '@/components/ui/BarraProgreso';
import { Boton } from '@/components/ui/Boton';
import { Tarjeta } from '@/components/ui/Tarjeta';

interface ResumenFinalProps {
  progreso: ProgresoPorDesafio;
  onIrAInicio: () => void;
  onReiniciar: () => void;
}

function mensajeMotivador(porcentaje: number): string {
  if (porcentaje === 100) return '¡Felicidades! Completaste todo el recorrido con puntuación perfecta.';
  if (porcentaje >= 70) return 'Excelente progreso. Ya dominas la mayor parte del diseño de bases de datos.';
  if (porcentaje > 0) return 'Vas muy bien. Repite los desafíos donde fallaste para afianzar los conceptos.';
  return 'Aún no has empezado. Elige un módulo y pon a prueba tus conocimientos.';
}

export function ResumenFinal({ progreso, onIrAInicio, onReiniciar }: ResumenFinalProps) {
  const resumen = calcularResumen(progreso);
  const porcentaje = Math.round((resumen.puntajeTotal / resumen.preguntasTotales) * 100);

  function reiniciar() {
    if (window.confirm('¿Seguro que quieres borrar todo tu progreso en este navegador?')) {
      onReiniciar();
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Resumen final</p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Tus resultados</h2>
        <p className="leading-normal text-slate-600">{mensajeMotivador(porcentaje)}</p>
      </header>

      <Tarjeta className="space-y-8">
        <div className="grid gap-6 text-center sm:grid-cols-3">
          <div className="space-y-1">
            <p className="text-4xl font-bold text-blue-700">{porcentaje}%</p>
            <p className="text-sm font-medium text-slate-600">Puntuación total</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-bold text-teal-700">
              {resumen.puntajeTotal}/{resumen.preguntasTotales}
            </p>
            <p className="text-sm font-medium text-slate-600">Puntos obtenidos</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-bold text-sky-700">
              {resumen.desafiosCompletados}/{resumen.totalDesafios}
            </p>
            <p className="text-sm font-medium text-slate-600">Desafíos completados</p>
          </div>
        </div>

        <BarraProgreso valor={porcentaje} etiqueta="Avance general" />
      </Tarjeta>

      <Tarjeta className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Mejor resultado por desafío</h3>
        <ul className="space-y-5">
          {DESAFIOS.map((desafio) => {
            const resultado = progreso[desafio.id];
            const total = desafio.preguntas.length;
            const valor = resultado?.completado ? (resultado.mejorPuntaje / total) * 100 : 0;
            return (
              <li key={desafio.id} className="space-y-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-semibold text-slate-900">
                    {desafio.id}. {desafio.titulo}
                  </span>
                  <span className="text-slate-600">
                    {resultado?.completado ? `${resultado.mejorPuntaje}/${total}` : 'Sin completar'}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200" aria-hidden>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-blue-600 transition-all duration-700"
                    style={{ width: `${valor}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Tarjeta>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Boton onClick={onIrAInicio}>
          Seguir practicando
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Boton>
        <Boton variante="secundario" onClick={reiniciar}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          Reiniciar progreso
        </Boton>
      </div>
    </div>
  );
}
