type FlorPrensadaProps = {
  className?: string;
};

/** Ornamento secundário: flor prensada simples, como enfeite de caderno. */
export function FlorPrensada({ className = "" }: FlorPrensadaProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={className}
      fill="none"
    >
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="18"
          rx="7"
          ry="13"
          fill="var(--salvia)"
          fillOpacity="0.55"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="5" fill="var(--rosa)" fillOpacity="0.7" />
    </svg>
  );
}
