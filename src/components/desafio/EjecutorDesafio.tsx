import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import type { Pregunta, Respuesta } from '@/tipos/juego';
import { crearRespuestaInicial, esCorrecta, estaRespondida } from '@/lib/evaluarPregunta';
import { BarraProgreso } from '@/components/ui/BarraProgreso';
import { Boton } from '@/components/ui/Boton';
import { Tarjeta } from '@/components/ui/Tarjeta';
import { RenderizadorPregunta } from './RenderizadorPregunta';
import { ResultadoDesafio } from './ResultadoDesafio';

interface AccionSiguiente {
  etiqueta: string;
  onClick: () => void;
}

interface EjecutorDesafioProps {
  preguntas: Pregunta[];
  tituloResultado: string;
  conAyudas?: boolean;
  onFinalizar?: (aciertos: number) => void;
  onReintentar: () => void;
  onSalir: () => void;
  siguiente?: AccionSiguiente;
}

export function EjecutorDesafio({
  preguntas,
  tituloResultado,
  conAyudas = false,
  onFinalizar,
  onReintentar,
  onSalir,
  siguiente,
}: EjecutorDesafioProps) {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState<Respuesta>(() => crearRespuestaInicial(preguntas[0]));
  const [revelada, setRevelada] = useState(false);
  const [ultimoAcierto, setUltimoAcierto] = useState(false);
  const [pistaVisible, setPistaVisible] = useState(false);
  const [resultados, setResultados] = useState<boolean[]>([]);
  const [terminado, setTerminado] = useState(false);

  const total = preguntas.length;
  const pregunta = preguntas[indice];
  const aciertos = resultados.filter(Boolean).length;
  const esUltima = indice + 1 === total;

  function comprobar() {
    setRevelada(true);
    setUltimoAcierto(esCorrecta(pregunta, respuesta));
  }

  function reintentar() {
    setRevelada(false);
  }

  function avanzar() {
    const nuevosResultados = [...resultados, ultimoAcierto];
    setResultados(nuevosResultados);
    if (esUltima) {
      setTerminado(true);
      onFinalizar?.(nuevosResultados.filter(Boolean).length);
      return;
    }
    setIndice(indice + 1);
    setRespuesta(crearRespuestaInicial(preguntas[indice + 1]));
    setRevelada(false);
    setUltimoAcierto(false);
    setPistaVisible(false);
  }

  if (terminado) {
    return (
      <ResultadoDesafio
        aciertos={aciertos}
        total={total}
        resultados={resultados}
        tituloResultado={tituloResultado}
        onReintentar={onReintentar}
        onSalir={onSalir}
        siguiente={siguiente}
      />
    );
  }

  const mostrarPista = conAyudas && Boolean(pregunta.pista) && !revelada;
  const puedeReintentar = conAyudas && revelada && !ultimoAcierto;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-600">
          Pregunta {indice + 1} de {total}
        </p>
        <span className="inline-flex items-center self-start rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 sm:self-auto">
          Aciertos: {aciertos}
        </span>
      </div>

      <BarraProgreso valor={(resultados.length / total) * 100} etiqueta="Avance de la práctica" />

      <Tarjeta key={indice} className="animate-aparecer space-y-6">
        <h3 className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl">{pregunta.enunciado}</h3>
        <RenderizadorPregunta pregunta={pregunta} respuesta={respuesta} revelada={revelada} onCambiar={setRespuesta} />
        {mostrarPista && pistaVisible && (
          <p role="note" className="animate-aparecer flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm leading-normal text-amber-900 ring-1 ring-amber-200">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {pregunta.pista}
          </p>
        )}
      </Tarjeta>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {mostrarPista && !pistaVisible ? (
          <Boton variante="secundario" onClick={() => setPistaVisible(true)}>
            <Lightbulb className="h-4 w-4" aria-hidden />
            Mostrar pista
          </Boton>
        ) : (
          <span />
        )}
        {revelada ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            {puedeReintentar && (
              <Boton variante="secundario" onClick={reintentar}>
                Intentar otra vez
              </Boton>
            )}
            <Boton onClick={avanzar}>{esUltima ? 'Ver resultado final' : 'Siguiente pregunta'}</Boton>
          </div>
        ) : (
          <Boton onClick={comprobar} disabled={!estaRespondida(respuesta)}>
            Comprobar respuesta
          </Boton>
        )}
      </div>
    </div>
  );
}
