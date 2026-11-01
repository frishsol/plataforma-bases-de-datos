export type ClaveFigura =
  | 'entidad-fuerte'
  | 'entidad-debil'
  | 'entidad-asociativa'
  | 'relacion'
  | 'relacion-identificadora'
  | 'atributo-simple'
  | 'atributo-clave'
  | 'atributo-compuesto'
  | 'atributo-multivalor'
  | 'atributo-derivado'
  | 'linea-total'
  | 'linea-parcial'
  | 'linea-conexion'
  | 'participacion-total'
  | 'participacion-parcial'
  | 'cardinalidad-1-1'
  | 'cardinalidad-1-n'
  | 'cardinalidad-n-m';

export interface SimboloChen {
  id: string;
  nombre: string;
  figura: ClaveFigura;
  significado: string;
  comoSeDibuja: string[];
  cuandoUsar: string;
  ejemplo: string;
  variante?: string;
}
