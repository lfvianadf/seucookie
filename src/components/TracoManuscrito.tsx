type TracoManuscritoProps = {
  className?: string;
};

/** Sublinhado à mão livre, torto de propósito — como um risco de caneta sob um título. */
export function TracoManuscrito({ className = "" }: TracoManuscritoProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 16"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <path
        d="M2 10.5C40 4 90 13.5 130 7C160 2 190 12 218 6"
        stroke="var(--rosa)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
