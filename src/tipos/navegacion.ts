import type { Desafio } from '@/tipos/juego';
import type { Leccion } from '@/tipos/leccion';
import type { Modulo } from '@/tipos/modulo';

export type NombreVistaPrincipal = 'inicio' | 'resumen';

export type Vista =
  | { nombre: NombreVistaPrincipal }
  | { nombre: 'modulo'; modulo: Modulo }
  | { nombre: 'desafio'; modulo: Modulo; desafio: Desafio }
  | { nombre: 'leccion'; modulo: Modulo; leccion: Leccion };
