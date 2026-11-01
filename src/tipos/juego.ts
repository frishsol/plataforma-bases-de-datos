import type { LucideIcon } from 'lucide-react';

export interface Opcion {
  id: string;
  texto: string;
}

interface PreguntaBase {
  id: string;
  enunciado: string;
  explicacion: string;
  pista?: string;
}

export interface PreguntaOpcionUnica extends PreguntaBase {
  tipo: 'opcion-unica';
  opciones: Opcion[];
  correcta: string;
  explicacionesOpciones: Record<string, string>;
}

export interface PreguntaSeleccionMultiple extends PreguntaBase {
  tipo: 'seleccion-multiple';
  opciones: Opcion[];
  correctas: string[];
  explicacionesOpciones: Record<string, string>;
}

export interface ElementoClasificacion {
  id: string;
  texto: string;
  correcta: string;
  explicacion: string;
}

export interface PreguntaClasificacion extends PreguntaBase {
  tipo: 'clasificacion';
  categorias: Opcion[];
  elementos: ElementoClasificacion[];
}

export type Pregunta = PreguntaOpcionUnica | PreguntaSeleccionMultiple | PreguntaClasificacion;

export type Respuesta =
  | { tipo: 'opcion-unica'; seleccion: string | null }
  | { tipo: 'seleccion-multiple'; seleccion: string[] }
  | { tipo: 'clasificacion'; asignaciones: Record<string, string | null> };

export interface ContextoDesafio {
  titulo: string;
  lineas: string[];
}

export interface Desafio {
  id: number;
  titulo: string;
  subtitulo: string;
  icono: LucideIcon;
  instrucciones: string;
  contexto?: ContextoDesafio;
  preguntas: Pregunta[];
}

export interface ResultadoDesafio {
  mejorPuntaje: number;
  total: number;
  intentos: number;
  completado: boolean;
}

export type ProgresoPorDesafio = Record<number, ResultadoDesafio>;
