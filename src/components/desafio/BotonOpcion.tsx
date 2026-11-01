import type { ButtonHTMLAttributes } from 'react';

export type EstiloOpcion = 'neutro' | 'seleccionada' | 'acierto' | 'error' | 'omitida';

const ESTILOS: Record<EstiloOpcion, string> = {
  neutro: 'bg-white text-slate-700 ring-slate-200 hover:bg-blue-50 hover:text-slate-900 hover:ring-blue-300',
  seleccionada: 'bg-blue-50 text-blue-800 ring-2 ring-blue-500',
  acierto: 'bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500',
  error: 'bg-rose-50 text-rose-800 ring-2 ring-rose-400',
  omitida: 'bg-amber-50 text-amber-800 ring-2 ring-amber-400',
};

interface BotonOpcionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  estilo: EstiloOpcion;
}

export function BotonOpcion({ estilo, className = '', type = 'button', ...props }: BotonOpcionProps) {
  return (
    <button
      type={type}
      className={`transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-default ${ESTILOS[estilo]} ${className}`}
      {...props}
    />
  );
}
