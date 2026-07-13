type SeloStatusProps = {
  children: React.ReactNode;
  variante?: "disponivel" | "esgotado";
  className?: string;
};

/** Selo de status: sálvia para "disponível/saiu do forno", ameixa para "esgotado". */
export function SeloStatus({
  children,
  variante = "disponivel",
  className = "",
}: SeloStatusProps) {
  const cor =
    variante === "disponivel"
      ? "text-salvia border-salvia/60"
      : "text-ameixa border-ameixa/50";
  return (
    <span
      className={`inline-block rotate-[-2deg] rounded-full border px-3 py-0.5 font-corpo text-xs font-bold uppercase tracking-wide ${cor} ${className}`}
    >
      {children}
    </span>
  );
}
