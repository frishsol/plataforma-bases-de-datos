import type { LucideIcon } from 'lucide-react';
import type { ClaveFigura, SimboloChen } from '@/tipos/simbolosChen';
import type { DiagramaER } from '@/tipos/diagramaER';
import type { AtributoActividad } from '@/tipos/actividadAtributos';
import type { Pregunta } from '@/tipos/juego';

export type TipoConcepto = 'entidad' | 'atributo' | 'relacion';

export interface ElementoGrafico {
  nombre: string;
  figura: ClaveFigura;
  definicion: string;
  ejemplo: string;
  tono: TipoConcepto | 'linea';
}

export interface ElementoComparado {
  titulo: string;
  figura: ClaveFigura;
  descripcion: string;
  ejemplo: string;
}

export interface SenalTexto {
  senal: string;
  indica: string;
  ejemplo: string;
}

export interface SegmentoFrase {
  texto: string;
  tipo?: TipoConcepto;
}

export type CategoriaPlanteamiento = 'necesidad' | 'regla' | 'irrelevante';

export interface SegmentoPlanteamiento {
  texto: string;
  categoria?: CategoriaPlanteamiento;
}

export interface GrupoResultado {
  tipo: TipoConcepto;
  etiqueta?: string;
  elementos: string[];
}

export interface TarjetaIntro {
  icono: LucideIcon;
  titulo: string;
  texto: string;
  etiqueta?: string;
}

export interface TablaEjemplo {
  nombre: string;
  columnas: string[];
  filas: string[][];
}

export type BloqueAprende =
  | { tipo: 'destacado'; titulo: string; texto: string }
  | { tipo: 'tarjetas-intro'; titulo: string; tarjetas: TarjetaIntro[] }
  | { tipo: 'elementos-graficos'; titulo: string; elementos: ElementoGrafico[] }
  | { tipo: 'comparativa-figuras'; titulo: string; elementos: ElementoComparado[] }
  | { tipo: 'senales'; titulo: string; senales: SenalTexto[] }
  | { tipo: 'simbolos'; titulo: string; descripcion: string; simbolos: SimboloChen[] }
  | { tipo: 'ejemplo-diagrama'; titulo: string; descripcion: string; diagrama: DiagramaER; pasos: string[]; lectura: string }
  | { tipo: 'comparativa-notaciones'; titulo: string; texto: string; otras: NotacionAlternativa[] }
  | { tipo: 'actividad-atributos'; titulo: string; descripcion: string; atributos: AtributoActividad[] }
  | {
      tipo: 'comparativa-tablas';
      titulo: string;
      texto: string;
      logica: TablaEjemplo;
      fisica: TablaEjemplo;
      diferencias: string[];
    };

export interface NotacionAlternativa {
  nombre: string;
  descripcion: string;
}

export type VisualPaso =
  | { tipo: 'frase'; segmentos: SegmentoFrase[]; resalta: TipoConcepto }
  | { tipo: 'diagrama'; diagrama: DiagramaER }
  | { tipo: 'resultado'; grupos: GrupoResultado[] }
  | { tipo: 'planteamiento'; segmentos: SegmentoPlanteamiento[]; resalta: CategoriaPlanteamiento }
  | { tipo: 'tablas'; tablas: TablaEjemplo[] }
  | { tipo: 'tabla-interactiva'; tabla: TablaEjemplo }
  | { tipo: 'tablas-interactivas'; tablas: TablaEjemplo[] };

export interface PasoObservacion {
  titulo: string;
  explicacion: string;
  visual: VisualPaso;
}

export interface Leccion {
  id: string;
  titulo: string;
  objetivo: string;
  aprende: BloqueAprende[];
  observa: PasoObservacion[];
  practica: Pregunta[];
}
