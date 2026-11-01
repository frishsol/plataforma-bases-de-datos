import type { DiagramaER } from '@/tipos/diagramaER';

export const DIAGRAMA_CLIENTE_MASCOTA: DiagramaER = {
  nodos: [
    { tipo: 'entidad', id: 'cliente', nombre: 'Cliente', x: 200, y: 200 },
    { tipo: 'relacion', id: 'tiene', nombre: 'tiene', x: 400, y: 200 },
    { tipo: 'entidad', id: 'mascota', nombre: 'Mascota', x: 600, y: 200 },
    { tipo: 'atributo', id: 'id_cliente', nombre: 'id_cliente', x: 200, y: 80, variante: 'clave' },
    { tipo: 'atributo', id: 'nombre_cliente', nombre: 'nombre', x: 90, y: 330, variante: 'simple' },
    { tipo: 'atributo', id: 'id_mascota', nombre: 'id_mascota', x: 600, y: 80, variante: 'clave' },
    { tipo: 'atributo', id: 'nombre_mascota', nombre: 'nombre', x: 520, y: 330, variante: 'simple' },
    { tipo: 'atributo', id: 'especie', nombre: 'especie', x: 680, y: 330, variante: 'simple' },
  ],
  conexiones: [
    { desde: 'cliente', hasta: 'tiene', etiqueta: '1' },
    { desde: 'mascota', hasta: 'tiene', etiqueta: 'N' },
    { desde: 'cliente', hasta: 'id_cliente' },
    { desde: 'cliente', hasta: 'nombre_cliente' },
    { desde: 'mascota', hasta: 'id_mascota' },
    { desde: 'mascota', hasta: 'nombre_mascota' },
    { desde: 'mascota', hasta: 'especie' },
  ],
};
