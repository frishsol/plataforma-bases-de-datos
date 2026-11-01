import { CheckCircle2, XCircle } from 'lucide-react';

interface PanelRetroalimentacionProps {
  correcta: boolean;
  explicacion: string;
  detalles: string[];
}

export function PanelRetroalimentacion({ correcta, explicacion, detalles }: PanelRetroalimentacionProps) {
  const Icono = correcta ? CheckCircle2 : XCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`animate-aparecer rounded-2xl p-5 ring-1 ${
        correcta ? 'bg-emerald-50 text-emerald-900 ring-emerald-200' : 'bg-amber-50 text-amber-900 ring-amber-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <Icono
          className={`mt-0.5 h-6 w-6 shrink-0 ${correcta ? 'text-emerald-600' : 'text-amber-600'}`}
          aria-hidden
        />
        <div className="space-y-3">
          <p className="font-semibold">
            {correcta
              ? '¡Muy bien! Tu respuesta es correcta.'
              : 'Aún no es correcta. Revisa la explicación y sigue avanzando.'}
          </p>
          <p className="leading-normal">{explicacion}</p>
          {detalles.length > 0 && (
            <ul className="list-inside list-disc space-y-1 leading-normal">
              {detalles.map((detalle) => (
                <li key={detalle}>{detalle}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
