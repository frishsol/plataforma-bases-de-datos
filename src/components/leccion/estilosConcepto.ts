import type { CategoriaPlanteamiento, TipoConcepto } from '@/tipos/leccion';

interface EstiloConcepto {
  etiqueta: string;
  texto: string;
  fondo: string;
  borde: string;
}

export const ESTILOS_CONCEPTO: Record<TipoConcepto, EstiloConcepto> = {
  entidad: {
    etiqueta: 'Entidad',
    texto: 'text-blue-900',
    fondo: 'bg-blue-100',
    borde: 'border-blue-600',
  },
  atributo: {
    etiqueta: 'Atributo',
    texto: 'text-emerald-900',
    fondo: 'bg-emerald-100',
    borde: 'border-emerald-600',
  },
  relacion: {
    etiqueta: 'Relación',
    texto: 'text-violet-900',
    fondo: 'bg-violet-100',
    borde: 'border-violet-600',
  },
};

export const ESTILOS_CATEGORIA_PLANTEAMIENTO: Record<CategoriaPlanteamiento, EstiloConcepto> = {
  necesidad: {
    etiqueta: 'Necesidad de información',
    texto: 'text-teal-900',
    fondo: 'bg-teal-100',
    borde: 'border-teal-600',
  },
  regla: {
    etiqueta: 'Regla de negocio',
    texto: 'text-amber-900',
    fondo: 'bg-amber-100',
    borde: 'border-amber-600',
  },
  irrelevante: {
    etiqueta: 'No relevante para el diseño',
    texto: 'text-slate-700',
    fondo: 'bg-slate-200',
    borde: 'border-slate-500',
  },
};
