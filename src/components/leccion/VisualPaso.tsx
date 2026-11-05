import { TablaInteractiva } from '@/components/leccion/TablaInteractiva';
import { DiagramaERSvg } from '@/components/diagrama/DiagramaERSvg';
import { VistaTabla } from '@/components/leccion/ComparativaTablas';
import { ESTILOS_CATEGORIA_PLANTEAMIENTO, ESTILOS_CONCEPTO } from '@/components/leccion/estilosConcepto';
import type {
  CategoriaPlanteamiento,
  SegmentoFrase,
  SegmentoPlanteamiento,
  TipoConcepto,
  VisualPaso as VisualPasoTipo,
} from '@/tipos/leccion';

interface VisualPasoProps {
  visual: VisualPasoTipo;
  descripcion: string;
}

export function VisualPaso({ visual, descripcion }: VisualPasoProps) {
  if (visual.tipo === 'frase') {
    return <FraseAnotada segmentos={visual.segmentos} resalta={visual.resalta} />;
  }

  if (visual.tipo === 'planteamiento') {
    return <PlanteamientoMarcado segmentos={visual.segmentos} resalta={visual.resalta} />;
  }

  if (visual.tipo === 'diagrama') {
    return (
      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:p-6">
        <DiagramaERSvg diagrama={visual.diagrama} descripcion={descripcion} />
      </div>
    );
  }

  if (visual.tipo === 'tabla-interactiva') {
    return (
      <div className="w-full min-w-0 rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:p-6">
        <TablaInteractiva tabla={visual.tabla} />
      </div>
    );
  }
  
if (visual.tipo === 'tablas-interactivas') {
  return (
    <div className="w-full min-w-0 space-y-5">
      <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50/80 p-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-soft" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        </span>

        <div className="space-y-1">
          <p className="font-bold text-brand-900">
            Explora las tablas interactivas
          </p>
          <p className="text-sm leading-relaxed text-brand-800">
            Selecciona los encabezados de las columnas, los números
            de las filas o los botones de claves. Observa qué
            elementos se resaltan y consulta su explicación
            debajo de cada tabla.
          </p>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
        {visual.tablas.map((tabla) => (
          <div
            key={tabla.nombre}
            className="min-w-0 rounded-xl bg-white p-4 ring-1 ring-slate-200/70 sm:p-5"
          >
            <TablaInteractiva
              tabla={tabla}
              mostrarInstrucciones={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

  
  if (visual.tipo === 'tablas') {
    return (
      <div className={`grid min-w-0 gap-5 ${
        visual.tablas.length > 1 ? 'lg:grid-cols-2' : 'grid-cols-1'
      }`}>
        {visual.tablas.map((tabla) => (
          <VistaTabla key={tabla.nombre} etiqueta="Tabla" colorEtiqueta="bg-brand-50 text-brand-700 ring-1 ring-brand-100" tabla={tabla} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {visual.grupos.map((grupo) => {
        const estilo = ESTILOS_CONCEPTO[grupo.tipo];
        return (
          <div key={grupo.tipo} className="space-y-3 rounded-xl bg-white p-5 ring-1 ring-slate-200/70 shadow-soft">
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-tight ${estilo.fondo} ${estilo.texto}`}>
              {grupo.etiqueta ?? estilo.etiqueta}
            </span>
            <ul className="space-y-2 text-slate-700">
              {grupo.elementos.map((elemento) => (
                <li key={elemento} className="flex gap-2 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" aria-hidden />
                  <span>{elemento}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

const CATEGORIAS_PLANTEAMIENTO: CategoriaPlanteamiento[] = ['necesidad', 'regla', 'irrelevante'];

function PlanteamientoMarcado({
  segmentos,
  resalta,
}: {
  segmentos: SegmentoPlanteamiento[];
  resalta: CategoriaPlanteamiento;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS_PLANTEAMIENTO.map((categoria) => (
          <span
            key={categoria}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ESTILOS_CATEGORIA_PLANTEAMIENTO[categoria].fondo} ${ESTILOS_CATEGORIA_PLANTEAMIENTO[categoria].texto}`}
          >
            {ESTILOS_CATEGORIA_PLANTEAMIENTO[categoria].etiqueta}
          </span>
        ))}
      </div>
      <p className="rounded-xl bg-slate-50/80 p-5 text-lg leading-loose text-slate-700 ring-1 ring-slate-200/70 sm:p-6 sm:text-xl">
        {segmentos.map((segmento, indice) => {
          if (!segmento.categoria || segmento.categoria !== resalta) {
            return <span key={indice}>{segmento.texto}</span>;
          }
          const estilo = ESTILOS_CATEGORIA_PLANTEAMIENTO[segmento.categoria];
          return (
            <span
              key={indice}
              className={`mx-0.5 rounded-md px-1.5 py-0.5 font-semibold ring-1 ring-inset ring-black/5 transition duration-300 ${estilo.fondo} ${estilo.texto}`}
            >
              {segmento.texto}
            </span>
          );
        })}
      </p>
    </div>
  );
}

const TIPOS_CONCEPTO: TipoConcepto[] = ['entidad', 'relacion', 'atributo'];

function FraseAnotada({ segmentos, resalta }: { segmentos: SegmentoFrase[]; resalta: TipoConcepto }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TIPOS_CONCEPTO.map((tipo) => (
          <span
            key={tipo}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ESTILOS_CONCEPTO[tipo].fondo} ${ESTILOS_CONCEPTO[tipo].texto}`}
          >
            {ESTILOS_CONCEPTO[tipo].etiqueta}
          </span>
        ))}
      </div>
      <p className="rounded-xl bg-slate-50/80 p-5 text-lg leading-loose text-slate-700 ring-1 ring-slate-200/70 sm:p-6 sm:text-xl">
        {segmentos.map((segmento, indice) => {
          const visible = segmento.tipo !== undefined && segmento.tipo === resalta;
          if (!visible || !segmento.tipo) return <span key={indice}>{segmento.texto}</span>;
          const estilo = ESTILOS_CONCEPTO[segmento.tipo];
          return (
            <span
              key={indice}
              className={`mx-0.5 rounded-md px-1.5 py-0.5 font-semibold ring-1 ring-inset ring-black/5 transition duration-300 ${estilo.fondo} ${estilo.texto}`}
            >
              {segmento.texto}
            </span>
          );
        })}
      </p>
    </div>
  );
}
