import type { ContextoDesafio } from '@/tipos/juego';

interface MaterialDeApoyoProps {
  contexto: ContextoDesafio;
}

export function MaterialDeApoyo({ contexto }: MaterialDeApoyoProps) {
  return (
    <section className="rounded-3xl bg-slate-900 p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-300">{contexto.titulo}</h3>
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-normal text-slate-100">
        {contexto.lineas.join('\n')}
      </pre>
    </section>
  );
}
