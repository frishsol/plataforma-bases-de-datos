import type { DiagramaER } from '@/tipos/diagramaER';

export const DIAGRAMA_IDENTIFICADORA: DiagramaER = {
  nodos: [
    { tipo: 'entidad', id: 'mascota', nombre: 'Mascota', x: 200, y: 200 },
    { tipo: 'relacion', id: 'tiene', nombre: 'tiene', x: 400, y: 200, identificadora: true },
    { tipo: 'entidad', id: 'vacuna', nombre: 'Vacuna', x: 600, y: 200, debil: true },
  ],
  conexiones: [
    { desde: 'mascota', hasta: 'tiene', etiqueta: '1' },
    { desde: 'vacuna', hasta: 'tiene', etiqueta: 'N', participacion: 'total' },
  ],
};
