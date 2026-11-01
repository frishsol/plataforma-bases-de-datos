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
        <span>{porcentaje}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={etiqueta}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={porcentaje}
        className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-blue-700 transition-all duration-700 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}
