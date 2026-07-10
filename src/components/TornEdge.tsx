type TornEdgeProps = {
  cor: string;
  variante?: 0 | 1 | 2;
  className?: string;
};

const DENTES: number[][] = [
  [14, 22, 9, 19, 27, 12, 20, 8, 24, 16, 22, 10, 18, 26, 13, 21, 9, 17, 25, 15, 20],
  [20, 10, 24, 14, 8, 22, 16, 26, 11, 19, 9, 23, 15, 7, 21, 13, 25, 17, 10, 22, 14],
  [17, 25, 12, 20, 8, 24, 16, 10, 22, 14, 26, 18, 9, 21, 13, 27, 15, 19, 11, 23, 16],
];

function montarPath(dentes: number[]) {
  const passo = 400 / (dentes.length - 1);
  const pontos = dentes.map((y, i) => `${(i * passo).toFixed(1)},${y}`);
  return `M0,0 L${pontos.join(" L")} L400,0 Z`;
}

/** Divisor de seção em "papel rasgado": cobre a emenda reta entre fundos com uma borda irregular. */
export function TornEdge({ cor, variante = 0, className = "" }: TornEdgeProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 32"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-0 h-8 w-full -translate-y-1/2 ${className}`}
    >
      <path d={montarPath(DENTES[variante])} style={{ fill: cor }} />
    </svg>
  );
}
