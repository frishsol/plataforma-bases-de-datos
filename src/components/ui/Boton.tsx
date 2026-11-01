import type { ButtonHTMLAttributes } from 'react';

type Variante = 'primario' | 'secundario' | 'fantasma' | 'claro';
type Tamano = 'md' | 'lg';

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: Tamano;
}

const ESTILOS: Record<Variante, string> = {
  primario:
    'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md shadow-blue-600/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30',
  secundario: 'bg-white text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50',
  fantasma: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  claro: 'bg-white text-blue-700 shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl',
};

const TAMANOS: Record<Tamano, string> = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Boton({
  variante = 'primario',
  tamano = 'md',
  className = '',
  type = 'button',
  ...props
}: BotonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${ESTILOS[variante]} ${TAMANOS[tamano]} ${className}`}
      {...props}
    />
  );
}
