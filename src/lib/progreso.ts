import type { ProgresoPorDesafio } from '@/tipos/juego';

const CLAVE_ALMACENAMIENTO = 'datamodel-lab-progreso';

export function cargarProgreso(): ProgresoPorDesafio {
  try {
    const guardado = window.localStorage.getItem(CLAVE_ALMACENAMIENTO);
    return guardado ? (JSON.parse(guardado) as ProgresoPorDesafio) : {};
  } catch {
    return {};
  }
}

export function guardarProgreso(progreso: ProgresoPorDesafio): void {
  try {
    window.localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(progreso));
  } catch {
    // El navegador puede bloquear el almacenamiento; el progreso sigue activo en la sesión.
  }
}
