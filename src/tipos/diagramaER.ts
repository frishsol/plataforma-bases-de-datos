export type VarianteAtributo = 'simple' | 'clave' | 'compuesto' | 'multivalor' | 'derivado';

export interface NodoEntidad {
  tipo: 'entidad';
  id: string;
  nombre: string;
  x: number;
  y: number;
  debil?: boolean;
}

export interface NodoRelacion {
  tipo: 'relacion';
  id: string;
  nombre: string;
  x: number;
  y: number;
  identificadora?: boolean;
}

export interface NodoAtributo {
  tipo: 'atributo';
  id: string;
  nombre: string;
  x: number;
  y: number;
  variante: VarianteAtributo;
}

export type NodoDiagrama = NodoEntidad | NodoRelacion | NodoAtributo;

export interface ConexionDiagrama {
  desde: string;
  hasta: string;
  etiqueta?: string;
  participacion?: 'total' | 'parcial';
}

export interface DiagramaER {
  nodos: NodoDiagrama[];
  conexiones: ConexionDiagrama[];
}
