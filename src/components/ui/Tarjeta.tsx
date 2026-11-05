import type { HTMLAttributes } from 'react';

export function Tarjeta({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200/70 transition duration-300 sm:p-7 ${className}`}
      {...props}
    />
  );
}
