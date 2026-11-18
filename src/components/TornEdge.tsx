/** Cobre a emenda entre os fundos com o recorte irregular do rodapé. */
export function TornEdge({ cor }: { cor: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 32"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-5 w-full -translate-y-1/2 sm:h-8"
    >
      <path
        d="M0,0 L0,20 L20,10 L40,24 L60,14 L80,8 L100,22 L120,16 L140,26 L160,11 L180,19 L200,9 L220,23 L240,15 L260,7 L280,21 L300,13 L320,25 L340,17 L360,10 L380,22 L400,14 L400,0 Z"
        style={{ fill: cor }}
      />
    </svg>
  );
}
