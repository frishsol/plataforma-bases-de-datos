import { useState } from 'react';
import { ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import { ETAPAS_LECCION, type EtapaLeccion } from '@/datos/etapasLeccion';
import { AprendeLeccion } from '@/components/leccion/AprendeLeccion';
import { IndicadorEtapas } from '@/components/leccion/IndicadorEtapas';
import { ObservaLeccion } from '@/components/leccion/ObservaLeccion';
import { PracticaLeccion } from '@/components/leccion/PracticaLeccion';
import { Boton } from '@/components/ui/Boton';
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
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver al módulo
      </button>

      <section className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200/70 sm:p-8">
        <div
          aria-hidden
          className="absolute right-0 top-0 h-32 w-32 rounded-bl-[3rem] bg-gradient-to-br from-brand-50 to-accent-50 opacity-60"
        />
        <div className="relative space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <GraduationCap className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-600">{ubicacion}</p>
          </div>
          <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {leccion.titulo}
          </h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-slate-600">{leccion.objetivo}</p>
        </div>
      </section>

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
