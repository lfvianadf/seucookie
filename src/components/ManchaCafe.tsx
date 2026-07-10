type ManchaCafeProps = {
  className?: string;
};

/** Marca de xícara no papel — imperfeição orgânica, decorativa, bem sutil. */
export function ManchaCafe({ className = "" }: ManchaCafeProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={className}
      fill="none"
    >
      <circle
        cx="100"
        cy="100"
        r="88"
        stroke="var(--ameixa)"
        strokeOpacity="0.16"
        strokeWidth="7"
      />
      <circle
        cx="106"
        cy="94"
        r="66"
        stroke="var(--ameixa)"
        strokeOpacity="0.12"
        strokeWidth="4"
      />
    </svg>
  );
}
