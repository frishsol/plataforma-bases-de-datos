import type { VarianteAtributo } from '@/tipos/diagramaER';

export interface AtributoActividad {
  id: string;
  nombre: string;
  entidad: string;
  variante: VarianteAtributo;
  partes?: string[];
  pista: string;
  explicacion: string;
}
