export type EtapaLeccion = 'aprende' | 'observa' | 'practica';

export const ETAPAS_LECCION: { id: EtapaLeccion; etiqueta: string }[] = [
  { id: 'aprende', etiqueta: 'Aprende' },
  { id: 'observa', etiqueta: 'Observa' },
  { id: 'practica', etiqueta: 'Practica' },
];
