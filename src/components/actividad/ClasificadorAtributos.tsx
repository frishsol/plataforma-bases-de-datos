import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { FormaAtributo, LineaConexion } from '@/components/diagrama/FormasChen';
import { Boton } from '@/components/ui/Boton';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { AtributoActividad } from '@/tipos/actividadAtributos';
import type { VarianteAtributo } from '@/tipos/diagramaER';

interface OpcionClasificacion {
  variante: VarianteAtributo;
  nombre: string;
  forma: string;
}

const OPCIONES: OpcionClasificacion[] = [
  { variante: 'simple', nombre: 'Simple', forma: 'óvalo sencillo' },
  { variante: 'clave', nombre: 'Identificador', forma: 'óvalo con el nombre subrayado' },
  { variante: 'compuesto', nombre: 'Compuesto', forma: 'óvalo unido a un óvalo por cada parte' },
  { variante: 'multivalor', nombre: 'Multivalor', forma: 'óvalo doble' },
  { variante: 'derivado', nombre: 'Derivado', forma: 'óvalo de línea discontinua' },
];

type EstadoAtributo = 'pendiente' | 'correcto' | 'incorrecto';

interface Intento {
  variante: VarianteAtributo;
  verificado: boolean;
}

interface ClasificadorAtributosProps {
  atributos: AtributoActividad[];
}

export function ClasificadorAtributos({ atributos }: ClasificadorAtributosProps) {
  const [seleccionadoId, setSeleccionadoId] = useState<string>(atributos[0]?.id ?? '');
  const [intentos, setIntentos] = useState<Record<string, Intento | undefined>>({});

  const actual = atributos.find((atributo) => atributo.id === seleccionadoId);
  if (!actual) return null;

  const intento = intentos[actual.id];
  const esAcierto = intento?.verificado === true && intento.variante === actual.variante;
  const opcionElegida = OPCIONES.find((opcion) => opcion.variante === intento?.variante);
  const aciertos = atributos.filter((atributo) => estadoDe(atributo, intentos) === 'correcto').length;

  function elegir(variante: VarianteAtributo) {
    setIntentos((previo) => ({ ...previo, [seleccionadoId]: { variante, verificado: false } }));
  }

  function comprobar() {
    if (!intento) return;
    setIntentos((previo) => ({ ...previo, [seleccionadoId]: { variante: intento.variante, verificado: true } }));
  }

  return (
    <Tarjeta className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-semibold text-blue-900">Clasifica los atributos de Hotel Patitas</p>
          <p className="text-sm text-slate-600">Elige un atributo, asígnale su clasificación y comprueba tu respuesta.</p>
        </div>
        <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-800">
          {aciertos} de {atributos.length} correctos
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <ul className="space-y-2">
          {atributos.map((atributo) => {
            const activo = atributo.id === actual.id;
            return (
              <li key={atributo.id}>
                <button
                  type="button"
                  aria-pressed={activo}
                  onClick={() => setSeleccionadoId(atributo.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left ring-1 transition duration-200 ${
                    activo
                      ? 'bg-blue-600 text-white ring-blue-600 shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-800 ring-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-semibold">{atributo.nombre}</span>
                    <span className={`text-xs ${activo ? 'text-blue-100' : 'text-slate-500'}`}>
                      Atributo de {atributo.entidad}
                    </span>
                  </span>
                  <EstadoIcono estado={estadoDe(atributo, intentos)} />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="space-y-6">
          <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
            <VisualAtributo atributo={actual} variante={intento?.variante ?? null} />
            <p className="text-center text-sm font-medium text-slate-700">
              {opcionElegida
                ? `Representación: ${opcionElegida.forma}`
                : 'Elige una clasificación para ver su representación.'}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-800">¿Qué clasificación tiene "{actual.nombre}"?</p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {OPCIONES.map((opcion) => {
                const activa = intento?.variante === opcion.variante;
                return (
                  <button
                    key={opcion.variante}
                    type="button"
                    aria-pressed={activa}
                    onClick={() => elegir(opcion.variante)}
                    className={`flex flex-col gap-1 rounded-2xl px-4 py-3 text-left ring-1 transition duration-200 ${
                      activa
                        ? 'bg-blue-600 text-white ring-blue-600 shadow-md shadow-blue-600/20'
                        : 'bg-white text-slate-800 ring-slate-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:ring-sky-300'
                    }`}
                  >
                    <span className="font-semibold">{opcion.nombre}</span>
                    <span className={`text-xs ${activa ? 'text-blue-100' : 'text-slate-500'}`}>{opcion.forma}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Boton onClick={comprobar} disabled={!intento || intento.verificado}>
                Comprobar
              </Boton>
            </div>
            {intento?.verificado && esAcierto && (
              <p className="flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm leading-normal text-emerald-900 ring-1 ring-emerald-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                <span>
                  <span className="font-semibold">Correcto.</span> {actual.explicacion}
                </span>
              </p>
            )}
            {intento?.verificado && !esAcierto && (
              <p className="flex gap-3 rounded-2xl bg-rose-50 p-4 text-sm leading-normal text-rose-900 ring-1 ring-rose-200">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden />
                <span>
                  <span className="font-semibold">Esa clasificación no es la correcta.</span> Pista: {actual.pista} Elige
                  otra y vuelve a comprobar.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Tarjeta>
  );
}

function estadoDe(atributo: AtributoActividad, intentos: Record<string, Intento | undefined>): EstadoAtributo {
  const intento = intentos[atributo.id];
  if (!intento?.verificado) return 'pendiente';
  return intento.variante === atributo.variante ? 'correcto' : 'incorrecto';
}

function EstadoIcono({ estado }: { estado: EstadoAtributo }) {
  if (estado === 'correcto') return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" aria-label="Correcto" />;
  if (estado === 'incorrecto') return <XCircle className="h-5 w-5 shrink-0 text-rose-500" aria-label="Incorrecto" />;
  return <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300" aria-label="Pendiente" />;
}

function VisualAtributo({ atributo, variante }: { atributo: AtributoActividad; variante: VarianteAtributo | null }) {
  const varianteVisual = variante ?? 'simple';
  const partes = varianteVisual === 'compuesto' ? (atributo.partes ?? []) : [];

  if (partes.length === 0) {
    return (
      <svg viewBox="0 0 400 200" role="img" aria-label={`Representación de ${atributo.nombre}`} className="mx-auto h-auto w-full max-w-md">
        <FormaAtributo x={200} y={100} nombre={atributo.nombre} variante={varianteVisual} rx={110} ry={40} />
      </svg>
    );
  }

  const separacion = 400 / (partes.length + 1);
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label={`Representación compuesta de ${atributo.nombre}`} className="mx-auto h-auto w-full max-w-md">
      {partes.map((parte, indice) => (
        <LineaConexion key={parte} x1={200} y1={96} x2={separacion * (indice + 1)} y2={158} />
      ))}
      {partes.map((parte, indice) => (
        <FormaAtributo key={parte} x={separacion * (indice + 1)} y={180} nombre={parte} variante="simple" rx={48} ry={22} />
      ))}
      <FormaAtributo x={200} y={60} nombre={atributo.nombre} variante="compuesto" rx={100} ry={36} />
    </svg>
  );
}
