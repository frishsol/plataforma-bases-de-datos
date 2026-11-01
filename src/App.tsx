import { useProgreso } from '@/hooks/useProgreso';
import { Encabezado } from '@/components/layout/Encabezado';
import type { Vista } from '@/tipos/navegacion';
import { useState } from 'react';
import { Inicio } from '@/paginas/Inicio';
import { ModuloPagina } from '@/paginas/ModuloPagina';
import { LeccionPagina } from '@/paginas/LeccionPagina';
import { ResumenFinal } from '@/paginas/ResumenFinal';
import { VistaDesafio } from '@/paginas/VistaDesafio';

function App() {
  const [vista, setVista] = useState<Vista>({ nombre: 'inicio' });
  const { progreso, registrarResultado, reiniciarProgreso } = useProgreso();

  function navegarA(destino: Vista) {
    setVista(destino);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Encabezado vista={vista} onNavegar={navegarA} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {vista.nombre === 'inicio' && <Inicio progreso={progreso} onNavegar={navegarA} />}
        {vista.nombre === 'modulo' && (
          <ModuloPagina modulo={vista.modulo} progreso={progreso} onNavegar={navegarA} />
        )}
        {vista.nombre === 'leccion' && (
          <LeccionPagina modulo={vista.modulo} leccion={vista.leccion} onNavegar={navegarA} />
        )}
        {vista.nombre === 'desafio' && (
          <VistaDesafio
            modulo={vista.modulo}
            desafio={vista.desafio}
            onRegistrar={registrarResultado}
            onNavegar={navegarA}
          />
        )}
        {vista.nombre === 'resumen' && (
          <ResumenFinal
            progreso={progreso}
            onIrAInicio={() => navegarA({ nombre: 'inicio' })}
            onReiniciar={reiniciarProgreso}
          />
        )}
      </main>

      <footer className="border-t border-slate-200/70 py-6 text-center text-sm text-slate-500">
        DataModel Lab · Práctica de diseño de bases de datos
      </footer>
    </div>
  );
}

export default App;
