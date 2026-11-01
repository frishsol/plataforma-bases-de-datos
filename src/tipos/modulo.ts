import type { LucideIcon } from 'lucide-react';
import type { Desafio } from '@/tipos/juego';
import type { Leccion } from '@/tipos/leccion';

export interface SubtemaModulo {
  titulo: string;
  leccion?: Leccion;
}

export interface TemaModulo {
  titulo: string;
  descripcion?: string;
  leccion?: Leccion;
  subtemas?: SubtemaModulo[];
}

export interface Modulo {
  id: string;
  numero: number;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
  temas: TemaModulo[];
  desafios: Desafio[];
}
