import { DESAFIOS } from '@/datos/desafios';
import type { ProgresoPorDesafio } from '@/tipos/juego';

export interface ResumenProgreso {
  desafiosCompletados: number;
  totalDesafios: number;
  puntajeTotal: number;
  preguntasTotales: number;
}

export function calcularResumen(progreso: ProgresoPorDesafio): ResumenProgreso {
  const completados = DESAFIOS.filter((desafio) => progreso[desafio.id]?.completado);
  return {
    desafiosCompletados: completados.length,
    totalDesafios: DESAFIOS.length,
    puntajeTotal: completados.reduce((suma, desafio) => suma + progreso[desafio.id].mejorPuntaje, 0),
    preguntasTotales: DESAFIOS.reduce((suma, desafio) => suma + desafio.preguntas.length, 0),
  };
}
