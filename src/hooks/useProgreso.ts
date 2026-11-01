import { useCallback, useEffect, useState } from 'react';
import type { ProgresoPorDesafio } from '@/tipos/juego';
import { cargarProgreso, guardarProgreso } from '@/lib/progreso';

export function useProgreso() {
  const [progreso, setProgreso] = useState<ProgresoPorDesafio>(cargarProgreso);

  useEffect(() => {
    guardarProgreso(progreso);
  }, [progreso]);

  const registrarResultado = useCallback((id: number, puntaje: number, total: number) => {
    setProgreso((actual) => {
      const previo = actual[id];
      return {
        ...actual,
        [id]: {
          mejorPuntaje: Math.max(previo?.mejorPuntaje ?? 0, puntaje),
          total,
          intentos: (previo?.intentos ?? 0) + 1,
          completado: true,
        },
      };
    });
  }, []);

  const reiniciarProgreso = useCallback(() => setProgreso({}), []);

  return { progreso, registrarResultado, reiniciarProgreso };
}
