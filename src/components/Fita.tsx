type FitaProps = {
  className?: string;
  rotate?: number;
};

/** Fita adesiva torta, para "colar" fotos e recortes no caderno. */
export function Fita({ className = "", rotate = -4 }: FitaProps) {
  return (
    <span
      aria-hidden
      className={`absolute h-7 w-20 bg-massa/80 shadow-[0_1px_2px_rgba(67,48,59,0.25)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath:
          "polygon(3% 0%, 97% 0%, 100% 20%, 96% 45%, 100% 70%, 97% 100%, 3% 100%, 0% 75%, 4% 45%, 0% 25%)",
      }}
    />
  );
}
