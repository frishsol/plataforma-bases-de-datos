import type { Pregunta, Respuesta } from '@/tipos/juego';

export function crearRespuestaInicial(pregunta: Pregunta): Respuesta {
  if (pregunta.tipo === 'opcion-unica') return { tipo: 'opcion-unica', seleccion: null };
  if (pregunta.tipo === 'seleccion-multiple') return { tipo: 'seleccion-multiple', seleccion: [] };
  return {
    tipo: 'clasificacion',
    asignaciones: Object.fromEntries(pregunta.elementos.map((elemento) => [elemento.id, null])),
  };
}

export function estaRespondida(respuesta: Respuesta): boolean {
  if (respuesta.tipo === 'opcion-unica') return respuesta.seleccion !== null;
  if (respuesta.tipo === 'seleccion-multiple') return respuesta.seleccion.length > 0;
  return Object.values(respuesta.asignaciones).every((valor) => valor !== null);
}

export function esCorrecta(pregunta: Pregunta, respuesta: Respuesta): boolean {
  if (pregunta.tipo === 'opcion-unica' && respuesta.tipo === 'opcion-unica') {
    return respuesta.seleccion === pregunta.correcta;
  }
  if (pregunta.tipo === 'seleccion-multiple' && respuesta.tipo === 'seleccion-multiple') {
    const { seleccion } = respuesta;
    return (
      seleccion.length === pregunta.correctas.length &&
      pregunta.correctas.every((id) => seleccion.includes(id))
    );
  }
  if (pregunta.tipo === 'clasificacion' && respuesta.tipo === 'clasificacion') {
    return pregunta.elementos.every((elemento) => respuesta.asignaciones[elemento.id] === elemento.correcta);
  }
  return false;
}
