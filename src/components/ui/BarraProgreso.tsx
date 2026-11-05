interface BarraProgresoProps {
  valor: number;
  etiqueta: string;
}

export function BarraProgreso({ valor, etiqueta }: BarraProgresoProps) {
  const porcentaje = Math.round(Math.min(100, Math.max(0, valor)));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
        <span>{etiqueta}</span>
        <span className="font-mono font-semibold text-brand-700">{porcentaje}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={etiqueta}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={porcentaje}
        className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-400 via-brand-500 to-brand-700 transition-all duration-700 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}
