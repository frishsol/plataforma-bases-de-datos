import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ETAPAS_LECCION, type EtapaLeccion } from '@/datos/etapasLeccion';
import { AprendeLeccion } from '@/components/leccion/AprendeLeccion';
import { IndicadorEtapas } from '@/components/leccion/IndicadorEtapas';
import { ObservaLeccion } from '@/components/leccion/ObservaLeccion';
import { PracticaLeccion } from '@/components/leccion/PracticaLeccion';
import { Boton } from '@/components/ui/Boton';
import { Tarjeta } from '@/components/ui/Tarjeta';
import type { Leccion } from '@/tipos/leccion';
import type { Modulo } from '@/tipos/modulo';
import type { Vista } from '@/tipos/navegacion';

interface LeccionPaginaProps {
  modulo: Modulo;
  leccion: Leccion;
  onNavegar: (vista: Vista) => void;
}

function ubicarLeccion(modulo: Modulo, leccion: Leccion): string {
  const indiceTema = modulo.temas.findIndex(
    (tema) => tema.leccion === leccion || tema.subtemas?.some((subtema) => subtema.leccion === leccion),
  );
  const numeroTema = indiceTema + 1;
  const indiceSubtema = modulo.temas[indiceTema].subtemas?.findIndex((subtema) => subtema.leccion === leccion) ?? -1;
  if (indiceSubtema === -1) return `Módulo ${modulo.numero} · Tema ${numeroTema}`;
  return `Módulo ${modulo.numero} · Tema ${numeroTema} · Subtema ${numeroTema}.${indiceSubtema + 1}`;
}

export function LeccionPagina({ modulo, leccion, onNavegar }: LeccionPaginaProps) {
  const [etapa, setEtapa] = useState<EtapaLeccion>('aprende');
  const ubicacion = ubicarLeccion(modulo, leccion);
  const indice = ETAPAS_LECCION.findIndex((item) => item.id === etapa);
  const etapaAnterior = ETAPAS_LECCION[indice - 1];
  const etapaSiguiente = ETAPAS_LECCION[indice + 1];
  const volverAlModulo = () => onNavegar({ nombre: 'modulo', modulo });

  function irA(destino: EtapaLeccion) {
    setEtapa(destino);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={volverAlModulo}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 sm:py-2 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver al módulo
      </button>

      <Tarjeta className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {ubicacion}
        </p>
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">{leccion.titulo}</h2>
        <p className="leading-normal text-slate-600">{leccion.objetivo}</p>
      </Tarjeta>

      <IndicadorEtapas actual={etapa} onSeleccionar={irA} />

      {etapa === 'aprende' && <AprendeLeccion bloques={leccion.aprende} />}
      {etapa === 'observa' && <ObservaLeccion pasos={leccion.observa} />}
      {etapa === 'practica' && <PracticaLeccion preguntas={leccion.practica} onSalir={volverAlModulo} />}

      {etapa !== 'practica' && (
        <div className="grid grid-cols-1 gap-3 sm:flex sm:items-center sm:justify-between">
          {etapaAnterior ? (
            <Boton variante="fantasma" onClick={() => irA(etapaAnterior.id)} className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {etapaAnterior.etiqueta}
            </Boton>
          ) : (
            <span className="hidden sm:block" />
          )}
          {etapaSiguiente && (
            <Boton onClick={() => irA(etapaSiguiente.id)} className="w-full sm:w-auto">
              {etapaSiguiente.etiqueta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Boton>
          )}
        </div>
      )}
    </div>
  );
}
