type NotaAdesivaProps = {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
};

/** Notinha de caderno com canto dobrado, como um post-it colado às pressas. */
export function NotaAdesiva({ children, className = "", rotate = -4 }: NotaAdesivaProps) {
  return (
    <div
      className={`relative bg-massa px-4 py-3 shadow-[3px_3px_0_rgba(67,48,59,0.15)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(0 0, 88% 0, 100% 18%, 100% 100%, 0 100%)",
      }}
    >
      <span className="font-manuscrita text-xl leading-none text-berinjela">
        {children}
      </span>
    </div>
  );
}
