import type { HTMLAttributes } from 'react';

export function Tarjeta({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-8 ${className}`}
      {...props}
    />
  );
}
