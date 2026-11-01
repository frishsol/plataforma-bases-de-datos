import { Database } from 'lucide-react';
import { MODULOS } from '@/datos/modulos';
import type { Vista } from '@/tipos/navegacion';

interface EnlaceNavegacion {
  clave: string;
  etiqueta: string;
  destino: Vista;
}

const ENLACES: EnlaceNavegacion[] = [
  { clave: 'inicio', etiqueta: 'Inicio', destino: { nombre: 'inicio' } },
  ...MODULOS.map((modulo) => ({
    clave: modulo.id,
    etiqueta: `Módulo ${modulo.numero}`,
    destino: { nombre: 'modulo' as const, modulo },
  })),
  { clave: 'resumen', etiqueta: 'Resumen', destino: { nombre: 'resumen' } },
];

interface EncabezadoProps {
  vista: Vista;
  onNavegar: (vista: Vista) => void;
}

function claveActiva(vista: Vista): string {
  if ('modulo' in vista) return vista.modulo.id;
  return vista.nombre;
}

export function Encabezado({ vista, onNavegar }: EncabezadoProps) {
  const activa = claveActiva(vista);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button
          type="button"
          onClick={() => onNavegar({ nombre: 'inicio' })}
          className="flex shrink-0 items-center gap-3 self-start rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
            <Database className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            DataModel <span className="text-blue-600">Lab</span>
          </span>
        </button>

        <nav aria-label="Principal" className="-mx-1 flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1">
          {ENLACES.map((enlace) => {
            const esActiva = activa === enlace.clave;
            return (
              <button
                key={enlace.clave}
                type="button"
                aria-current={esActiva ? 'page' : undefined}
                onClick={() => onNavegar(enlace.destino)}
                className={`shrink-0 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:py-2 sm:px-4 ${
                  esActiva ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {enlace.etiqueta}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
