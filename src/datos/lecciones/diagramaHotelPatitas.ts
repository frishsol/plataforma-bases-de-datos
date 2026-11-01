import type {
  ConexionDiagrama,
  DiagramaER,
  NodoAtributo,
  NodoDiagrama,
  NodoEntidad,
  NodoRelacion,
} from '@/tipos/diagramaER';

const CLIENTE: NodoEntidad = { tipo: 'entidad', id: 'cliente', nombre: 'Cliente', x: 120, y: 200 };
const MASCOTA: NodoEntidad = { tipo: 'entidad', id: 'mascota', nombre: 'Mascota', x: 400, y: 200 };
const ESTANCIA: NodoEntidad = { tipo: 'entidad', id: 'estancia', nombre: 'Estancia', x: 680, y: 200 };

const POSEE: NodoRelacion = { tipo: 'relacion', id: 'posee', nombre: 'posee', x: 260, y: 200 };
const TIENE: NodoRelacion = { tipo: 'relacion', id: 'tiene', nombre: 'tiene', x: 540, y: 200 };

const ID_CLIENTE: NodoAtributo = {
  tipo: 'atributo',
  id: 'id_cliente',
  nombre: 'id_cliente',
  x: 120,
  y: 80,
  variante: 'clave',
};
const NOMBRE_CLIENTE: NodoAtributo = {
  tipo: 'atributo',
  id: 'nombre_cliente',
  nombre: 'nombre',
  x: 40,
  y: 330,
  variante: 'simple',
};
const TELEFONO: NodoAtributo = {
  tipo: 'atributo',
  id: 'telefono',
  nombre: 'teléfono',
  x: 200,
  y: 330,
  variante: 'multivalor',
};
const ID_MASCOTA: NodoAtributo = {
  tipo: 'atributo',
  id: 'id_mascota',
  nombre: 'id_mascota',
  x: 400,
  y: 80,
  variante: 'clave',
};
const NOMBRE_MASCOTA: NodoAtributo = {
  tipo: 'atributo',
  id: 'nombre_mascota',
  nombre: 'nombre',
  x: 340,
  y: 330,
  variante: 'simple',
};
const ESPECIE: NodoAtributo = { tipo: 'atributo', id: 'especie', nombre: 'especie', x: 470, y: 330, variante: 'simple' };
const ID_ESTANCIA: NodoAtributo = {
  tipo: 'atributo',
  id: 'id_estancia',
  nombre: 'id_estancia',
  x: 680,
  y: 80,
  variante: 'clave',
};
const FECHA_ENTRADA: NodoAtributo = {
  tipo: 'atributo',
  id: 'fecha_entrada',
  nombre: 'fecha entrada',
  x: 680,
  y: 330,
  variante: 'simple',
};

const ENTIDADES: NodoDiagrama[] = [CLIENTE, MASCOTA, ESTANCIA];
const RELACIONES: NodoDiagrama[] = [POSEE, TIENE];
const ATRIBUTOS: NodoDiagrama[] = [
  ID_CLIENTE,
  NOMBRE_CLIENTE,
  TELEFONO,
  ID_MASCOTA,
  NOMBRE_MASCOTA,
  ESPECIE,
  ID_ESTANCIA,
  FECHA_ENTRADA,
];

const CONEXIONES_RELACION: ConexionDiagrama[] = [
  { desde: 'cliente', hasta: 'posee', etiqueta: '1' },
  { desde: 'mascota', hasta: 'posee', etiqueta: 'N' },
  { desde: 'mascota', hasta: 'tiene', etiqueta: '1' },
  { desde: 'estancia', hasta: 'tiene', etiqueta: 'N' },
];

const CONEXIONES_PARTICIPACION: ConexionDiagrama[] = [
  { desde: 'cliente', hasta: 'posee', etiqueta: '1' },
  { desde: 'mascota', hasta: 'posee', etiqueta: 'N', participacion: 'total' },
  { desde: 'mascota', hasta: 'tiene', etiqueta: '1' },
  { desde: 'estancia', hasta: 'tiene', etiqueta: 'N', participacion: 'total' },
];

const CONEXIONES_ATRIBUTOS: ConexionDiagrama[] = [
  { desde: 'cliente', hasta: 'id_cliente' },
  { desde: 'cliente', hasta: 'nombre_cliente' },
  { desde: 'cliente', hasta: 'telefono' },
  { desde: 'mascota', hasta: 'id_mascota' },
  { desde: 'mascota', hasta: 'nombre_mascota' },
  { desde: 'mascota', hasta: 'especie' },
  { desde: 'estancia', hasta: 'id_estancia' },
  { desde: 'estancia', hasta: 'fecha_entrada' },
];

const TODOS_LOS_NODOS: NodoDiagrama[] = [...ENTIDADES, ...RELACIONES, ...ATRIBUTOS];

export const DIAGRAMAS_HOTEL_PATITAS = {
  entidades: { nodos: ENTIDADES, conexiones: [] } satisfies DiagramaER,
  relaciones: { nodos: [...ENTIDADES, ...RELACIONES], conexiones: CONEXIONES_RELACION } satisfies DiagramaER,
  atributos: {
    nodos: TODOS_LOS_NODOS,
    conexiones: [...CONEXIONES_RELACION, ...CONEXIONES_ATRIBUTOS],
  } satisfies DiagramaER,
  participacion: {
    nodos: TODOS_LOS_NODOS,
    conexiones: [...CONEXIONES_PARTICIPACION, ...CONEXIONES_ATRIBUTOS],
  } satisfies DiagramaER,
};
