import type { ButtonHTMLAttributes } from 'react';

type Variante = 'primario' | 'secundario' | 'fantasma' | 'claro';
type Tamano = 'md' | 'lg';

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: Tamano;
}

const ESTILOS: Record<Variante, string> = {
  primario:
    'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-md shadow-brand-600/25 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0',
  secundario:
    'bg-white text-brand-700 ring-1 ring-brand-200 shadow-soft hover:bg-brand-50 hover:ring-brand-300 hover:-translate-y-0.5',
  fantasma: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  claro:
    'bg-white text-brand-700 shadow-elevated hover:bg-brand-50 hover:-translate-y-0.5 hover:shadow-glow',
};

const TAMANOS: Record<Tamano, string> = {
  md: 'px-5 py-2.5 text-sm',
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
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${ESTILOS[variante]} ${TAMANOS[tamano]} ${className}`}
      {...props}
    />
  );
}
